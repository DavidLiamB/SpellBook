import { AppState } from "../AppState.js";
import { postsService } from "../services/PostsService.js";
import { getFormData } from "../utils/FormHandler.js";
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
    this.getCategories()
    AppState.on('account', this.getPosts)
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
  async getCategories() {
    try {
      console.log('??');
      await postsService.getCategories()
    } catch (error) {
      Pop.error(error)
      console.error(error)
    }
  }
  getCategory(name) {
    try {
      console.log('??');
      return postsService.getCategory(name)
    } catch (error) {
      Pop.error(error)
      console.error(error)
    }
  }

  async createPost(event) {
    try {
      event.preventDefault()
      const form = event.target
      const formData = getFormData(form)
      // @ts-ignore
      formData.categoryId = this.getCategory(formData.categoryName)
      const post = await postsService.createPost(formData)
      form.reset()
    } catch (error) {
      Pop.error(error)
      console.error(error)

    }
  }

  async annihilatePost(postId) {
    try {
      const wantsToDeletePost = await Pop.confirm()
      if (!wantsToDeletePost) {
        return
      }

      await postsService.annihilatePost(postId)

      Pop.error('Successfully deleted')
    } catch (error) {
      Pop.error
      console.error(error)
    }

  }
}