export class Like {
  constructor(data) {
    this.id = data.id || data._id
    this.postId = data.postId
    this.creatorId = data.creatorId
  }
}