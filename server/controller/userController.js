import jwt from "jsonwebtoken"
import User from "../module/userModel.js";
import bcrypt from 'bcrypt'
import Resume from "../module/resume.js";
const createToken = (userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '7d'})
    return token
}
export const registerUser = async (req,res) => {
   
    try {
         const {name, email, password} = req.body;

      if(!name || !email || !password) {
        console.log('Missing required fields')
        return res.json({success: false, message: 'All fields are required'})
    }
    const userExist = await User.findOne({email})
    if(userExist) {
        console.log('User already exists')
        return res.json({success: false, message: 'User already exists'})
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = new User({
        name,email,password:hashedPassword
    })
    await newUser.save()
    const token = createToken(newUser._id)
     newUser.password = undefined
     console.log('User registered successfully')
    return res.json({success:true,message:'new user added',token,user:newUser})

    } catch (error) {
       
        res.json({success:false, message: error.message})

    }
}

export const login = async (req,res) => {
   
    try {
         const {email,password} = req.body
    if(!email || !password) {
       
        return res.json({success:false,message:"fill both input fields"})
    }


        const user = await User.findOne({email})
       

    if(!user) {
        
        return res.json({success:false,message:'user not found'})
    }
    const isMartch = await bcrypt.compare(password,user.password)
    
    if(!isMartch) {
        console.log('Wrong password')
        return res.json({success:false,message:'wrong password please try again'})
    }
    const token = createToken(user._id)
    user.password = undefined

     console.log('Login successful')
     return res.json({success:true,message:'login successful',token,user})

    } catch (error) {
      console.error('Login error:', error.message)
      res.json({success:false, message: error.message})
    }
}

// route fro getting user data by id
export const getUserById = async (req,res) => {
    const userId = req.userId
    try {
        const user = await User.findById(userId)
        if(!user) {
         return res.json({success:true,message:'user not found'})
        }
        user.password = undefined
        return res.json({success:true,user})

    } catch (error) {
        res.json({success:false, message: error.message})
    }
}

// route for getting user resumes
export const getUserResume = async (req,res) => {
    try {
        const userId = req.userId
        const resumes = await Resume.find({userId}).sort({updatedAt: -1})
        return res.json({success:true,resumes})
    } catch (error) {
        res.json({success:false, message: error.message})
    }
}