import mongoose, {Schema} from 'mongoose';

const listSchema = new mongoose.Schema(
    {
        listAuthor: {
            type:      Schema.Types.ObjectId,
            ref:       "User",
            required:  true
        },
        title: {
            type:      String,
            required:  true
        },
        description: String,
        blogsList: [{
            blogId: {
                type: Schema.Types.ObjectId,
                ref: "Blog"
            },
            blogTitle: String,
            blogSubtitle: String,
            blogBody: String,
            author: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            readerCount: {
                type: Number,
                default: 0
            },
            shareCount: {
                type: Number,
                default: 0
            },
            blogImageUrl: String,
            createdAt: Date
        }]
    }, { timestamps: true }
)

export const List = mongoose.model("List", listSchema);
