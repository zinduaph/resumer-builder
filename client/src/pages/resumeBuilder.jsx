import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { dummyData } from "../assets/asset"
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, Download, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Share2, Sparkles, User } from "lucide-react"
import { Link } from 'react-router-dom'
import PresonalInfo from "../components/personalInfo"
import ResumePreview from "../components/resumePreview"
import TemplateSelector from "../components/tempateSelector"
import ColorPicker from "../components/colorPicker"
import Summary from "../components/summary"
import Exprience from "../components/exprience"
import Education from "../components/educationForm"
import Project from "../components/projectFrom"
import Skills from "../components/skillForm"
import { useSelector } from "react-redux"
import api from "../configs/api"
import toast from "react-hot-toast"

const ResumeBuilder = () => {
    const {resumeId} = useParams()
    const {token} = useSelector(state => state.auth)
    const [resumeData,setResumeData] = useState({
        _id : '',
        title: '',
        personal_info: {},
        professional_summary:'',
        experience: [],
        education: [],
        skills: [],
        projects: [],
        template: 'classic',
        accent_color: '#3b82f6',
        public: false

    })

    const existingResume = async () => {
       try {
         const {data} = await api.get('/api/resumes/get/' + resumeId, {headers:{Authorization:token}})
        if (data.resume) {
            setResumeData(data.resume)
            document.title = data.resume.title
        }

       } catch (error) {
        console.log(error.message)
       }
    }

    useEffect(()=> {
        existingResume()
    },[])
    const [activeSectionIndex,setActiveSection] = useState(0)
    const [removeBackground,setRemoveBackground] = useState(false)
    const Sections = [
        {id:'personal',name:'personal_info', icon: User},
        {id:'summary',name:'professional_summary', icon: FileText},
        {id:'experience',name:'experience', icon: Briefcase},
        {id:'education',name:'education', icon: GraduationCap},
        {id:'projects',name:'projects', icon: FolderIcon},
        {id:'skills',name:'skills', icon: Sparkles}
    ]
   
     const activeSection = Sections[activeSectionIndex]
     // This function is to make the resume private or public
     const changeResumeVisibility = async() => {
       try {
        const formData = new FormData()
        formData.append('resumeId',resumeId)
        formData.append('resumeData',JSON.stringify({public:!resumeData.public}))
        const {data} = await api.put('/api/resumes/update',formData,{headers:{Authorization:token}})
        setResumeData({...resumeData,public:data.resume.public})
        toast.success(data.message)
       } catch (error) {

       }
     }

     // This function is for sharing the resume
     const handleShare = () => {
        const frontEndUrl = window.location.href.split('/app/')[0]
        const resumeUrl = frontEndUrl + '/veiw/' + resumeId

        if(navigator.share) {
            navigator.share({url:resumeUrl, text: "my resume"})
        } else {
            alert('share not supproted on this browser')
        }
     }
        // this function is for downloading the resume
     const downloadResume = () => {
        window.print()
     }

     const saveResume = async () => {
        console.log('saveResume called with resumeId:', resumeId)
        console.log('resumeData:', resumeData)
        console.log('token:', token)
        try {
            let updatedResumeData = structuredClone(resumeData)
            // remove the image from updatedResumeData
            if(updatedResumeData?.personal_info?.image instanceof File) {
                delete updatedResumeData.personal_info.image

            }
            const formData = new FormData()
            formData.append('resumeId',resumeId)
            formData.append('resumeData',JSON.stringify(updatedResumeData))
            console.log('Sending FormData entries:', [...formData.entries()])
            console.log('API URL:', api.defaults.baseURL + '/api/resumes/update')
            const {data} = await api.put('/api/resumes/update',formData,{headers:{Authorization:token,"Content-Type": "multipart/form-data"}})
            console.log('Response data:', data)
            toast.success(data.message)
        } catch (error) {
            console.log('error saving resume',error)
            console.log('Error response:', error.response)
        }
     }
    return (
        <>
        
        <div>
            <div className="max-w-7xl mx-auto px-4 py-6">
                <Link to='/app' className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-600'>
                <ArrowLeftIcon className="size-4"/> back to dashboard
                </Link>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-8">
                <div className="grid lg:grid-cols-6 gap-8">
                    {/** left panel from */}
                    <div className="relative lg:col-span-3 rounded-lg w-150">
                        <div className="bg-white rounded-lg border border-gray-300 p-6 pt-1 shadow-sm">
                           {/** progress bar using activesectionindex */}
                           <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200"/>
                           <hr className="absolute top-0 left-0 h-1 border-none bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-2000"
                           style={{width: `${Sections.length > 1 ? (activeSectionIndex / (Sections.length - 1)) * 100 : 0}%`}}/>
                           {/**section navigation */}
                           <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                            <div className="flex justify-between items-center mb-6 border-b border-border-gray-300 py-1">
                                <TemplateSelector selectedTemplate={resumeData.template}
                                 onChange={(template) => setResumeData(prev => ({...prev, template}))}/>
                                 <ColorPicker selectedColor={resumeData.accect_color} onChange={(color) => setResumeData(prev => ({...prev, accect_color: color}))}/>
                            </div>

                            <div className="flex items-center">
                              {activeSectionIndex !== 0 && (
                                <button onClick={()=> setActiveSection((prevIndex) => Math.max(prevIndex - 1,0))} className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium
                                text-gray-600 hover:bg-gray-50 transition-all" disabled={activeSectionIndex === 0}>
                                  <ChevronLeft  className="size-4"/> previous
                                  
                                </button>
                               )}
                                            <button onClick={()=> setActiveSection((prevIndex) => Math.min(prevIndex + 1,Sections.length - 1))} className= {`flex items-center gap-1 p-3 rounded-lg text-sm font-medium
                              text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === Sections.length - 1 && 'opacity-50'}`} disabled={activeSectionIndex === Sections.length - 1}>
                                                Next <ChevronRight  className="size-4"/> 
                                  
                                </button>
                            </div>

                           </div>

                           {/**from content */}
                           <div className="space-y-6 w-120">
                            {activeSection.id === 'personal'&& (
                                <PresonalInfo  data={resumeData.personal_info}
                                onChange={(data=> setResumeData(prev=> ({...prev,personal_info:data})))} setRemoveBackground={setRemoveBackground}
                                removeBackground={removeBackground}/>
                            )}
                            {activeSection.id === 'summary' && (
                                <Summary  data={resumeData.professional_summary}
                                 onChange={(data) =>setResumeData(prev => ({...prev,professional_summary:data})) }
                                 setResumeData={setResumeData}/>
                            )}
                            {activeSection.id === 'experience'&& (
                                <Exprience  data={resumeData.experience}
                                onChange={(data=> setResumeData(prev=> ({...prev,experience:data})))} />

                            )}
                           
                            {activeSection.id === 'education'&& (
                                <Education  data={resumeData.education}
                                onChange={(data=> setResumeData(prev=> ({...prev,education:data})))} 
                                
                                />
                            )}
                            {activeSection.id === 'projects'&& (
                                <Project  data={resumeData.projects}
                                onChange={(data=> setResumeData(prev=> ({...prev,projects:data})))} />

                            )}
                            {activeSection.id === 'skills'&& (
                                <Skills  data={resumeData.skills}
                                onChange={(data=> setResumeData(prev=> ({...prev,skills:data})))} 
                                
                                />
                            )}
                            
                           </div>
                           <button onClick={()=> {toast.promise(saveResume,{loading: 'saving...'})}} className="bg-gradient-to-br from-green-100 to-green-200 hover:ring-green-400 rounded-md py-2 mt-6 px-3 transition-colors ring-green-300 text-green-600">
                            save changes
                           </button>
                        </div>
                    </div>
                   
                 {/** right panel from */}
                 <div className="lg:col-span-1 w-120 ml-8 lg:mt-0 mt-6">
                    <div className="relative">
                        <div className="absolute bottom-3 left-0 right-0 flex items-center gap-2 justofy-end">
                            {resumeData.public && (
                                <button onClick={handleShare} className="flex items-center p-2 px-4 gap-2 bg-gradient-to-br from-blue-100 to-blue-200
                                text-blue-600 rounded-lg">
                                    <Share2 className="size-4"/>

                                </button>
                            )}
                            <button onClick={changeResumeVisibility} className="flex items-center p-2 px-4 gap-2 bg-gradient-to-br from-purple-100 to-purple-200">
                                {resumeData.public ? <EyeIcon className="size-4"/> : <EyeOffIcon className="size-4"/>}
                                {resumeData.public ? 'public' : 'private'}

                            </button>
                            <button onClick={downloadResume} className="flex items-center bg-gradient-to-br from-green-100 to-green-200 rounded-lg gap-2 px-6 py-2">
                           <Download className="size-4"/> Download
                            </button>

                        </div>
                        
                    </div>
                     {/** resume preview */}
                     <ResumePreview data={resumeData} template={resumeData.template} assentColor={resumeData.accect_color} />
                   </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default ResumeBuilder