const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

exports.replyMessage = async(request, response) => {
    return new Promise((resolve, reject) => {
        console.log(request.body.Body);
        var messageToSend = "";

        if(req.body.Body == "hi"){
            messageToSend = "Hello there, how can I assist you?";
        } else {
            messageToSend = `Hello ${req.body.Body}, How are you! Let me know how can I assist you?`;
        }
        
        client.messages.create({
            body: messageToSend,
            from: "whatsapp:+14155238886",
            to: "whatsapp:+923353799213"
        })
        .then(message => {
            console.log(message.sid);
            resolve(message.id);
        })
        .catch(err => {
            console.error(err);
            reject(err);
        });
    })
}