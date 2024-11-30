const multer = require("multer");
const s3 = require("../s3");
const path = require("path");
const Car = require("../models/Car");
require("dotenv").config();

const storage = multer.memoryStorage();
const upload = multer({ storage }).array("images", 10);

exports.addCar = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ msg: "Image upload failed" });

    const { model, price, phone, city } = req.body;
    const imageUrls = [];

    for (const file of req.files) {
      const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `${Date.now()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      try {
        const data = await s3.upload(params).promise();
        imageUrls.push(data.Location);
      } catch (err) {
        return res.status(500).json({ msg: "Error uploading to S3" });
      }
    }

    try {
      const newCar = new Car({
        model,
        price,
        phone,
        city,
        images: imageUrls,
        user: req.user.id,
      });
      await newCar.save();
      res.json(newCar);
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  });
};
