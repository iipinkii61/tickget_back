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

// 1. validate ก่อนว่าค่าที่ user พิมเข้ามาเป็นไงบ้าง ผ่านมั้ย
// 2. ถ้าผ่าน ไป findone ว่าเคยมี email/mobile ที่ register มาก่อนมั้ย
// 3. ถ้ายังไม่เคยมีก็ create value ไปที่ db เลยจ่ะ (แต่อย่าลืม hash password ด้วยนะ)

exports.register = async (req, res, next) => {
  try {
    const value = validateRegister(req.body);
    // value = {firstName, lastName, pw, email/mobile, idcardnum}

    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: value.email || "" },
          { mobile: value.mobile || "" },
          { idCardNumber: value.idCardNumber },
        ],
        // SELECT * FROM users WHERE email = value.email OR mobile = value.mobile
        // ถ้าไม่ได้ส่งค่ามามันจะหาไม่ได้ เลยต้องใส่ default value ให้เป็น '' ด้วย
      },
    });
    if (user) {
      createError("email or mobile or idCardNumber is already in use", 400);
    }

    value.password = await bcrypt.hash(value.password, 12); // เปลี่ยน pw ที่รับเข้ามาให้อยู่ในรูปแบบ hash
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
        idCardNumber: user.idCardNumber,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      "thisisSecretKey",
      {
        expiresIn: "30d",
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
