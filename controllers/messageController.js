const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const axios = require("axios");
const twilio = require("twilio");
const fs = require("fs");
const { retrieveVectors } = require("../utils/pinecone");
const { dynamicResponse } = require("../utils/gemini");
const client = twilio(accountSid, authToken);

exports.replyMessage = async (request, response) => {
    try {
        let { Body: query, From: userNumber, NumMedia } = request.body;
        console.log(request.body);

        if (NumMedia > 0) {
            const {MediaUrl0: mediaUrl, MediaContentType0: contentType} = request.body;

            if (contentType === "application/pdf") {
                query = "Sent PDF!";

                const dirPath = "./received_files";
                if (!fs.existsSync(dirPath)) {
                    fs.mkdirSync(dirPath, { recursive: true });
                }

                const response = await axios.get(mediaUrl, {
                    headers: {
                        Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
                    },
                    responseType: "stream",
                });

                const pdfPath = `${dirPath}/${Date.now()}.pdf`;
                const writeStream = fs.createWriteStream(pdfPath);
                response.data.pipe(writeStream);

                console.log("PDF saved:", pdfPath);
            } else {
                query = "Non-PDF Media Sent!";
                console.log("Non-PDF media received:", contentType);
            }
        }

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