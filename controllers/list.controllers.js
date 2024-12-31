import {asyncHandler} from "../util/asyncHandler.util.js";
import {User} from "../models/user.models.js";
import {List} from "../models/list.models.js";
import {ApiResponse} from "../util/ApiResponse.util.js";
import {ApiError} from "../util/ApiError.util.js";
import mongoose from "mongoose";
import { Blog } from "../models/blog.models.js";

const createList = asyncHandler( async (req, res) => {
    const userId = req.user._id
    const user = await User.findById(userId)
    if (!user) {
        throw new ApiError(400, "Invalid access token")
    }
    const { title, description, blogId } = req.body

    const list = await List.create({
        listAuthor: req.user._id,
        title: title,
        blogsList: []
    })

    const createdList = await List.findById(list._id)
    if (!createdList) {
        throw new ApiError(500, "Something went wrong while creating the list")
    }

    if (description) {
        createdList.description = description
    }

    if (blogId) {
        const blog = await Blog.findById(blogId)
        if (!blog) {
            await List.findByIdAndDelete(list._id)
            throw new ApiError(400, "Invalid blogId")
        }
        createdList.blogsList = [...createdList.blogsList, {
            blogId: blog._id,
            blogTitle: blog.title,
            blogSubtitle: blog.subtitle,
            blogBody: blog.body.slice(0, 280).concat("..."),
            // even though i only need author username, I can not add just username
            // this is because username can be changed by the user
            author: blog.author,
            readerCount: blog.readerCount,
            shareCount: blog.shareCount,
            blogImageUrl: blog.blogImage.length > 0 ? blog.blogImage[0].imageurl : null,
            createdAt: blog.createdAt,
        }]
    }

    await createdList.save({validateBeforeSave: false})

    return res.status(200).json(
        new ApiResponse(200, "Blog List created successfully", createdList)
    )
})

const getList = asyncHandler(async (req, res) => {
    const { listId } = req.params

    const list = await List.findById(listId).populate('blogsList.author', 'username avatar aboutme fullname')

    if (!list) {
        throw new ApiError(404, "List was not found")
    }

    const blogsListWithUsername = await Promise.all(
        list.blogsList.map(async (blog) => {
            const username = await User.findById(blog.author).username
            return {
                ...blog.toObject(),
                username,
            }
        })
    )

    const listWithUsernames = {
        ...list.toObject(),
        blogsList: blogsListWithUsername
    }

    return res.status(200).json(
        new ApiResponse(200, "List fetched successfully", listWithUsernames)
    )
});
    
const addToList = asyncHandler( async (req, res) => {
    const { listId } = req.params
    const { blogId } = req.body

    const list = await List.findById(listId)

    if (!list) {
        console.log(list)
        throw new ApiError(400, "Invalid List ID")
    }

    const blog = await Blog.findById(blogId)
    if (!blog) {
        throw new ApiError(400, "Invalid blogId")
    }
    list.blogsList = [...list.blogsList, {
        blogId: blog._id,
        blogTitle: blog.title,
        blogSubtitle: blog.subtitle,
        blogBody: blog.body.slice(0, 280).concat("..."),
        // even though i only need author username, I can not add just username
        // this is because username can be changed by the user
        author: blog.author,
        readerCount: blog.readerCount,
        shareCount: blog.shareCount,
        blogImageUrl: blog.blogImage.length > 0 ? blog.blogImage[0].imageurl : null,
        createdAt: blog.createdAt,
    }]

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
                    createdAt: 1, // Include creation date if needed
                    updatedAt: 1,
                    description: 1
                }
            }
        }
    ]);

    return res.status(200)
        .json(
            new ApiResponse( 200, "User's lists fetched successfully", userLists[0])
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

const editListDescription = asyncHandler( async(req, res) => {
    const { description, listId } = req.body
    const list = await List.findById(listId)
    if (!list) {
        throw new ApiError(400, "Invalid list id")
    }
    list.description = description
    list.save({validateBeforeSave: false})
    return res.status(200).json(
        new ApiResponse(200, "Description of the list is updated now", list)
    )
} )

export {
    createList,
    getList,
    addToList,
    getUserLists,
    deleteList,
    editListDescription
}
