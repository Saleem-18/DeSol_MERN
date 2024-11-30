const Car = require("../models/Car");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage }).array("images", 10);

exports.addCar = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ msg: "Image upload failed" });

    const { model, price, phone, city } = req.body;
    const images = req.files.map((file) => file.path);

    try {
      const newCar = new Car({
        model,
        price,
        phone,
        city,
        images,
        user: req.user.id,
      });
      await newCar.save();
      res.json(newCar);
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  });
};
