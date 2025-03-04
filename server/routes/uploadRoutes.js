const express = require("express");
const multer = require("multer");
const { uploadStudents } = require("../controllers/uploadController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadStudents);

module.exports = router;
