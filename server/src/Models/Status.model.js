const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatusSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    statusName: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    alias: {
      type: String,
    },
    order: {
      type: Number,
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "project",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Status = mongoose.model("Status", StatusSchema);
module.exports = Status;
