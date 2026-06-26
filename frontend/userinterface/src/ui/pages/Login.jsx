import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThreeBackground from "../backgrounds/ThreeBackground";
import { motion } from "framer-motion";
import "../../styles/Container.css";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import { useAuthActions } from "../../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin, isSubmitting, error } = useAuthActions();
  const navigate = useNavigate();

  const previewChanger = (e) => {
    setShowPassword((prev) => !prev);
    e.preventDefault();
  };

  const submitHandeler = async (e) => {
    e.preventDefault();
    const result = await handleLogin(email, password);
    if (result.success) {
      navigate("/dashboard");
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
      }}
    >
      <ThreeBackground />
      <form
        action=""
        onSubmit={submitHandeler}
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="main-input">
          {error && (
            <p style={{ color: '#e53e3e', marginBottom: '10px', fontSize: '14px' }}>
              {error}
            </p>
          )}
          <input
            type="email"
            className="logIn-input"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter your registered email"
          />
          <div className="logIn-input flex justify-between">
            <input
              className=" text-center justify-center w-[43vw] outline-0"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="enter password"
            ></input>
            <motion.button onClick={previewChanger} className=" text-3xl">
              {showPassword ? <VscEye /> : <VscEyeClosed />}
            </motion.button>
          </div>
        </div>

        <motion.button
          className="active"
          whileTap={{ scale: 0.9 }}
          whileHover={{ backgroundColor: "green" }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'LogIn'}
        </motion.button>
      </form>
    </div>
  );
};

export default Login;
