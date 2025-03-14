const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
    },
    birth_day: {
      type: Date,
    },
    gender: {
      type: String,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "role",
    },
    avatar: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("user", UserSchema);
module.exports = User;
