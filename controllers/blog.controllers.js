import {Blog} from "../models/blog.models.js";
import {asyncHandler} from "../util/asyncHandler.util.js";
import {User} from "../models/user.models.js";
import {ApiResponse} from "../util/ApiResponse.util.js";
import {ApiError} from "../util/ApiError.util.js";
import { uploadOnCloudinary } from "../util/cloudinary.utils.js";

const uploadBlog = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id)
    if(!user) {
        throw new ApiError(401, "Invalid access token")
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
        throw new ApiError(406, "A duplicate with same blog title or body exists")
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
        throw new ApiError(504, "Something went wrong while creating the blog")
    }

    return res.status(201).json(
        new ApiResponse( 201,
            "User successfully registered",
            createdBlog)
    )
} )

const getBlog = asyncHandler( async (req, res) => {
    const { blogid } = req.params
    const blog = await Blog.findById(blogid)

    if (!blog) {
        throw new ApiError(404, "Blog does not exist or Incorrect Blog id")
    }

    blog.readerCount++
    await blog.save({validateBeforeSave: false})

    return res.status(200)
    .json(
        new ApiResponse(200, "Blog fetched successfully", blog)
    )
})

const deleteBlog = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id)
    if(!user) {
        throw new ApiError(400, "Invalid access token")
    }

    const { blogid } = req.params
    const blog = await Blog.findById(blogid)

    if (!blog) {
        throw new ApiError(404, "Blog does not exist or Incorrect Blog id")
    }

    try {
        await Blog.findByIdAndDelete(blog._id)
    } catch (error) {
        throw new ApiError(404, "Invalid blog id")        
    }

    return res.status(200)
        .json(
            new ApiResponse(200, "Blog Deleted successfully", {})
        )
} )

const shareBlog = asyncHandler( async (req, res) => {
    const { blogid } = req.params
    const blog = await Blog.findById(blogid)
    // console.log(blog)

    if (!blog) {
        throw new ApiError(404, "Blog does not exist or Incorrect Blog id")
    }
    // console.log(blog)
    //
    blog.shareCount++
    await blog.save({validateBeforeSave: false})

    return res.status(200)
        .json(
            new ApiResponse(200, "Blog shared successfully", {})
        )
})

const getUserBlogList = asyncHandler( async (req, res) => {
    const { username } = req.params

    if (!username?.trim()) {
        throw new ApiError(400, "Username is missing")
    }

    let username_lowercase = username.toLowerCase()

    const user = await User.findOne({username: username_lowercase})
    if (!user) {
        throw new ApiError(404, "User with this username does not exits")
    }

    const userBlogList = await User.aggregate([
        {
            $match: {
                username: username_lowercase
            }
        },
        {
            $lookup: {
                from: "blogs",
                localField: "_id",
                foreignField: "author",
                as: "userBlogList"
            }
        },
        {
            $addFields: {
                userBlogCount: {
                    $size: "$userBlogList"
                }
            }
        },
        {
            $project: {
                _id: 0, // Exclude the user's _id
                userBlogList: {
                    _id: 1,
                    title: 1,
                    subtitle: 1,
                    readerCount: 1,
                    shareCount: 1,
                    createdAt: 1,
                    updatedAt: 1
                },
                userBlogCount: 1 // Include the blog count
            }
        }
    ])

    // if (!userBlogList?.length) {
    //     throw new ApiError(404, "User does not have existing blogs")
    // }
    // I want the above code to be handled in the frontend

    // console.log(userBlogList)

    return res.status(200)
        .json(
            new ApiResponse( 200, "User's blogs fetched successfully", userBlogList[0])
        )
})

const addBlogLinks = asyncHandler( async(req, res) => {
    const user = await User.findById(req.user._id)
    if(!user) {
        throw new ApiError(400, "Invalid access token")
    }

    const {blogId, blogLinks} = req.body

    if(!blogId || Array.isArray(blogLinks) || blogLinks.length === 0) {
        throw new ApiError(400, "Blog ID and blogLinks (array) are required");
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
        throw new ApiError(404, "Invalid BlogId");
    }

    blog.blogLink.push(...blogLinks)
    await blog.save()

    return res.status(200)
        .json(
            new ApiResponse(200, "Blog links added successfully, blog")
        )
} )

const updateBlogImages = asyncHandler( async(req, res) => {
    const { blogid } = req.query
    const files = req.files
    const { titles } = req.body

    const blogExists = await Blog.findById(blogid)
    
    if (!blogExists) {
        throw new ApiError(404, "Invalid blog id")
    }
    
    let imageTitles
    try {
        imageTitles = typeof titles === 'string' ? JSON.parse(titles) : titles;
    } catch (error) {
        return res.status(400).json({ message: 'Invalid titles format' });
    }

    if (!files || files.length !== imageTitles.length) {
        return res.status(400).json({ message: 'Files and titles mismatch or missing' });
    }

    const uploadPromises = files.map(async (file, index) => {
        const uploadResult = await uploadOnCloudinary(file.path)
        return {
          imageTitle: imageTitles[index],
          imageurl: uploadResult.secure_url,
        };
    });

    const uploadedImages = await Promise.all(uploadPromises);

    console.log(uploadedImages, typeof uploadedImages)

    const blog = await Blog.findByIdAndUpdate(
      blogid,
      { $set: { blogImage: uploadedImages } },
      { new: true }
    );

    return res.status(200).json(
        new ApiResponse(200, "Blog images uploaded successfully", blog)
    )
})

export {
    uploadBlog,
    getBlog,
    shareBlog,
    getUserBlogList,
    deleteBlog,
    addBlogLinks,
    updateBlogImages
}