const express = require("express");
const paymentController = require("../controllers/payment-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.patch(
  "/:bookingId",
  upload.single("picture"),
  paymentController.updatePayment
);

module.exports = router;
