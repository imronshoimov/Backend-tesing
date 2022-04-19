const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: String,
});

module.exports = mongoose.model("User", UserSchema);
