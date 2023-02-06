// const { validateCreatePost } = require("../validators/post-validator");
// const cloudinary = require("../utils/cloudinary");
// const { Post, Friend, User, Like, Comment } = require("../models");
// const fs = require("fs");
// const { FRIEND_ACCEPTED } = require("../config/constant");
// const { Op } = require("sequelize");
// const createError = require("../utils/create-error");

const { Booking } = require("../models");

exports.createBooking = async (req, res, next) => {
  try {
    const value = req.body;

    value.userId = req.params.userId;
    value.eventId = req.params.eventId;

    const booking = await Booking.create(value);

    res.status(201).json({ booking });
  } catch (err) {
    next(err);
  }
};

// exports.getAllPostIncludeFriend = async (req, res, next) => {
//   try {
//     // SELECT * from post where user_id = req.user.id (เอาแค่ post ตัวเอง) OR user_id = friendId1 OR...
//     // SELECT * from post WHERE user_id IN (req.user.id, friendId1, ...)
//     const friends = await Friend.findAll({
//       where: {
//         status: FRIEND_ACCEPTED,
//         [Op.or]: [{ requesterId: req.user.id }, { accepterId: req.user.id }],
//       },
//     });

//     const friendIds = friends.map((el) =>
//       el.requesterId === req.user.id ? el.accepterId : el.requesterId
//     );

//     const posts = await Post.findAll({
//       where: {
//         userId: [req.user.id, ...friendIds],
//       },
//       order: [["updatedAt", "DESC"]],
//       include: [
//         {
//           model: User,
//           attributes: {
//             exclude: ["password"],
//           },
//         },
//         {
//           model: Like,
//           include: {
//             model: User,
//             attributes: {
//               exclude: ["password"],
//             },
//           },
//         },
//         {
//           model: Comment,
//           include: {
//             model: User,
//             attributes: {
//               exclude: ["password"],
//             },
//           },
//         },
//       ],
//     });
//     res.status(200).json({ posts });
//   } catch (err) {
//     next(err);
//   }
// };

// exports.deletePost = async (req, res, next) => {
//   try {
//     const post = await Post.findOne({ where: { id: req.params.postId } });
//     if (!post) {
//       createError("this post was not found", 400);
//     }
//     if (post.userId !== req.user.id) {
//       createError("you have no permission to delete this post", 403);
//     }
//     await post.destroy();
//     res.status(204).json();
//   } catch (err) {
//     next(err);
//   }
// };
