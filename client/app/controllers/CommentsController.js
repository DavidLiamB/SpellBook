import { AppState } from "../AppState.js";
import { Comment } from "../models/Comment.js";
import { commentsService } from "../services/CommentsService.js";
import { setHTML } from "../utils/Writer.js";


function _drawComments(id) {
    let content = ''
    AppState.activeComments.forEach(comment => content += comment.CommentTemplate)
    if (content == '') {
        setHTML(`commentsGoHere${id}`, Comment.noCommentTemplate)
    }
    else {
        setHTML(`commentsGoHere${id}`, content)

    }
}
export class CommentsController {

    constructor() {
        console.log('comments controller')
    }

    async getCommentById(commentId) {
        console.log(commentId);
        await commentsService.getCommentsById(commentId)
        _drawComments(commentId)
    }

    showComments() {

    }

}