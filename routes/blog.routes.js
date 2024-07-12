import {Router} from "express";
import {verifyJWT} from "../middlewares/auth.middlewares.js";
import {getBlog, getUserBlogList, shareBlog, uploadBlog} from "../controllers/blog.controllers.js";

const router = Router()

router.route("/upload-blog").post(verifyJWT, uploadBlog)
router.route("/get-blog/:blogid").get(getBlog)
router.route("/get-userblog/:username").get(getUserBlogList)
router.route("/share-blog/:blogid").get(shareBlog)

export default router