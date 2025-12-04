import { GraduationCap, Plus, Trash2 } from "lucide-react"


const Education = ({data=[],onChange}) => {
    const addEducation = () => {
        const newEducation = {
            institution: '',
            degree: '',
            field: '',
            graduation_date:'',
            grade: '',
           
        }
        onChange([...data, newEducation])
    }

    const removeEducation = (index) => {
        const updated = data.filter((_, i) => i !== index)
        onChange(updated)
    }

    const updatedEducation = (index, field, value) => {
        const updated = [...data]
        updated[index] = {...updated[index], [field]: value}
        onChange(updated)
    }
   return (
     <>
    <div className="space-y-6">
         <div className="flex items-center justify-between">

                <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">Education</h3>
                <p className="text-gray-500">add your education details</p>
            </div>

            <button onClick={addEducation} className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-500 rounded hover:bg-purple-200
            transition-colors ">
                <Plus className="size-4" />
                Add Education

            </button>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-800">
                  <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300"/>
                  <p>No education added yet</p>
                  <p className="text-sm">click 'Add Education' to get started</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((education,index) => (
                       <div key={index} className="p-4 border border-gray-300 rounded-lg space-y-3">
                         <div className="flex justify-between items-start">
                       <h2>education # {index + 1}</h2>
                       <button onClick={()=> removeEducation(index)} className="text-red-500 hover:text-red-600 transition-colors">
                        <Trash2 className="size-4"/>
                       </button>
                        </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <input type="text" value={education.institution || ''} onChange={(e)=> updatedEducation(index,"institution",e.target.value)}
                            placeholder="institution's name" className="px-3 py-2 roundel-lg"/>
                             
                            <input type="text" value={education.degree || ''} onChange={(e)=> updatedEducation(index,"degree",e.target.value)}
                            placeholder="degree" className="px-3 py-2 roundel-lg"/>

                            <input type="text" value={education.field || ''} onChange={(e)=> updatedEducation(index,"field",e.target.value)}
                            placeholder="field you stdudied" className="px-3 py-2 roundel-lg"/>

                            <input type="month" value={education.graduation_date || ''} onChange={(e)=> updatedEducation(index,"graduation_date",e.target.value)}
                            placeholder="graduation_date"  className="px-3 py-2 roundel-lg disable:bg-gray-100"/>

                             <input type="text" value={education.grade || ''} onChange={(e)=> updatedEducation(index,"grade",e.target.value)}
                            placeholder="your garde(optional)" className="px-3 py-2 rounded-lg"/>


                          </div>
                       

                       </div>

                        
                    ))}

                </div>
            )}


    </div>
    </>
   )
}
export default Education