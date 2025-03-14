const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    listUserAssign: [{ type: Schema.Types.ObjectId, ref: "user" }],
    taskName: { type: String, required: true },
    description: { type: String },
    status: { type: Schema.Types.ObjectId, ref: "Status", required: true },
    originalEstimate: { type: Number },
    timeTrackingSpent: { type: Number },
    timeTrackingRemaining: { type: Number },
    project: { type: Schema.Types.ObjectId, ref: "project", required: true },
    reporter: { type: Schema.Types.ObjectId, ref: "user" },
    type: { type: Schema.Types.ObjectId, ref: "taskType" },
    priority: { type: Schema.Types.ObjectId, ref: "priority" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
