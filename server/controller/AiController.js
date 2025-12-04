import openai from "../config/Ai.js"
import Resume from "../module/resume.js"


// route for updating the resume proffecinal-sumarry
export const updateProfessionalSummary = async (req, res) => {
    const {userContent} = req.body

    if(!userContent)
        return res.status(400).json({message: "Please provide the user content"})
    try {
       const response = await openai.chat.completions.create({
              model: process.env.OPENAI_MODEL,
    messages: [
        { role: "system", content: "You are an expert in resume writing. your task is to enhance the professional summary of the resume the resume should be 1-2 sentences long and highlight the user's skills and experience. make it compelling and ats friendly. and return text only no optin or any other thing " },
        {
            role: "user",
            content: userContent,
        },
    ],
        })
        const enhancedContent = response.choices[0].message.content
        return res.json({message: "Professional summary updated successfully", enhancedContent})
    } catch (error) {
        res.json({success:false, message: error.message})
    }
    
}

// route for updating the resume job description
export const updateJobDescription = async (req, res) => {
     const {userContent} = req.body

    if(!userContent)
        return res.status(400).json({message: "Please provide the user content"})
    try {
       const response = await openai.chat.completions.create({
              model: process.env.OPENAI_MODEL,
    messages: [
        { role: "system", content: "You are an expert in resume writing. your task is to enhance the job description of the resume the job description should be 1-2 sentences long and highlight the user's responsibility and achivement. use action verbs and quantifiable results where posible. make it compelling and ats friendly. and return text only no optin or any other thing " },
        {
            role: "user",
            content: userContent,
        },
    ],
        })
        const enhancedContent = response.choices[0].message.content
        return res.json({message: "Professional summary updated successfully", enhancedContent})
    } catch (error) {
        res.json({success:false, message: error.message})
    }

}

// route for uploading resume to the database
export const uploadResume = async (req, res) => {
    try {
        const {resumeText,title} = req.body
    const userId = req.userId
    if(!resumeText) {
        return res.json({message: "Please provide the resume text"})
    }
    const systemPrompt = "you are expart AI agent to extract data from resume"

    const userPrompt = `extract data from this resume ${resumeText} 
    provide data in the following json format no additional text before or after 
    {
    proffesional_info : {
        image: {type: String, default: ""},
        full_name: {type: String, default: ""},
        proffession: {type: String, default: ""},
        email: {type: String, default: ""},
        phone: {type: String, default: ""},
        address: {type: String, default: ""},
        linkedIn: {type: String, default: ""},
        website: {type: String, default: ""},
    },
    expirence : [
        {
            company_name: {type: String, },
            position: {type: String, },
            start_date: {type: Date, },
            end_date: {type: Date, },
            description: {type: String, },
            is_current: {type: Boolean, },
        }
    ],
    project: [
        {
            name: {type: String, },
            type: {type: String, },
            description: {type: String, },
        }
    ],
    education: [
        {
            institute_name: {type: String, },
            degree: {type: String, },
            start_date: {type: Date, },
            end_date: {type: Date, },
            grade: {type: String, },
        }
    ]
    }`
     
     const response = await openai.chat.completions.create({
              model: process.env.OPENAI_MODEL,
    messages: [
        { role: "system", content: systemPrompt },
        {
            role: "user",
            content: userPrompt,
        },
    ],
    response_format: {type: "json_object"}
        })

        const extractData = response.choices[0].message.content
        const parsedData = JSON.parse(extractData)
        const newResume = await Resume.create({userId,title, ...parsedData})
       return res.json({ resumeId : newResume._id})
    } catch (error) {
        res.json({success:false, message: error.message})
    }
}