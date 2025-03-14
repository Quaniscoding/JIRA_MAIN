const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskTypeModelSchema = new Schema(
  {
    id: {
      type: Number,
      require: true,
      unique: true,
    },
    name: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);
const TaskType = mongoose.model("taskType", TaskTypeModelSchema);
module.exports = TaskType;
