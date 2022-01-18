import express from "express";
import { body } from "express-validator";
import MESSAGES from "../utils/message.js";
import * as mainController from "../controller/main-controller.js";
import validation from "../middleware/validation.js";
const router = new express.Router();
router.post(
  "/short",
  [
    body("data", MESSAGES.invalidInput).notEmpty(),
    body("data", MESSAGES.invalidURL).custom((value) => {
      try {
        new URL(value);
        return true;
      } catch (err) {
        return false;
      }
    }),
  ],
  validation,
  mainController.shortURL
);
export default router;
