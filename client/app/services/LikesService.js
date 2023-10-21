import { AppState } from "../AppState.js"
import { Like } from "../models/Like.js"
import { api } from "./AxiosService.js"

class LikesService {
  async createLike(postId) {
    if (!AppState.account) {
      return
    }
    let body = {
      postId: postId,
      creatorId: AppState.account.id
    }
    const res = await api.post('api/likes', body)
    const like = new Like(res.data)
    AppState.likes.push(like)
  }
  async getLikes() {
    const res = await api.get('api/likes')
    const likes = res.data.map(pojo => new Like(pojo))
    AppState.likes = likes
  }
}

export const likesService = new LikesService()