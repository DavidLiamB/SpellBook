import { categoriesService } from "../services/CategoriesService.js";
import BaseController from "../utils/BaseController.js";

export class CategoriesController extends BaseController {
    constructor() {
        super('api/categories')
        this.router
            .get('', this.getCategories)
        // .post('', this.createCategory)
    }
    async createCategory(req, res, next) {
        try {
            const category = req.body
            const newCategory = await categoriesService.createCategory(category)
            res.send(newCategory)

        } catch (error) {
            next(error)
        }
    }
    async getCategories(req, res, next) {
        try {
            const categories = await categoriesService.getCategories()
            return res.send(categories)
        } catch (error) {
            next(error)
        }
    }
}
