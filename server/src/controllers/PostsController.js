import { postService } from "../services/PostsService.js";
import BaseController from "../utils/BaseController.js";

export class PostsController extends BaseController {
    constructor() {
        super('api/posts')
        this.router
            .get('', this.getAllPosts)
    }

    async getAllPosts(req, res, next) {
        try {
            const posts = await postService.getAllPosts()
            res.send(posts)
        } catch (error) {
            next(error)
        }

    }

}