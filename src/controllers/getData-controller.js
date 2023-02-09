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
