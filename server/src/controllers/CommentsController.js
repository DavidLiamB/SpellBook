import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";

export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .get('/:postId', this.getComments)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('/:postId', this.createComments)

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
}