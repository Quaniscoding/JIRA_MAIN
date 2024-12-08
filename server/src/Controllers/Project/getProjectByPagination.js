const Project = require('../../Models/Project.model');
const { successCode, failCode, errorCode, errorCodeNew } = require('../../config/reponse');

const getProjectByPagination = async (req, res) => {
    const { pageIndex, pageSize, keyword } = req.query;
    try {
        if (!pageSize || isNaN(Number(pageSize)) || Number(pageSize) <= 0) {
            errorCodeNew(res, "Kích thước trang phải là số dương lớn hơn 0.");
            return;
        }
        let query = {};
        if (keyword) {
            query = {
                $or: [
                    { projectName: { $regex: keyword, $options: 'i' } },
                    { description: { $regex: keyword, $options: 'i' } },
                ]
            };
        }

        const totalProjects = await Project.countDocuments(query);
        
        let skip = 0;
        if (pageIndex) {
            skip = (Number(pageIndex) - 1) * Number(pageSize);
        }

        const result = await Project.find(query)
            .skip(skip)
            .limit(Number(pageSize))
            .select('-pass_word').select('-_id');
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
