import { http } from "../../../utils/baseUrl";
export const callGetListProjectByPagination = (pageSize, pageIndex, keyword = "", sort) => async () => {
    try {
        let url = `/project/getProject/getProjectByPagination?pageSize=${pageSize}&pageIndex=${pageIndex}&sort=${sort}`;

        // Chỉ thêm keyword vào URL nếu có giá trị
        if (keyword) {
            url += `&keyword=${encodeURIComponent(keyword)}`;
        }

        const result = await http.get(url);
        return result.data.content;
    } catch (err) {
        return err;
    }
};

