import jwt from "jsonwebtoken"

const protect = (req,res,next) => {
    const token = req.headers.authorization
    if(!token) {
        return res.json({success:false,message:'not authorized'})
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = decoded.userId
        next()
    } catch (error) {
         return res.json({success:false,message:'not authorized'})

    }

}
export default protect