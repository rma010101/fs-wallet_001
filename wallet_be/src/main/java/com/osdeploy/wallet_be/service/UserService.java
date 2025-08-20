package com.osdeploy.wallet_be.service;

import com.osdeploy.wallet_be.model.User;
import com.osdeploy.wallet_be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
        public List<User> createUsersBulk(List<User> users) {
            return userRepository.saveAll(users);
        }
}
