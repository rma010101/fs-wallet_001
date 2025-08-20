package com.osdeploy.wallet_be.service;

import com.osdeploy.wallet_be.model.Transaction;
import com.osdeploy.wallet_be.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction createTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }
        public List<Transaction> createTransactionsBulk(List<Transaction> transactions) {
            return transactionRepository.saveAll(transactions);
        }
}
