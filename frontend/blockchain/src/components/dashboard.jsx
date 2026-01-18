import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchWallets } from "../store/walletSlice";
import { fetchTransactions } from "../store/transactionSlice";
import { fetchBlocks } from "../store/blockSlice";
import { logout } from "../store/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);
  const { wallets, loading: walletLoading } = useSelector((state) => state.wallet);
  const { transactions, loading: transactionLoading } = useSelector((state) => state.transaction);
  const { blocks, loading: blockLoading } = useSelector((state) => state.blocks);
useEffect(() => {
  const fetchSummary = async () => {
    if (!user?.id) return; // ensure user exists
    try {
      const res = await fetch(
        `http://localhost:5000/api/wallets/transactions-summary/${user.id}`
      );
      const data = await res.json();
      setSent(data.totalSent);
      setReceived(data.totalReceived);
    } catch (err) {
      console.error("Error fetching summary:", err);
    }
  };

  fetchSummary();
}, [user]);


  useEffect(() => {
    if (user && token) {
      dispatch(fetchWallets(token));
      dispatch(fetchTransactions(user.id));
      dispatch(fetchBlocks());
    }
  }, [dispatch, user, token]);

  const userWallet = wallets?.find((w) => w.user_id === user?.id);

  const latestSent = transactions
    ?.filter((tx) => tx.sender_wallet_id === userWallet?.wallet_id)
    .slice(-5)
    .reverse();

  const latestReceived = transactions
    ?.filter((tx) => tx.receiver_wallet_id === userWallet?.wallet_id)
    .slice(-5)
    .reverse();

  const lastBlock = blocks?.[blocks.length - 1];

  if (walletLoading || transactionLoading || blockLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="dashboard-design">
      {/* LEFT SIDEBAR */}
      <div className="left-dashboard">
        <h2 className="user-name">{user?.name || "User"}</h2>
        <ul className="sidebar-links">
          <li onClick={() => navigate("/home")}>🏠 Home</li>
          <li onClick={() => navigate("/wallet")}>💰 Wallet</li>
          <li onClick={() => navigate("/transaction")}>💸 Transactions</li>
          <li onClick={() => navigate("/blocks")}>🧱 Blocks</li>
          <li onClick={() => navigate("/profile")}>👤 Profile</li>
          <li onClick={() => { dispatch(logout()); navigate("/login"); }}>🚪 Logout</li>
        </ul>
      </div>

      {/* RIGHT SECTION */}
      <div className="right-dashboard">
        <h1 className="dash-right-heading">📊 Dashboard</h1>

        {/* TOP 4 BOXES */}
        <div className="boxes">
          <div className="box-design">
            <h3>Wallet Balance</h3>
            <p>{userWallet?.balance || 0} PKR</p>
          </div>

          <div className="box-design">
            <h3>Latest Sent</h3>
            <p>{latestSent?.[0]?.amount || 0}</p>
          </div>

          <div className="box-design">
            <h3>Latest Received</h3>
            <p>{latestReceived?.[0]?.amount || 0}</p>
          </div>

          <div className="box-design">
            <h3>Last Block No</h3>
            <p>{lastBlock?.block_id || "-"}</p>
          </div>
        </div>

        {/* CENTERED WALLET ID BOX */}
        <div className="wallet-id-section">
          <h3>🔐 Your Wallet ID</h3>
          <p className="wallet-id">{userWallet?.wallet_id || "Not Created Yet"}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
