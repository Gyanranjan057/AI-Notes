import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const sendOtp = (identifier) =>
  axios.post(`${API}/send-otp`, { identifier });

export const verifyOtp = (identifier, otp) =>
  axios.post(`${API}/verify-otp`, { identifier, otp });