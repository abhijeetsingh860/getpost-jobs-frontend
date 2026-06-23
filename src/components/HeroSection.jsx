// import React, { useState } from 'react'
// import { Button } from './ui/button'
// import { Search, Briefcase, Users, Building2 } from 'lucide-react'
// import { useDispatch } from 'react-redux';
// import { setSearchedQuery } from '@/redux/jobSlice';
// import { useNavigate } from 'react-router-dom';

// const HeroSection = () => {
//     const [query, setQuery] = useState("");
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const searchJobHandler = () => {
//         dispatch(setSearchedQuery(query));
//         navigate("/browse");
//     }

//     return (
//         <div className='relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-orange-50'>

//             {/* Background decorative circles */}
//             <div className='absolute top-10 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse'></div>
//             <div className='absolute top-10 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse'></div>
//             <div className='absolute bottom-10 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse'></div>

//             <div className='relative text-center py-20 px-4'>

//                 {/* Badge */}
//                 <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md border border-purple-100 mb-6'>
//                     <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></span>
//                     <span className='text-sm font-medium text-[#F83002]'>India's #1 Trusted Job Platform</span>
//                 </div>

//                 {/* Heading */}
//                 <h1 className='text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6'>
//                     Find Your <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#6A38C2] to-[#F83002]'>Dream Job</span>
//                     <br />
//                     <span className='text-4xl md:text-5xl'>& Build Your Career 🚀</span>
//                 </h1>

//                 {/* Subtitle */}
//                 <p className='text-lg text-gray-500 max-w-2xl mx-auto mb-10'>
//                     Connect with <span className='font-semibold text-gray-700'>top companies</span> hiring right now. 
//                     Find jobs that match your skills, passion and goals.
//                 </p>

//                 {/* Search Bar */}
//                 <div className='flex w-full max-w-2xl mx-auto shadow-xl border border-gray-200 bg-white pl-5 rounded-full items-center gap-4 mb-12 hover:shadow-2xl transition-shadow duration-300'>
//                     <Search className='h-5 w-5 text-gray-400' />
//                     <input
//                         type="text"
//                         placeholder='Job title, skills or company...'
//                         onChange={(e) => setQuery(e.target.value)}
//                         onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
//                         className='outline-none border-none w-full py-4 text-gray-700 placeholder:text-gray-400 bg-transparent'
//                     />
//                     <Button 
//                         onClick={searchJobHandler} 
//                         className="rounded-full px-8 py-6 bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] hover:from-[#5b30a6] hover:to-[#7C3AED] text-white font-semibold transition-all duration-300"
//                     >
//                         Search
//                     </Button>
//                 </div>

//                 {/* Stats */}
//                 <div className='flex flex-wrap justify-center gap-8 mt-4'>
//                     <div className='flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-md border border-gray-100'>
//                         <Briefcase className='h-5 w-5 text-[#6A38C2]' />
//                         <span className='text-sm font-semibold text-gray-700'>1000+ Jobs Posted</span>
//                     </div>
//                     <div className='flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-md border border-gray-100'>
//                         <Building2 className='h-5 w-5 text-[#F83002]' />
//                         <span className='text-sm font-semibold text-gray-700'>500+ Companies</span>
//                     </div>
//                     <div className='flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-md border border-gray-100'>
//                         <Users className='h-5 w-5 text-green-500' />
//                         <span className='text-sm font-semibold text-gray-700'>10,000+ Students</span>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     )
// }



// export default HeroSection











import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, Briefcase, Users, Building2 } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-orange-50'>
            <div className='absolute top-10 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse'></div>
            <div className='absolute top-10 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse'></div>
            <div className='absolute bottom-10 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse'></div>

            <div className='relative text-center py-20 px-4'>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md border border-purple-100 mb-6'
                >
                    <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></span>
                    <span className='text-sm font-medium text-[#F83002]'>India's #1 Trusted Job Platform</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className='text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6'
                >
                    Find Your <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#6A38C2] to-[#F83002]'>Dream Job</span>
                    <br />
                    <span className='text-4xl md:text-5xl'>& Build Your Career 🚀</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className='text-lg text-gray-500 max-w-2xl mx-auto mb-10'
                >
                    Connect with <span className='font-semibold text-gray-700'>top companies</span> hiring right now.
                    Find jobs that match your skills, passion and goals.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className='flex w-full max-w-2xl mx-auto shadow-xl border border-gray-200 bg-white pl-5 rounded-full items-center gap-4 mb-12 hover:shadow-2xl transition-shadow duration-300'
                >
                    <Search className='h-5 w-5 text-gray-400' />
                    <input
                        type="text"
                        placeholder='Job title, skills or company...'
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
                        className='outline-none border-none w-full py-4 text-gray-700 placeholder:text-gray-400 bg-transparent'
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="rounded-full px-8 py-6 bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] hover:from-[#5b30a6] hover:to-[#7C3AED] text-white font-semibold transition-all duration-300"
                    >
                        Search
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className='flex flex-wrap justify-center gap-8 mt-4'
                >
                    {[
                        { icon: <Briefcase className='h-5 w-5 text-[#6A38C2]' />, text: '1000+ Jobs Posted' },
                        { icon: <Building2 className='h-5 w-5 text-[#F83002]' />, text: '500+ Companies' },
                        { icon: <Users className='h-5 w-5 text-green-500' />, text: '10,000+ Students' },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                            className='flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-md border border-gray-100'
                        >
                            {stat.icon}
                            <span className='text-sm font-semibold text-gray-700'>{stat.text}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export default HeroSection