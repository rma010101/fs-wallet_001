package com.osdeploy.wallet_be.repository;

import com.osdeploy.wallet_be.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
