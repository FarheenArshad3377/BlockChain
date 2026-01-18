import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions, createTransactionAction } from "../store/transactionSlice";
import AnimatedBackground from "./AnimationBackground";
import TransactionNotes from "./TransactionAnimation";

const Transaction = () => {
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector((state) => state.transaction);
  const user = useSelector((state) => state.auth.user);

  const [form, setForm] = useState({ receiver_id: "", amount: "" });

  useEffect(() => {
    if (user?.id) dispatch(fetchTransactions(user.id));
  }, [user, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.receiver_id || !form.amount) return alert("Fill all fields");

    try {
      await dispatch(
  createTransactionAction({
    sender_id: user.id,
    receiver_id: parseInt(form.receiver_id),
    amount: parseFloat(form.amount),
  })
   );

      setForm({ receiver_id: "", amount: "" });
      dispatch(fetchTransactions(user.id)); // refresh list
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="body-transaction" style={{ position: "relative", height: "100vh"}}>
      <TransactionNotes />
    <div className="transaction-container" style={{ padding: "20px" }}>
      <h2>💸 Transactions</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Receiver ID"
          value={form.receiver_id}
          onChange={(e) => setForm({ ...form, receiver_id: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <button type="submit">Send</button>
      </form>

      {loading && <p>Loading transactions...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
    </div>
  );
};

export default Transaction;

