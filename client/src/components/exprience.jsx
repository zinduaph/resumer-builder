import { Briefcase, Loader2, Plus, Sparkles, Trash, Trash2 } from "lucide-react"
import { useState } from "react"
import { useSelector } from "react-redux"
import api from "../configs/api"
import toast from "react-hot-toast"


const Exprience = ({data=[],onChange}) => {

  const {token} = useSelector(state => state.auth)
  const [genaratingIndex,SetGenaratingIndex] = useState(-1)

    const addExperience = () => {
        const newExperience = {
            company: '',
            position: '',
            start_date: '',
            end_date:'',
            description: '',
            is_current: false
        }
        onChange([...data, newExperience])
    }

    const removeExperience = (index) => {
        const updated = data.filter((_, i) => i !== index)
        onChange(updated)
    }

    const updatedExperience = (index, field, value) => {
        const updated = [...data]
        updated[index] = {...updated[index], [field]: value}
        onChange(updated)
    }

    const genarateDescription = async (index) => {
      SetGenaratingIndex(index)
      const exprience = data[index]
      const prompt = `enhance this job description ${exprience.description} for the experience of 
      this ${exprience.position } at ${exprience.company}`
      try {
        const data = await api.post('/api/ai/enhance-job-des',{userContent:prompt},{headers:{Authorization:token}})
        updatedExperience(index, "description",data.enhancedContent)
      } catch (error) {
        toast.error(error.message)
      } finally {
        SetGenaratingIndex(-1)
      }

    }
    return (
        <>
        <div className="space-y-6">
             <div className="flex items-center justify-between">

                <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">proffesinal Exprience</h3>
                <p className="text-gray-500">add your job exprience</p>
            </div>

            <button onClick={addExperience} className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-500 rounded hover:bg-purple-200
            transition-colors ">
                <Plus className="size-4" />
                Add Expirience

            </button>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-800">
                  <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300"/>
                  <p>No work expirience added yet</p>
                  <p className="text-sm">click 'Add Expirience' to get started</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((exprience,index) => (
                       <div key={index} className="p-4 border border-gray-300 rounded-lg space-y-3">
                         <div className="flex justify-between items-start">
                       <h2>expirience # {index + 1}</h2>
                       <button onClick={()=> removeExperience(index)} className="text-red-500 hover:text-red-600 transition-colors">
                        <Trash2 className="size-4"/>
                       </button>
                        </div>
                          
                          <div className="grid  gap-3">
                            <input type="text" value={exprience.company || ''} onChange={(e)=> updatedExperience(index,"company",e.target.value)}
                            placeholder="company name" className="px-3 py-2 roundel-lg"/>
                            <input type="text" value={exprience.position || ''} onChange={(e)=> updatedExperience(index,"position",e.target.value)}
                            placeholder="job title" className="px-3 py-2 roundel-lg"/>

                            <input type="month" value={exprience.start_date || ''} onChange={(e)=> updatedExperience(index,"start_date",e.target.value)}
                            placeholder="start_data" className="px-3 py-2 roundel-lg"/>

                            <input type="month" value={exprience.end_date || ''} onChange={(e)=> updatedExperience(index,"end_date",e.target.value)}
                            placeholder="end_date" disabled={exprience.is_current} className="px-3 py-2 roundel-lg disable:bg-gray-100"/>

                          </div>
                          <label type='checkbox' checked={exprience.is_current || false} 
                          onChange={(e)=>{updatedExperience(index,"is_current",e.target.checked ? true : false)}}>

                          </label>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="font-medium text-gray-700">
                                  job description
                                </label>
                                <button onClick={()=> genarateDescription(index)} disabled={genaratingIndex === index || !exprience.position || !exprience.company} className="flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700
                                rounded hover:bg-purple-200 transition-colors disable:opacity-50">
                                  {genaratingIndex === index ? (
                                    <Loader2 className="w-3 h-3 animation-spin"/>
                                  ) : (<Sparkles className="w-3 h-3" />)}
                                  Enhance with AI
                                </button>

                            </div>
                            <textarea value={exprience.description || ""}
                             onChange={(e)=>updatedExperience(index,"description",e.target.value)}
                             className="px-3 py-2 w-100 rounded-lg risize-none" placeholder="Describe your key responsiblies and achivements"/>

                          </div>

                       </div>

                        
                    ))}

                </div>
            )}

        </div>
        </>
    )
}
export default Exprience