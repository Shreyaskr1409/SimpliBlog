import {Router} from "express";
import {verifyJWT} from "../middlewares/auth.middlewares.js";
import {getBlog, uploadBlog} from "../controllers/blog.controllers.js";

const router = Router()

router.route("/upload-blog").post(verifyJWT, uploadBlog)
router.route("/get-blog/:blogid").get(getBlog)

export default router