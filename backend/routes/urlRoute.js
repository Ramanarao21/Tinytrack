import express from "express"
import { handleGetAnalytics, handleGnerateShortId } from "../controllers/urlController.js";

const urlRouter = express.Router();

urlRouter.post("/shortId" , handleGnerateShortId);
urlRouter.get("/analytics/:shortId" , handleGetAnalytics )

export default urlRouter

