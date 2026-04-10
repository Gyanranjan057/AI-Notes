import express from "express"
import isAuth from "../middleware/isAuth.js"
import { createCreditsOrder } from "../controllers/creditscontroller.js"
 
const creditRouter = express.Router()
creditRouter.post("/order", isAuth, createCreditsOrder)
 
export default creditRouter