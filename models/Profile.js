const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
   name: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
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
});

const Profile= mongoose.model("Profile", profileSchema);

module.exports = { Profile};
