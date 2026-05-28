 
import express from "express";
import isAuth from "../middleware/isAuth.js";
import { pdfDownload } from "../controllers/pdfcontroller.js";

const pdfRouter = express.Router();

pdfRouter.post("/generate-pdf", isAuth, pdfDownload);

export default pdfRouter;    

