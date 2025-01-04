import { Router } from "express";
import { registerOrLoginWithGoogle } from "../../controllers/user.controllers.js";

const router = Router()

router.route("/google").post(registerOrLoginWithGoogle)

export default router