import {Router} from "express";
import {verifyJWT} from "../middlewares/auth.middlewares.js";
import {deleteBlog, getBlog, getUserBlogList, shareBlog, uploadBlog} from "../controllers/blog.controllers.js";
import { getBlogComments, uploadComment } from "../controllers/comment.controllers.js";

const router = Router()

router.route("/upload-blog").post(verifyJWT, uploadBlog)
router.route("/get-blog/:blogid").get(getBlog)
router.route("/delete-blog/:blogid").get(verifyJWT, deleteBlog)
router.route("/share-blog/:blogid").get(shareBlog)
router.route("/get-userblog/:username").get(getUserBlogList)

router.route("/get-comments/:blogid").get(getBlogComments)
router.route("/upload-comment").post(verifyJWT, uploadComment)

export default router