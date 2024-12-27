const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilio = require("twilio");
const { retrieveVectors } = require("../utils/pinecone");
const { dynamicResponse } = require("../utils/gemini");
const client = twilio(accountSid, authToken);

exports.replyMessage = async (request, response) => {
    try {
        const { Body: query, From: userNumber } = request.body;
        console.log(request.body);

        const result = await retrieveVectors(query);
        let queryResult = result.map((v, i) => {
            return v.metadata.description;
        });

        const {response: res} = await dynamicResponse(query, queryResult);

        await client.messages.create({
            body: res,
            from: "whatsapp:+14155238886",
            to: userNumber,
        });

        return response.status(200).json({
            status: "success",
            res,
        });
    } catch (err) {
        console.log(err);
        return response.status(400).json({
            status: "failure",
            message: err,
        });
    }
};