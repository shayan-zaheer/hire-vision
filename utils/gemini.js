// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const { getRedisData, setRedisData } = require("./redis");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const generateResponse = async (job_data, user_query) => {
//     const prompt = `
//   You are a chatbot for HireVision that helps people apply for jobs. Your role is to:
//   - Always converse positively and enhance user experience with emojis.
//   - Respond strictly based on the provided job data.
//   - If you can't find relevant jobs, respond with "There are no jobs available as of now."
//   - If someone asks questions related to your technologies, tell them.
//   - Do not answer irrelevant questions.
  
//   Here is the job data: {job_data}
  
//   Now answer the user query: "{user_query}"`;

//     const promptFormatted = prompt
//         .replace("{job_data}", job_data)
//         .replace("{user_query}", user_query);

//     try {
//         const result = await model.generateContent(promptFormatted);
//         return result.response.text();
//     } catch (error) {
//         console.error("Error during response generation:", error);
//         return "There was an error processing your request.";
//     }
// };

// exports.dynamicResponse = async (userId, originalQuery, queryResult) => {
//     const memoryContext = await getRedisData(userId);
//     console.log("MEMORY:\n", memoryContext);

//     const newContext = memoryContext ? JSON.parse(memoryContext) : [];
//     newContext.push(originalQuery);

//     await setRedisData(userId, JSON.stringify(newContext));
  
//     const responseText = await generateResponse(JSON.stringify(queryResult), originalQuery);
//     return responseText;
// };

// const { GoogleGenerativeAI } = require("@google/generative-ai");
const { PromptTemplate } = require("@langchain/core/prompts");
const { ConversationChain } = require("langchain/chains");
const redisMemory = require("./redis");
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const model = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",
    temperature: 0.7,
    maxRetries: 2,
    apiKey: process.env.GEMINI_API_KEY,
});

const promptTemplate = new PromptTemplate({
  template: `
    You are a chatbot for HireVision that helps people apply for jobs. Your role is to:
    - Always converse positively and enhance user experience with emojis.
    - Respond strictly based on the provided job data.
    - If you can't find relevant jobs, respond with "There are no jobs available as of now."
    - If someone asks questions related to your technologies, tell them.
    - Do not answer irrelevant questions.

    Here is the job data: {job_data}
    
    Now answer the user query: "{user_query}"`,
  inputVariables: ["job_data", "user_query"],
});

const conversationChain = new ConversationChain({
  llm: model,
  memory: redisMemory,
  prompt: promptTemplate,
});

exports.dynamicResponse = async (userId, originalQuery, queryResult) => {
//   const response = await conversationChain.invoke({
//     job_data: JSON.stringify(queryResult),
//     user_query: originalQuery,
// });
const aiMsg = await conversationChain.invoke([
    [
      "system",
      "You are a chatbot for HireVision that helps people apply for jobs. Your role is to converse positively and respond based on the job data provided.",
    ],
    ["human", originalQuery],
  ]);

  return aiMsg;
};
