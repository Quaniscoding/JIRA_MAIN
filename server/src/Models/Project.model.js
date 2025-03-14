const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProjectSchema = new Schema(
  {
    id: {
      type: Number,
      require: true,
      unique: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    alias: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    members: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
