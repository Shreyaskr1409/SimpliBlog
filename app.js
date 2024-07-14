import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: "10kb"}))
app.use(express.urlencoded({
    extended: true,
    limit: "10kb"
}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.routes.js"
app.use("/api/v1/users", userRouter)

import blogRouter from "./routes/blog.routes.js"
app.use("/api/v1/blogs", blogRouter)

import subscriptionRouter from "./routes/subscription.routes.js"
app.use("/api/v1/subscription", subscriptionRouter)

export {app}