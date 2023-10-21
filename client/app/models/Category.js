export class Category {
  constructor(data) {
    this.name = data.name
    this.id = data._id || data.id
  }

  get categoryButtonTemplate() {
    return `
    <button class="dropdown-item text-white" type="button" onclick="app.WizardsController.drawCategory('${this.id}')">${this.name}</button>
    `
  }
}

