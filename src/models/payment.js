module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      status: DataTypes.STRING,
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
