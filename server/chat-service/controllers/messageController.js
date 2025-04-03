const axios = require("axios");
const { retrieveVectors } = require("../../shared-utils/pinecone");
const { dynamicResponse } = require("../../shared-utils/gemini");
const { fetchAndUploadFile } = require("../../shared-utils/multer");
const { channelPromise } = require("../../shared-utils/rabbitmq");
const { client } = require("../../shared-utils/redis");

const processedMessageIds = new Set();

exports.sendMessage = async (request, response) => {
    const message = request.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    const messageId = message?.id;

    if (processedMessageIds.has(messageId)) {
        console.log("Duplicate message detected, skipping processing");
        // return response.sendStatus(200);
    }

    processedMessageIds.add(messageId);

    const business_phone_number_id =
        request.body.entry?.[0]?.changes?.[0]?.value?.metadata?.phone_number_id;

    if (!business_phone_number_id) {
        return response.status(400).send("Missing phone number ID");
    }

    let res = null;

    try {
        if (message?.type === "text") {
            let messageContent = message?.text?.body;

            if (messageContent === "Hi" || messageContent === "Hello") {
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
                const result = await retrieveVectors(
                    message?.interactive?.button_reply?.title
                );

                const queryResult = result.map((job, index) => ({
                    id: job.id,
                    title: job.metadata.title || `Job ${index + 1}`,
                    description: job.metadata.description || `Job ${index + 1}`
                }));

                await client.set(message.from, JSON.stringify(queryResult), "EX", 3600);

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
            if (listReply) {
                const selectedJob = listReply?.title;

                const storedJobs = await client.get(message.from);
                const queryResult = storedJobs ? JSON.parse(storedJobs) : [];
                const selectedDescription = queryResult.find((job) => job.title === selectedJob)?.description;

                await client.set(
                    `${message.from}_selectedJob`,
                    JSON.stringify({ title: selectedJob, description: selectedDescription }),
                    "EX",
                    3600
                );

                res = {
                    messaging_product: "whatsapp",
                    to: message.from,
                    type: "text",
                    text: {
                        body: `Here are the details for the selected job:\n\n${selectedJob}\n\n${selectedDescription}`,
                    },
                };
            }
        } else if (message?.type === "document") {
            const fileId = message?.document?.id;
            let resume = await client.get(`${message.from}_selectedJob`);
            let { title: selectedJob, description: selectedDescription } = JSON.parse(resume);

            fetchAndUploadFile(fileId)
                .then((url) => {
                    return channelPromise.then((channel) => {
                        channel.sendToQueue(
                            "resumes_queue",
                            Buffer.from(
                                JSON.stringify({
                                    appliedJobTitle: selectedJob,
                                    appliedJobDescription: selectedDescription,
                                    resumeLink: url,
                                })
                            ),
                            {
                                persistent: true,
                            }
                        );
                        console.log("Message sent to resumes_queue:", {
                            resumeLink: url,
                        });
                    });
                })
                .catch((error) => {
                    console.error("Error processing document:", error);
                });

            res = {
                messaging_product: "whatsapp",
                to: message.from,
                type: "text",
                text: {
                    body: "We have received your resume, and will get back to you as soon as possible. 😊",
                },
            };
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

        return response.sendStatus(200);
    } catch (error) {
        console.error("ERROR:\n", error);
        return response.status(500).json({
            status: "failure",
            message: error.message,
            stack: error.stack,
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
