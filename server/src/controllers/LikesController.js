import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { likesService } from "../services/LikesService.js";

export class LikesController extends BaseController {
    constructor() {
        super('api/likes')
        this.router
            .get('', this.getLike)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createLike)
            .delete('/:likeId', this.destroyLike)
    }
    async getLike(req, res, next) {
        try {
            const likes = await likesService.getLikes()
            res.send(likes)
        } catch (error) {

        }
    }

    async createLike(req, res, next) {
        try {
            const likedPost = req.body
            likedPost.creatorId = req.userInfo.id
            const like = await likesService.createLike(likedPost)
            res.send(like)
        } catch (error) {
            next(error)
        }
    }

    async destroyLike(req, res, next) {
        try {
            const likeId = req.params.likeId
            const userId = req.userInfo.id
            const message = await likesService.destroyLike(likeId, userId)
            res.send(message)
        } catch (error) {
            next(error)
        }
    }
}