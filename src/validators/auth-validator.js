const Joi = require("joi");
const validate = require("./validate"); // also from joi?

////////////////////////////// REGISTER ///////////////////////////////////

const registerSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    "string.empty": "first name is required",
    "any.required": "first name is required", // ถ้าไม่ได้ส่ง key ไรเข้ามาเลย
    "string.base": "first name must be a string",
  }),
  lastName: Joi.string().trim().required().messages({
    "string.empty": "last name is required",
    "any.required": "last name is required", // ถ้าไม่ได้ส่ง key ไรเข้ามาเลย
    "string.base": "last name must be a string",
  }),
  emailOrMobile: Joi.alternatives()
    .try(
      Joi.string().email({ tlds: false }),
      Joi.string().pattern(/^[0-9]{10}$/)
    )
    .messages({
      "alternatives.match": "must be a valid email address or mobile number",
    })
    .strip(), // if validate complete จะตัดต่านี้ออกไป ไม่ส่งมากับ schema ด้วย

  idCardNumber: Joi.string().length(13).trim().required().messages({
    "string.empty": "idCardNumber is required",
    "any.required": "idCardNumber is required", // ถ้าไม่ได้ส่ง key ไรเข้ามาเลย
    "string.length": "idCardNumber must be 13 characters long",
  }),

  password: Joi.string().alphanum().min(6).required().trim().messages({
    "string.empty": "password is required",
    "any.required": "password is required", // ถ้าไม่ได้ส่ง key ไรเข้ามาเลย
    "string.alphanum": "password must be a number or alphabet",
    "string.min": "password must have at lest 6 characters",
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .trim()
    .messages({
      "any.only": "password and confirm did not match",
      "any.required": "confirm password is required", // ถ้าไม่ได้ส่ง key ไรเข้ามาเลย
      "string.empty": "confirm password is required",
    })
    .strip(), // if validate complete จะตัดต่านี้ออกไป ไม่ส่งมากับ schema ด้วย
  email: Joi.string()
    .forbidden() // ก็คือใส่ forbidden all ไปก่อน แล้วค่อยดูเงื่อนไขถ้ามันเข้าเงื่อนไข key มันก็จะถูกเพิ่มมาเอง
    .when("emailOrMobile", {
      is: Joi.string().email({ tlds: false }),
      then: Joi.string().default(Joi.ref("emailOrMobile")),
      // ถ้า emailormobile เป็น email ให้เรฟค่า email ไปที่ emailormobile
    }),
  mobile: Joi.forbidden().when("emailOrMobile", {
    is: Joi.string().pattern(/^[0-9]{10}$/),
    then: Joi.string().default(Joi.ref("emailOrMobile")),
  }),
});

// เพิ่ม validate id card number

exports.validateRegister = validate(registerSchema);

////////////////////////////////// LOGIN ////////////////////////////////////////

const loginSchema = Joi.object({
  emailOrMobile: Joi.string().required(),
  password: Joi.string().required(),
});
exports.validateLogin = validate(loginSchema);

//////////////////////////////////////////////////////////////////////////
