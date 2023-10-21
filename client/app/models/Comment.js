export class Comment {
    constructor(data) {
        this.postBody = data.postBody
        this.id = data.id || data._id
        this.creatorId = data.creatorId
        this.postId = data.postId
        this.creator = data.creator
    }

    get CommentTemplate() {
        return `
        <p>${this.postBody}</p>
        <img class="rounded-circle" src="${this.creator.picture}" alt="${this.creator.name}">
        <p>${this.creator.name}</p>
        <hr>
        `
    }

    static get noCommentTemplate() {
        return `
        <p>No Comments...</p>
        `
    }
}