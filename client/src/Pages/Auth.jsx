
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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

  
  const [isForgot, setIsForgot] = useState(false);
  
  const [forgotStep, setForgotStep] = useState("email");
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");

  
  const resetForgot = () => {
    setIsForgot(false);
    setForgotStep("email");
    setForgotEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmNewPassword("");
    setOtpError("");
  };

  const closeModal = () => {
    setShowModal(false);
    resetForgot();
    setIsSignup(false);
  };

  const handleSendOtp = async () => {
    if (!forgotEmail) return setOtpError("Please enter your email.");
    setOtpError("");
    setOtpLoading(true);
    try {
      await axios.post(serverurl + "/api/auth/forgot-password/send-otp", {
        email: forgotEmail,
      });
      setForgotStep("otp");
    } catch (err) {
      setOtpError(err.response?.data?.message || "Failed to send OTP. Try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return setOtpError("Please enter the OTP.");
    setOtpError("");
    setOtpLoading(true);
    try {
      await axios.post(serverurl + "/api/auth/forgot-password/verify-otp", {
        email: forgotEmail,
        otp,
      });
      setForgotStep("newPassword");
    } catch (err) {
      setOtpError(err.response?.data?.message || "Invalid OTP. Try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmNewPassword)
      return setOtpError("Please fill both fields.");
    if (newPassword !== confirmNewPassword)
      return setOtpError("Passwords do not match.");
    setOtpError("");
    setOtpLoading(true);
    try {
      await axios.post(serverurl + "/api/auth/forgot-password/reset", {
        email: forgotEmail,
        newPassword,
      });
      resetForgot();
      setIsSignup(false);
      alert("Password updated! Please login with your new password.");
    } catch (err) {
      setOtpError(err.response?.data?.message || "Reset failed. Try again.");
    } finally {
      setOtpLoading(false);
    }
  };

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

  const handleAuth = async () => {
    try {
      if (isSignup && password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const endpoint = isSignup ? "/api/auth/signup" : "/api/auth/login";
      const payload = isSignup
        ? { name, email, password }
        : { email, password };

      const result = await axios.post(serverurl + endpoint, payload, {
        withCredentials: true,
      });

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
      alert(error.response?.data?.message || "Authentication failed");
    }
  };

  const inputCls =
    "w-full mb-3 p-2 rounded-lg bg-white/10 border border-white/20 outline-none placeholder-white/40 text-white";

  return (
    <div className="min-h-screen overflow-hidden bg-white text-black px-8">
      
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
          AI-Powered exam-oriented notes &amp; revision
        </p>
      </motion.header>

      
      <main className="max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

      
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
          <motion.button
            onClick={() => setShowModal(true)}
            whileHover={{ y: -10, scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-10 px-10 py-3 rounded-xl flex items-center gap-3 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 border border-white/10 text-white font-semibold text-lg shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
          >
            Login
          </motion.button>
          <p className="mt-6 max-w-xl text-lg bg-gradient-to-br from-gray-700 via-gray-500/80 to-gray-700 bg-clip-text text-transparent">
            You get <span className="font-semibold">300 FREE credits</span> to
            create exam notes, projects notes, charts, graphs and download clean
            PDFs instantly using AI.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Starts with 300 free credits. Upgrade any time for more credits.
            Instant access
          </p>
        </motion.div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Feature icon="🎁" title="300 Free Credits" des="Start with 300 credits to generate notes without paying." />
          <Feature icon="📘" title="Exam Notes" des="High-yield, revision-ready exam-oriented notes." />
          <Feature icon="📂" title="Project Notes" des="Well-Structured documentation for assignments & projects." />
          <Feature icon="📊" title="Charts & Graphs" des="Auto-generated diagrams,charts and flow graphs." />
          <Feature icon="⬇️" title="Free PDF Download" des="Download clean printable PDFs instantly." />
        </div>
      </main>

    
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl p-8 w-[370px] relative">

            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors"
            >
              ✕
            </button>

            
            <AnimatePresence mode="wait">
              {isForgot ? (
                <motion.div
                  key="forgot"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >


                  
                  <button
                    onClick={resetForgot}
                    className="flex items-center gap-1 text-white/50 hover:text-white text-sm mb-5 transition-colors"
                  >
                    ← Back to Login
                  </button>

                  <h2 className="text-2xl font-bold text-center mb-1">
                    Forgot Password
                  </h2>

                  
                  <div className="flex items-center justify-center gap-2 mb-6 mt-2">
                    {["email", "otp", "newPassword"].map((s, i) => (
                      <React.Fragment key={s}>
                        <div
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            forgotStep === s
                              ? "bg-gradient-to-r from-indigo-400 to-pink-400 scale-125"
                              : ["email", "otp", "newPassword"].indexOf(forgotStep) > i
                              ? "bg-white/60"
                              : "bg-white/20"
                          }`}
                        />
                        {i < 2 && <div className="w-8 h-px bg-white/20" />}
                      </React.Fragment>
                    ))}
                  </div>


                  
                  {forgotStep === "email" && (
                    <motion.div
                      key="step-email"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <p className="text-white/60 text-sm text-center mb-4">
                        Enter your registered email and we'll send you a one-time password.
                      </p>
                      <input
                        type="email"
                        placeholder="Registered email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className={inputCls}
                      />
                      {otpError && (
                        <p className="text-pink-400 text-xs mb-3">{otpError}</p>
                      )}
                      <button
                        onClick={handleSendOtp}
                        disabled={otpLoading}
                        className="w-full py-2 rounded-lg font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white disabled:opacity-50 transition-opacity"
                      >
                        {otpLoading ? "Sending OTP…" : "Send OTP"}
                      </button>
                    </motion.div>
                  )}

                  

                  {forgotStep === "otp" && (
                    <motion.div
                      key="step-otp"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <p className="text-white/60 text-sm text-center mb-1">
                        OTP sent to
                      </p>
                      <p className="text-white/90 text-sm text-center font-medium mb-4 truncate">
                        {forgotEmail}
                      </p>
                      <input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        className={inputCls + " tracking-[0.35em] text-center text-lg font-bold"}
                      />
                      {otpError && (
                        <p className="text-pink-400 text-xs mb-3">{otpError}</p>
                      )}
                      <button
                        onClick={handleVerifyOtp}
                        disabled={otpLoading}
                        className="w-full py-2 rounded-lg font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white disabled:opacity-50 transition-opacity mb-3"
                      >
                        {otpLoading ? "Verifying…" : "Verify OTP"}
                      </button>
                      <button
                        onClick={() => { setOtpError(""); setForgotStep("email"); }}
                        className="w-full text-sm text-white/50 hover:text-white transition-colors text-center"
                      >
                        Didn't receive? Change email
                      </button>
                    </motion.div>
                  )}


                
                  {forgotStep === "newPassword" && (
                    <motion.div
                      key="step-new"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <p className="text-white/60 text-sm text-center mb-4">
                        OTP verified ✅ — Set your new password below.
                      </p>
                      <input
                        type="password"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={inputCls}
                      />
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className={inputCls}
                      />
                      {otpError && (
                        <p className="text-pink-400 text-xs mb-3">{otpError}</p>
                      )}
                      <button
                        onClick={handleResetPassword}
                        disabled={otpLoading}
                        className="w-full py-2 rounded-lg font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white disabled:opacity-50 transition-opacity"
                      >
                        {otpLoading ? "Updating…" : "Update Password"}
                      </button>
                    </motion.div>
                  )}
                </motion.div>

              ) : (
                
                <motion.div
                  key="auth"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="text-2xl font-bold text-center mb-5">
                    {isSignup ? "Sign Up" : "Login"}
                  </h2>

                  {isSignup && (
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputCls}
                    />
                  )}

                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputCls}
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputCls}
                  />

                 
                  {!isSignup && (
                    <p
                      onClick={() => { setIsForgot(true); setForgotStep("email"); }}
                      className="text-sm text-blue-400 cursor-pointer mb-3 text-right hover:text-blue-300 transition-colors"
                    >
                      Forgot Password?
                    </p>
                  )}

                  {isSignup && (
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={inputCls}
                    />
                  )}

                  <button
                    onClick={handleAuth}
                    className="w-full bg-white text-black py-2 rounded-lg mb-3 font-semibold"
                  >
                    {isSignup ? "Sign Up" : "Login"}
                  </button>

                  <div className="text-center text-white/50 mb-3">or</div>

                  <button
                    onClick={handleGoogleAuth}
                    className="w-full flex items-center justify-center gap-2 border border-white/20 py-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <FcGoogle size={20} />
                    Continue with Google
                  </button>

                  <p className="text-sm text-center mt-4">
                    {isSignup ? "Already have an account?" : "Don't have an account?"}
                    <span
                      onClick={() => setIsSignup(!isSignup)}
                      className="text-blue-400 ml-1 cursor-pointer hover:text-blue-300 transition-colors"
                    >
                      {isSignup ? "Login" : "Sign Up"}
                    </span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
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
      className="relative rounded-2xl p-6 bg-gradient-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-2xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.7)] text-white"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">{des}</p>
    </motion.div>
  );
}

export default Auth;