import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentsService {


    async createComments(comment, postId) {
        const postCheck = await dbContext.Posts.findById(postId)
        if (!postCheck) {
            throw new BadRequest('You can not do this.')
        }
        const comments = await dbContext.Comments.create(comment)
        await comments.populate('creator', '-email -subs')

        return comments
    }

    async getComments(postId) {
        const comments = await dbContext.Comments.find({ postId: postId }).populate('creator', '-email -subs')
        if (!comments[0]) {
            return `no comments under this post ${postId}`
        }


        return comments
    }
    async removeComments(commentId, userId) {
        const removedComment = await dbContext.Comments.findById(commentId)
        if (!removedComment) {
            throw new BadRequest(`nothing with ID ${commentId}`)
        }
        if (removedComment.creatorId != userId) {

            throw new Forbidden('You cant do that')
        }

        await removedComment.remove()
        return 'comment removed'

    }

    async updateComment(commentId, userId, commentData) {
        const commentToBeUpdated = await dbContext.Comments.findById(commentId)
        if (!commentToBeUpdated) {
            throw new BadRequest(`Invalid ID ${commentId}`)
        }

        commentToBeUpdated.postBody = commentData.body || commentToBeUpdated

        return commentToBeUpdated

    }
}

export const commentsService = new CommentsService()