const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.dynamicResponse = async (originalQuery, [queryResult]) => {
    const prompt = `
    You are a Chatbot for HireVision that helps people apply for Jobs easily. So always converse positively and also add emojis while you can to enhance the user experience. But never deviate from the data I give to you. If you don't find what you're looking for in the data I provide. Simply say that there are no jobs available as of now. Don't answer to anything irrelevant and the term "irrelevant" for you is that anything that is not related to you or HireVision.
Here is the data for job listings:
${JSON.stringify(queryResult)}

Please answer the following question based only on this data:
"${originalQuery}"
`;
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
};
