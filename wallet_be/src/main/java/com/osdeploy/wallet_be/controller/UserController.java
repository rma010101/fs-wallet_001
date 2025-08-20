package com.osdeploy.wallet_be.controller;

import com.osdeploy.wallet_be.model.User;
import com.osdeploy.wallet_be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User loginRequest) {
        List<User> users = userService.getAllUsers();
        User user = users.stream()
                .filter(u -> u.getUsername().equals(loginRequest.getUsername()) &&
                             u.getPassword().equals(loginRequest.getPassword()))
                .findFirst().orElse(null);
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(user);
    }
    @Autowired
    private UserService userService;
    @Autowired
    private com.osdeploy.wallet_be.service.WalletService walletService;

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        User createdUser = userService.createUser(user);
        // Automatically create wallet for new user
        com.osdeploy.wallet_be.model.Wallet wallet = new com.osdeploy.wallet_be.model.Wallet();
        wallet.setUserId(createdUser.getId());
        wallet.setBalance(0.0); // Initial balance
        walletService.createWallet(wallet);
        return ResponseEntity.ok(createdUser);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
        @PutMapping("/{id}")
        public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody User userDetails) {
            // Find user by id
            List<User> users = userService.getAllUsers();
            User user = users.stream().filter(u -> u.getId().equals(id)).findFirst().orElse(null);
            if (user == null) {
                return ResponseEntity.notFound().build();
            }
            user.setUsername(userDetails.getUsername());
            User updatedUser = userService.createUser(user); // save updated user
            return ResponseEntity.ok(updatedUser);
        }
        @PostMapping("/bulk")
        public ResponseEntity<List<User>> createUsersBulk(@RequestBody List<User> users) {
            List<User> createdUsers = userService.createUsersBulk(users);
            return ResponseEntity.ok(createdUsers);
        }
}
