package com.osdeploy.wallet_be.controller;

import com.osdeploy.wallet_be.model.Wallet;
import com.osdeploy.wallet_be.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wallets")
public class WalletController {
    @Autowired
    private WalletService walletService;

        @PostMapping("/deposit")
        public ResponseEntity<?> deposit(@RequestBody DepositWithdrawRequest request) {
            Wallet wallet = walletService.findByUserId(request.getUserId());
            if (wallet == null) {
                return ResponseEntity.badRequest().body("Wallet not found");
            }
            wallet.setBalance(wallet.getBalance() + request.getAmount());
            walletService.save(wallet);
            return ResponseEntity.ok(wallet);
        }

        @PostMapping("/withdraw")
        public ResponseEntity<?> withdraw(@RequestBody DepositWithdrawRequest request) {
            Wallet wallet = walletService.findByUserId(request.getUserId());
            if (wallet == null) {
                return ResponseEntity.badRequest().body("Wallet not found");
            }
            if (wallet.getBalance() < request.getAmount()) {
                return ResponseEntity.badRequest().body("Insufficient balance");
            }
            wallet.setBalance(wallet.getBalance() - request.getAmount());
            walletService.save(wallet);
            return ResponseEntity.ok(wallet);
        }
    @GetMapping
    public List<Wallet> getWallets(@RequestParam(value = "userId", required = false) Integer userId) {
        if (userId != null) {
            return walletService.getAllWallets().stream()
                .filter(w -> w.getUserId().equals(userId))
                .toList();
        }
        return walletService.getAllWallets();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Wallet> getWalletById(@PathVariable Long id) {
        return walletService.getWalletById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Wallet createWallet(@RequestBody Wallet wallet) {
        return walletService.createWallet(wallet);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Wallet> updateWallet(@PathVariable Long id, @RequestBody Wallet walletDetails) {
        try {
            Wallet updatedWallet = walletService.updateWallet(id, walletDetails);
            return ResponseEntity.ok(updatedWallet);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWallet(@PathVariable Long id) {
        walletService.deleteWallet(id);
        return ResponseEntity.noContent().build();
    }
        @PostMapping("/bulk")
        public ResponseEntity<List<Wallet>> createWalletsBulk(@RequestBody List<Wallet> wallets) {
            List<Wallet> createdWallets = walletService.createWalletsBulk(wallets);
            return ResponseEntity.ok(createdWallets);
        }

            // DTO for deposit/withdraw requests
            public static class DepositWithdrawRequest {
                private Long userId;
                private Double amount;

                public Long getUserId() { return userId; }
                public void setUserId(Long userId) { this.userId = userId; }
                public Double getAmount() { return amount; }
                public void setAmount(Double amount) { this.amount = amount; }
            }
}
