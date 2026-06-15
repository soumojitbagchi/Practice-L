import React from "react";
import BackButton from "./BackButton";
import SignupThreeBackground from "./components/SignupThreeBackground";
import { motion } from "framer-motion";
import "./Container.css";
import { useState } from "react";

const signup = () => {
  const [email, setEmail] = useState('')
  const [name, setname] = useState('')
  const [password, setPassword] = useState()
   const submitHandeler = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <SignupThreeBackground/>
      <BackButton />
      <form
        action=""
        onSubmit={submitHandeler}
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="main-input">
          <input
            type="text"
            className="logIn-input"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter your registered email"
          />
          <input
            type="email"
            className="logIn-input"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter your registered email"
          />
          <input
            type="password"
            className="logIn-input"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter password"
          />
        </div>

        <motion.button
          className="active"
          whileTap={{ scale: 0.9 }}
          whileHover={{ backgroundColor: "green" }}
          onSubmit={submitHandeler}
        >
          LogIn
        </motion.button>
      </form>
    </div>
  );
};

export default signup;
