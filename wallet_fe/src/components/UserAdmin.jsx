import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./UserAdmin.module.css";

const API_URL = "http://localhost:8080/api/users";

const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [editId, setEditId] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(API_URL).then(res => setUsers(res.data));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL, { username });
      setUsers([...users, res.data]);
      setUsername("");
      setMessage("User created!");
    } catch {
      setMessage("Failed to create user.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers(users.filter(u => u.id !== id));
      setMessage("User deleted!");
    } catch {
      setMessage("Failed to delete user.");
    }
  };

  const startEdit = (user) => {
    setEditId(user.id);
    setEditUsername(user.username);
    setMessage("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${API_URL}/${editId}`, { username: editUsername });
      setUsers(users.map(u => (u.id === editId ? res.data : u)));
      setEditId(null);
      setEditUsername("");
      setMessage("User updated!");
    } catch {
      setMessage("Failed to update user.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>User Admin Management</h2>
      <form onSubmit={handleCreate} className={styles.form}>
        <input
          type="text"
          placeholder="New username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>Add User</button>
      </form>
      <div className={styles.list}>
        {users.map(user => (
          <div key={user.id} className={styles.userRow}>
            {editId === user.id ? (
              <form onSubmit={handleUpdate} className={styles.editForm}>
                <input
                  type="text"
                  value={editUsername}
                  onChange={e => setEditUsername(e.target.value)}
                  className={styles.input}
                  required
                />
                <button type="submit" className={styles.button}>Save</button>
                <button type="button" className={styles.cancel} onClick={() => setEditId(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <span className={styles.username}>{user.username}</span>
                <button className={styles.edit} onClick={() => startEdit(user)}>Edit</button>
                <button className={styles.delete} onClick={() => handleDelete(user.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default UserAdmin;
