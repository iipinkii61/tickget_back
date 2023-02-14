const { Venue, Zone, Event } = require("../models");

exports.getAllEvent = async (req, res, next) => {
  try {
    const events = await Event.findAll({
      include: [
        {
          model: Venue,
        },
      ],
    });
    res.status(200).json({ events });
  } catch (err) {
    next(err);
  }
};

exports.getEventById = async (req, res, next) => {
  try {
    const events = await Event.findOne({
      where: {
        id: req.params.eventId,
      },
      include: {
        model: Venue,
      },
    });
    res.status(200).json({ events });
  } catch (err) {
    next(err);
  }
};

exports.getZone = async (req, res, next) => {
  try {
    const zone = await Zone.findAll({ where: { venueId: req.params.venueId } });
    res.status(200).json({ zone });
  } catch (err) {
    next(err);
  }
};

exports.getZoneById = async (req, res, next) => {
  try {
    const zone = await Zone.findOne({
      where: {
        id: req.params.zoneId,
      },
    });
    res.status(200).json({ zone });
  } catch (err) {
    next(err);
  }
};

exports.getZoneByName = async (req, res, next) => {
  try {
    const zone = await Zone.findAll({
      where: {
        zoneName: req.params.zoneName,
      },
    });
    res.status(200).json({ zone });
  } catch (err) {
    next(err);
  }
};
