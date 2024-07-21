import {Blog} from "../models/blog.models.js";
import {asyncHandler} from "../util/asyncHandler.util.js";
import {ApiResponse} from "../util/ApiResponse.util.js";
import {ApiError} from "../util/ApiError.util.js";
import { Comment } from "../models/comment.models.js";

const uploadComment = asyncHandler( async (req,res) => {
    const { blogid, commentBody, parentCommentId } = req.body

    const blog = await Blog.findById(blogid)
    if (!blog) {
        throw new ApiError(401, "Invalid blogid for the comment")
    }
    
    if (parentCommentId) {
        const parentComment = await Comment.findById(parentCommentId)
        if (!parentComment) {
            throw new ApiError(401, "Invalid parent comment id for the comment")
        }
    }

    if ( [commentBody].some( (fields) => 
        fields?.trim() === ""
    ) ) {
        throw new ApiError(400, "Invalid commentBody")
    }

    const author = req.user._id
    const comment = await Comment.create({
        blog: blogid,
        commentAuthor: author,
        commentBody: commentBody,
        parentComment: parentCommentId
    })

    if (!comment) {
        throw new ApiError( 500, "Comment not created successfully ")
    }

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                "Comment created successfully",
                comment
            )
        )
} )

const getBlogComments = asyncHandler( async (req, res) => {
    const {blogid} = req.params
    const blog = await Blog.findById(blogid)

    // console.log(blog);
    if (!blog) {
        throw new ApiError(404, "Blog with given blogid does not exist")
    }

    const comments = await Comment.find(
        {blog: blogid}
    ).populate("commentAuthor", "username fullname").populate("parentComment", "_id")

    // console.log(comments)

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                "User comments fetched Successfully",
                comments
            )
        )
} )

export {
    getBlogComments,
    uploadComment
}