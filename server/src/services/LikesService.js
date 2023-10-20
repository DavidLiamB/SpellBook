import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class LikesService {
    async getLikes() {
        const likes = await dbContext.Likes.find()
        return likes
    }
    // TODO FIX THIS
    async destroyLike(likeId, userId) {
        const destroyedLike = await dbContext.Likes.findById(likeId)
        if (!destroyedLike) {
            throw new BadRequest(`nothing with this id ${likeId}`)
        }
        if (destroyedLike.creatorId != userId) {
            throw new Forbidden(`you cant delete this like`)
        }
        await destroyedLike.remove()
        return 'like destroyed'
    }
    async createLike(likedPost) {
        const like = await dbContext.Likes.create(likedPost)
        await like.populate('creator', '-email -subs')
        // TODO FIX THIS
        // await like.populate('post')
        return like
    }
}

export const likesService = new LikesService()