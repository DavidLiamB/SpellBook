import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { api } from "./AxiosService.js"

class PostsService {
  async getPosts() {
    const res = await api.get('api/posts')
    const posts = res.data.map(pojo => new Post(pojo))
    AppState.posts = posts
  }

}

export const postsService = new PostsService()