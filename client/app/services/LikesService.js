import { AppState } from "../AppState.js"
import { Like } from "../models/Like.js"
import { api } from "./AxiosService.js"

class LikesService {
  async destroyDislike(postId) {
    if (!AppState.account) {
      return
    }
    const dislike = AppState.dislikes.find(dislike => dislike.postId == postId && dislike.creatorId == AppState.account?.id)
    const res = await api.delete(`api/dislikes/${dislike.id}`)
    const postIndex = AppState.posts.findIndex(post => post.id == postId)
    AppState.dislikes.splice(postIndex, 1)
    AppState.posts[postIndex].dislikes--
    AppState.posts[postIndex].disliked = false
    AppState.emit('posts')
  }
  async destroyLike(postId) {
    if (!AppState.account) {
      return
    }
    const like = AppState.likes.find(like => like.postId == postId && like.creatorId == AppState.account?.id)
    const res = await api.delete(`api/likes/${like.id}`)
    const postIndex = AppState.posts.findIndex(post => post.id == postId)
    AppState.likes.splice(postIndex, 1)
    AppState.posts[postIndex].likes--
    AppState.posts[postIndex].liked = false
    AppState.emit('posts')
  }
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
    const post = AppState.posts.find(post => post.id == postId)
    post.likes++
    post.liked = true
    if (post.disliked) {
      this.destroyDislike(postId)
    } else {
      AppState.emit('posts')
    }
  }
  async getLikes() {
    const res = await api.get('api/likes')
    const likes = res.data.map(pojo => new Like(pojo))
    AppState.likes = likes
  }

  async createDislike(postId) {
    if (!AppState.account) {
      return
    }
    let body = {
      postId: postId,
      creatorId: AppState.account.id
    }
    const res = await api.post('api/dislikes', body)
    const dislike = new Like(res.data)
    AppState.dislikes.push(dislike)
    const post = AppState.posts.find(post => post.id == postId)
    post.dislikes++
    post.disliked = true
    if (post.liked) {
      this.destroyLike(postId)
    } else {
      AppState.emit('posts')
    }
  }
  async getDislikes() {
    const res = await api.get('api/dislikes')
    const dislikes = res.data.map(pojo => new Like(pojo))
    AppState.dislikes = dislikes
  }
}

export const likesService = new LikesService()