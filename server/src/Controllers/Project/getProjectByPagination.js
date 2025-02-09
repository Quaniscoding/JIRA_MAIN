const Project = require('../../Models/Project.model');
const { successCode, failCode, errorCode, errorCodeNew } = require('../../config/reponse');

const getProjectByPagination = async (req, res) => {
    const { pageIndex, pageSize, keyword, sort } = req.query;
    try {
        if (!pageSize || isNaN(Number(pageSize)) || Number(pageSize) <= 0) {
            errorCodeNew(res, "Kích thước trang phải là số dương lớn hơn 0.");
            return;
        }

        // Tạo query tìm kiếm nếu có keyword
        let query = {};
        if (keyword) {
            query = {
                $or: [
                    { projectName: { $regex: keyword, $options: 'i' } },
                    { description: { $regex: keyword, $options: 'i' } },
                ]
            };
        }

        // Lấy tổng số dự án phù hợp với query
        const totalProjects = await Project.countDocuments(query);

        // Tính số bản ghi cần bỏ qua (skip)
        let skip = 0;
        if (pageIndex) {
            skip = (Number(pageIndex) - 1) * Number(pageSize);
        }

        // Xử lý sort theo projectName dựa vào tham số sort
        let sortQuery = {};
        if (sort) {
            if (sort.toLowerCase() === 'desc') {
                sortQuery = { projectName: -1 };
            } else if (sort.toLowerCase() === 'asc') {
                sortQuery = { projectName: 1 };
            }
        }
        const result = await Project.find(query)
            .sort(sortQuery)
            .skip(skip)
            .limit(Number(pageSize))
            .select('-pass_word')
            .select('-_id');

        if (result.length === 0) {
            failCode(res, "Danh sách dự án trống!");
        } else {
            const pageCount = Math.ceil(totalProjects / Number(pageSize));
            successCode(res, {
                pageIndex,
                pageSize,
                totalRow: totalProjects,
                pageCount,
                result
            }, "Lấy danh sách dự án thành công!");
        }
    } catch (error) {
        console.log(error);
        errorCode(res, "Backend error!");
    }
};


module.exports = {
    getProjectByPagination
};
