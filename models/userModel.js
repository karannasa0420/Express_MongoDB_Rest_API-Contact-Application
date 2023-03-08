const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please provide user name"],
    },
    email: {
      type: String,
      required: [true, "please provide user email"],
      unique: [true, "email already taken"],
    },
    password: {
      type: String,
      required: [true, "please provide your password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
