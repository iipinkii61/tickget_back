const createError = require("../utils/create-error");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

const { Venue, Zone, Event } = require("../models");

exports.createVenue = async (req, res, next) => {
  try {
    const value = req.body;
    await Venue.create(value);
    res.status(200).json({ message: "success create value" });
  } catch (err) {
    next(err);
  }
};

exports.createZone = async (req, res, next) => {
  try {
    // หาก่อนว่า venueId ที่ส่งมามันถูกมั้ย
    const venue = await Venue.findOne({ where: { id: req.params.venueId } });
    if (!venue) {
      createError("this venue was not found", 400);
    }
    const value = req.body;
    value.venueId = req.params.venueId;
    await Zone.create(value);
    res.status(200).json({ message: "success create value" });
  } catch (err) {
    next(err);
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    // หาก่อนว่า venueId ที่ส่งมามันถูกมั้ย
    const venue = await Venue.findOne({ where: { id: req.params.venueId } });
    const image = await cloudinary.upload(req.file.path);
    if (!venue) {
      createError("this venue was not found", 400);
    }
    // const value = req.body;

    // value.venueId = req.params.venueId;
    // console.log(req.body);
    await Event.create({
      name: req.body.name,
      dateTime: req.body.dateTime,
      venueId: req.params.venueId,
      picture: image,
    });
    res.status(200).json({ message: "success create value" });
    // res.status(200).json({ image });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};
