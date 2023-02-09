const express = require("express");
const bookingController = require("../controllers/booking-controller");

const router = express.Router();

router.post("/:userId/:eventId/:zoneId", bookingController.createBooking);
router.get("/:bookingId", bookingController.getBooking);
router.get("/:userId", bookingController.getAllBookingById);
router.delete("/:bookingId", bookingController.deleteBooking);

module.exports = router;
