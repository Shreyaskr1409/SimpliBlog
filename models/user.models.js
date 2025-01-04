import mongoose, { Schema, Types } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        username: {
            type:      String,
            required:  true,
            lowercase: true,
            trim:      true,
            index:     true,
            unique:    true
            // index turned to make searching better
        },
        fullname: {
            type:      String,
            required:  true,
            index:     true
        },
        email: {
            type:      String,
            required:  true,
            trim:      true,
            unique:    true,
            lowercase: true
        },
        password: {
            type:      String,
            // required:  [true, "Password is Required"] // in google auth, password is not required
        },
        avatar: {
            type:      String
        },
        userInfo: {
            type:      Schema.Types.ObjectId,
            ref:       "UserInfo"
        },
        refreshToken: {
            type:      String
        },
        aboutme: {
            type: String,
        },
        socials: [
            {
                platform: {
                    type: String,
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
        timestamps: true
    }
)

// userSchema.index(
//     { username: 'text', fullname: 'text' },
//     // { weights: { fullname: 1, username: 1 } }
// );
// I created the index manually from mongoDB shell

userSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this.id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this.id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);