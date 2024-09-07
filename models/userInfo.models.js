import mongoose, { Mongoose } from "mongoose";

const userInfoSchema = new mongoose.Schema(
    {
        aboutme: {
            type: String,
        },
        socials: [
            {
                platform: {
                    type: String,
                    enum: ["instagram", "linkedIn", "facebook", "github"],
                    required: true
                },
                username: {
                    type: String,
                    req: true
                },
                url: {
                    type: String,
                    req: true
                },
            }
        ],
        personalWebsiteUrl: {
            type: String,
            req: true
        },
        interests: [
            {
                type: String
            }
        ]
    },
    {
        timestamps: false
    }
)

export const UserInfo = mongoose.model("UserInfo", userInfoSchema)