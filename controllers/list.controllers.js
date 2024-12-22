import {asyncHandler} from "../util/asyncHandler.util.js";
import {User} from "../models/user.models.js";
import {List} from "../models/list.models.js";
import {ApiResponse} from "../util/ApiResponse.util.js";
import {ApiError} from "../util/ApiError.util.js";
import mongoose from "mongoose";

const createList = asyncHandler( async (req, res) => {
    const userId = req.user._id
    const user = await User.findById(userId)
    if (!user) {
        throw new ApiError(400, "Invalid access token")
    }
    const { title, blog } = req.body
    // blog is like {blogId, blogTitle, authorId}

    const list = await List.create({
        listAuthor: req.user._id,
        title: title,
        blogsList: []
    })

    const createdList = await List.findById(list._id)
    if (!createdList) {
        throw new ApiError(500, "Something went wrong while creating the list")
    }

    try {
        if (blog) {
            if (
                [blog.blogId, blog.blogTitle, blog.authorId].some( (field) =>
                    field?.trim() !== ""
                )
            ) {
                createdList.blogsList = [...createdList.blogsList, blog]
                await createdList.save({validateBeforeSave: false})
            }
        }
    } catch (err) {
        await List.findByIdAndDelete(list._id)
    }

    return res.status(200).json(
        new ApiResponse(200, "Blog List created successfully", createdList)
    )
})

const getList = asyncHandler( async(req, res) => {
    const { listId } = req.params
    const list = await List.findById(listId)

    if (!list) {
        throw new ApiError(404, "list was not found")
    }

    return res.status(200).json(
        new ApiResponse(200, "List fetched successfully", list)
    )
})

const addToList = asyncHandler( async (req, res) => {
    const { listId } = req.params
    const { blog } = req.body
    // blog is like {blogId, blogTitle, authorId}

    const list = await List.findById(listId)

    if (!list) {
        console.log(list)
        throw new ApiError(400, "Invalid List ID")
    }

    if (
        [blog.blogId, blog.blogTitle, blog.authorId].some( (field) =>
            field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "Invalid blog format")
    }

    list.blogsList = [...list.blogsList, blog]
    await list.save({validateBeforeSave: false})

    return res.status(200).json(
        new ApiResponse(200, "Blog added to the list successfully", list)
    )
})

const getUserLists = asyncHandler( async (req, res) => {
    const { userId } = req.params

    if (!userId?.trim()) {
        throw new ApiError(400, "Username is missing")
    }

    const user = await User.findById(userId)
    if (!user) {
        throw new ApiError(404, "User with this username does not exits")
    }

    const userLists = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(userId) // Ensure userId is an ObjectId
            }
        },
        {
            $lookup: {
                from: "lists", // Name of the `List` collection
                localField: "_id", // Field in the `User` collection
                foreignField: "listAuthor", // Field in the `List` collection
                as: "userLists" // Alias for the joined data
            }
        },
        {
            $project: {
                _id: 0, // Exclude the user's `_id`
                userLists: {
                    _id: 1,
                    title: 1,
                    blogsList: 1, // Include blogsList field
                    createdAt: 1 // Include creation date if needed
                }
            }
        }
    ]);

    return res.status(200)
        .json(
            new ApiResponse( 200, "User's blogs fetched successfully", userLists)
        )
})

const deleteList = asyncHandler( async (req, res) => {
    const { userId } = req.params
    const { listId } = req.body

    if (!userId?.trim()) {
        throw new ApiError(400, "Username is missing")
    }

    const user = await User.findById(userId)
    if (!user) {
        throw new ApiError(404, "User with this username does not exits")
    }

    const userLists = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(userId) // Ensure userId is an ObjectId
            }
        },
        {
            $lookup: {
                from: "lists", // Name of the `List` collection
                localField: "_id", // Field in the `User` collection
                foreignField: "listAuthor", // Field in the `List` collection
                as: "userLists" // Alias for the joined data
            }
        },
        {
            $project: {
                _id: 0, // Exclude the user's `_id`
                userLists: {
                    _id: 1,
                    title: 1,
                    blogsList: 1, // Include blogsList field
                    createdAt: 1 // Include creation date if needed
                }
            }
        }
    ]);

    console.log(userLists[0].userLists)

    if (userLists[0].userLists.some((field) => {
        return field._id.toString() === listId
    })
    ) {
        await List.findByIdAndDelete(listId)
    } else {
        throw new ApiError(404, "The list requested to be deleted was not made by the user")
    }


    return res.status(200).json(
        new ApiResponse(200, "List deleted successfully", {})
    )
})

export {
    createList,
    getList,
    addToList,
    getUserLists,
    deleteList
}