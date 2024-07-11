import {Router} from "express";
import {verifyJWT} from "../middlewares/auth.middlewares.js";
import {getBlog, shareBlog, uploadBlog} from "../controllers/blog.controllers.js";

const router = Router()

router.route("/upload-blog").post(verifyJWT, uploadBlog)
router.route("/get-blog/:blogid").get(getBlog)
router.route("/share-blog/:blogid").get(shareBlog)

export default router