package com.klef.cicd.service;

import com.klef.cicd.model.BookCampaign;
import com.klef.cicd.model.PaymentTransaction;
import com.klef.cicd.repository.BookCampaignRepository;
import com.klef.cicd.repository.PaymentTransactionRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Value("${razorpay.keyId}")
    private String razorpayKeyId;

    @Value("${razorpay.keySecret}")
    private String razorpayKeySecret;

    @Value("${razorpay.webhookSecret}")
    private String razorpayWebhookSecret;

    @Autowired
    private BookCampaignRepository bookCampaignRepository;

    @Autowired
    private PaymentTransactionRepository paymentTransactionRepository;

    @Override
    public Map<String, Object> createRazorpayOrder(int bookingId, String currency) {
        BookCampaign booking = bookCampaignRepository.findById(bookingId).orElse(null);
        if (booking == null) {
            throw new IllegalArgumentException("Booking not found: " + bookingId);
        }
        if (booking.getStatus() == null || !booking.getStatus().equalsIgnoreCase("APPROVED")) {
            throw new IllegalStateException("Booking is not approved by creator");
        }

        String cur = (currency != null && !currency.isEmpty()) ? currency : "INR";
        int amountPaise = Math.max(0, booking.getBookedcapacity()) * 100; // assuming bookedcapacity is amount in INR

        try {
            // If keys are not configured (using fallbacks), return a mock order to avoid auth errors in dev/test
            boolean mockMode = (razorpayKeyId == null || razorpayKeyId.equals("rzp_test_dummy") || razorpayKeySecret == null || razorpayKeySecret.equals("dummy_secret"));
            if (mockMode) {
                String fakeOrderId = "order_mock_" + bookingId;
                booking.setPaymentProvider("RAZORPAY");
                booking.setProviderOrderId(fakeOrderId);
                booking.setCurrency(cur);
                booking.setStatus("PENDING_PAYMENT");
                bookCampaignRepository.save(booking);

                Map<String, Object> resp = new HashMap<>();
                resp.put("keyId", razorpayKeyId != null ? razorpayKeyId : "rzp_test_dummy");
                resp.put("orderId", fakeOrderId);
                resp.put("amount", amountPaise);
                resp.put("currency", cur);
                resp.put("mock", true);
                return resp;
            }
            RazorpayClient client = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amountPaise);
            orderRequest.put("currency", cur);
            orderRequest.put("receipt", "rcpt_" + bookingId);
            orderRequest.put("payment_capture", 1);

            Order order = client.orders.create(orderRequest);
            String orderId = order.get("id");

            booking.setPaymentProvider("RAZORPAY");
            booking.setProviderOrderId(orderId);
            booking.setCurrency(cur);
            booking.setStatus("PENDING_PAYMENT");
            bookCampaignRepository.save(booking);

            Map<String, Object> resp = new HashMap<>();
            resp.put("keyId", razorpayKeyId);
            resp.put("orderId", orderId);
            resp.put("amount", amountPaise);
            resp.put("currency", cur);
            return resp;
        } catch (Exception e) {
            throw new RuntimeException("Razorpay order creation failed: " + e.getMessage(), e);
        }
    }

    @Override
    public void handleRazorpayWebhook(String payload, String signatureHeader) {
        if (signatureHeader == null || signatureHeader.isEmpty()) {
            throw new IllegalArgumentException("Missing X-Razorpay-Signature header");
        }
        try {
            // Verify signature
            boolean isValid = Utils.verifyWebhookSignature(payload, signatureHeader, razorpayWebhookSecret);
            if (!isValid) {
                throw new SecurityException("Invalid webhook signature");
            }

            JSONObject event = new JSONObject(payload);
            String eventType = event.optString("event");
            JSONObject payloadObj = event.optJSONObject("payload");

            String orderId = null;
            String paymentId = null;
            Integer amount = null;
            String currency = null;
            String status = null;
            String errorCode = null;
            String errorMessage = null;

            if ("payment.captured".equalsIgnoreCase(eventType) || "payment.authorized".equalsIgnoreCase(eventType)) {
                JSONObject payment = payloadObj.getJSONObject("payment").getJSONObject("entity");
                paymentId = payment.optString("id");
                amount = payment.optInt("amount");
                currency = payment.optString("currency");
                status = "PAID";
                orderId = payment.optString("order_id");
            } else if ("payment.failed".equalsIgnoreCase(eventType)) {
                JSONObject payment = payloadObj.getJSONObject("payment").getJSONObject("entity");
                paymentId = payment.optString("id");
                amount = payment.optInt("amount");
                currency = payment.optString("currency");
                status = "FAILED";
                orderId = payment.optString("order_id");
                JSONObject err = payment.optJSONObject("error_reason");
                errorCode = err != null ? err.optString("code") : null;
                errorMessage = err != null ? err.optString("description") : null;
            } else if ("order.paid".equalsIgnoreCase(eventType)) {
                JSONObject orderEntity = payloadObj.getJSONObject("order").getJSONObject("entity");
                orderId = orderEntity.optString("id");
                amount = orderEntity.optInt("amount");
                currency = orderEntity.optString("currency");
                status = "PAID";
            } else {
                // Ignore other events
                return;
            }

            if (orderId == null || orderId.isEmpty()) {
                throw new IllegalArgumentException("order_id missing in webhook payload");
            }

            BookCampaign booking = bookCampaignRepository.findByProviderOrderId(orderId);
            if (booking == null) {
                throw new IllegalStateException("Booking not found for order_id: " + orderId);
            }

            // Update booking status and payment id
            if (paymentId != null && !paymentId.isEmpty()) {
                booking.setProviderPaymentId(paymentId);
            }
            if (status != null) {
                booking.setStatus(status);
            }
            bookCampaignRepository.save(booking);

            // Persist transaction record
            PaymentTransaction txn = new PaymentTransaction();
            txn.setBooking(booking);
            txn.setProvider("RAZORPAY");
            txn.setOrderId(orderId);
            txn.setPaymentId(paymentId);
            txn.setAmount(amount);
            txn.setCurrency(currency);
            txn.setStatus(status);
            txn.setErrorCode(errorCode);
            txn.setErrorMessage(errorMessage);
            paymentTransactionRepository.save(txn);

        } catch (Exception e) {
            throw new RuntimeException("Webhook processing failed: " + e.getMessage(), e);
        }
    }
}
