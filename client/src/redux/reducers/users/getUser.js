// import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

export const callGetListUser = (keyWord) => async () => {
    try {
        if (keyWord) {
            const result = await http.get(`/user/getUser?keyWord=${keyWord}`);
            return {result:result.data.content, message: result.data.message }
        }
        else {
            const result = await http.get(`/user/getUser`);
            return {result:result.data.content, message: result.data.message }
        }
    } catch (err) {
        return {err }
    }
}
