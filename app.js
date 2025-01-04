import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: "30kb"}))
app.use(express.urlencoded({
    extended: true,
    limit: "30kb"
}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/v1/user.routes.js"
app.use("/api/v1/users", userRouter)
import userRouterV2 from "./routes/v2/user.routes.js"
app.use("/api/v2/users", userRouterV2)

import blogRouter from "./routes/v1/blog.routes.js"
app.use("/api/v1/blogs", blogRouter)

import subscriptionRouter from "./routes/v1/subscription.routes.js"
app.use("/api/v1/subscription", subscriptionRouter)

import searchRouter from "./routes/v1/search.routes.js"
app.use("/api/v1/search", searchRouter)

import listRouter from "./routes/v2/list.routes.js"
app.use("/api/v2/lists", listRouter)

import authRouter from "./routes/v2/auth.routes.js"
app.use("/api/v2/auth", authRouter)

// Error-handling middleware for returning JSON errors
app.use((err, req, res, next) => {
    // Set default values for error response
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Log error in development mode for debugging
    // if (process.env.NODE_ENV === 'development') {
    //     console.error(err.stack);
    // }

    // Send JSON error response
    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: message,
        errors: err.errors || [],  // Any specific error details, such as validation errors
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined // Stack trace for debugging
    });
});


export {app}
