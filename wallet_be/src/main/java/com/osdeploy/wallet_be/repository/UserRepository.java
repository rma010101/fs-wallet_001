package com.osdeploy.wallet_be.repository;

import com.osdeploy.wallet_be.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
