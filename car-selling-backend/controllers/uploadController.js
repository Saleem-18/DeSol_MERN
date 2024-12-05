const multer = require("multer");
const s3 = require("../s3");
require("dotenv").config();

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("file");

exports.uploadFile = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ msg: "Image upload failed" });

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `${Date.now()}-${req.file.originalname}`,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    try {
      const data = await s3.upload(params).promise();
      res.json({ url: data.Location });
    } catch (err) {
      res.status(500).json({ msg: "Error uploading to S3" });
    }
  });
};
