import { AppState } from "../AppState.js"

export class Post {
  constructor(data) {
    this.id = data._id || data.id
    this.postTitle = data.postTitle
    this.postBody = data.postBody
    this.creatorId = data.creatorId
    this.createdAt = new Date(data.createdAt)
    this.createdAt = data.createdAt
    this.creator = data.creator || null
    this.imgUrl = data.imgUrl || null
  }

  get cardTemplate() {
    return `
    <div class="col-12 p-3 d-flex shadow post">
      <div class="p-2">
        <img class="profile-img rounded-circle"
          src="${this.creator?.picture}"
          alt="${this.creator?.name}">
        <p>${this.creator?.name}</p>
      </div>
      <div class="p-2">
        <h5>${this.postTitle}</h5>
      ${this.isImg}
    
        <p class="small-text">${this.postBody}</p>
        ${this.computeDeleteButton}
        <i class="mdi mdi-heart"></i>
        <i class="mdi mdi-heart-outline"></i>
        <i class="mdi mdi-heart-broken"></i>
        <i class="mdi mdi-heart-broken-outline"></i>
      </div>

    </div>`
  }
  get isImg() {
    if (!this.imgUrl) {
      return ''
    }
    return `<img src="${this.imgUrl}" alt="${this.postTitle}" class="img-fluid">
  `
  }

  get computeDeleteButton() {
    if (AppState.account?.id != this.creatorId) {
      return ''
    }
    return `
  <button onclick="app.PostController.destroy" class="btn btn-danger rounded-circle"><i class="mdi mdi-delete"></i></button>

  `
  }
}

// "_id": "6532b9d1c23a245345299b31",
//         "postBody": "this is my awesome wizzard post about magic and stuff",
//         "postTitle": "wizzard posts",
//         "creatorId": "652ec594e729aa7211d0a1ef",
//         "createdAt": "2023-10-20T17:33:05.669Z",
//         "updatedAt": "2023-10-20T17:33:05.669Z",
//         "__v": 0,
//         "id": "6532b9d1c23a245345299b31"