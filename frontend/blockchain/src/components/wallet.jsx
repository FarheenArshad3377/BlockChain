import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWallets, createWallet } from "../store/walletSlice";
import { logout } from "../store/authSlice"; // ✅ import logout action
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "./AnimationBackground";

const Wallet = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { wallets, loading, error } = useSelector((state) => state.wallet);
  const { token, user } = useSelector((state) => state.auth);

  // ✅ Fetch wallets when user logged in
  useEffect(() => {
  if (token) {
    dispatch(fetchWallets(token));
  }
}, [token, dispatch]);

// ✅ Create wallet handler
  const handleCreateWallet = async () => {
    if (!user?.id) return alert("User not logged in!");

    try {
      await dispatch(createWallet({ user_id: user.id, balance: 100 })).unwrap();
      dispatch(fetchWallets(token)); // Refresh wallets
    } catch (err) {
      console.error("Wallet creation failed:", err);
      alert(err?.message || "Wallet creation failed");
    }
  };

  // ✅ Logout handler
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // redirect to login page
  };

  // ✅ Navigation
  const goToTransaction = () => {
    if (!user) {
      alert("You must be logged in!");
      return;
    }
    navigate("/transaction");
  };

  const handleGoToBlocks = () => {
    navigate("/blocks");
  };
  const handleGoToDashboard = () => {
    navigate("/home");
  };
const userWallets = wallets
  .filter((w) => w.user_id === user?.id)
  .sort((a, b) => b.wallet_id - a.wallet_id); // newest first

const latestWallet = userWallets[0]; // ✅ pick the first one

  return (
<div style={{ position: "relative", height: "100vh" }}>
      {/* 🪄 Your original wallet UI */}
<div className="wallet-page">

      {/* 🔹 Top Bar */}
      <div className="wallet-topbar">
        <div className="left-buttons">
          <button onClick={goToTransaction}>Go to Transactions</button>
          {user && <button onClick={handleGoToBlocks}>Go to Blocks 🔗</button>}
          <button  style={{
    backgroundColor: "rgb(193 17 111)", // Bootstrap warning color
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
  }} onClick={handleGoToDashboard}>Go to Dashboard</button>

        </div>
        {user && (
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        )}
      </div>

      {/* 🔹 Center Container */}
      <div className="wallet-container">
        <h2>💰 Wallets</h2>

        {/* {loading && <p>Loading wallets...</p>}
        {error && <p className="error">{error}</p>} */}

        <button className="create-btn" onClick={handleCreateWallet}>
          Create New Wallet
        </button>

    <ul>
  {latestWallet ? (
    <li>
      Wallet ID: {latestWallet.wallet_id}, Balance: {latestWallet.balance}, Address: {latestWallet.wallet_address}
    </li>
  ) : (
    <p>No wallet found for this user.</p>
  )}
  </ul>
      </div>
    </div>
</div>
  );
};

export default Wallet;

