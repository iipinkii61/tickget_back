module.exports = (sequelize, DataTypes) => {
  const Zone = sequelize.define(
    "Zone",
    {
      seatNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pricePerZone: {
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
  };

  return Zone;
};
