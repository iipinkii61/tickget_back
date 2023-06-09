module.exports = (sequelize, DataTypes) => {
  const Zone = sequelize.define(
    "Zone",
    {
      zoneName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      seatNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { underscored: true }
  );

  Zone.associate = (db) => {
    Zone.belongsTo(db.Venue, {
      foreignKey: {
        name: "venueId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Zone.belongsTo(db.Booking, {
      foreignKey: {
        name: "bookingId",
      },
      onDelete: "RESTRICT",
    });
  };

  return Zone;
};
