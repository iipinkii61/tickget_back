require("dotenv").config();
const express = require("express");
const cors = require("cors");
const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");
const authenticateMiddliware = require("./middlewares/authenticate");
const authRoute = require("./routes/auth-route");
const addRoute = require("./routes/addData-route");
const bookingRoute = require("./routes/booking-route");
const paymentRoute = require("./routes/payment-route");
const getDataRoute = require("./routes/getData-route");
const { sequelize } = require("./models");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/add", addRoute); // for admin
app.use("/getData", getDataRoute);
app.use("/booking", authenticateMiddliware, bookingRoute); // authen token ก่อนถึงจะ booking ได้
app.use("/payment", authenticateMiddliware, paymentRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

// Booking.sync({ force: true }).then(() => Zone.sync({ force: true }));
// Payment.sync({ force: true });
// sequelize.sync({ force: true });
//   .then(() => Booking.sync({ force: true }))
//   .then(() => Payment.sync({ force: true }))

app.listen(8000, () => console.log("server running on port 8000"));
