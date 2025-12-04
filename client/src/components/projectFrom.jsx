import { Plus, Trash2 } from "lucide-react"


const Project = ({data=[],onChange}) => {

      
     const addProject = () => {
        const newProject = {
            name: '',
            type: '',
            description: '',


        }
        onChange([...data, newProject])
    }

    const removeProject = (index) => {
        const updated = data.filter((_, i) => i !== index)
        onChange(updated)
    }

    const updatedProject = (index, field, value) => {
        const updated = [...data]
        updated[index] = {...updated[index], [field]: value}
        onChange(updated)
    }
    return (
        <>
        <div className="">
         <div className="flex items-center justify-between">

                <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">projects</h3>
                <p className="text-gray-500">add your projects details</p>
            </div>

            <button onClick={addProject} className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-500 rounded hover:bg-purple-200
            transition-colors ">
                <Plus className="size-4" />
                Add Project

            </button>
            </div>

           
           
                <div className="space-y-4">
                    {data.map((project,index) => (
                       <div key={index} className="p-4 border border-gray-300 rounded-lg space-y-3">
                         <div className="flex justify-between items-start">
                       <h2>project # {index + 1}</h2>
                       <button onClick={()=> removeProject(index)} className="text-red-500 hover:text-red-600 transition-colors">
                        <Trash2 className="size-4"/>
                       </button>
                        </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <input type="text" value={project.name || ''} onChange={(e)=> updatedProject(index,"name",e.target.value)}
                            placeholder="projects's name" className="px-3 py-2 roundel-lg"/>
                             
                             <input type="text" value={project.type || ''} onChange={(e)=> updatedProject(index,"type",e.target.value)}
                            placeholder="project type" className="px-3 py-2 roundel-lg"/>
                             
                             <textarea rows={4} value={project.description || ''} onChange={(e)=> updatedProject(index,"description",e.target.value)}
                            placeholder="project's description" className="px-3 py-2 w-110 roundel-lg"/>
                             
                            
                          </div>
                       

                       </div>

                        
                    ))}

                </div>
           


    </div>

        </>
    )
}
export default Project