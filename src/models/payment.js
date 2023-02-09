module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      status: {
        type: DataTypes.ENUM("PENDING", "SUCCESS", "CANCELLED"),
        allowNull: false,
        defaultValue: "PENDING",
      },
      picture: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  );

  Payment.associate = (db) => {
    Payment.belongsTo(db.Booking, {
      foreignKey: {
        name: "bookingId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Payment;
};
