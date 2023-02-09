const express = require("express");
const paymentController = require("../controllers/payment-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/", upload.single("picture"), paymentController.createPayment);

module.exports = router;
