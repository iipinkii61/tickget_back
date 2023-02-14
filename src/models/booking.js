module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
    {
      quantity: {
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );
  Booking.associate = (db) => {
    Booking.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Booking.belongsTo(db.Event, {
      foreignKey: {
        name: "eventId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Booking.hasOne(db.Payment, {
      foreignKey: {
        name: "bookingId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Booking.hasMany(db.Zone, {
      foreignKey: {
        name: "bookingId",
      },
      onDelete: "RESTRICT",
    });
  };
  return Booking;
};
