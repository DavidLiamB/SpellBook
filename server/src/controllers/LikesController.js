import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { likesService } from "../services/LikesService.js";

export class LikesController extends BaseController {
    constructor() {
        super('api/likes')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createLike)
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
}