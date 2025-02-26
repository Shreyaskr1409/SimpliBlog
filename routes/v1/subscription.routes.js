import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middlewares.js";
import { getUserSubscribersList, getUserSubscriptionsList, isSubscribed, subscribe, unsubscribe } from "../../controllers/subscription.controller.js";

const router = Router()

router.route("/subscribe").post(verifyJWT, subscribe)
router.route("/unsubscribe").post(verifyJWT, unsubscribe)
router.route("/:username/get-user-subscriptions").get(getUserSubscriptionsList)

// TEST COMMENT
// router.route("/is-subscribed").post(isSubscribed)
router.route("/is-subscribed").post(verifyJWT, isSubscribed)

router.route("/:username/get-user-subscribers").get(getUserSubscribersList)

export default router