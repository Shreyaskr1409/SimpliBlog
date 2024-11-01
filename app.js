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

import userRouter from "./routes/user.routes.js"
app.use("/api/v1/users", userRouter)

import blogRouter from "./routes/blog.routes.js"
app.use("/api/v1/blogs", blogRouter)

import subscriptionRouter from "./routes/subscription.routes.js"
app.use("/api/v1/subscription", subscriptionRouter)

import searchRouter from "./routes/search.routes.js"
app.use("/api/v1/search", searchRouter)

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
