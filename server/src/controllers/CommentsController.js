import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";
import e from "express";

export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .get('/:postId', this.getComments)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('/:postId', this.createComments)
            .delete('/:commentId', this.removeComments)
            .put('/:commentId', this.updateComment)

    }
    async getComments(req, res, next) {
        try {
            const comments = await commentsService.getComments(req.params.postId)
            return res.send(comments)

        } catch (error) {
            next(error)
        }
    }
    async createComments(req, res, next) {
        try {
            const comment = req.body
            const userId = req.userInfo.id
            const postId = req.params.postId
            comment.creatorId = userId
            comment.postId = postId
            const comments = await commentsService.createComments(comment, postId)
            return res.send(comments)

        } catch (error) {
            next(error)
        }
    }

    async removeComments(req, res, next) {
        try {
            const commentId = req.params.commentId
            const userId = req.userInfo.id
            const message = await commentsService.removeComments(commentId, userId)
            return res.send(message)

        } catch (error) {
            next(error)
        }
    }
    async updateComment(req, res, next) {
        try {
            const commentId = req.params.commentId
            const userId = req.userInfo.id
            const commentData = req.body
            const updatedComment = await commentsService.updateComment(commentId, userId, commentData)
            return res.send(updatedComment)
        } catch (error) {
            next(error)
        }
    }
}