import express from "express"
import dotenv from "dotenv"
import connectDB from "./utils/connectDB.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.route.js"
dotenv.config()

const app = express();

app.use(cors(
    {origin:"http://localhost:5173" ,
    credentials:true,
    methods:["GET","POST","PUT","DELETE","OPTIONS"]
   }
))
app.use(express.json())
app.use(cookieParser())
// app.use((req, res, next) => {
//   res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups")
//   next()
// })
const  PORT = process.env.PORT || 5000
app.get("/",(req,res)=>{
    // console.log(req.url);
    
    res.json({message:"ExamNotes AI Backend Running"})
})
app.use("/api/auth", authRouter) 
app.use("/api/user",userRouter)
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
    connectDB()
})