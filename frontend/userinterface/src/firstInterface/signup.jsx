import React from "react";
import BackButton from "./BackButton";
import SignupThreeBackground from "./components/SignupThreeBackground";
import { motion } from "framer-motion";
import "./Container.css";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import { useState } from "react";

const signup = () => {
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const submitHandeler = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
  };
  const previewChanger = (e) => {
    setShowPassword((prev) => !prev);
    e.preventDefault()
  };
  return (
    <div>
      <SignupThreeBackground />
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
            placeholder="enter your name  "
          />
          <input
            type="email"
            className="logIn-input"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter email"
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
          onSubmit={submitHandeler}
        >
          LogIn
        </motion.button>
      </form>
    </div>
  );
};

export default signup;
