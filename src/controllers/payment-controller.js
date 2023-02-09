const { Payment } = require("../models");

exports.createPayment = (req, res, next) => {
  try {
    res.status(200).json();
  } catch (err) {
    next(err);
  }
};

// exports.createPayment = async (req, res, next) => {
//   try {
//     const value = validateCreatePost({
//       title: req.body.title,
//       image: req.file?.path,
//     });

//     if (value.image) {
//       value.image = await cloudinary.upload(value.image);
//     }

//     value.userId = req.user.id; // เพิ่ม key ที่เป็น userId ไปในตัวแปร value ด้วย

//     const post = await Post.create(value);

//     res.status(201).json({ post });
//   } catch (err) {
//     next(err);
//   } finally {
//     if (req.file) {
//       fs.unlinkSync(req.file.path);
//     }
//   }
// };
