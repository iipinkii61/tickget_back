const express = require("express");
const getDataController = require("../controllers/getData-controller");

const router = express.Router();

router.get("/event", getDataController.getAllEvent);
router.get("/event/:eventId", getDataController.getEventById);

module.exports = router;
