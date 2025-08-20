package com.osdeploy.wallet_be.controller;

import com.osdeploy.wallet_be.model.Transaction;
import com.osdeploy.wallet_be.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transaction) {
        Transaction createdTransaction = transactionService.createTransaction(transaction);
        return ResponseEntity.ok(createdTransaction);
    }

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }
        @PostMapping("/bulk")
        public ResponseEntity<List<Transaction>> createTransactionsBulk(@RequestBody List<Transaction> transactions) {
            List<Transaction> createdTransactions = transactionService.createTransactionsBulk(transactions);
            return ResponseEntity.ok(createdTransactions);
        }
}
