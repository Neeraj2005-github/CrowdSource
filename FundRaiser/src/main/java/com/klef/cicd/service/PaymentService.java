package com.klef.cicd.service;

import java.util.Map;

public interface PaymentService {
    Map<String, Object> createRazorpayOrder(int bookingId, String currency);
    void handleRazorpayWebhook(String payload, String signatureHeader);
}
