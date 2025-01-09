const multer = require("multer");

const multerUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const profileImg = multerUpload.single("profileImg");

module.exports = { multerUpload, profileImg };
