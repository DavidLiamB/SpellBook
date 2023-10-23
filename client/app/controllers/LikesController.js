import { AppState } from "../AppState.js"
import { likesService } from "../services/LikesService.js"
import { Pop } from "../utils/Pop.js"

export class LikesController {
  constructor() {
    this.getLikes()
    this.getDislikes()
  }

  async getLikes() {
    try {
      await likesService.getLikes()
    } catch (error) {
      Pop.error(error)
      console.error(error)
    }
  }

  async createLike(postId) {
    try {
      await likesService.createLike(postId)
    } catch (error) {
      Pop.error(error)
      console.error(error)
    }
  }

  async destroyLike(postId) {
    try {
      await likesService.destroyLike(postId)
    } catch (error) {
      Pop.error(error)
      console.error(error)
    }
  }
  async destroyDislike(postId) {
    try {
      await likesService.destroyDislike(postId)
    } catch (error) {
      Pop.error(error)
      console.error(error)
    }
  }

  async getDislikes() {
    try {
      await likesService.getDislikes()
    } catch (error) {
      Pop.error(error)
      console.error(error)
    }
  }

  async createDislike(postId) {
    try {
      await likesService.createDislike(postId)
    } catch (error) {
      Pop.error(error)
      console.error(error)
    }
  }
}