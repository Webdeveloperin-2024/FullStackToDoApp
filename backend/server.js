import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./config/db.js"
import taskRouter from "./routes/task.route.js"
import categoryRouter from "./routes/category.route.js"
import userRouter from "./routes/user.route.js"
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}))
app.use(cookieParser())

const PORT = process.env.PORT || 8080

connectDB()
 

app.use("/api/tasks", taskRouter)
app.use("/api/category",categoryRouter)
app.use("/api/user", userRouter)



app.get("/", (req,res) => {
    res.send("backend is running")
})


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})