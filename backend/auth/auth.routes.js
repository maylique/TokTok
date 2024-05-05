import express from "express";
import { userLogin, userLogout } from "./auth.controller.js";
import multer from "multer";
import { checkAuth } from "./../middleware/checkAuth.js";
const router = express.Router();
const mult = multer();

router.post("/login", mult.none(), userLogin);
router.post("/logout", userLogout);
router.get("/checkauth", checkAuth, (req, res) => {
  res.json({ isAuthenticated: true });
});

export default router;
