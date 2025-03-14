const Project = require("../../Models/Project.model");
const {
  successCode,
  failCode,
  errorCode,
  errorCodeNew,
} = require("../../config/response");

const getProjectByPagination = async (req, res) => {
  const { pageIndex, pageSize, keyword, sort, sortBy } = req.query;

  try {
    if (!pageSize || isNaN(Number(pageSize)) || Number(pageSize) <= 0) {
      errorCodeNew(res, "Kích thước trang phải là số dương lớn hơn 0.");
      return;
    }

    // Xây dựng query tìm kiếm
    let query = {};
    if (keyword) {
      query = {
        $or: [{ projectName: { $regex: keyword, $options: "i" } }],
      };
    }

    const totalProjects = await Project.countDocuments(query);
    let skip = (Number(pageIndex) - 1) * Number(pageSize) || 0;

    // Xây dựng query sắp xếp, mặc định sắp xếp theo ngày tạo mới nhất
    let sortQuery = { createdAt: -1 };
    if (sortBy) {
      const sortDirection = sort && sort.toLowerCase() === "desc" ? -1 : 1;
      sortQuery = { [sortBy]: sortDirection };
    }

    // Lấy dữ liệu từ database
    const result = await Project.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(Number(pageSize))
      .populate("category")
      .populate("creator", "username _id")
      .populate("members", "username _id");

    const pageCount = Math.ceil(totalProjects / Number(pageSize));

    successCode(
      res,
      {
        pageIndex,
        pageSize,
        totalRow: totalProjects,
        pageCount,
        result,
      },
      "Lấy danh sách dự án thành công!"
    );
  } catch (error) {
    errorCode(res, "Backend error!");
  }
};

module.exports = {
  getProjectByPagination,
};
