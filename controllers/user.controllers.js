import {User} from "../models/user.models.js";
import {ApiError} from "../util/ApiError.util.js";
import {asyncHandler} from "../util/asyncHandler.util.js";
import {ApiResponse} from "../util/ApiResponse.util.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        user.accessToken = accessToken

        user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (e) {
        throw new ApiError(500, "Something went wrong while generating token")
    }
}

const registerUser = asyncHandler( async (req, res) => {
    const { username, fullname, email, password } = req.body
    console.log( req.body );
    // not dealing with avatar in registering
    if(
        [fullname, username, email, password].some( (field) =>
            field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "Invalid username / password / email / fullname")
    }

    const existingUser = await User.findOne({
        $or: [{username}, {email}]
    })
    if (existingUser) {
        throw new ApiError(401, "User already exists")
    }

    const user = await User.create({
        username,
        fullname,
        password,
        email,
        avatar: ""
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser) {
        throw new ApiError(500, "Something went wrong and user not registered")
    }

    return res.status(200).json(
        new ApiResponse(200,
            "User successfully registered",
            createdUser)
    )
} )

export {
    generateAccessAndRefreshTokens,
    registerUser
}