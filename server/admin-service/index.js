require("dotenv").config({ path: "../.env" });
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const { channelPromise } = require("../shared-utils/rabbitmq");
const axios = require("axios");
const pdfParse = require('pdf-parse');
const { dynamicResponse } = require("../shared-utils/gemini");
const adminRoute = require("./routes/adminRoute");
const authRoute = require("./routes/authRoute");
const Applicant = require("./models/applicant");
const Job = require("./models/job");

const app = express();
const configurePassport = require("./utils/passport");

app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configurePassport(app);

mongoose
    .connect(process.env.CONN_STR, {})
    .then((conn) => {
        console.log("DB Connected!");
    })
    .catch((error) => {
        console.log(error);
    });

const PORT = process.env.PORT_ONE;

channelPromise.then((channel) => {
    channel.consume("resumes_queue", async (data) => {
        try{
            const { appliedJobTitle, appliedJobDescription, resumeLink } = JSON.parse(data.content);
            const selectedJob = await Job.findOne({title: appliedJobTitle});
            console.log({ appliedJobTitle, appliedJobDescription, resumeLink })

            const response = await axios.get(resumeLink, { responseType: 'arraybuffer' });
            const dataBuffer = Buffer.from(response.data);
            
            const pdfData = await pdfParse(dataBuffer);
            console.log(pdfData.text);

            // const { score, description } = await getSimilarity(pdfData?.text);

            const res = await dynamicResponse(
                "You are being given a parsed resume, a job description. You have to score if the resume fits the job description best. You have to justify the similarity and also tell if there is anything lacking.",
                `Resume: ${pdfData?.text}\n\nJob Description: ${appliedJobDescription}. Give data in this format.

                    {
                        "score": <score>,
                        "goodPoints": [],
                        "improvementAreas": [],
                        "candidateName" : <name>,
                        "jobTitle": <job>,
                        "candidateEmail": <email if its given in resume, else null>
                    }

                    Ensure the response is **only** valid JSON with no extra characters, no Markdown, no explanations, and no additional formatting.
                `
            );

            const applicant = res?.response;
            const cleanedRes = applicant.replace(/```json|```/g, "").trim();
            const { score, goodPoints, improvementAreas, candidateName, candidateEmail } = JSON.parse(cleanedRes);

            const newApplicant = new Applicant({
                name: candidateName,
                job: selectedJob._id,
                email: candidateEmail,
                resumeLink,
                goodPoints,
                improvementAreas,
                score,
            });

            await newApplicant.save();
            console.log(newApplicant);

            channel.ack(data);
        } catch(err){
            console.error(err.message);
        }
    })
});

app.use(morgan("dev"));

app.use("/admin", adminRoute);
app.use("/auth", authRoute);

app.listen(PORT, () => {
    console.log(`Admin-Service is running on PORT ${PORT}`);
});

module.exports = { channelPromise };
