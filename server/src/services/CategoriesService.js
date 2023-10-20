import { dbContext } from "../db/DbContext.js"

class CategoriesService {
    async createCategory(body) {
        const category = await dbContext.Categories.create(body)
        return category
    }
    async getCategories() {
        const categories = await dbContext.Categories.find()
        return categories
    }

}
export const categoriesService = new CategoriesService()