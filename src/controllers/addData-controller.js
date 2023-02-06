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
    if (!venue) {
      createError("this venue was not found", 400);
    }
    const value = req.body;
    value.venueId = req.params.venueId;
    await Event.create(value);
    res.status(200).json({ message: "success create value" });
  } catch (err) {
    next(err);
  }
};
