import express from "express"
import { googleAuth,signup, login, logout} from "../controllers/auth.controller.js"


const authRouter =express.Router()

authRouter.post("/google", googleAuth)
authRouter.post("/signup", signup)
authRouter.post("/login", login) 
authRouter.get("/logout", logout)

export default authRouter