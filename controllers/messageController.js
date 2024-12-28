const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilio = require("twilio");
const axios = require("axios");
const ResumeParser = require("simple-resume-parser");
const { retrieveVectors } = require("../utils/pinecone");
const { dynamicResponse } = require("../utils/gemini");
const { sendImage, uploadImage } = require("../utils/whatsapp");
const client = twilio(accountSid, authToken);

// exports.replyMessage = async (request, response) => {
//     try {
//         let { Body: query, From: userNumber, NumMedia } = request.body;
//         console.log(request.body);

//         if (NumMedia > 0) {
//             const {MediaUrl0: mediaUrl, MediaContentType0: contentType} = request.body;

//             if (contentType === "application/pdf") {
//                 query = "Sent PDF!";

//                 const dirPath = "./received_files";
//                 if (!fs.existsSync(dirPath)) {
//                     fs.mkdirSync(dirPath, { recursive: true });
//                 }

//                 const response = await axios.get(mediaUrl, {
//                     headers: {
//                         Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
//                     },
//                     responseType: "stream",
//                 });

//                 const pdfPath = `${dirPath}/${Date.now()}.pdf`;
//                 const writeStream = fs.createWriteStream(pdfPath);
//                 response.data.pipe(writeStream);

//                 console.log("PDF saved:", pdfPath);
//             } else {
//                 query = "Non-PDF Media Sent!";
//                 console.log("Non-PDF media received:", contentType);
//             }
//         }

//         const result = await retrieveVectors(query);
//         let queryResult = result.map((v, i) => {
//             return v.metadata.description;
//         });

//         const {response: res} = await dynamicResponse(query, queryResult);

//         await client.messages.create({
//             body: res,
//             from: "whatsapp:+14155238886",
//             to: userNumber,
//         });

//         return response.status(200).json({
//             status: "success",
//             res,
//         });
//     } catch (err) {
//         console.log(err);
//         return response.status(400).json({
//             status: "failure",
//             message: err,
//         });
//     }
// };

exports.sendMessage = async (request, response) => {
    const message = request.body.entry?.[0]?.changes[0]?.value?.messages?.[0];

    if (message?.type === "text") {
        const business_phone_number_id =
            request.body.entry?.[0].changes?.[0].value?.metadata
                ?.phone_number_id;

        let queryResult = "";
        let query = message?.text?.body;

        if (query.toLowerCase().includes("job")) {
            const result = await retrieveVectors(query);

            if (result.length > 0) {
                queryResult = result.map((job, index) => ({
                    id: job.id,
                    title: job.metadata.title || `Job ${index + 1}`,
                    description: job.metadata.description.substring(0, 71)
                }));

                const interactiveMessage = {
                    messaging_product: "whatsapp",
                    to: message.from,
                    type: "interactive",
                    interactive: {
                        type: "list",
                        header: {
                            type: "text",
                            text: "Available Job Listings",
                        },
                        body: {
                            text: "Please select a job to learn more:",
                        },
                        footer: {
                            text: "HireVision AI",
                        },
                        action: {
                            button: "View Jobs",
                            sections: [
                                {
                                    title: "Jobs",
                                    rows: queryResult.map((job) => ({
                                        id: job.id,
                                        title: job.title,
                                        description: job.description,
                                    })),
                                },
                            ],
                        },
                    },
                };

                await axios.post(
                    `https://graph.facebook.com/v21.0/${business_phone_number_id}/messages`,
                    interactiveMessage,
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
                        },
                    }
                );
                // queryResult = result.map((v, i) => {
                //     return v.metadata.description;
                // });
            }

            // const { response: res } = await dynamicResponse(query, queryResult);

            // await axios({
            //     method: "POST",
            //     url: `https://graph.facebook.com/v21.0/${business_phone_number_id}/messages`,
            //     headers: {
            //         Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
            //     },
            //     data: {
            //         messaging_product: "whatsapp",
            //         to: message.from,
            //         text: { body: res }
            //     },
            // });

            await axios({
                method: "POST",
                url: `https://graph.facebook.com/v21.0/${business_phone_number_id}/messages`,
                headers: {
                    Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
                },
                data: {
                    messaging_product: "whatsapp",
                    status: "read",
                    message_id: message.id,
                },
            });
        }

        response.sendStatus(200);
    }
};

exports.receiveMessage = async (request, response) => {
    const mode = request.query["hub.mode"];
    const token = request.query["hub.verify_token"];
    const challenge = request.query["hub.challenge"];

    if (mode === "subscribe" && token === process.env.WEBHOOK_VERIFY_TOKEN) {
        response.status(200).send(challenge);
        console.log("Webhook verified successfully!");
    } else {
        response.sendStatus(403);
    }
};

// const resume = new ResumeParser("./resumes/Shayan Zaheer - Resume.pdf");

// resume.parseToJSON()
// .then(data => {
//     console.log('Yay! ', data);
// })
// .catch(error => {
//     console.error(error);
// });
