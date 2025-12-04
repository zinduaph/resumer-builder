import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { dummyData } from "../assets/asset"
import ResumePreview from "../components/resumePreview"
import Loader from "../components/loader"
import { ArrowLeftIcon } from "lucide-react"
import api from "../configs/api"
import toast from "react-hot-toast"

const Perview = () => {
    const {resumeId} = useParams()
    const [resumeData, setResumeData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const accentColor = '#007bff' // Default accent color
    const loadResume = async () => {
       console.log('loadResume called, resumeId:', resumeId)
       try {
        const response = await api.get('/api/resumes/public/' + resumeId)
        console.log('API response:', response)
        console.log('response.data:', response.data)
        setResumeData(response.data.resume)
       } catch (error) {
        console.log('Error in loadResume:', error)
        toast.error(error.message)
       } finally {
        setIsLoading(false)
       }

    }
    useEffect(()=> {
        loadResume()
    },[])
    return resumeData ? (
        <>
        <div className="bg-salte-100">
            <div className="mx-w-3xl mx-auto py-10">
                <ResumePreview data={resumeData} accentColor={accentColor} template={resumeData.template} classes="py-4 bg-white"/>

            </div>

        </div>
        </>
    ) :(<div>
        {isLoading ? <Loader /> : (
            <>
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-center text-6xl text-slate-400 font-medium">Resume not found</p>
                <a href="/" className="mt-6 bg-green-500 hover:bg-green-600 rounded-full px-6 text-white h-9 m-1 flex items-center">
                    <ArrowLeftIcon className="mr-2 size-4"/>
                    go to home

                </a>

            </div>
            </>
        )}
    </div>)
}
export default Perview