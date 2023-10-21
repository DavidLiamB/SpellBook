import { AppState } from "../AppState.js"
import { likesService } from "../services/LikesService.js"
import { Pop } from "../utils/Pop.js"

export class LikesController {
  constructor() {
    this.getLikes()
    AppState.on('account', this.getLikes)
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

    }
  }
}