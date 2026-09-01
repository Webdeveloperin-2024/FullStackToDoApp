import { Router } from "express"
import {createTaskController,getTasksController,getTaskByCategory,updateTaskController, deleteTaskController  } from "../controllers/taskControllers.js"
import auth from "../middleware/auth.js"


const taskRouter = Router()

taskRouter.post("/", auth, createTaskController)
taskRouter.get("/", auth, getTasksController);
taskRouter.get("/category/:categoryId",auth, getTaskByCategory)
taskRouter.put("/:id",auth,updateTaskController)
taskRouter.delete("/:id", auth, deleteTaskController)

export default taskRouter