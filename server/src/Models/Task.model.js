const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  id: {
    type: Number,
    require: true,
    unique: true
  },
  userId: {
    type: Number,
    ref: "User",
    required: true,
  },
  contentComment: {
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
});

const TaskSchema = new Schema(
  {
    id: {
      type: Number,
      require: true,
      unique: true
    },
    listUserAssign: [{ type: Object, ref: "User" }],
    taskName: { type: String, required: true },
    description: { type: String },
    statusId: { type: Object, ref: "Status" },
    originalEstimate: { type: Number, required: true },
    timeTrackingSpent: { type: Number },
    timeTrackingRemaining: { type: Number },
    projectId: { type: Number, ref: "Project", required: true },
    reporterId: { type: Number, ref: "User" },
    typeId: { type: Object, ref: "TaskType" },
    priorityId: { type: Object, ref: "Priority" },
    listComment: [CommentSchema],
  },
  {
    versionKey: false, // Disable the "__v" field
  }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
