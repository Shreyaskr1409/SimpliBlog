import { User } from "../models/user.models.js";
import { ApiError } from "../util/ApiError.util.js";
import { ApiResponse } from "../util/ApiResponse.util.js";
import { asyncHandler } from "../util/asyncHandler.util.js";

const search = asyncHandler(async (req, res) => {
    const { searchQuery } = req.query;

    if (!searchQuery) {
        throw new ApiError(400, "Please enter some text");
    }

    // Create a fuzzy regex pattern (e.g., "Jon" -> matches "Jonathan", "Jonn", etc.)
    const fuzzyRegex = new RegExp(searchQuery.split("").join(".*"), "i"); // "j.*o.*n"

    // MongoDB query using regex to perform case-insensitive fuzzy search
    const userResult = await User.find({
        $or: [
            { username: { $regex: fuzzyRegex } },
            { fullname: { $regex: fuzzyRegex } },
            { email: { $regex: fuzzyRegex } }
        ]
    })
    .select({ _id: 0, username: 1, fullname: 1, email: 1 })
    .limit(5);

    if (!userResult.length) {
        throw new ApiError(404, "No user found");
    }

    return res.status(200).json(new ApiResponse(
        200,
        "Search data fetched successfully",
        { users: userResult, noUserFound: false }
    ));
});

export {
    search
}
