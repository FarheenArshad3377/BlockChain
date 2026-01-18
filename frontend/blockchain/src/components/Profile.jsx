import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWallets } from "../store/walletSlice";
import { logout } from "../store/authSlice";

const Profile = () => {
  const dispatch = useDispatch();

  // ✅ Redux state
  const { user, token } = useSelector((state) => state.auth);
  const { wallets, loading, error } = useSelector((state) => state.wallet);

  useEffect(() => {
    if (token) {
      dispatch(fetchWallets(token)); // Fetch user's wallet
    }
  }, [dispatch, token]);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login"; // redirect to login
  };

  const wallet = wallets[0]; // Assuming user has only one wallet

  return (
    <div className="profile-container"style={{ position: "relative", height: "100vh", background:"linear-gradient(to bottom, #0a1a3d 0%, #000 100%)"}} >
      <h2>👤 User Profile</h2>

      {user ? (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>

          {loading ? (
            <p>Loading wallet...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : wallet ? (
            <>
              <p><strong>Wallet Address:</strong> {wallet.wallet_address}</p>
              <p><strong>Balance:</strong> {wallet.balance} ETH</p>
            </>
          ) : (
            <p>No wallet found</p>
          )}

          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Please login first</p>
      )}
    </div>
  );
};

export default Profile;

