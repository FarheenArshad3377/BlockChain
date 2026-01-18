import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";

const FromSign = () => {
   const [form, setForm] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(registerUser(form));
    if (registerUser.fulfilled.match(resultAction)) {
      navigate("/login");
    }
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
             <h2 className="form-title">Sign In</h2>

          <div className="mb-3">
            <input
             className="form-control"
              type="text"
              placeholder="Enter Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

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

          <div className="login-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            LOGIN IN
          </Link>
        </div>
         </motion.form>
         </div>

    <motion.img
      src="./images/signPic.webp"
      height={276}
      alt="sign"
      animate={{
        scale: [1, 1.2, 1.2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["0%", "10%", "50%", "50%", "0%"],
      }}
      transition={{
        duration: 3,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: 3,
        repeatDelay: 1,
      }}
      style={{
        display: "block",
        margin: "80px",
      }}
    />
    </div>
  );
};

export default FromSign;

function RotatingImage() {
  return (
    <motion.img
      src="./images/signImg.png"
      height={476}
      alt="sign"
      initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
      animate={{ opacity: 1, rotate: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    />
  );
}

