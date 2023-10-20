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

    async editPost(id, postId, body) {
        const editedPost = await dbContext.Posts.findById(postId)
        if (!editedPost) {
            throw new BadRequest(`no post with this id ${postId}`)
        }
        if (id != editedPost.creatorId) {
            throw new Forbidden('you cant edit this post its not yours')
        }
        editedPost.postBody = body.postBody || editedPost.postBody
        editedPost.postTitle = body.postTitle || editedPost.postTitle
        editedPost.imgUrl = body.imgUrl || editedPost.imgUrl
        editedPost.updatedAt = new Date()
        await editedPost.save()
        return editedPost
    }

}

export const postService = new PostsService()