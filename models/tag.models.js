import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
    {
        name: {
            type:      String,
            required:  true,
            unique:    true,
            trim:      true,
            minlength: 1,
            maxlength: 50,
            index:     true
        },
        taggedVideos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Video'
            }
        ]
    }, { timestamps: true }
)

export const Tag = mongoose.model("Tag", tagSchema);