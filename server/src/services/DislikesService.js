import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class DislikesService {
    async getDislikes() {
        const dislikes = await dbContext.Dislikes.find()
        return dislikes
    }
    // TODO FIX THIS
    async destroyDislike(dislikeId, userId) {
        const destroyedDislike = await dbContext.Dislikes.findById(dislikeId)
        if (!destroyedDislike) {
            throw new BadRequest(`nothing with this id ${dislikeId}`)
        }
        if (destroyedDislike.creatorId != userId) {
            throw new Forbidden(`you cant delete this Dislike`)
        }
        await destroyedDislike.remove()
        return 'Dislike destroyed'
    }
    async createDislike(dislikedPost) {
        const dislike = await dbContext.Dislikes.create(dislikedPost)
        await dislike.populate('creator', '-email -subs')
        // TODO FIX THIS
        // await Dislike.populate('post')
        return dislike
    }
}

export const dislikesService = new DislikesService()