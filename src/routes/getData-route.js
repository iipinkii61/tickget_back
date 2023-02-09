const express = require("express");
const getDataController = require("../controllers/getData-controller");

const router = express.Router();

router.get("/event", getDataController.getAllEvent);

module.exports = router;
