const express = require("express");
const bookingController = require("../controllers/booking-controller");

const router = express.Router();

router.post("/:eventId/:userId", bookingController.createBooking);

module.exports = router;
