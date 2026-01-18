import { Routes, Route } from "react-router-dom";
import FromSign from './components/formSign';
import FromLogin from './components/fromLogin';
import MetaMask from './components/MetaMask';
import Wallet from './components/wallet';
import Transaction from './components/Transaction';
import Block from "./components/block";
import './App.css';
import Dashboard from "./components/dashboard";
import Home from "./components/homefinal";
import Profile from "./components/Profile";

function App() {

  return (
      <Routes>
        <Route path="/" element={<FromSign />} />
        <Route path="/login" element={<FromLogin />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/meta" element={<MetaMask />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/blocks" element={<Block />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/homefinal" element={<Home />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
  )
}

export default App;
