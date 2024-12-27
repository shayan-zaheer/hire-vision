require("dotenv").config({ path: "./.env" });
const express = require("express");

const app = express();
const configurePassport = require("./utils/passport");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configurePassport(app);

const PORT = process.env.PORT;

const messageRoute = require("./routes/messageRoute");
const adminRoute = require("./routes/adminRoute");
const authRoute = require("./routes/authRoute");

app.use("/reply", messageRoute);
app.use("/admin", adminRoute);
app.use("/auth", authRoute);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

module.exports = app;