import { Subscription } from "../models/subscription.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../util/ApiError.util.js";
import { ApiResponse } from "../util/ApiResponse.util.js";
import { asyncHandler } from "../util/asyncHandler.util.js";

const subscribe = asyncHandler( async (req, res) => {
    const { blogger_username } = req.body;

    const subscriber = await User.findOne(
        {username: req.user.username}
    )
    const blogger = await User.findOne(
        {username: blogger_username}
    )
    

    if(req.user.username === blogger_username) {
        throw new ApiError(400, "You cannot subscribe to yourself")
    }

    const subscriptionAlreadyExists = await Subscription.findOne(
        {subscriber: subscriber._id, blogger: blogger._id}
    )
    // console.log(subscriptionAlreadyExists);
    if ( subscriptionAlreadyExists ) {
        throw new ApiError(401, "Already Subscribed")
    }

    const subscription = await Subscription.create({
        subscriber: subscriber._id,
        blogger: blogger._id
    })
    const isSubscribed = await Subscription.findById(subscription._id)
    if ( !isSubscribed ) {
        throw new ApiError(501, "Something went wrong while creating subscription")
    }

    return res.status(200)
        .json(
            new ApiResponse(
                200, 
                "New Subscription succesfully created",
                subscription
            )
        )
} )

const unsubscribe = asyncHandler( async (req, res) => {
    // i can take subscriber and blogger id again but i do not want to go through the process of searching the users again and again
    // that will increase the await time in the server
    const { subscriptionId } = req.body;
    try {
        await Subscription.findByIdAndDelete(subscriptionId)
    } catch (error) {
        throw new ApiError(404, "Invalid subscription id")
    }

    return res.status(200)
        .json( new ApiResponse(
            200, "Unsubscribed unsuccessfully", {}
        ) )
} )

const isSubscribed = asyncHandler( async (req, res) => {
    const { blogger } = req.body
    
    const subscribedObject = await Subscription.findOne({
        blogger: blogger,
        subscriber: req.user._id
    })    

    if (!subscribedObject) {
        throw new ApiError(400, "Not subscribed")
    }

    return res.status(200).json(
        new ApiResponse(200, "IsSubscribed", subscribedObject)
    )
} )

const getUserSubscriptionsList = asyncHandler( async (req, res) => {
    const { username } = req.params
    
    const user = await User.findOne(
        {username: username}
    )
    if (!user) {
        throw new ApiError(404, "User with this username does not exist")
    }

    const userSubscriptionsList = await User.aggregate([
        {
            $match: {
                username: username
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "userSubscriptionsList"
            }
        },
        {
            $addFields: {
                userSubscriptionsCount: {
                    $size: "$userSubscriptionsList"
                }
            }
        },
        {
            $project: {
                _id: 1,
                userSubscriptionsList: {
                    _id: 1,
                    blogger: 1,
                    createdAt: 1
                },
                userSubscriptionsCount: 1
            }
        }
    ] )

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                "User subscriptions list fetched successfully",
                userSubscriptionsList[0]
            )
        )
} )

const getUserSubscribersList = asyncHandler( async (req, res) => {
    const { username } = req.params
    
    const user = await User.findOne(
        {username: username}
    )
    if (!user) {
        throw new ApiError(404, "User with this username does not exist")
    }

    const userSubscribersList = await User.aggregate([
        {
            $match: {
                username: username
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "blogger",
                as: "userSubscribersList"
            }
        },
        {
            $addFields: {
                userSubscribersCount: {
                    $size: "$userSubscribersList"
                }
            }
        },
        {
            $project: {
                _id: 1,
                userSubscribersList: {
                    _id: 1,
                    subscriber: 1,
                    createdAt: 1
                },
                userSubscribersCount: 1
            }
        }
    ])

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                "User subscribers list fetched successfully",
                userSubscribersList[0]
            )
        )
} )

export {
    subscribe,
    unsubscribe,
    isSubscribed,
    getUserSubscriptionsList,
    getUserSubscribersList
}