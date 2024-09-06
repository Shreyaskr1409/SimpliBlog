import {User} from "../models/user.models.js";
import {ApiError} from "../util/ApiError.util.js";
import {asyncHandler} from "../util/asyncHandler.util.js";
import {ApiResponse} from "../util/ApiResponse.util.js";
import { uploadOnCloudinary } from "../util/cloudinary.utils.js";
import { UserInfo } from "../models/userInfo.models.js";

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
    // console.log( req.body );
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
    const { usernameOrEmail, password } = req.body

    if( !(usernameOrEmail) ) {
        throw new ApiError(401, "Username or email required for login")
    }

    const user = await User.findOne({
        $or: [{username: usernameOrEmail}, {email: usernameOrEmail}]
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
            "User logged in successfully",
            {
                user: loggedInUser, accessToken, refreshToken
            }
        )
    )
} )

const isLoggedInUtil = asyncHandler( async(req, res) => {
    const user = await User.findById(req.user._id)
    if( !user ) {
        throw new ApiError(400, "Invalid user")
    }

    return res.status(200)
        .json(
            new ApiResponse(200, "User is valid", [])
        )
})

const logoutUser = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id)
    if( !user ) {
        throw new ApiError(400, "Invalid user")
    }

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
    .json( new ApiResponse(200, "User logged out successfully", {}) )
} )

const refreshAccessToken = asyncHandler( async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
          incomingRefreshToken,
          process.env.REFRESH_TOKEN_SECRET
        )

        // you will get _id via decoded token (look at generateRefreshToken() in user.model.js)

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const {newAccessToken, newRefreshToken} = await generateAccessAndRefreshTokens(user._id)

        return res
          .status(200)
          .cookie("accessToken", newAccessToken)
          .cookie("refreshToken", newRefreshToken)
          .json(
            new ApiResponse(
              200,
              {
                  newAccessToken,
                  newRefreshToken
              }
            )
          )
    } catch (error) {
        throw new ApiError(400, error?.message || "Invalid refresh token")
    }

} )

const changeCurrentUserPassword = asyncHandler(  async (req, res) => {
    const {oldPassword, newPassword} = req.body
    const user = await User.findById(req.user._id)

    if( !(oldPassword && newPassword) ) {
        throw new ApiError(400, "Please provide both old and new password")
    }
    if( !user ) {
        throw new ApiError(400, "Invalid user")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Incorrect old password entered")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res.status(200)
        .json(new ApiResponse(200, "Password changed successfully", {}))
} )

const getCurrentUser = asyncHandler( async(req, res) => {
    return res.status(200)
        .json( new ApiResponse(200, "User fetched successfully", req.user) )
} )

const getUser = asyncHandler( async(req, res) => {
    const { userIdOrName } = req.params
    const user = await User.findOne({        
        $or: [
            {username: userIdOrName},
            {_id: userIdOrName}
        ]
    }).select("-email -refreshToken -updatedAt -password")

    if ( !user ) {
        throw new ApiError(404, "User with given username doesnot exits")
    }

    return res.status(200)
        .json( new ApiResponse(200, "User fetched successfully", user) )
} )

const updateUserAvatar = asyncHandler( async(req, res) => {
    const avatarLocalPath = req.file?.path

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if(!avatar.url) {
        throw new ApiError(500, "Error while uploading to avatar")
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
    {
        $set: {
            avatar: avatar.url
        }
    },
    {new: true}
    ).select("-password")

    return res.status(200)
        .json(
            new ApiResponse(200, "Avatar updated successfully", user)
        )
} )

const addUserInfo = asyncHandler( async(req, res) => {
    const user = await User.findById(req.user._id)
    if (!user) {
        throw new ApiError(400, "Invalid Access Token")
    }
    if (user.userInfo) {
        throw new ApiError(500, "User's Info already exists, use different route instead")
    }

    const { aboutme, instagram, linkedInURL, facebook, personalWebsite } = req.body
    const socialsArray = []

    if (instagram) {
        socialsArray.push({
            platform: "instagram",
            username: instagram
        })
    }
    if (linkedInURL) {
        socialsArray.push({
            platform: "linkedIn",
            url: linkedInURL
        })
    }
    if (facebook) {
        socialsArray.push({
            platform: "facebook",
            username: facebook
        })
    }

    const userInfo = await UserInfo.create({
        aboutme: aboutme,
        socials: socialsArray,
        personalWebsiteUrl: personalWebsite
    })

    const userInfoCreated = await UserInfo.findById(userInfo._id)
    if (!userInfoCreated) {
        throw new ApiError(500, "Something went wrong while creating data in the database")
    }
    user.userInfo = userInfoCreated._id
    await user.save({validateBeforeSave: false})

    return res.status(200).json(
        new ApiResponse(200, "User info added to the database", userInfoCreated)
    )
} )

const updateInfo = asyncHandler( async(req, res) => {
    const user = await User.findById(req.user._id)
    if (!user) {
        throw new ApiError(400, "Invalid Access Token")
    }
    const userInfo = await UserInfo.findById(user.userInfo)
    if (!userInfo) {
        throw new ApiError(500, "User's Info does not exist, use different route instead")
    }


    const { aboutme, instagram, linkedInURL, facebook, personalWebsite } = req.body
    const socialsArray = userInfo.socials



    
    if (aboutme) {
        userInfo.aboutme = aboutme
    }
    if (instagram) {
        const exists = socialsArray.find(it => it.platform === "instagram")
        if (exists) {
            exists.username = instagram
            userInfo.socials = socialsArray
        } else {
            socialsArray.push({
                platform: "instagram",
                username: instagram
            })
        }
    }
    if (linkedInURL) {
        const exists = socialsArray.find(it => it.platform === "linkedIn")
        if (exists) {
            exists.url = linkedInURL
            userInfo.socials = socialsArray
        } else {
            socialsArray.push({
                platform: "linkedIn",
                url: linkedInURL
            })
        }
    }
    if (facebook) {
        const exists = socialsArray.find(it => it.platform === "facebook")
        if (exists) {
            exists.username = facebook
            userInfo.socials = socialsArray
        } else {
            socialsArray.push({
                platform: "facebook",
                username: facebook
            })
        }
    }
    if (personalWebsite) {
        userInfo.personalWebsiteUrl = personalWebsite
    }
    await userInfo.save({validateBeforeSave: false})

    res.status(200).json(
        new ApiResponse(200, "User information updated", userInfo)
    )
})

const getUserInfo = asyncHandler( async(req, res) => {
    const { userId } = req.body
    const user = await User.findById(userId)
    if (!user) {
        throw new ApiError(404, "User does not exist for given userId")
    }
    const userInfo = await UserInfo.findById(user.userInfo)
    if (!userInfo) {
        throw new ApiError(404, "UserInfo does not exist for given userId")
    }

    res.status(200).json(
        new ApiResponse(200, "User info fetched", userInfo)
    )
} )

const updateUserInterests = asyncHandler( async(req, res) => {
    const user = await User.findById(req.user._id)
    if (!user) {
        throw new ApiError(400, "Invalid Access Token")
    }
    const userInfo = await UserInfo.findById(user.userInfo)
    if (!userInfo) {
        throw new ApiError(500, "User's Info does not exist, use different route instead")
    }

    const { interests } = req.body
    
    if (interests) {
        userInfo.interests = interests
    }
    await userInfo.save({validateBeforeSave: false})

    res.status(200).json(
        new ApiResponse(200, "User interests updated", userInfo)
    )
})

export {
    generateAccessAndRefreshTokens,
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentUserPassword,
    getCurrentUser,
    getUser,
    updateUserAvatar,
    isLoggedInUtil,
    addUserInfo,
    updateInfo, 
    getUserInfo,
    updateUserInterests
}