// const cloudinary = require("../config/cloudinary");

// exports.upload = async (filePath, publicId) => {
//   const option = {
//     unique_filename: false, //ให้ cloudinary gen ชื่อให้อีกมั้ย (ไม่ต้องเพราะเรา set ของเราแล้ว)
//     use_filename: true,
//     overwrite: true, // อัพโหลดซ้ำๆๆกัน 10 รอบแต่ก็จะได้รูปเดียว ไม่เปลืองพื้นที่
//   };

//   if (publicId) {
//     option.public_id = publicId;
//   }

//   const result = await cloudinary.uploader.upload(filePath, option);
//   return result.secure_url;
// };

// exports.getPublicId = (url) => {
//   const splitSlash = url.split("/");
//   return splitSlash[splitSlash.length - 1].split(".")[0];
// };
