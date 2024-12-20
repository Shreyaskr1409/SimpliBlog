import { Router } from 'express';
import {
    changeCurrentUserPassword, getBasicUserInfo,
    getCurrentUser,
    getUser,
    loginUser,
    logoutUser, passwordValidation,
    refreshAccessToken,
    registerUser,
    removeUserAvatar,
    updateAllUserDetails,
    updateUserAvatar,
} from "../../controllers/user.controllers.js";
import { verifyJWT } from '../../middlewares/auth.middlewares.js';
import {upload} from '../../middlewares/multer.middlewares.js';

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-accesstoken").post(verifyJWT, refreshAccessToken)

router.route("/get-basicuserinfo/:userid").get(getBasicUserInfo)
router.route("/get-currentuser").get(verifyJWT, getCurrentUser)
router.route("/get-user/:userIdOrName").get(getUser)
router.route("/is-password-correct").get(verifyJWT, passwordValidation)

router.route("/change-password").post(verifyJWT, changeCurrentUserPassword)
router.route("/update-avatar").post(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/remove-avatar").post(verifyJWT, removeUserAvatar)
// router.route("/loggedin-confirm").get(verifyJWT, isLoggedInUtil) // handled by get-currentuser now
// router.route("/add-user-info").post(verifyJWT, addUserInfo)
// router.route("/get-user-info/:userIdOrName").get(getUserInfo)
router.route("/update-all-user-details").post(verifyJWT, updateAllUserDetails)

export default router