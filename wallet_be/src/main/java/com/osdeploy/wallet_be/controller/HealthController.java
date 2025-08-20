package com.osdeploy.wallet_be.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {
    @GetMapping("/api/health")
    public String healthCheck() {
        return "API is running and connected to database (if no errors in logs)";
    }
}
