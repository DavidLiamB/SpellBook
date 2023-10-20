import { Auth0Provider } from "@bcwdev/auth0provider";
import { postService } from "../services/PostsService.js";
import BaseController from "../utils/BaseController.js";

export class PostsController extends BaseController {
    constructor() {
        super('api/posts')
        this.router
            .get('', this.getAllPosts)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createPost)
            .delete('/:postId', this.destroyPost)
            .put('/:postId', this.editPost)
    }

    async getAllPosts(req, res, next) {
        try {
            const posts = await postService.getAllPosts()
            res.send(posts)
        } catch (error) {
            next(error)
        }
    }

    async createPost(req, res, next) {
        try {
            const body = req.body
            const userId = req.userInfo.id
            body.creatorId = userId
            const newPost = await postService.createPost(body)
            res.send(newPost)
        } catch (error) {
            next(error)
        }
    }

    async destroyPost(req, res, next) {
        try {
            const userId = req.userInfo.id
            const postId = req.params.postId
            const deletedPost = await postService.destroyPost(userId, postId)
            res.send(deletedPost)
        } catch (error) {
            next(error)
        }
    }

    async editPost(req, res, next) {
        try {

            const editedPost = await postService.editPost(req.userInfo.id, req.params.postId, req.body)
            res.send(editedPost)

        } catch (error) {
            next(error)
        }

    }

}