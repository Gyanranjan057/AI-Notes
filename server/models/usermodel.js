

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "User", 
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String, 
  },

  credits: {
    type: Number,
    default: 300, 
    min: 0,
  },

  isCreditAvailable: {
    type: Boolean,
    default: true,
  },

  notes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Note",
    default: [],
  },
}, { timestamps: true });

const usermodel = mongoose.model("User", userSchema);

export default usermodel;