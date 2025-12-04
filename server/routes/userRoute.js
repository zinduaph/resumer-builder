import express from "express"
import { getUserById, login, registerUser ,getUserResume} from "../controller/userController.js"
import protect from "../middleware/authMiddleware.js"

const userRoute = express.Router()

userRoute.post('/register',registerUser)
userRoute.post('/login',login)
userRoute.get('/data',protect,getUserById)
userRoute.get('/resumes',protect,getUserResume)

export default userRoute