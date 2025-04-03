const nodemailer = require("nodemailer");

function sendEmail({ email, status, applicantName }) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_PASSWORD,
            },
        });

        const subject =
            status === "accepted"
                ? "Congratulations! Job Application Accepted"
                : "Job Application Status: Rejected";

        const message =
            status === "accepted"
                ? `<p>Dear ${applicantName},</p>
                   <p>We are pleased to inform you that your application for the position has been accepted. Welcome to our team!</p>
                   <p>Our HR team will contact you shortly to discuss the next steps.</p>
                   <p>Regards,<br />The Hiring Team</p>`
                : `<p>Dear ${applicantName},</p>
                   <p>Thank you for applying for the position. After careful consideration, we regret to inform you that your application has not been successful this time.</p>
                   <p>We wish you the best in your future endeavors and encourage you to apply for other opportunities with us in the future.</p>
                   <p>Regards,<br />The Hiring Team</p>`;

        const mailConfigs = {
            from: process.env.MY_EMAIL,
            to: email,
            subject: subject,
            html: `
                <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: ${status === "accepted" ? "#28a745" : "#dc3545"};
            color: #fff;
            padding: 10px 0;
            text-align: center;
        }
        .header h1 {
            margin: 0;
        }
        .content {
            padding: 20px;
        }
        .content p {
            font-size: 1.1em;
            color: #333;
        }
        .footer {
            padding: 10px;
            text-align: center;
            color: #aaa;
            font-size: 0.9em;
        }
        .footer p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${status === "accepted" ? "Congratulations!" : "Application Status"}</h1>
        </div>
        <div class="content">
            ${message}
        </div>
        <div class="footer">
            <p>HireVision Corporation LTD.</p>
            <p>NED University of Engineering and Technology</p>
        </div>
    </div>
</body>
</html>
            `,
        };

        transporter.sendMail(mailConfigs, function (error, info) {
            if (err) {
                return reject({
                    status: "failure",
                    message: err.message,
                });
            }

            return resolve({
                status: "success",
                message: "Email sent successfully",
            });
        });
    });
}

module.exports = sendEmail;
