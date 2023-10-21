import { AppState } from "../AppState.js"
import { Like } from "../models/Like.js"
import { api } from "./AxiosService.js"

class LikesService {
  async getLikes() {
    const res = await api.get('api/likes')
    const likes = res.data.map(pojo => new Like(pojo))
    AppState.likes = likes
  }
}

export const likesService = new LikesService()