import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./WalletDetails.module.css";

const WalletDetails = ({ user }) => {
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) return;
    // Fetch wallet by user ID
    axios.get(`http://localhost:8080/api/wallets?userId=${user.id}`)
      .then(res => {
        if (res.data && res.data.length > 0) {
          setWallet(res.data[0]);
        } else {
          setError("No wallet found for this user.");
        }
      })
      .catch(() => setError("Failed to fetch wallet."));
  }, [user]);

  const handleDeposit = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/wallets/deposit", {
        userId: user.id,
        amount: parseFloat(amount)
      });
      setMessage("Deposit successful!");
      setWallet(res.data);
    } catch {
      setMessage("Deposit failed.");
    }
  };

  const handleWithdraw = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/wallets/withdraw", {
        userId: user.id,
        amount: parseFloat(amount)
      });
      setMessage("Withdraw successful!");
      setWallet(res.data);
    } catch (err) {
      setMessage(err.response?.data || "Withdraw failed.");
    }
  };

  const handleCancel = () => {
    setAmount("");
    setMessage("");
  };

  if (!user) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Wallet Details</h2>
      <p className={styles.label}><span className={styles.label}>User:</span> <span className={styles.value}>{user.username}</span></p>
      {wallet ? (
        <>
          <p className={styles.label}><span className={styles.label}>Wallet ID:</span> <span className={styles.value}>{wallet.id}</span></p>
          <p className={styles.label}><span className={styles.label}>Balance:</span> <span className={styles.value}>${wallet.balance}</span></p>
          <div className={styles.inputRow}>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Enter amount"
              className={styles.input}
            />
            <button className={styles.button} onClick={handleDeposit}>Deposit</button>
            <button className={styles.button} onClick={handleWithdraw}>Withdraw</button>
            <button className={styles.button} onClick={handleCancel}>Cancel</button>
          </div>
          {message && <p className={styles.message}>{message}</p>}
        </>
      ) : (
        <p className={styles.error}>{error}</p>
      )}
    </div>
  );
};

export default WalletDetails;
