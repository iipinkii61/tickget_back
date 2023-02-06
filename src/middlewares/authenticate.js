const createError = require("../utils/create-error");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      createError("You are unauthorized", 401);
    }
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, "thisisSecretKey");
    // payload = {id, firstName, lastName, password, idCardNumber, (email, mobile)}
    const user = await User.findOne({
      where: { id: payload.id },
      attributes: {
        exclude: ["password"],
      },
    });
    if (!user) {
      createError("You are unauthorized", 401);
    }
    req.user = user; // ถ้าหาเจอให้ assign req.user ไปที่ user
    next();
  } catch (err) {
    next(err);
  }
};
