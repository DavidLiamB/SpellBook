import { AppState } from "../AppState.js";
import { Comment } from "../models/Comment.js";
import { api } from "./AxiosService.js"

class CommentsService {
    async getCommentsById(postId) {
        const res = await api.get(`api/comments/${postId}`)
        console.log('response', res.data);
        if (res.data == `no comments under this post ${postId}`) {
            AppState.activeComments = []
            return
        }
        const newComments = res.data.map(pojo => new Comment(pojo))
        AppState.activeComments = newComments
        console.log(AppState.activeComments);
    }
}

export const commentsService = new CommentsService()