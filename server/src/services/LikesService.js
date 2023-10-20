import { dbContext } from "../db/DbContext.js"

class LikesService {
    async createLike(likedPost) {
        const like = await dbContext.Likes.create(likedPost)
        await like.populate('creator')
        await like.populate('post')
        return like
    }
}

export const likesService = new LikesService()