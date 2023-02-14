const express = require("express");
const getDataController = require("../controllers/getData-controller");

const router = express.Router();

router.get("/event", getDataController.getAllEvent);
router.get("/event/:eventId", getDataController.getEventById);
router.get("/zone/:venueId", getDataController.getZone);
router.get("/zones/:zoneId", getDataController.getZoneById);
router.get("/zoneName/:zoneName", getDataController.getZoneByName);

module.exports = router;
