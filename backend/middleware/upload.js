// middleware/upload.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure 'uploads/staff' directory exists
const uploadDir = path.join(__dirname, "../uploads/staff");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
