package com.klef.cicd.controller;

import com.klef.cicd.config.RazorpayProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/internal/razorpay")
public class RazorpayHealthController {

    @Autowired
    private RazorpayProperties props;

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> resp = new HashMap<>();
        String keyId = props.getKeyId();
        String keySecret = props.getKeySecret();
        boolean configured = keyId != null && !keyId.isBlank() && keySecret != null && !keySecret.isBlank();
        boolean usingTestKeys = configured && keyId.startsWith("rzp_test_");
        boolean dummy = "rzp_test_dummy".equals(keyId) || "dummy_secret".equals(keySecret);
        resp.put("configured", configured);
        resp.put("usingTestKeys", usingTestKeys);
        resp.put("dummy", dummy);
        resp.put("webhookConfigured", props.getWebhookSecret() != null && !props.getWebhookSecret().isBlank());
        resp.put("recommendation", dummy ? "Provide real keys" : (usingTestKeys ? "Ready for test mode" : "Prod keys assumed"));
        return ResponseEntity.ok(resp);
    }
}
