import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { api } from "./AxiosService.js"

class PostsService {
  async annihilatePost(postId) {
    await api.delete(`api/posts/${postId}`)
    const postIndex = AppState.posts.findIndex(post => post.id == postId)
    if (postIndex == -1) {
      throw new Error(`no post with the index of ${postIndex}`)
    }
    AppState.posts.splice(postIndex, 1)
    AppState.emit('posts')
  }
  async createPost(formData) {
    const res = await api.post('api/posts', formData)
    const post = new Post(res.data)
    AppState.posts.push(post)
    AppState.emit('posts')
  }
  async getPosts() {
    const res = await api.get('api/posts')
    const posts = res.data.map(pojo => new Post(pojo))
    AppState.posts = posts
  }

}

export const postsService = new PostsService()