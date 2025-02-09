import { http } from '../../../utils/baseUrl'
export const callInsertComment = (data) => async () => {
    try {
        const result = await http.post('/comment/createComment', data)
        return { isInsert: true, message: result.data.message }
    } catch (err) {
        return err
    }
}