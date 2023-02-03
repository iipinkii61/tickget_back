const { User } = require("../models");
const {
  validateRegister,
  validateLogin,
} = require("../validators/auth-validator");
const { Op } = require("sequelize");
const createError = require("../utils/create-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

////////////////////////////// REGISTER ///////////////////////////////////

exports.register = async (req, res, next) => {
  try {
    const value = validateRegister(req.body);

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: value.email || "" }, { mobile: value.mobile || "" }],
        // SELECT * FROM users WHERE email = value.email OR mobile = value.mobile
      },
    });
    if (user) {
      createError("email or mobile is already in use", 400);
    }

    value.password = await bcrypt.hash(value.password, 12);
    await User.create(value);
    res
      .status(201)
      .json({ message: "register success. please login to continue" });
  } catch (err) {
    next(err);
  }
};

////////////////////////////////// LOGIN ////////////////////////////////////////

exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);
    // SELECT * from users WHERE email = value.emailOrMobile OR mobile = value.emailOrMobile

    // check email/mobile
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: value.emailOrMobile },
          { mobile: value.emailOrMobile },
        ],
      },
    });
    if (!user) {
      createError("invalid email or mobile or password", 400);
    }

    // check password
    const isCorrect = await bcrypt.compare(value.password, user.password);
    if (!isCorrect) {
      createError("invalid email or mobile or password", 400);
    }
    // if pw is correct then add token
    const accessToken = jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
        profileImage: user.profileImage,
        coverImage: user.coverImage,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

////////////////////////////////// GETME ////////////////////////////////////////
exports.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};
