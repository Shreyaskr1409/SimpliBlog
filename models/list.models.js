import mongoose from 'mongoose';

const listSchema = new mongoose.Schema(
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
        blogs: [{
            blogId: {
                type: Schema.Types.ObjectId,
                ref: "Blog"
            },
            blogTitle: {
                type: String,
            },
            author: {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        }]
    }, { timestamps: true }
)

export const List = mongoose.model("List", listSchema);