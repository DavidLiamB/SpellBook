import { AppState } from "../AppState.js"

export class Post {
  constructor(data) {
    this.id = data._id || data.id
    this.postTitle = data.postTitle
    this.postBody = data.postBody
    this.creatorId = data.creatorId
    this.categoryId = data.categoryId
    this.createdAt = new Date(data.createdAt)
    this.createdAt = data.createdAt
    this.likes = data.likes
    this.dislikes = data.dislikes
    this.creator = data.creator || null
    this.imgUrl = data.imgUrl || null
    this.liked = AppState.likes.find(like => this.id == like.postId && like.creatorId == AppState.account?.id) ? true : false
    this.disliked = AppState.dislikes.find(dislike => this.id == dislike.postId && dislike.creatorId == AppState.account?.id) ? true : false
  }

  get cardTemplate() {
    return `
    <div class="col-12 post-background p-3 mb-3 d-flex post rounded">
    <div class="pt-3 fw-bold">
    <div class="text-center">category</div>
      <div class="p-2 text-center">
        <img class="profile-img text-center rounded-circle"
          src="${this.creator?.picture}"
          alt="${this.creator?.name}">
        <p>${this.creator?.name}</p>
      </div>
      </div>
      <div class="p-2">
        <h5 class="fs-2">${this.postTitle}</h5>
      ${this.isImg}
    
        <p class="small-text fs-3">${this.postBody}</p>
        <div class="d-flex justify-content-between">
        
        <div>
        ${this.seelike}
        ${this.seedislike}
        <!-- <i class="mdi mdi-heart-broken"></i>
              <i class="mdi mdi-heart-broken-outline"></i> -->
        </div>
        <div>
        ${this.computeDeleteButton}
        </div>
        </div>
        <div>
        <div id="commentsGoHere${this.id}">
        <p type="button"  onclick="app.CommentsController.getCommentById('${this.id}')" class="mb-0">comments...</p>
        </div>
        </div>
      </div>

    </div>`
  }

  get seelike() {
    return this.liked ?
      ` <p>${this.likes}<i onclick="app.LikesController.destroyLike('${this.id}')" class="mdi mdi-heart text-purple"></i></p>`
      :
      ` <p>${this.likes}<i role="Button" onclick="app.LikesController.createLike('${this.id}')" class="mdi mdi-heart-outline text-purple"></i></p>`
  }
  get seedislike() {
    return this.disliked ?
      ` <p>${this.dislikes}<i onclick="app.LikesController.destroyDislike('${this.id}')" class="mdi mdi-heart-broken text-purple"></i></p>`
      :
      ` <p>${this.dislikes}<i role="Button" onclick="app.LikesController.createDislike('${this.id}')" class="mdi mdi-heart-broken-outline text-purple"></i></p>`
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
  <button onclick="app.PostsController.annihilatePost('${this.id}')" class="btn button-purple text-white rounded-circle"><i class="mdi mdi-delete"></i></button>

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