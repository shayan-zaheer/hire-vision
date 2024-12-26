import { createClient } from "redis";

const client = createClient({
    username: "default",
    password: process.env.REDIS_PW,
    socket: {
        host: "redis-11983.c263.us-east-1-2.ec2.redns.redis-cloud.com",
        port: 11983,
    },
});

client
    .connect()
    .then(() => console.log("Connected to Redis"))
    .catch((err) => console.error("Redis connection error:", err));

module.exports = {
    setContext: async (userId, context) => {
        await redisClient.set(userId, JSON.stringify(context));
    },
    getContext: async (userId) => {
        const context = await redisClient.get(userId);
        return context ? JSON.parse(context) : null;
    },
    clearContext: async (userId) => {
        await redisClient.del(userId);
    },
};
