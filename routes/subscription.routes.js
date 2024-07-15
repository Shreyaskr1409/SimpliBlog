import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { getUserSubscriptionsList, subscribe, unsubscribe } from "../controllers/subscription.controller.js";

const router = Router()

router.route("/subscribe").post(verifyJWT, subscribe)
router.route("/unsubscribe").post(verifyJWT, unsubscribe)
router.route("/:username/get-user-subscriptions").post(getUserSubscriptionsList)

export default router