const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const addUser = async () => {
  const email = "Amjad@desolint.com";
  const password = "123456abc";

  const newUser = new User({
    email,
    password,
  });

  await newUser.save();
  console.log("User added");
  mongoose.disconnect();
};

addUser();
