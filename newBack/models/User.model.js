const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdBy: { type: String, default: "System" },
  updatedBy: { type: String, default: "System" },
});

module.exports = mongoose.model("UserModel", userSchema);
