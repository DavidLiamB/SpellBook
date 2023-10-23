import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { dislikesService } from "../services/DislikesService.js";

export class DislikesController extends BaseController {
    constructor() {
        super('api/dislikes')
        this.router
            .get('', this.getDislike)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createDislike)
            .delete('/:dislikeId', this.destroyDislike)
    }
    async getDislike(req, res, next) {
        try {
            const dislikes = await dislikesService.getDislikes()
            res.send(dislikes)
        } catch (error) {
            next(error)
        }
    }

    async createDislike(req, res, next) {
        try {
            const dislikedPost = req.body
            dislikedPost.creatorId = req.userInfo.id
            const dislike = await dislikesService.createDislike(dislikedPost)
            res.send(dislike)
        } catch (error) {
            next(error)
        }
    }

    async destroyDislike(req, res, next) {
        try {
            const dislikeId = req.params.dislikeId
            const userId = req.userInfo.id
            const message = await dislikesService.destroyDislike(dislikeId, userId)
            res.send(message)
        } catch (error) {
            next(error)
        }
    }
}