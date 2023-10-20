import { AppState } from "../AppState.js";
import { postsService } from "../services/PostsService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawPosts() {
  let content = ''
  AppState.posts.forEach(post => content += post.cardTemplate)
  setHTML('post-area', content)
}
export class PostsController {
  constructor() {
    console.log('??????');
    this.getPosts()
    AppState.on('posts', _drawPosts)
  }

  async getPosts() {
    try {
      console.log('??');
      await postsService.getPosts()
    } catch (error) {
      Pop.error(error)
      console.error(error)
    }
  }
}