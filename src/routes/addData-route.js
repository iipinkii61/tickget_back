const express = require("express");
const addDataController = require("../controllers/addData-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/venue", addDataController.createVenue);
router.post("/zone/:venueId", addDataController.createZone);
router.post(
  "/event/:venueId",
  upload.single("picture"),
  addDataController.createEvent
);
// router.patch("/event/:eventId", addDataController.uploadPicEvent);

module.exports = router;
