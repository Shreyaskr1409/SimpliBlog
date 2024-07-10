import {User} from "../models/user.models.js";
import {ApiError} from "../util/ApiError.util.js";
import {asyncHandler} from "../util/asyncHandler.util.js";
import {ApiResponse} from "../util/ApiResponse.util.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
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

const loginUser = asyncHandler( async (req, res) => {
    const { username, email, password } = req.body

    if( !(username || email) ) {
        throw new ApiError(401, "Username or email required for login")
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })
    if (!user) {
        throw new ApiError(401, "User with this username or email does not exist")
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid) {
        throw new ApiError(401, "Invalid Password")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)
    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged in successfully"
        )
    )
} )

const logoutUser = asyncHandler( async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )


    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json( new ApiResponse(200, {}, "User logged out successfully") )
} )

export {
    generateAccessAndRefreshTokens,
    registerUser,
    loginUser,
    logoutUser
}