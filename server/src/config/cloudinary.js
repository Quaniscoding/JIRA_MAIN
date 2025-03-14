const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Hàm tạo storage động theo folder
const createStorage = (folder) =>
  new CloudinaryStorage({
    cloudinary,
    params: (req, file) => {
      if (file.fieldname === "trailer") {
        return {
          folder: folder,
          allowedFormats: ["mp4", "mov", "avi", "wmv", "flv", "webm", "mkv"],
          resource_type: "video",
          transformation: [{ fetch_format: "mp4" }],
        };
      } else {
        return {
          folder: folder,
          allowedFormats: ["jpg", "png", "jpeg", "webp"],
          resource_type: "image",
          transformation: [{ quality: "auto", fetch_format: "webp" }],
        };
      }
    },
  });

// Hàm tạo middleware upload cho từng loại hình ảnh
const uploadCloud = (folder) => multer({ storage: createStorage(folder) });

module.exports = { cloudinary, uploadCloud };
