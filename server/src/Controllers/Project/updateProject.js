const { failCode, successCode } = require("../../config/response");
const Project = require("../../Models/Project.model");

const updateProject = async (req, res) => {
  try {
    const id = req.params.id;
    const { projectName, description, categoryId, alias, creator, members } =
      req.body;

    // Kiểm tra project có tồn tại không
    const project = await Project.findById(id);
    if (!project) {
      return failCode(res, "", "Dự án không tồn tại !");
    }

    let updateFields = {}; // Chỉ cập nhật trường nào được gửi

    // Kiểm tra nếu chỉ cập nhật members
    if (members) {
      if (!Array.isArray(members)) {
        return failCode(res, "", "Danh sách members không hợp lệ !");
      }
      const newMembers = members.filter(
        (member) => !project.members.includes(member)
      ); // Loại bỏ trùng lặp
      updateFields.members = [...project.members, ...newMembers];
    }

    // Cập nhật toàn bộ dữ liệu nếu có thêm thông tin khác ngoài members
    if (projectName !== undefined) updateFields.projectName = projectName;
    if (description !== undefined) updateFields.description = description;
    if (categoryId !== undefined) updateFields.categoryId = categoryId;
    if (alias !== undefined) updateFields.alias = alias;
    if (creator !== undefined) updateFields.creator = creator;

    // Nếu không có trường nào cần cập nhật, trả về lỗi
    if (Object.keys(updateFields).length === 0) {
      return failCode(res, "", "Không có dữ liệu nào được cập nhật !");
    }

    // Cập nhật dự án
    const updatedProject = await Project.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    successCode(res, updatedProject, "Cập nhật dự án thành công !");
  } catch (error) {
    console.error("Error updating project:", error);
    failCode(res, "Backend error !");
  }
};

module.exports = { updateProject };
