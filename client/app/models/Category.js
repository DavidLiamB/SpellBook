export class Category {
  constructor(data) {
    this.name = data.name
    this.id = data._id || data.id
  }
}

