import { dbContext } from "../db/DbContext.js"

class PostsService {
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