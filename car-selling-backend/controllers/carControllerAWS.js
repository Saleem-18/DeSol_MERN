// const Car = require("../models/Car");
// const multer = require("multer");
// const AWS = require("aws-sdk");
// const path = require("path");
// const { v4: uuidv4 } = require("uuid");
// require("dotenv").config();

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// const storage = multer.memoryStorage();
// const upload = multer({ storage }).array("images", 10);

// exports.addCar = (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) return res.status(500).json({ msg: "Image upload failed" });

//     const { model, price, phone, city } = req.body;
//     const imageUrls = [];

//     for (const file of req.files) {
//       const params = {
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Key: `${uuidv4()}${path.extname(file.originalname)}`,
//         Body: file.buffer,
//         ContentType: file.mimetype,
//       };

//       try {
//         const data = await s3.upload(params).promise();
//         imageUrls.push(data.Location);
//       } catch (err) {
//         return res.status(500).json({ msg: "Image upload to S3 failed" });
//       }
//     }

//     try {
//       const newCar = new Car({
//         model,
//         price,
//         phone,
//         city,
//         images: imageUrls,
//         user: req.user.id,
//       });
//       await newCar.save();
//       res.json(newCar);
//     } catch (err) {
//       res.status(500).json({ msg: "Server error" });
//     }
//   });
// };
