import { likesService } from "../services/LikesService.js"
import { Pop } from "../utils/Pop.js"

export class LikesController {
  constructor() {
    this.getLikes()
  }

  async getLikes() {
    try {
      await likesService.getLikes()
    } catch (error) {
      Pop.error(error)
      console.error(error)
    }

  }
}