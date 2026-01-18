import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // <-- import

const MetaMask = () => {
  const dispatch = useDispatch();
  const walletAddress = useSelector((state) => state.wallet.walletAddress);
  const navigate = useNavigate(); // <-- hook

  const handleConnect = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        dispatch(connectWallet(accounts[0]));

        // ✅ Redirect to wallet page after connect
        navigate("/wallet");
      } catch (error) {
        console.error("Connection error:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const handleDisconnect = () => {
    dispatch(disconnectWallet());
  };

  return (
    <center>
      <div className="meta-design">
        <h2>MetaMask Wallet 🔑</h2>
        {!walletAddress ? (
          <button className="btn btn-primary" onClick={handleConnect}>
            Connect Wallet
          </button>
        ) : (
          <div>
            <p>
              Connected: {walletAddress.slice(0, 6)}...
              {walletAddress.slice(-4)}
            </p>
            <button className="btn btn-primary" onClick={handleDisconnect}>
              Disconnect
            </button>
          </div>
        )}
      </div>
    </center>
  );
};

export default MetaMask;
