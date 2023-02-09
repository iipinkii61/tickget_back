const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // cb(error obj, path) ก็คือไม่มี error
  },
  filename: (req, file, cb) => {
    // cb ไม่มี error เหมือนกัน
    cb(
      null,
      new Date().getTime() +
        "" +
        Math.round(Math.random() * 1000000000) +
        "." +
        file.mimetype.split("/")[1]
      // ตั้งชื่อรูปให้แบบมีนามสกุล เช่น image: 1233423423.jpeg
    );
  },
});

module.exports = multer({ storage });
