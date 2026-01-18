import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTransactions } from "../store/transactionSlice";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(fetchAllTransactions());
  }, [dispatch]);

  return (
    <div className="home-container">
      <h2 className="home-title">🌐 All User Transactions</h2>

      {loading && <p className="loading">Loading transactions...</p>}
      {error && <p className="error">{error}</p>}

      <table className="transaction-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Sender Wallet ID</th>
            <th>Receiver Wallet ID</th>
            <th>Amount (PKR)</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transactions && transactions.length > 0 ? (
            transactions.map((tx) => (
              <tr key={tx.transaction_id}>
                <td>{tx.transaction_id}</td>
                <td>{tx.sender_wallet_id}</td>
                <td>{tx.receiver_wallet_id}</td>
                <td>{tx.amount}</td>
                <td>{new Date(tx.timestamp).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
