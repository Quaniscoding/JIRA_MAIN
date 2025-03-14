const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectCategorySchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);
const ProjectCategory = mongoose.model("category", ProjectCategorySchema);
module.exports = ProjectCategory;
