import logo from '../../assets/plan-list-svgrepo-com.svg'
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Hero = () => {

    const [menuOpen, setMenuOpen] = React.useState(false);
    const {user} = useSelector(state => state.auth)
    const logos = [
        'https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/framer.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg',
    ]

    return (
        <>
            <div className="min-h-screen pb-20">
                {/* Navbar */}
                <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
                    <a href="/">
                        <img src={logo} className='w-15' alt="" />
                    </a>

                    <div className="hidden md:flex items-center gap-8 transition duration-500 text-slate-800">
                        <a href="#" className="hover:text-indigo-600 transition">Home</a>
                        <a href="#features" className="hover:text-indigo-600 transition">Features</a>
                        <a href="#testimonials" className="hover:text-indigo-600 transition">Testimonials</a>
                        <a href="#cta" className="hover:text-indigo-600 transition">Contact</a>
                    </div>

                    <div className="flex gap-2">
                        < Link to={'/app?state=register'} hidden={user} className="hidden md:block px-6 py-2 bg-indigo-500 hover:bg-indigo-700 active:scale-95 transition-all rounded-full text-white">
                            Get started
                        </Link>
                        <Link to={'/app?state=login'} hidden={user} className="hidden md:block px-6 py-2 border active:scale-95 hover:bg-slate-50 transition-all rounded-full text-slate-700 hover:text-slate-900" >
                            Login
                        </Link>
                        <Link to={'/app'} hidden={!user} className='hidden md:block px-8 py-2 bg-slate-200 hover:bg-orange-500 active-scale-95 rounded-full text-gray-400 hover:text-white transition'>
                        Dashboard
                        </Link>
                    </div>

                    <button onClick={() => setMenuOpen(true)} className="md:hidden active:scale-90 transition" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-menu" >
                            <path d="M4 5h16M4 12h16M4 19h16" />
                        </svg>
                    </button>
                </nav>

                {/* Mobile Menu */}
                <div className={`fixed inset-0 z-[100] bg-black/40 text-black backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`} >
                    <a href="/" className="text-white">Home</a>
                    <a href="/products" className="text-white">Products</a>
                    <a href="/stories" className="text-white">Stories</a>
                    <a href="/pricing" className="text-white">Pricing</a>
                    <button onClick={() => setMenuOpen(false)} className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-md flex" >
                        X
                    </button>
                </div>

                {/* Hero Section */}
                <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black">
                    <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-indigo-300 blur-[100px] opacity-30"></div>

                    {/* Avatars + Stars */}
                    <div className="flex items-center mt-24">
                        

                        
                    </div>

                    {/* Headline + CTA */}
                    <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-4 md:leading-[70px]">
                        Build stunning resumes with <span className=" bg-gradient-to-r from-indigo-700 to-indigo-600 bg-clip-text text-transparent text-nowrap">AI-powered </span> resume-builder.
                    </h1>

                    <p className="max-w-md text-center text-base my-7">Explore a growing library of over 320+ beautifully crafted, customizable components.</p>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-4 ">
                        <Link to='/app' className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-9 h-12 m-1 ring-offset-2 ring-1 ring-indigo-400 flex items-center transition-colors">
                            Get started
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-1 size-4" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        </Link>
                        
                    </div>

                    

                    
                </div>
            </div>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

                    * {
                        font-family: 'Poppins', sans-serif;
                    }
                `}
            </style>
        </>
    );
}
export default Hero;