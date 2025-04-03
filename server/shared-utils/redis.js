const { RedisChatMessageHistory } = require("@langchain/community/stores/message/ioredis");
const { BufferMemory } = require("langchain/memory");
const Redis = require("ioredis");
const { v4: uuidv4 } = require('uuid');

const client = new Redis({
    username: "default",
    password: process.env.REDIS_PW,
    host: "redis-15588.c326.us-east-1-3.ec2.redns.redis-cloud.com",
    port: 15588,
  });

const redisChatHistory = new RedisChatMessageHistory({
  client,
  sessionId: uuidv4(),
});

const redisMemory = new BufferMemory({
  chatHistory: redisChatHistory,
  memoryKey: "chat_history",
  inputKey: "human_input"
});

module.exports = { client, redisMemory };
