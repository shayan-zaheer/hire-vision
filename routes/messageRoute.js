const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.route("/").post(messageController.replyMessage);

module.exports = router;