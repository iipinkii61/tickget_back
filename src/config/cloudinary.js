const cloudinary = require("cloudinary").v2;

cloudinary.config({
  secure: true,
  cloud_name: "dsygopwjc",
  api_key: "226141475867491",
  api_secret: "DJ3eXj4xjhgDUgY7TstFIHPIuFE",
});

module.exports = cloudinary;
