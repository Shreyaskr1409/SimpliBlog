import {User} from "../models/user.models.js";
import {ApiError} from "../util/ApiError.util.js";
import {asyncHandler} from "../util/asyncHandler.util.js";
import {ApiResponse} from "../util/ApiResponse.util.js";
import { uploadOnCloudinary } from "../util/cloudinary.utils.js";
import { UserInfo } from "../models/userInfo.models.js";
import { isValidObjectId } from "mongoose";

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
        throw new ApiError(401, "User already exists with given username/email")
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
        throw new ApiError(400, "Username or email required for login")
    }

    const user = await User.findOne({
        $or: [{username: usernameOrEmail}, {email: usernameOrEmail}]
    })
    if (!user) {
        throw new ApiError(404, "User with this username or email does not exist")
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
            new ApiResponse(200, "User is loggedin", {
                _id: user._id,
                username: user._username
            })
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

const updateAccountDetails = asyncHandler( async (req, res) => {
    const {username, fullname, email} = req.body

    if (!username || !email || !fullname) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                username,
                fullname,
                // same as fullName: fullName
                email: email
            }
        },
        { new: true }
    ).select("-password")

    return res.status(200)
        .json(
            new ApiResponse(200, "Account details updated successfully", user)
        )
})

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

    let query = {};
    if (isValidObjectId(userIdOrName)) {
        query = { _id: userIdOrName };
    } else {
        query = { username: userIdOrName };
    }


    const user = await User.findOne(query).select("-email -refreshToken -updatedAt -password")

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

    // console.log(avatar);

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

const removeUserAvatar = asyncHandler( async(req, res) => {
    const user = await User.findById(req.user._id)
    user.avatar = ""
    await user.save({validateBeforeSave: false})
    return res.status(200).json(
        new ApiResponse(200, "User avatar removed", user)
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

    const { aboutme, instagram, linkedInURL, facebook, personalWebsite, github } = req.body
    const socialsArray = []

    if (instagram) {
        socialsArray.push({
            platform: "instagram",
            username: instagram
        })
    }
    if (github) {
        socialsArray.push({
            platform: "github",
            username: github
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

const updateAboutMeAndSocials = asyncHandler( async(req, res) => {
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
    const { userIdOrName } = req.params

    let query = {};
    if (isValidObjectId(userIdOrName)) {
        query = { _id: userIdOrName };
    } else {
        query = { username: userIdOrName };
    }

    const user = await User.findOne(query).select("-email -refreshToken -updatedAt -password")
    if (!user) {
        throw new ApiError(404, "User does not exist for given userId")
    }
    const userInfo = await UserInfo.findById(user.userInfo)
    if (!userInfo) {
        throw new ApiError(402, "UserInfo does not exist for given userId")
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

const updateAllUserDetails = asyncHandler( async(req, res)=> {

    const {
        username,
        fullname,
        email,
        aboutme,
        socials,
        personalWebsiteUrl,
        interests
    } = req.body

    const user = await User.findById(req.user._id).select("-password -refreshToken")
    if (!user) {
        throw new ApiError(400, "Invalid Access Token")
    }

    // it is expected that whatever value needs to be changed, will be arrived
    // if a field is null, no changes will be made

    user.username  = username  ? username : user.username
    user.fullname  = fullname  ? fullname : user.fullname
    user.email     = email     ? email    : user.email
    user.aboutme   = aboutme   ? aboutme  : user.aboutme
    user.socials   = socials   ? socials  : user.socials
    user.interests = interests ? interests: user.interests
    user.personalWebsiteUrl = personalWebsiteUrl ? personalWebsiteUrl : user.personalWebsiteUrl

    await user.save({validateBeforeSave: false})

    res.status(200).json(
        new ApiResponse(200, "User updated successfully", user)
    )
})

const getBasicUserInfo = asyncHandler( async (req, res) => {
    const {userid} = req.params
    const user = await User.findById(userid)

    if (!user) {
        throw new ApiError(404, "User not found for provided userId")
    }

    const payload = {
        username : user.username,
        fullname : user.fullname,
        aboutme  : user.aboutme,
        avatar   : user.avatar,
    }

    res.status(200).json(
        new ApiResponse(200, "Basic user info fetched", payload)
    )
})

const passwordValidation = asyncHandler( async (req, res) => {
    const { password } = req.body
    const userId = req.user._id

    const user = await User.findById(userId)
    if (!user) {
        throw new ApiError(400, "Invalid access token")
    }

    const isCorrect = await user.isPasswordCorrect(password)

    if (isCorrect) {
        return res.status(200).json(
            new ApiResponse(200, "Password is correct", {})
        )
    } else {
        throw new ApiError(400, "Password is incorrect")
    }
} )

const registerOrLoginWithGoogle = asyncHandler(async (req, res) => {
    const { authorizationCode } = req.body;

    if (!authorizationCode) {
        throw new ApiError(400, "Authorization code is required");
    }

    let tokenData
    try {
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                code: authorizationCode,
                grant_type: 'authorization_code',
                redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            }),
        });

        tokenData = await tokenResponse.json();
    } catch (error) {
        console.error("Google OAuth error:", error);
        throw new ApiError(500, "Google OAuth failed");
    }

    if (tokenData.error) {
        throw new ApiError(400, `Error exchanging code: ${tokenData.error}`);
    }
    const { id_token, access_token } = tokenData;
    let userInfo;
    
    try {
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + id_token);
        userInfo = await userInfoResponse.json();
    } catch (error) {
        console.error("Google OAuth error:", error);
        throw new ApiError(500, "Google OAuth failed");
    }
    
    if (!userInfo || userInfo.error_description) {
        throw new ApiError(400, `Error fetching user info: ${userInfo.error_description}`);
    }
    
    const { email, name, sub: googleId } = userInfo;
    const [firstName, lastName = ""] = name.split(" ");
    
    // Extract username from email
    let username = email.split('@')[0];
    
    // Check if the username is already taken, and append a suffix if necessary
    let user = await User.findOne({ username });
    
    let suffix = 1;
    while (user) {
        username = `${email.split('@')[0]}${suffix}`;
        user = await User.findOne({ username });
        suffix++;
    }
    
    user = user || await User.create({
        username,
        fullname: name,
        email,
        password: "", // Empty as Google handles authentication
        avatar: "",
    });
    

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    // Set cookies
    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, "User authenticated with Google successfully", {
                user: loggedInUser,
                accessToken,
                refreshToken,
            })
        );
});


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
    updateAboutMeAndSocials, 
    getUserInfo,
    updateUserInterests,
    updateAccountDetails,
    removeUserAvatar,
    updateAllUserDetails,
    getBasicUserInfo,
    passwordValidation,
    registerOrLoginWithGoogle
}