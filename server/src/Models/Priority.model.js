const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PrioritySchema = new Schema(
  {
    id: {
      type: Number,
      require: true,
      unique: true,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    deleted: {
      type: String,
    },
    alias: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);
const Priority = mongoose.model("priority", PrioritySchema);
module.exports = Priority;
