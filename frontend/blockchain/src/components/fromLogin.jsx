import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom"; // ✅ import

const FromLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ hook

  const { loading, error, user } = useSelector((state) => state.auth);

const [loggedIn, setLoggedIn] = useState(false);

useEffect(() => {
  if (user && loggedIn) {
    navigate("/wallet"); // go to wallet only after login
  }
}, [user, loggedIn, navigate]);

const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(loginUser(form)).then((res) => {
    if (loginUser.fulfilled.match(res)) {
      setLoggedIn(true); // trigger redirect
    }
  });
};
  return (
    <div className="app-bg">
      <div className="form-box">
        <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.9,
                ease: "easeOut",
                type: "spring",
                stiffness: 80,
              }}
            >         
          <h2 className="form-title">Login</h2>

          <div className="mb-3">
            <input
            className="form-control"
              type="email"
              placeholder="Enter Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <input
            className="form-control"
              type="password"
              placeholder="Enter Your Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button className="btn-submit" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </motion.form>
      </div>

      <div className="hero-section">
        <RotatingImage/>
      </div>
    </div>
  );
};

export default FromLogin;

function RotatingImage() {
  return (
    <motion.img
     src="./images/signPIc2.webp"
      height={276}
      alt="sign"
      initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
      animate={{ opacity: 1, rotate: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
       style={{
        display: "block",
        margin: "80px",
      }}
    />
    
  );
}

