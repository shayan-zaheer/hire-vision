const express = require("express");
const router = express.Router();

router.route("/add-job").post(adminController.addEmbedding);
router.route("/delete-job/:id").delete(adminController.deleteEmbedding);
router.route("/update-job/:id").put(adminController.updateEmbedding);

module.exports = router;