const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const axios = require("axios");
const client = twilio(accountSid, authToken);

exports.replyMessage = async (request, response) => {
    try {
        const userMessage = request.body.Body;
        const userPhoneNumber = request.body.From;

        console.log(`Received message from ${userPhoneNumber}: ${userMessage}`);

        const dialogflowResponse = await axios.post(
            "https://dialogflow.googleapis.com/v2/projects/YOUR_PROJECT_ID/agent/sessions/123456:detectIntent",
            {
                queryInput: {
                    text: {
                        text: userMessage,
                        languageCode: "en",
                    },
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.DIALOGFLOW_ACCESS_TOKEN}`,
                },
            }
        );

        const dialogflowReply = dialogflowResponse.data.queryResult.fulfillmentText;

        await client.messages.create({
            body: dialogflowReply,
            from: "whatsapp:+14155238886",
            to: userPhoneNumber
        });

        response.status(200).send("Message processed successfully");
    } catch (error) {
        console.error("Error processing message:", error);
        response.status(500).send("Failed to process the message");
    }
};
