import { BriefcaseBusiness, Linkedin, Mail, MapPin, Phone, User, WholeWord } from "lucide-react"


const PresonalInfo = ({data=[],onChange,removeBackground,setRemoveBackground}) => {
    const handleChange = (field,value) => {
       onChange({...data, [field] : value})
    }
    const fields = [
        {key:"full_name", label: 'full name',icon: User, type: 'text', required: true},
        {key:"email", label: 'email addres',icon: Mail, type: 'email', required: true},
        {key:"phone", label: 'phone number',icon: Phone, type: 'tel' },
        {key:"location", label: 'location',icon: MapPin, type: 'text', },
        {key:"profession", label: 'profession',icon: BriefcaseBusiness, type: 'text', },
        {key:"linkedin", label: 'linkedin-profile',icon: Linkedin, type: 'url', },
        {key:"website", label: 'proffesinal-website',icon: WholeWord, type: 'url', }
    ]
    return (
        <>
         <div>
            <h3>personal information</h3>
            <p>Get started  with personal infromation</p>

            <div className="flex items-center gap-2">
                <label >
                    {data.image ? (
                        <img src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)}
                        className="w-16 h-16 object-cover rounded-full mt-5 ring ring-slate-300 hover:opacity-80"></img>
                    ) : (
                        <div>
                            <User className="size-10 border rounded-full" />
                        </div>
                    )}
                    <input type="file" accept="image/jpeg  image/png" className="hidden" 
                    onChange={(e) => handleChange('image',e.target.files[0])}/>
                </label>
                 {typeof data.image === 'object' && (
                    <div className="flex flex-col gap-1 pl-4 text-sm">
                        <p>remove background</p>
                        <label className="relative inline-flex items-center cursor-pointer text-gray-900">
                            <input type="checkbox" className="sr-only peer"
                             onChange={()=> setRemoveBackground(prev => !prev)} checked={removeBackground} />
                             <div className="w-9 h-5 bg-slate-500 rounded-full peer peer-checked:bg-orange-500 transition-colors">
                               <span className="dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-trsansfrom duration-200
                               ease-in-out peer:checked:translate-x-4"></span>
                             </div>
                        </label>
                    </div>
                 )}
            </div>

            {fields.map((field) => {
                const Icon = field.icon
                return (
                    <div key={field.key} className="space-y-1 mt-5">
                        <label className="flex items-center gap-2 font-medium text-gray-600" >
                            <Icon className='size-4'/>
                            {field.label}
                            {field.required && <span className="text-red-500">*</span>}

                        </label>
                        <input type={field.type} value={data[field.key] || ""} 
                         onChange={(e) => handleChange(field.key,e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 
                         rounded-lg ring:focus focus:ring-blue-500 focus:ring-border-blue-50 outline-none transition-colors "
                         placeholder={`please enter your ${field.label.toLocaleLowerCase()}`} required={field.required} />

                    </div>
                )
            })}
         </div>
        </>
    )
}
export default PresonalInfo