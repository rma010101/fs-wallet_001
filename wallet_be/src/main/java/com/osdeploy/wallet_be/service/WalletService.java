package com.osdeploy.wallet_be.service;

import com.osdeploy.wallet_be.model.Wallet;
import com.osdeploy.wallet_be.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WalletService {
    @Autowired
    private WalletRepository walletRepository;

    public List<Wallet> getAllWallets() {
        return walletRepository.findAll();
    }

    public Optional<Wallet> getWalletById(Long id) {
        return walletRepository.findById(id);
    }

    public Wallet createWallet(Wallet wallet) {
        return walletRepository.save(wallet);
    }

    public Wallet updateWallet(Long id, Wallet walletDetails) {
        Wallet wallet = walletRepository.findById(id).orElseThrow();
    wallet.setUserId(walletDetails.getUserId());
        wallet.setBalance(walletDetails.getBalance());
        return walletRepository.save(wallet);
    }

    public void deleteWallet(Long id) {
        walletRepository.deleteById(id);
    }
        public List<Wallet> createWalletsBulk(List<Wallet> wallets) {
            return walletRepository.saveAll(wallets);
        }

    public Wallet findByUserId(Long userId) {
        return walletRepository.findByUserId(userId.intValue());
    }

    public Wallet save(Wallet wallet) {
        return walletRepository.save(wallet);
    }
}
