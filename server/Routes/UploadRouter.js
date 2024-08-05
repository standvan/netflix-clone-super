const express = require("express");
const multer = require("multer");
const path = require("path");
const bucket = require("../config/firebaseConfig");
const v4 = require("uuid-v4");

const UploadRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

UploadRouter.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (file) {
      const filename = `${v4()}${path.extname(file.originalname)}`;
      const blob = bucket.file(filename);
      const blobStream = blob.createWriteStream({
        resumable: false,
        metedata: {
          contentType: file.mimetype,
        },
      });
      blobStream.on("error", (error) => {
        res.status(400).json({ message: error.message });
      });
      blobStream.on("finish", async () => {
        const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${blob.name}?alt=media`;
        res.json(url);
      });
      blobStream.end(file.buffer);
    } else {
      res.status(400).json({ message: "Please upload a file" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = UploadRouter;
