import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class PostsService {
    async destroyPost(id, postId) {
        const destroyedPost = await dbContext.Posts.findById(postId)
        if (!destroyedPost) {
            throw new BadRequest(`no post with the id ${postId}`)
        }
        if (id != destroyedPost.creatorId) {
            throw new Forbidden('you didnt make this post :(')
        }
        destroyedPost.remove()
        return 'post destroyed'
    }
    async getAllPosts() {
        const posts = await dbContext.Posts.find()
        return posts
    }
    async createPost(body) {
        const newPost = await dbContext.Posts.create(body)
        return newPost
    }
}

export const postService = new PostsService()