import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { getUserSubscribersList, getUserSubscriptionsList, subscribe, unsubscribe } from "../controllers/subscription.controller.js";

const router = Router()

router.route("/subscribe").post(verifyJWT, subscribe)
router.route("/unsubscribe").post(verifyJWT, unsubscribe)
router.route("/:username/get-user-subscriptions").get(getUserSubscriptionsList)
router.route("/:username/get-user-subscribers").get(getUserSubscribersList)

export default router