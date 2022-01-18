import express from "express";
import * as mainController from "../controllers/main-controller.js";
const router = new express.Router();
router.get("/", mainController.getIndex);
export default router;
