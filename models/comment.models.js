import mongoose, {Schema} from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
        blog: {
            type: Schema.Types.ObjectId,
            ref: 'blog'
        },
        commentAuthor: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        commentBody: {
            type: String,
            required: [true, "Provide comment body"]
        },
        parentComment: {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    }, { timestamps: true }
)

export const Comment = mongoose.model("Comment", commentSchema);