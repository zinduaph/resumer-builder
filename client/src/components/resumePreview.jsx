import ClassicTemplate from './templates/ClassicTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import ModernTemplate from './templates/ModernTemplate'


const ResumePreview = ({data,template,accentColor,classes = ''}) => {

    const renderTemplate = () => {
        switch (template) {
            case 'Modern':
                return <ModernTemplate data={data} accentColor={accentColor} />;
            case 'minimal':
                return <MinimalTemplate data={data} accentColor={accentColor} />;
            case 'minimalImage':
                return <MinimalImageTemplate data={data} accentColor={accentColor} />;

            default:
                return <ClassicTemplate data={data} accentColor={accentColor}/>
        }
    }
    return (
        <>
        <div className=' bg-gray-100 '>
            <div id='resume-preview' className={"border border-gray-200 print:shadow-none print:border-none " + classes}>
                {renderTemplate()}

            </div>
             <style >
                {`
                @page {
               size:letter;
                margin: 0;
                }`}
             </style>
        </div>

        </>
    )
}
export default ResumePreview