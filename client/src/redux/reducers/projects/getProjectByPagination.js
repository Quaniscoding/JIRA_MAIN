import { http } from "../../../utils/baseUrl";
export const callGetListProjectByPagination = (pageSize, pageIndex, keyword, sort) => async () => {
    try {
        const result = await http.get(`/project/getProject/getProjectByPagination?pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${keyword}&sort=${sort}`)
        return result.data.content.result;
    } catch (err) {
        return err
    }
}
