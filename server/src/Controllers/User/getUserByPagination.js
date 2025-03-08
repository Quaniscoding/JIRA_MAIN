const User = require('../../Models/User.model');
const { successCode, failCode, errorCode, errorCodeNew } = require('../../config/reponse');

const getUserByPagination = async (req, res) => {
    const { page, limit, keyword, sortBy, sort } = req.query;
    try {
        if (!limit || isNaN(Number(limit)) || Number(limit) <= 0) {
            errorCodeNew(res, "Kích thước trang phải là số dương lớn hơn 0.");
            return;
        }

        let query = {};
        if (keyword) {
            query = {
                $or: [
                    { username: { $regex: keyword, $options: 'i' } },
                    { email: { $regex: keyword, $options: 'i' } },
                ]
            };
        }

        const totalUsers = await User.countDocuments(query);
        let skip = (page && Number(page) > 0) ? (Number(page) - 1) * Number(limit) : 0;

        let sortQuery = {};
        if (sortBy) {
            sortQuery[sortBy] = sort === 'desc' ? -1 : 1;
        }

        const result = await User.find(query)
            .sort(sortQuery)
            .skip(skip)
            .limit(Number(limit))
            .select('-password -_id');

        if (result.length === 0) {
            failCode(res, "Danh sách người dùng trống!");
        } else {
            const pageCount = Math.ceil(totalUsers / Number(limit));
            successCode(res, {
                page: Number(page) || 1,
                limit: Number(limit),
                totalRow: totalUsers,
                pageCount,
                result
            }, "Lấy danh sách người dùng thành công!");
        }
    } catch (error) {
        errorCode(res, "Backend error!");
    }
};

module.exports = {
    getUserByPagination
};
