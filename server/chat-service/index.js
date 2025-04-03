require("dotenv").config({ path: "../.env" });
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { channelPromise } = require('../shared-utils/rabbitmq');
const messageRoute = require("./routes/messageRoute");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
    .connect(process.env.CONN_STR, {})
    .then((conn) => {
        console.log("DB Connected!");
})
    .catch((error) => {
        console.log(error);
});

const PORT = process.env.PORT_TWO;

app.use(morgan("dev"));

app.use("/webhook", messageRoute);

app.listen(PORT, () => {
    console.log(`Chat-Service is running on PORT ${PORT}`);
});

module.exports = { channelPromise };
