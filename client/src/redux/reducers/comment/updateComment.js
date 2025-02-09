import { http } from '../../../utils/baseUrl'
export const callUpdateComment = (commentId, contentComment) => async () => {
    try {
        const result = await http.put(`/comment/updateComment/${commentId}`, contentComment)
        return { isUpdated: true, message: result.data.message }
    } catch (err) {
        return err
    }
}