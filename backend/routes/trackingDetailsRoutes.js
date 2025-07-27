const express = require("express");
const router = express.Router();
const trackingDetailsController = require("../controllers/trackingDetailsController");

router.get("/", trackingDetailsController.getAllTrackingDetails);
router.get("/:id", trackingDetailsController.getTrackingDetailsById);
router.post("/", trackingDetailsController.createTrackingDetails);
router.put("/:id", trackingDetailsController.updateTrackingDetails);
router.delete("/:id", trackingDetailsController.deleteTrackingDetails);

module.exports = router;
