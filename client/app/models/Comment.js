export class Comment {
    constructor(data) {
        this.postBody = data.postBody
        this.id = data.id || data._id
        this.creatorId = data.creatorId
        this.postId = data.postId
    }

    get CommentTemplate() {
        return `
        <p>${this.postBody}</p>
        `
    }

    static get noCommentTemplate() {
        return `
        <p>No Comments...</p>
        `
    }
}