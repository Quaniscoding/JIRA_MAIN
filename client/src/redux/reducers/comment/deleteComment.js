import { http } from "../../../utils/baseUrl"

export const callDeleteComment = (commentId, taskId) => async () => {
    try {
        const result = await http.delete(`/comment/deleteComment/${taskId}/${commentId}`)
        return { isDeleted: true, message: result.data.message }
    } catch (err) {
        return err
    }
}