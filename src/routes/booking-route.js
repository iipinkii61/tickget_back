const express = require("express");
const bookingController = require("../controllers/booking-controller");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/:eventId/:zoneId", authenticate, bookingController.createBooking);
router.get("/", authenticate, bookingController.getAllBookingById); // get by userId
router.get("/getOne/:bookingId", authenticate, bookingController.getBooking);
router.delete("/:bookingId", authenticate, bookingController.deleteBooking);

module.exports = router;
