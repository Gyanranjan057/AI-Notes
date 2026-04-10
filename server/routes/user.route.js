import express from "express"
import isAuth from "../middleware/isAuth.js"
import { getCurrentuser } from "../controllers/usercontroller.js"

const userRouter = express.Router()

userRouter.get("/currentuser", isAuth,getCurrentuser)

export default userRouter