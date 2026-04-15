import express from "express";
import authController from "../controllers/auth.controller.js";
import jwtAuth from "../middleware/auth.js";

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);

// Protected route — requires a valid access token in Authorization: Bearer <token>
router.get("/me", jwtAuth, (req, res) => {
    res.json({ message: "Access granted", user: req.user });
});

export default router;