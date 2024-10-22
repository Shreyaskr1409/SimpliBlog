import {Router} from "express";
import {verifyJWT} from "../middlewares/auth.middlewares.js";
import {addBlogLinks, deleteBlog, getBlog, getUserBlogList, shareBlog, updateBlogImages, uploadBlog} from "../controllers/blog.controllers.js";
import {deleteComment, editComment, getBlogComments, uploadComment} from "../controllers/comment.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router()

router.route("/upload-blog").post(verifyJWT, uploadBlog)
router.route("/get-blog/:blogid").get(getBlog)
router.route("/delete-blog/:blogid").get(verifyJWT, deleteBlog)
router.route("/share-blog/:blogid").get(shareBlog)
router.route("/get-userblog/:username").get(getUserBlogList)

router.route("/get-comments/:blogid").get(getBlogComments)
router.route("/upload-comment").post(verifyJWT, uploadComment)
router.route("/delete-comment").post(verifyJWT, deleteComment)
router.route("/edit-comment").post(verifyJWT, editComment)

router.route("/addlinks").post(verifyJWT, addBlogLinks)
router.route("/update-blog-images").post(verifyJWT, upload.array("images", 10), updateBlogImages)

export default router