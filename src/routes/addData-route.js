const express = require("express");
const addDataController = require("../controllers/addData-controller");

const router = express.Router();

router.post("/venue", addDataController.createVenue);
router.post("/zone/:venueId", addDataController.createZone);
router.post("/event/:venueId", addDataController.createEvent);

module.exports = router;
