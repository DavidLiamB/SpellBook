import { AppState } from "../AppState.js";
import { Category } from "../models/Category.js";
import { postsService } from "../services/PostsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawPosts() {
  let content = ''
  AppState.posts.forEach(post => content += post.cardTemplate)
  setHTML('post-area', content)
}
function _drawCategory() {
  let content = ''
  AppState.categories.forEach(Category => content += Category.categoryButtonTemplate)
  setHTML('category-buttons', content)
}
export class PostsController {
  constructor() {
    console.log('??????');
    this.getCategories()
    AppState.on('account', this.getPosts)
    AppState.on('posts', _drawPosts)
    AppState.on('categories', _drawCategory)
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

  async createPost(event) {
    try {
      debugger
      event.preventDefault()
      const form = event.target
      let formData = getFormData(form)
      // @ts-ignore
      formData.categoryId = await postsService.getCategory(formData.categoryName)
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