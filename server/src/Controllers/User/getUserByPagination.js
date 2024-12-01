const User = require('../../Models/User.model');
const { successCode, failCode, errorCode, errorCodeNew } = require('../../config/reponse');

const getUserByPagination = async (req, res) => {
    const { pageIndex, pageSize, keyWord } = req.query;
    try {
        if (!pageSize || isNaN(Number(pageSize)) || Number(pageSize) <= 0) {
            errorCodeNew(res, "Kích thước trang phải là số dương lớn hơn 0.");
            return;
        }
        let query = {};
        if (keyWord) {
            query = {
                $or: [
                    { username: { $regex: keyWord, $options: 'i' } },
                    { email: { $regex: keyWord, $options: 'i' } },
                ]
            };
        }

        const totalUsers = await User.countDocuments(query);

        let skip = 0;
        if (pageIndex) {
            skip = (Number(pageIndex) - 1) * Number(pageSize);
        }

        const result = await User.find(query)
            .skip(skip)
            .limit(Number(pageSize))
            .select('-pass_word').select('-_id');

        if (result.length === 0) {
            failCode(res, "Danh sách người dùng trống!");
        } else {
            const pageCount = Math.ceil(totalUsers / Number(pageSize));
            successCode(res, {
                pageIndex,
                pageSize,
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
