import connectDB from "./database/connection.js";
import {app} from "./app.js";
import dotenv from "dotenv";
import connectToRedis from "./database/redisConnection.js";

dotenv.config('./env')

connectDB().then(() => {
    const port = process.env.PORT || 8000
    app.listen(port, () => {
        console.log("Connection Established at port: ", port)
    })
}).catch((error) => {
    console.log("Connection to mongoDB failed", error)
})

// const redisClient = await connectToRedis()
// export default redisClient