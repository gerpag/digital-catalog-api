const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  salt: {
    type: String,
    required: true,
    select: false,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
});
userSchema.methods.setPassword = async function (password) {
  const salt = bcrypt.genSaltSync(8);
  this.salt = salt;
  this.password = await bcrypt.hash(password, this.salt);
};

userSchema.methods.validPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
