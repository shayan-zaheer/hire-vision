const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.route("/").get(messageController.receiveMessage).post(messageController.sendMessage);

module.exports = router;