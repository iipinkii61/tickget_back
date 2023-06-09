const { Booking, Payment, Zone, Event } = require("../models");
const createError = require("../utils/create-error.js");
const { Op } = require("sequelize");

exports.createBooking = async (req, res, next) => {
  // *** create both booking and payment ***
  try {
    const value = req.body;

    value.userId = req.user.id;
    value.eventId = req.params.eventId;

    const booking = await Booking.create(value);
    const payment = await Payment.create({ ["bookingId"]: booking.id });
    const zone = await Zone.update(
      { bookingId: booking.id },
      {
        where: { id: req.params.zoneId, bookingId: null },
      }
    );
    // update booking id where zone id

    res.status(201).json({ booking, payment, zone });
  } catch (err) {
    next(err);
  }
};

exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({
      where: {
        id: req.params.bookingId,
      },
      include: {
        model: Zone,
      },
    });
    res.status(200).json({ booking });
  } catch (err) {
    next(err);
  }
};

exports.getAllBookingById = async (req, res, next) => {
  try {
    //SELECT * FROM bookings
    // LEFT JOIN payments
    // ON bookings.id = payments.booking_id;
    const booking = await Booking.findAll({
      where: {
        userId: req.user.id,
      },
      include: [
        {
          model: Event,
          attributes: {
            exclude: ["status"],
          },
        },
        {
          model: Payment,
          required: false,
        },
      ],
    });
    res.status(200).json({ booking });
  } catch (err) {
    next(err);
  }
};

exports.deleteBooking = async (req, res, next) => {
  try {
    // update zone, delete payment, delete booking
    const booking = await Booking.findOne({
      where: { id: req.params.bookingId },
    });
    const payment = await Payment.findOne({
      where: { bookingId: req.params.bookingId },
    });

    if (booking.userId !== req.user.id) {
      createError("you have no permission to delete this booking", 403);
    }
    if (!booking) {
      createError("this booking was not found", 400);
    } else {
      await Zone.update(
        { bookingId: null },
        { where: { bookingId: req.params.bookingId } }
      );
      await payment.destroy();
      await booking.destroy();
    }

    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
