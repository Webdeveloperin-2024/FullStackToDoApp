import { Router } from "express"
import { registerUserController, loginController, logoutController, getCurrentUserController } from "../controllers/userControllers.js"
import auth from "../middleware/auth.js"

const userRouter = Router()

userRouter.post("/register", registerUserController)
userRouter.post("/login", loginController)
userRouter.post("/logout", auth, logoutController)
userRouter.get("/current-user", auth, getCurrentUserController)

export default userRouter