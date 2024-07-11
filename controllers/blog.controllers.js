import {Blog} from "../models/blog.models.js";
import {asyncHandler} from "../util/asyncHandler.util.js";
import {User} from "../models/user.models.js";
import {ApiResponse} from "../util/ApiResponse.util.js";
import {ApiError} from "../util/ApiError.util.js";

const uploadBlog = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id)
    if(!user) {
        throw new ApiError(400, "Invalid access token")
    }

    const { title, subtitle, body } = req.body
    // console.log(typeof user.username);
    const existingBlog = await Blog.findOne(
        {
            $or: [{title: title}, {body: body}]
        }
    )
    // console.log(existingBlog)
    if (existingBlog) {
        throw new ApiError(401, "A duplicate with same blog title or body exists")
    }

    // const author = user.username
        const blog = await Blog.create(
            {
                title: title,
                body: body,
                subtitle: subtitle,
                author: user._id
            }
        )

    const createdBlog = await Blog.findById(blog._id)
    // console.log(createdBlog)
    if (!createdBlog) {
        throw new ApiError(501, "Something went wrong while creating the blog")
    }

    return res.status(201).json(
        new ApiResponse( 201,
            "User successfully registered",
            createdBlog)
    )
} )

export {
    uploadBlog
}