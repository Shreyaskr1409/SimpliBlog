import mongoose, { Schema } from "mongoose";
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
            required:  [true, "Password is Required"]
        },
        active: {
            type:      Boolean
        },
        avatar: {
            type:      String
        },
        refreshToken: {
            type:      String
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async (next) => {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

userSchema.methods.isPasswordCorrect = async (password) => {
    return bcrypt.compare(password, this.password)
}

userSchema.methods.generateRefreshToken = () => {
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

userSchema.methods.generateAccessToken = () => {
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