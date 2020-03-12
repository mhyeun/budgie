const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the shape of a user within this collection

const userSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 10
    },
    password: {
      type: String,
      required: true,
      unique: true,
      trim: false,
      minlength: 3,
      maxlength: 10
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
