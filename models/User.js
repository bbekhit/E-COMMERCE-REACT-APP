const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String
  },
  password: {
    type: String
  },
  name: {
    type: String
  },
  lastname: {
    type: String
  },
  image:{
    type: String
  },
  phone: {
    type: String
  },
  cart: {
    type: Array,
    default: []
  },
  history: {
    type: Array,
    default: []
  },
  favouriteList:{
    type: Array,
    default: []
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  },
  resetToken: {
    type: String
  },
  resetTokenExp: {
    type: Number
  }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
