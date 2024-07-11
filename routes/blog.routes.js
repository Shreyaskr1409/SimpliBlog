import {Router} from "express";
import {verifyJWT} from "../middlewares/auth.middlewares.js";
import {uploadBlog} from "../controllers/blog.controllers.js";

const router = Router()

router.route("/upload-blog").post(verifyJWT, uploadBlog)

export default router