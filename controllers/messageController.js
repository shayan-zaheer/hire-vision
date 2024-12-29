const axios = require("axios");
// const ResumeParser = require("simple-resume-parser");
const { retrieveVectors, classifyIntent } = require("../utils/pinecone");
const { dynamicResponse } = require("../utils/gemini");

exports.sendMessage = async (request, response) => {
    const message = request.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    const business_phone_number_id =
        request.body.entry?.[0]?.changes?.[0]?.value?.metadata?.phone_number_id;

    if (!business_phone_number_id) {
        return response.status(400).send("Missing phone number ID");
    }

    let res = null;

    try {
        if (message?.type === "text") {
            const intent = await classifyIntent(message?.text?.body);

            if (intent === "Salutations") {
                const user =
                    request.body.entry?.[0]?.changes?.[0]?.value?.contacts?.[0];
                const userName = user?.profile?.name || "there";

                res = {
                    messaging_product: "whatsapp",
                    to: message.from,
                    type: "interactive",
                    interactive: {
                        type: "button",
                        header: {
                            type: "text",
                            text: `Hi ${userName}! 👋`,
                        },
                        body: {
                            text: "I'm HireVision AI assistant here to help you find your next opportunity. I'm optimistic about helping you discover the perfect job! 😊",
                        },
                        footer: {
                            text: "Ready to explore?",
                        },
                        action: {
                            buttons: [
                                {
                                    type: "reply",
                                    reply: {
                                        id: "view_jobs",
                                        title: "View Jobs",
                                    },
                                },
                            ],
                        },
                    },
                };
            } else {
                const { response: dynamicRes } = await dynamicResponse(
                    message?.text?.body
                );
                res = {
                    messaging_product: "whatsapp",
                    to: message.from,
                    type: "text",
                    text: {
                        body: dynamicRes,
                    },
                };
            }
        } else if (message?.interactive?.button_reply) {
            const buttonId = message?.interactive?.button_reply?.id;

            if (buttonId === "view_jobs") {
                const result = await retrieveVectors(message?.interactive?.button_reply?.title);

                const queryResult = result.map((job, index) => ({
                    id: job.id,
                    title: job.metadata.title || `Job ${index + 1}`,
                }));

                res = {
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
                                    })),
                                },
                            ],
                        },
                    },
                };
            }
        } else if (message?.interactive?.list_reply) {
            const listReply = message?.interactive?.list_reply;
            console.log(listReply);

            if (listReply) {
                const selectedJob = listReply?.title;

                res = {
                    messaging_product: "whatsapp",
                    to: message.from,
                    type: "text",
                    text: {
                        body: `Here are the details for the selected job:\n\n*${selectedJob}`,
                    },
                };
            }
        } else if (message?.type === "document"){
            const fileId = message?.document?.id;
            const fileName = message?.document?.filename;
            downloadFile(fileId, fileName);
        }

        if (res) {
            await axios.post(
                `https://graph.facebook.com/v21.0/${business_phone_number_id}/messages`,
                res,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
                    },
                }
            );
        }

        response.sendStatus(200);
    } catch (error) {
        console.error("ERROR:\n",error);
        response.status(500).json({
            status: "failure",
            message: error.message,
            stack: error.stack
        });
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

// RESUME PARSING (WILL CHECK LATER!)

// const resume = new ResumeParser("./resumes/Shayan Zaheer - Resume.pdf");

// resume.parseToJSON()
// .then(data => {
//     console.log('Yay! ', data);
// })
// .catch(error => {
//     console.error(error);
// });
