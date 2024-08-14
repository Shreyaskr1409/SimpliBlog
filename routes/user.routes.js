import { Router } from 'express';
import {changeCurrentUserPassword, getCurrentUser, getUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateUserAvatar} from "../controllers/user.controllers.js";
import { verifyJWT } from '../middlewares/auth.middlewares.js';
import {upload} from '../middlewares/multer.middlewares.js';

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-accesstoken").post(verifyJWT, refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentUserPassword)
router.route("/get-currentuser").post(verifyJWT, getCurrentUser)
router.route("/get-user/:userIdOrName").post(verifyJWT, getUser)
router.route("/update-avatar").post(verifyJWT, upload.single("avatar"), updateUserAvatar)

export default router