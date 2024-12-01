const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  id: {
    type: Number,
    require: true,
    unique: true
  },
  userId: {
    type: Schema.Types.ObjectId,
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
    listUserAssign: [{ type: Schema.Types.ObjectId, ref: "User" }],
    taskName: { type: String, required: true },
    description: { type: String },
    statusId: { type: Schema.Types.ObjectId, ref: "Status" },
    originalEstimate: { type: Number, required: true },
    timeTrackingSpent: { type: Number },
    timeTrackingRemaining: { type: Number },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    reporterId: { type: Schema.Types.ObjectId, ref: "User" },
    typeId: { type: Schema.Types.ObjectId, ref: "TaskType" },
    priorityId: { type: Schema.Types.ObjectId, ref: "Priority" },
    listComment: [CommentSchema],
  },
  {
    versionKey: false, // Disable the "__v" field
  }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
