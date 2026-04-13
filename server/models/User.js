// // // models/User.js
// // import mongoose from "mongoose";

// // const userSchema = new mongoose.Schema({
// //     name: { type: String, required: true },
// //   email: String,
// //   password: String,
// //   credits: {
// //     type: Number,
// //     default: 50
// //   },
  
// // });

// // export default mongoose.model("User", userSchema);




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