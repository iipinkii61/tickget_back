module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      eventName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { underscored: true }
  );
  Event.associate = (db) => {
    Event.hasMany(db.Booking, {
      foreignKey: {
        name: "eventId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Event.belongsTo(db.Venue, {
      foreignKey: {
        name: "venueId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return Event;
};
