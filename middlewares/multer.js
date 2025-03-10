const multer = require("multer");
const AppError = require("../utils/appError");

const imgUploader = multer({
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedImageTypes.includes(file.mimetype)) {
      return cb(
        new AppError(
          "Invalid image file type. Only image files are allowed.",
          400
        ),
        false
      );
    }
    cb(null, true);
  },
});

const profileImg = imgUploader.single("profileImg");
const productImages = imgUploader.array("images", 4);
const logo = imgUploader.single("logo");

module.exports = { profileImg, productImages, logo };
