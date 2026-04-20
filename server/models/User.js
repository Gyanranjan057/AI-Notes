
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
   credits: {
    type: Number,
    default: 300
  },
  

  isVerified: { type: Boolean, default: false },
});

export default mongoose.model("s", userSchema);