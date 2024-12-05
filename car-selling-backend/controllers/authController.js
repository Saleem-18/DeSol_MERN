const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email, password);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    console.log("Plain text password:", password);
    console.log("Password from DB:", user.password);

    const isMatch = password === user.password;
    console.log("Password comparison result:", isMatch);

    if (!isMatch) {
      console.log("Password does not match");
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("Login successful");
    res.json({ token });
  } catch (err) {
    console.log("Server error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
