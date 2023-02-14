const express = require("express");
const addDataController = require("../controllers/addData-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

// เป็นส่วนของ admin (ทำหน้า ui ไม่ทันแล้วววววว)

router.post("/venue", addDataController.createVenue);
router.post("/zone/:venueId", addDataController.createZone);
router.post(
  "/event/:venueId",
  upload.single("picture"),
  addDataController.createEvent
);
router.patch("/event/:eventId", addDataController.updateEventStatus);
router.patch("/payment/:paymentId", addDataController.updatePaymentStatus);

module.exports = router;
