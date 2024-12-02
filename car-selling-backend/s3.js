// const AWS = require("aws-sdk");
require("dotenv").config();

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// module.exports = s3;

// Backend - S3 upload function
const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.AWS_REGION });

const s3 = new AWS.S3();

exports.uploadToS3 = async (file, bucketName, key) => {
  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: process.env.AWS_ACCESS_KEY_ID,
      Body: file,
      ContentType: file.mimetype, // Ensure correct Content-Type
    };

    const uploadResult = await s3.upload(params).promise();
    console.log("Upload Success:", uploadResult);
    return uploadResult;
  } catch (err) {
    console.error("S3 Upload Error:", err.message);
    throw new Error("Error uploading to S3");
  }
};
