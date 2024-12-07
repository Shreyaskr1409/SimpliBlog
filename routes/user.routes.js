import { Router } from 'express';
import {addUserInfo, changeCurrentUserPassword, getCurrentUser, getUser, getUserInfo, isLoggedInUtil, loginUser, logoutUser, refreshAccessToken, registerUser, removeUserAvatar, updateAboutMeAndSocials, updateAccountDetails, updateUserAvatar, updateUserInterests} from "../controllers/user.controllers.js";
import { verifyJWT } from '../middlewares/auth.middlewares.js';
import {upload} from '../middlewares/multer.middlewares.js';

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-accesstoken").post(verifyJWT, refreshAccessToken)
router.route("/update-account-details").post(verifyJWT, updateAccountDetails)
router.route("/change-password").post(verifyJWT, changeCurrentUserPassword)
router.route("/get-currentuser").post(verifyJWT, getCurrentUser)
router.route("/get-user/:userIdOrName").get(getUser)
router.route("/update-avatar").post(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/remove-avatar").post(verifyJWT, removeUserAvatar)
router.route("/loggedin-confirm").get(verifyJWT, isLoggedInUtil)
router.route("/add-user-info").post(verifyJWT, addUserInfo)
router.route("/update-user-info").post(verifyJWT, updateAboutMeAndSocials)
router.route("/get-user-info/:userIdOrName").get(getUserInfo)
router.route("/update-user-interests").post(verifyJWT, updateUserInterests)

export default router