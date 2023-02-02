require("dotenv").config();
const express = require("express");
// const { sequelize } = require("./models");

const app = express();

// sequelize.sync({ force: true });

app.listen(8000, () => console.log("server running on port 8000"));
