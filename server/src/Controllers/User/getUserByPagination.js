const User = require("../../Models/User.model");
const { successCode, failCode, errorCode } = require("../../config/response");

const getUserByPagination = async (req, res) => {
  const { page, limit, keyword, sortBy, sort } = req.query;
  try {
    let query = {};
    if (keyword) {
      query = {
        $or: [
          { username: { $regex: keyword, $options: "i" } },
          { email: { $regex: keyword, $options: "i" } },
        ],
      };
    }

    const totalUsers = await User.countDocuments(query);
    let skip =
      page && Number(page) > 0 ? (Number(page) - 1) * Number(limit) : 0;

    let sortQuery = {};
    if (sortBy) {
      sortQuery[sortBy] = sort === "desc" ? -1 : 1;
    }

    const result = await User.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(Number(limit))
      .select("-password")
      .populate("role", "name");

    if (result.length === 0) {
      failCode(res, "Users not found!");
    } else {
      const pageCount = Math.ceil(totalUsers / Number(limit));
      successCode(
        res,
        {
          page: Number(page) || 1,
          limit: Number(limit),
          totalRow: totalUsers,
          pageCount,
          result,
        },
        "Get users successfully!"
      );
    }
  } catch (error) {
    errorCode(res, "Backend error!");
  }
};

module.exports = {
  getUserByPagination,
};
