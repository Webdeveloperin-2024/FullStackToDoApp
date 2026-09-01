import { Router } from "express"
import { AddCategoryController , getCategoryController,deleteCategoryController} from "../controllers/categoryControllers.js"
import auth from "../middleware/auth.js"

const categoryRouter = Router()

categoryRouter.post("/add-category",auth ,AddCategoryController )
categoryRouter.get("/get", getCategoryController)
categoryRouter.delete("delete-category",auth,deleteCategoryController)

export default categoryRouter