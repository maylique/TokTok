import express from "express";
import multer from "multer";
import {
  addReply,
  getComments,
  getSingleComment,
  likeComment,
} from "./comment.controller.js";
import { checkAuth } from "./../middleware/checkAuth.js";

const router = express.Router();
const mult = multer();

router.get("/", checkAuth, getComments);
router.get("/:id", checkAuth, getSingleComment);
router.post("/like/:commentId/:userId", checkAuth, likeComment);
router.post("/reply/:commentId/:userId", checkAuth, addReply);

export default router;
