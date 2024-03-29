const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//creating Schema
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, require: true, default: false },
  userName: {type: String, required: true, unique: true  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
