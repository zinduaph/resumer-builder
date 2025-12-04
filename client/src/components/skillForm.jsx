import { Plus, Sparkles, X } from "lucide-react"
import { useState } from "react"


const Skills = ({data = [], onChange}) => {
    const [newSkill, setNewSkill] = useState('')

    const addSkill = () => {
        
        const val = newSkill.trim()
        if (val && !data.includes(val)) {
            
            onChange([...data, val])
            setNewSkill('')

        } else {
       
        }
    }

    const removeSkill = (indexToRemove) => {
        onChange(data.filter((_, index) => index !== indexToRemove))
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addSkill()
        }
    }
    return(
        <>
        <div className="space-y-4">
            <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">skills</h3>
                <p className="text-gray-500">add your technical and soft skills</p>
            </div>

            <div className="flex gap-2">
                <input type="text" placeholder="enter a skill (eg, javascript or project management)"
                className=" flex-1 py-3 px-2" value={newSkill} onKeyDown={handleKeyPress} onChange={(e)=> setNewSkill(e.target.value)}/>
                <button onClick={addSkill} disabled={!newSkill.trim()} 
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                 <Plus className="size-4" /> add
                </button>
            </div>

            {data.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                    {data.map((skill,index)=> (
                        <span key={index} className="flex items-center gap-1 px-3 py-1 bg-blue-100
                        text-blue-800 rounded-full text-sm">
                         {skill}
                         <button onClick={()=> removeSkill(index)} className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transiton-colors">
                            <X className="w-3 h-3"/>

                         </button>
                        </span>
                    ))}

                </div>

            ):
             (
                <div className="text-center py-6 text-gray-500">
                    <Sparkles className="w-10 h-10 mx-auto mb-2 text-gray-300"/>
                    <p>no skills added yet</p>
                    <p className="text-sm">Add both technical and soft skills above</p>

                </div>

            )}

            <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-blue-800 text-sm"><strong>Tip:</strong> Add 8-12 relevant skills. include both technical skills (programming languages,tools) and soft skills(leadership,communication)</p>
            </div>

        </div>

        </>
    )
}
export default Skills