const { PromptTemplate } = require("@langchain/core/prompts");
const { ConversationChain } = require("langchain/chains");
const redisMemory = require("./redis");
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

const model = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",
    temperature: 0.7,
    maxRetries: 2,
    apiKey: process.env.GEMINI_API_KEY,
});

// const sample = JSON.stringify({
//     "name": "",
//     "contact": {
//     },
//     "education": {
//     },
//     "profileSummary": "",
//     "projects": [
//     ],
//     "achievements": [
//     ],
//     "skills": {
//         "programming": [
//         ],
//         "tools": []
//     }
// });

// - If asked to extract the data from a CV, follow the same structure as provided.

// {resume_sample}

// - Notice that it can be that there are some tags that do not match with the format, so include them too, and if there are some tags that are in the format but not in the original one, so discard them, but the contact one should remain the same regardless of anything.


const promptTemplate = new PromptTemplate({
    inputVariables: ["chat_history", "human_input", "job_data"],
    template: `
    You are a chatbot for HireVision that helps people apply for jobs. Your role is to:
    - Always converse positively and enhance user experience with emojis.
    - Respond strictly based on the provided job data.
    - If you can't find relevant jobs, respond with 'There are no jobs available as of now.'
    - If it's the user's first message, tell him to say "Hi" or "Hello" to get started.
    - If someone asks questions related to your technologies, tell them.
    - Do not answer irrelevant questions.
    
    Here is the chat history: "{chat_history}

    Here are the available job listings: "{job_data}"

    Now answer the user query: "{human_input}"`,
});

const conversationChain = new ConversationChain({
    llm: model,
    memory: redisMemory,
    prompt: promptTemplate,
});

exports.dynamicResponse = async (originalQuery = "", queryResult = "") => {
    const aiMsg = await conversationChain.invoke({
        human_input: originalQuery,
        job_data: JSON.stringify(queryResult)
    });

    return aiMsg;
};