const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "please provide contact name"],
    },
    email: {
      type: String,
      required: [true, "please provide contact email"],
    },
    PhoneNumber: {
      type: String,
      required: [true, "please provide contact PhoneNumber"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
