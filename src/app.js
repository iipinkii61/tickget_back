require("dotenv").config();
const express = require("express");
const cors = require("cors");
const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");
// const { sequelize } = require("./models");

const app = express();

app.use(cors());
app.use(express.json());

app.use(notFoundMiddleware);
app.use(errorMiddleware);

// sequelize.sync({ force: true });

app.listen(8000, () => console.log("server running on port 8000"));
