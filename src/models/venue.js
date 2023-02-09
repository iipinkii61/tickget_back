module.exports = (sequelize, DataTypes) => {
  const Venue = sequelize.define(
    "Venue",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { underscored: true }
  );

  Venue.associate = (db) => {
    Venue.hasMany(db.Event, {
      foreignKey: {
        name: "venueId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Venue.hasMany(db.Zone, {
      foreignKey: {
        name: "venueId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return Venue;
};
