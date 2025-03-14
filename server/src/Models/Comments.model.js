const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    content: {
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const Comment = mongoose.model("comment", CommentSchema);
module.exports = Comment;
