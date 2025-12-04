import { LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, UploadIcon, XIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { dummyData } from "../assets/asset"
import {useNavigate} from 'react-router-dom'
import { useSelector } from "react-redux"
import api from "../configs/api"
import toast from "react-hot-toast"
import { pdfToText } from "react-pdftotext"
const Dashboard = () => {
    const user = useSelector(state => state.auth)

    const [allResume, setAllResume] = useState([])
    const [createResume,setCreateResume] = useState(false)
    const [uploadResume,setUploadResume] = useState(false)
     const [title,setTitle] = useState('')
      const [resume,setResume] = useState(null)
       const [editResumeId,setEditResumeId] = useState('')
       const[isLoading, setLoading] = useState(false)
       const navigate = useNavigate()
    
    const loadResume = async () => {
       const token = localStorage.getItem('token')
       try {
        const {data} = await api.get('/api/users/resumes',{headers:{Authorization:token}})
        setAllResume(data.resumes)
       } catch (error) {
         toast.error(error?.response?.data?.message || error.message)
       }
    }
    useEffect(() => {
    loadResume()
    },[])

    const makeResume = async (event) => {
     event.preventDefault()
     const token = localStorage.getItem('token')
     try {
        const {data} = await api.post('/api/resumes/create',{title},{headers:{Authorization:token}})
        setAllResume([...allResume, data.resume])
        setCreateResume(false)
        setTitle('')
        navigate(`/app/builder/${data.resume._id}`)
     } catch (error) {
        toast.error(error?.response?.data?.message || error.message)

     }
    }
    const creatUploadResume = async (e) => {
    e.preventDefault()
     setLoading(true)
     try {
         const token = localStorage.getItem('token')
         const resumeText = await pdfToText(resume)
          const {data} = await api.post('/api/ai/upoad-resume',{title,resumeText},{headers:{Authorization:token}})
          setTitle('')
          setResume(null)
          navigate(`/app/builder/${data.resumeId}`)
          setCreateResume(false)
     } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
     }
     setLoading(false)
    }
    const editTitle = async(e) => {
         e.preventDefault()
         try {
          const {data} = await api.put(`/api/resumes/update`,{resumeId:editResumeId,resumeData:{title}},{headers:{Authorization:token}})  
          setAllResume(allResume.map((resume) => resume._id === editResumeId ? {...resume,title} : resume))
          setTitle('')
          setEditResumeId('')
          toast.success(data.success)
         } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
         }
    }
    const deleteResume = async (resumeId) => {
      try {
        const token = localStorage.getItem('token')
        const confirm = window.confirm('Are you sure you want to delete this resume')
      if(confirm) {
       const {data} = await api.delete(`/api/resumes/delete/${resumeId}`,{headers:{Authorization:token}})
       setAllResume(allResume.filter((resume) => resume._id !== resumeId))
       console.log(resume)
       toast.success(data.success)
      }
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message)
      }
    }
        return (
        <>
        <div>
            <div className="max-w-7xl max-auto px-4 py-8">
              

              <div className="flex gap-4">
                <button onClick={() => setCreateResume(true)} className="w-full bg-white sm:max-w-36 cursor-pointer h-48 flex flex-col items-center justify-center rounded-lg
                border border-dashed border-slate-600">
                    <PlusIcon className="size-11 text-white rounded-full bg-orange-300"/>
                    <p className="text-sm group-hover:text-orange-500 transtion-all duration-300">create resume</p>
                </button>
                <button onClick={()=> setUploadResume(true)} className="w-full bg-white sm:max-w-36 cursor-pointer h-48 flex flex-col items-center justify-center rounded-lg
                border border-dashed border-slate-600">
                    <UploadCloudIcon className="size-11 text-white rounded-full bg-purple-300"/>
                    <p className="text-sm group-hover:text-orange-500 transtion-all duration-300">upload resume</p>
                </button>


              </div>
            </div>

            <hr className="border-slate-300 my-6 sm:w-[305-px]"/>

            <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
                {allResume && allResume.map((resume, index) => (
                   <button key={index} onClick={() => navigate(`/app/builder/${resume._id}`)} className="relative w-full sm:max-w-36 h-48 flex ml-5 flex-col items-center justify-center
                   rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <p className="group-hover:scale-105 transition-all px-2 text-center">{resume.title || resume.name}</p>
                      <p className="absolute bottom-1 text-slate-400 group-hover:text-slate-500
                      duration-300 text-center px-2 transition-all">updated on {resume.updatedAt ? new Date(resume.updatedAt).toLocaleDateString() : new Date().toLocaleDateString()}</p>
                      <div onClick={e => e.stopPropagation()} className="absolute top-1 right-1 group-hover:flex items-center hidden">
                          <TrashIcon onClick={()=> deleteResume(resume._id)} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700" />
                          <PencilIcon onClick={()=> {setEditResumeId(resume._id); setTitle(resume.title)}} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700" />
                      </div>
                   </button>
                ))}

            </div>
             
             {createResume && (
                <form onSubmit={ makeResume} onClick={()=> setCreateResume(false)} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
                    <div onClick={e => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-100
                    maw-w-sm p-6">
                        <h2 className="text-center text-2xl text-gray-700">create resume</h2>
                        <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="enter your resume" className="w-full outline-none px-4 py- mb-4 border focus:border-orange-500 ring-orange-400" required/>
                     <button className="w-full py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
                        create resume
                     </button>
                     <XIcon onClick={() => {setCreateResume(false); setTitle('')}} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cusor-pointer transition-colors"/>
                    </div>
                </form>
             )}
             
             {uploadResume && (
                <form onSubmit={ creatUploadResume} onClick={()=> setUploadResume(false)} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
                    <div onClick={e => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-100
                    maw-w-sm p-6">
                        <h2 className="text-center text-2xl text-gray-700">upload resume</h2>
                        <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="enter your resume" className="w-full outline-none px-4 py- mb-4 border focus:border-orange-500 ring-orange-400" required/>
                        <div>
                            <label className="block text-sm text-slate-700" htmlFor="resume-input">
                                select resume
                                <div className="flex flex-col items-center justify-center gap-2 border group
                                text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-orange-500
                                hover:text-orannge-600 cursor-pointer transition-colors">
                                    {resume ? (
                                        <p>{resume.nmae || resume.title}</p>
                                    ) : (
                                       <>
                                        <UploadCloud />
                                        <p>upload resume</p>
                                       </>
                                    )}

                                </div>
                            </label>
                            <input type="file" id="resume-input" accept=".pdf" hidden
                            onChange={(e) => setResume(e.target.files[0])} />
                        </div>
                     <button disabled={isLoading} className="w-full py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                        {isLoading && <LoaderCircleIcon className="animate-spin size-4 text-white"/>}
                          {isLoading ? 'uploading...' : 'upload resume'}
                     </button>
                     <XIcon onClick={() => {setUploadResume(false); setTitle('')}} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cusor-pointer transition-colors"/>
                    </div>
                </form>
             )}

             {editResumeId && (
                <form onSubmit={ editTitle} onClick={()=> setEditResumeId('')} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
                    <div onClick={e => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-100
                    maw-w-sm p-6">
                        <h2 className="text-center text-2xl text-gray-700">Edit resume title</h2>
                        <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="enter your resume" className="w-full outline-none px-4 py- mb-4 border focus:border-orange-500 ring-orange-400" required/>
                     <button className="w-full py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
                        update
                     </button>
                     <XIcon onClick={() => {setEditResumeId(''); setTitle('')}} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cusor-pointer transition-colors"/>
                    </div>
                </form>
             )}
        </div>
        </>
    )
}
export default Dashboard