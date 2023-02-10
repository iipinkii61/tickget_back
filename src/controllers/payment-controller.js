const { Payment } = require("../models");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

exports.updatePayment = async (req, res, next) => {
  try {
    const value = { picture: req.file?.path };

    if (value) {
      value.picture = await cloudinary.upload(value.picture);
    }

    value.bookingId = req.params.bookingId; // เพิ่ม key ที่เป็น userId ไปในตัวแปร value ด้วย

    const payment = await Payment.update(value, {
      where: { bookingId: req.params.bookingId },
    });
    // value = { picture, bookingId }
    console.log(req.file);
    res.status(201).json({ payment });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};
