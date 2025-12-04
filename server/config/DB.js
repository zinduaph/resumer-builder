import mongoose from "mongoose";


mongoose.connection.on('connected', () => {
    console.log('mongodb connected successfuly')
})



const connectDB = async () => {
    await mongoose.connect(`${process.env.MONGODB_URI}/resume-builder`)

}
export default connectDB