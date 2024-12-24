require("dotenv").config({path: "./.env"});
const express = require("express");
const app = express();
app.use(express.json());
const PORT = process.env.PORT;

const messageRoute = require("./routes/messageRoute");

app.use('/reply', messageRoute);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})