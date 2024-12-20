import {Router} from "express";
import {addToList, createList, deleteList, getList, getUserLists} from "../../controllers/list.controllers.js";
import {verifyJWT} from "../../middlewares/auth.middlewares.js";

const router = Router()

router.route("/create-list").post(verifyJWT, createList)
router.route("/get-list/:listId").get(getList)
router.route("/add-to-list/:listId").post(verifyJWT, addToList)
router.route("/get-user-lists/:userId").get(getUserLists)
router.route("/delete-list/:userId").delete(deleteList)

export default router