import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class CommentsService {
    async createComments(comment, postId) {
        const postCheck = await dbContext.Posts.findById(postId)
        if (!postCheck) {
            throw new BadRequest('You can not do this.')
        }
        const comments = await dbContext.Comments.create(comment)

        return comments
    }

    async getComments(postId) {
        const comments = await dbContext.Comments.find({ postId: postId })
        if (!comments[0]) {
            return `no comments under this post ${postId}`
        }


        return comments
    }

}

export const commentsService = new CommentsService()