import express from "express"
import cors from "cors"
import dotenv from 'dotenv/config'
import connectDB from "./config/DB.js"
import userRoute from "./routes/userRoute.js"
import resumeRouter from "./routes/resumeRouter.js"
import AiRouter from "./routes/AiRouter.js"

const app = express()
const PORT = process.env.port || 3000
connectDB()
// middleware
app.use(express.json())
app.use(cors())

app.use('/api/users',userRoute)
app.use('/api/resumes',resumeRouter)
app.use('/api/ai',AiRouter)
app.get('/', (req,res) => {
  res.send("server is live")
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})