import redis from "redis"

const connectToRedis = async () => {
    try {
        const redisClient = redis.createClient()
        redisClient.on("error", (err) => {
            console.error("Redis error:\n", err);
        });
    
        redisClient.connect()
        console.log("Connected to redis successfully");
        
        return redisClient
    } catch (error) {
        console.log("Error occured while connecting to redis");
    }
}

export default connectToRedis