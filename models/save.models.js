import mongoose from 'mongoose';

const saveSchema = new mongoose.Schema(
    {
        savedBlog: {
            type: mongoose.Schema.Types.ObjectId,
            ref:  'Blog',
        },
        blogSaver: {
            type: mongoose.Schema.Types.ObjectId,
            ref:  'User',
        }
    }, { timestamps: true }
)

export const Save = mongoose.model("Save", saveSchema);