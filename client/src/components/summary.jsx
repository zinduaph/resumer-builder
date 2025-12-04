import { Loader2, Sparkles } from "lucide-react"
import { useState } from "react"
import { useSelector } from "react-redux"
import api from "../configs/api"
import toast from "react-hot-toast"


const Summary = ({data,onChange,setResumeData}) => {

    const {token} = useSelector(state => state.auth)
    const [isGenarating,setIsGenarating] = useState(false)

    const genarateSummary = async () => {
        try {
            setIsGenarating(true)
            const prompt = `enhance my proffecinal summary "${data}" `
            const response = await api.post('/api/ai/enhance-summary',{userContent:prompt},{headers:{Authorization:token}})
            
            // Debug: log the full response to see what structure we're getting
            console.log('Full response:', response)
            console.log('Response data:', response.data)
            
            // Handle different possible response structures
            const enhancedContent = response.data.enhancedContent || response.data.enhanceContent || response.data.content
            
            if (!enhancedContent || typeof enhancedContent !== 'string') {
                toast.error('Invalid response format from server')
                console.error('Expected string, got:', enhancedContent)
                return
            }
            
            setResumeData(prev => ({...prev, professional_summary: enhancedContent}))
            toast.success('Summary enhanced successfully')
        } catch (error) {
            console.error('Error enhancing summary:', error)
            toast.error(error.response?.data?.message || error.message || 'Failed to enhance summary')
        }
        finally {
            setIsGenarating(false)
        }
    }
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">

                <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">proffesinal summary</h3>
                <p className="text-gray-500">add your proffesinal summary here</p>
            </div>

            <button disabled={isGenarating} onClick={genarateSummary} className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-500 rounded hover:bg-purple-200
            transition-colors disable:opacity-50">
                {isGenarating ? (<Loader2 className="size-4 animate-spin"/>): ( <Sparkles className="size-4" />)}
               {isGenarating ? "enhancing...": "AI enhance"}
                

            </button>
            </div>

            <div className="mt-6">
                <textarea rows={7} onChange={(e) => onChange(e.target.value)}
                 value={data || ""} className="px-3 w-130 px-4 mt-2 border border-gray-300 rounded-lg outline-none
                 transition-colors risize-none" placeholder="write a compeling proffesinal summary that highlits your key strenght and carrea objectives..."
                 ></textarea>
                 <p>Tip:keep it cocise(3-4 sentences) and focus on the most relevant skills and achivments</p>

            </div>

        </div>
    )
}
export default Summary