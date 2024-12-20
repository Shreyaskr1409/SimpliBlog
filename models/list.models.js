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
        blogsList: [{
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