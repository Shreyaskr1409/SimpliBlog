import { User } from "../models/user.models.js";
import { ApiError } from "../util/ApiError.util.js";
import { ApiResponse } from "../util/ApiResponse.util.js";
import { asyncHandler } from "../util/asyncHandler.util.js";

const search = asyncHandler( async (req, res) => {
    const {searchQuery} = req.query
    
    if (!searchQuery) {
        throw new ApiError(400, "Please enter some text")
    }
    
    const userResult = await User.find({
        $text: {
            $search: searchQuery,
            $caseSensitive: false,
            $diacriticSensitive: false
        }
    })
    .select({score: {$meta: 'textScore'},
        _id: 0, username: 1, fullname: 1, email: 1})
    .sort({score: {$meta: 'textScore'}})
    .limit(5)

    let noUserFound = false
    if (!userResult.length) {
        noUserFound = true
        throw new ApiError(405, "No user found")
    }
    

    // const userArr = await userResult.toArray()

    return res.status(200).json(new ApiResponse(
        200,
        "Search data fetched successfully",
        {
            users: userResult,
            noUserFound: noUserFound
        }
    ))
} )

export {
    search
}