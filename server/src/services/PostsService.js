import { dbContext } from "../db/DbContext.js"

class PostsService {
    async getAllPosts() {
        const posts = await dbContext.Posts.find()
        return posts
    }
}

export const postService = new PostsService()