module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      picture: DataTypes.STRING,
      dateTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("SELL", "SOLD_OUT", "COMING_SOON"),
        allowNull: false,
        defaultValue: "COMING_SOON",
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
