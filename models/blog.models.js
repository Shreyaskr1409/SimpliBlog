import mongoose, { Schema } from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        author: {
            type:      Schema.Types.ObjectId,
            ref:       "User",
            required:  true
        },
        title: {
            type:      String,
            required:  true
        },
        subtitle: {
            type:      String,
            required:  true
        },
        body: {
            type:      String,
            required:  true,
            minLength: 50
        },
        readerCount: {
            type:      Number,
            default:   0
        },
        shareCount: {
            type:      Number,
            default:   0
        }
    },
    {timestamps: true}
)

export const Blog = mongoose.model("Blog", blogSchema)