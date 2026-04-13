

import React, { useState } from "react";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { serverurl } from "../App";
import { useDispatch } from "react-redux";
import { setuserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const [identifier, setIdentifier] = useState("");
const [otp, setOtp] = useState("");
const [otpSent, setOtpSent] = useState(false);
const [otpVerified, setOtpVerified] = useState(false);

  //GOOGLE AUTH..................
  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const name = user.displayName;
      const email = user.email;

      const result = await axios.post(
        serverurl + "/api/auth/google",
        { name, email },
        { withCredentials: true }
      );

      dispatch(setuserData(result.data));
      setShowModal(false);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  // NEW LOGIN / SIGNUP HANDLER..........
  const handleAuth = async () => {
    try {
      // password match check
      if (isSignup && password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      

      const endpoint = isSignup ? "/api/auth/signup" : "/api/auth/login";

    //   const result = await axios.post(
    //     serverurl + endpoint,
    //     { name, email, password },
    //     { withCredentials: true }
    //   );


    const payload = isSignup
  ? { name, email, password }   
  : { email, password };

const result = await axios.post(
  serverurl + endpoint,
  payload,
  { withCredentials: true }
);

    if (isSignup) {
  alert("Signup successful, please login");
  setIsSignup(false);  
} else {
  dispatch(setuserData(result.data));
  setShowModal(false);
  navigate("/dashboard");
}
    } catch (error) {
  console.log("ERROR:", error.response?.data || error.message);

  alert(
    error.response?.data?.message || "Authentication failed"
  );
}
  };

  return (
    <div className="min-h-screen overflow-hidden bg-white text-black px-8">

      {/* HEADER    */}
          <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="max-w-7xl mx-auto mt-8 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 px-8 py-6 shadow-[0_20px_45px_rgba(0,0,0,0.6)]"
      >
      <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
  Nexora
</h1>
        <p className="text-sm text-gray-300 mt-1">
          AI-Powered exam-oriented notes & revision
        </p>
      </motion.header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
         <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-black">
  Unlock Smart <br />
  <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
    AI Notes
  </span>
</h1>
          {/* LOGIN BUTTON */}
          <motion.button
            onClick={() => setShowModal(true)}
            whileHover={{ y: -10, scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
           className="mt-10 px-10 py-3 rounded-xl
                        flex items-center gap-3 
                         bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
                          border border-white/10 text-white font-semibold text-lg shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
          >
            Login
          </motion.button>

          <p className="mt-6 max-w-xl text-lg bg-gradient-to-br from-gray-700 via-gray-500/80
          to-gray-700 bg-clip-text text-transparent">
            You get <span className="font-semibold">300 FREE credits</span> to create
            exam notes, projects notes, charts, graphs and download clean PDFs instantly using AI.
          </p>

          <p className="mt-4 text-sm text-gray-500">
            Starts with 300 free credits. Upgrade any time for more credits. Instant access
          </p>
        </motion.div>

        {/* RIGHT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Feature icon="🎁" title="300 Free Credits" des="Start with 300 credits to generate notes without paying." />
          <Feature icon="📘" title="Exam Notes" des="High-yield, revision-ready exam-oriented notes." />
          <Feature icon="📂" title="Project Notes" des="Well-Structured documentation for assignments & projects." />
          <Feature icon="📊" title="Charts & Graphs" des="Auto-generated diagrams,charts and flow graphs." />
          <Feature icon="⬇️" title="Free PDF Download" des="Download clean printable PDFs instantly." />
        </div>
      </main>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl p-8 w-[350px] relative">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-white/70"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-center mb-5">
              {isSignup ? "Sign Up" : "Login"}
            </h2>


            {/* name */}
            {isSignup && (
  <input
    type="text"
    placeholder="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full mb-3 p-2 rounded-lg bg-white/10 border border-white/20 outline-none"
  />
)}

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 p-2 rounded-lg bg-white/10 border border-white/20 outline-none"
            />

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-3 p-2 rounded-lg bg-white/10 border border-white/20 outline-none"
            />

            {/* CONFIRM PASSWORD */}
            {isSignup && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mb-4 p-2 rounded-lg bg-white/10 border border-white/20 outline-none"
              />
            )}

            {/* BUTTON */}
            <button
              onClick={handleAuth}
              className="w-full bg-white text-black py-2 rounded-lg mb-3"
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>

            <div className="text-center text-white/50 mb-3">or</div>

            {/* GOOGLE */}
            <button
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-2 border border-white/20 py-2 rounded-lg"
            >
              <FcGoogle size={20} />
              Continue with Google
            </button>

            {/* TOGGLE */}
            <p className="text-sm text-center mt-4">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <span
                onClick={() => setIsSignup(!isSignup)}
                className="text-blue-400 ml-1 cursor-pointer"
              >
                {isSignup ? "Login" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Feature({ icon, title, des }) {
  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.05 }}
      className="relative rounded-2xl p-6 bg-gradient-to-br from-black/90 via-black/80 to-black/90
      backdrop-blur-2xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.7)]
      text-white"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">{des}</p>
    </motion.div>
  );
}

export default Auth;