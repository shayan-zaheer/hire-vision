const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.route("/add-job").post(adminController.addEmbedding);
router.route("/delete-job/:id").delete(adminController.deleteEmbedding);
// router.route("/update-job/:id").put(adminController.updateEmbedding);

router.route("/all-jobs").get(adminController.getAllJobs);
router.route("/applicants").get(adminController.getApplicants);
router.route("/accept-resume/:id").post(adminController.acceptResume);
router.route("/reject-resume/:id").post(adminController.rejectResume);

module.exports = router;