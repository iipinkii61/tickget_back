module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      status: {
        type: DataTypes.ENUM("PENDING", "SUCCESS", "CANCELLED"),
        allowNull: false,
        dafaultValue: "PENDING",
      },
      picture: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  );

  Payment.associate = (db) => {
    Payment.hasOne(db.Booking, {
      foreignKey: {
        name: "paymentId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Payment;
};
