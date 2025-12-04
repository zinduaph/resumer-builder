import Resume from "../module/resume.js"
import imagekit from "../config/imageKit.js"
import fs from 'fs'


// this route is creating new resume
export const createResume = async (req,res) => {
    const userId = req.userId
     const {title} = req.body
     try {
        const newResume = await Resume.create({userId,title})
        res.json({success:true,message:'Resume created successfully',resume:newResume})
     } catch (error) {
        res.json({success:false, message: error.message})
     }
}

// This route is for deleting the resume
export const deleteResume = async (req,res) => {
     const userId = req.userId
     const {resumeId} = req.params
     try {
        const deletedResume = await Resume.findOneAndDelete({userId, _id:resumeId})
        if (!deletedResume) {
            return res.json({success:false, message: 'Resume not found or not authorized to delete'})
        }
        res.json({success:true,message:'Resume deleted successfully'})
     } catch (error) {
         res.json({success:false, message: error.message})
     }
}

// this route is for getting user resume by id
export const getResumeById = async (req,res) => {
    const userId = req.userId
    const {resumeId} = req.params
    try {
        const resume = await Resume.findOne({userId, _id:resumeId})
        if(!resume) {
            return res.json({success:false,message:'resume not found'})
        }
        resume.__v = undefined
        resume.createdAt = undefined
        resume.updatedAt = undefined
        return res.json({success:true,resume})
    } catch (error) {
         res.json({success:false, message: error.message})
    }
}

// get user by id public
// path Get /api/resume/public
export const getPublicResumeById = async (req,res) => {
    const {resumeId} = req.params
    try {
        const resume = await Resume.findOne({public: true,_id:resumeId})
        if(!resume) {
            return res.json({success:false,message:'resume not found'})
        }
        return res.json({success:true,resume})
        
    } catch (error) {
        res.json({success:false, message: error.message})
    }
}

// routes for updading the resume
// path Put /api/resume/
export const updateResume = async (req,res) => {
    console.log('updateResume called')
    console.log('req.userId:', req.userId)
    console.log('req.body:', req.body)
    console.log('req.file:', req.file)

    try {
        const userId = req.userId
    const {resumeId,resumeData,removeBackground} = req.body
    const image = req.file ? req.file.path : null
    console.log('resumeId:', resumeId)
    console.log('resumeData:', resumeData)
    console.log('image:', image)

    let resumeDataCopy;
    if (typeof resumeData === 'string') {
          resumeDataCopy = JSON.parse(resumeData)
    } else {
        resumeDataCopy = structuredClone(resumeData)
    }
    console.log('resumeDataCopy after parse:', resumeDataCopy)

        if(image) {
                console.log('Uploading image...')
                const imageBufferData = fs.createReadStream(image)
                const response = await imagekit.files.upload({
    file: imageBufferData,
    fileName: 'resume.png',
    folder: 'user-resume',
    transformation: {
        pre : 'w-300,h-300,fo-face,z-0.75' + (removeBackground ? ',e-bgremove' : '')
    }


});
                // ensure we set the uploaded image url on the same key the client used
                if (resumeDataCopy.personal_info) {
                        resumeDataCopy.personal_info.image = response.url
                } else if (resumeDataCopy.proffesional_info) {
                        resumeDataCopy.proffesional_info.image = response.url
                }
                console.log('Image uploaded, URL:', response.url)
        }


        // If we didn't map any fields, fall back to the original object (best-effort)
        delete resumeDataCopy._id
        const finalUpdate =  resumeDataCopy

        console.log('Updating resume with selector:', {userId, _id: resumeId}, 'update:', finalUpdate)
        const resume = await Resume.findOneAndUpdate({userId, _id: resumeId},{$set: finalUpdate}, {new:true})
        console.log('Updated resume:', resume)
        return res.json({success:true,message:'Resume updated successfully',resume})

    } catch (error) {
        console.log('Error in updateResume:', error)
        res.json({success:false, message: error.message})
    }
}