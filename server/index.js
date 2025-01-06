require("dotenv").config({ path: "./.env" });
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const configurePassport = require("./utils/passport");

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
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

const PORT = process.env.PORT;

const messageRoute = require("./routes/messageRoute");
const adminRoute = require("./routes/adminRoute");
const authRoute = require("./routes/authRoute");

app.use(morgan("dev"));

app.use("/webhook", messageRoute);
app.use("/admin", adminRoute);
app.use("/auth", authRoute);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

module.exports = app;