const User = require('../../Models/User.model');
const { successCode, failCode, errorCode, errorCodeNew } = require('../../config/reponse');

const getUserByPagination = async (req, res) => {
    const { page, limit, keyword } = req.query;
    // try {
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

    let skip = 0;
    if (page) {
        skip = (Number(page) - 1) * Number(limit);
    }

    const result = await User.find(query)
        .skip(skip)
        .limit(Number(limit))
        .select('-pass_word').select('-_id');

    if (result.length === 0) {
        failCode(res, "Danh sách người dùng trống!");
    } else {
        const pageCount = Math.ceil(totalUsers / Number(limit));
        successCode(res, {
            page,
            limit,
            totalRow: totalUsers,
            pageCount,
            result
        }, "Lấy danh sách người dùng thành công!");
    }
    // } catch (error) {
    //     errorCode(res, "Backend error!");
    // }
};

module.exports = {
    getUserByPagination
};
