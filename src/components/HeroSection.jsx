import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search, MapPin, Sparkles, TrendingUp, Building2, Users2, ArrowRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery, setSelectedLocation } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const popularKeywords = [
    { label: "Frontend", query: "Frontend" },
    { label: "Backend", query: "Backend" },
    { label: "Full Stack", query: "FullStack" },
    { label: "React", query: "React" },
    { label: "Node.js", query: "Node" },
    { label: "Remote", query: "Remote" },
    { label: "Data Analyst", query: "Data Analyst" },
];

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const [location, setLocation] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (customQuery = null, customLoc = null) => {
        const finalQuery = customQuery !== null ? customQuery : query;
        const finalLoc = customLoc !== null ? customLoc : location;

        dispatch(setSearchedQuery(finalQuery));
        if (finalLoc) dispatch(setSelectedLocation(finalLoc));
        navigate("/jobs");
    };

    return (
        <section className='relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-purple-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-20 lg:py-28 transition-colors duration-300'>
            
            {/* Ambient Background Light Blobs */}
            <div className='absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-indigo-400/20 to-fuchsia-400/20 dark:from-indigo-600/10 dark:to-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10' />
            <div className='absolute top-10 right-10 w-96 h-96 bg-purple-300/15 dark:bg-purple-900/10 rounded-full blur-3xl pointer-events-none -z-10' />

            <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
                
                {/* Live Pill Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-800/90 border border-indigo-100 dark:border-slate-700 shadow-sm text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-8 backdrop-blur-md'
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>Over 1,200+ Verified Tech Openings Just Added</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                </motion.div>

                {/* Hero Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className='text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6'
                >
                    Land Your Dream Role. <br className="hidden sm:inline" />
                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 dark:from-indigo-400 dark:via-purple-400 dark:to-fuchsia-400'>
                        Build The Future.
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className='text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal'
                >
                    Connect directly with fast-growing startups and global tech giants. Skip the gatekeepers and apply in 1-click.
                </motion.p>

                {/* Interactive Multi-Field Search Bar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className='max-w-3xl mx-auto p-2 bg-white dark:bg-slate-900/90 rounded-2xl sm:rounded-full shadow-xl shadow-indigo-500/10 dark:shadow-black/40 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-6'
                >
                    {/* Role / Keyword Input */}
                    <div className='flex items-center gap-3 px-4 py-2 sm:py-0 flex-1 border-b sm:border-b-0 sm:border-r border-slate-100 dark:border-slate-800'>
                        <Search className='w-5 h-5 text-indigo-500 shrink-0' />
                        <input
                            type="text"
                            placeholder='Job title, skill, or keyword...'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
                            className='w-full py-2 bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 outline-none'
                        />
                    </div>

                    {/* Location Input */}
                    <div className='flex items-center gap-3 px-4 py-2 sm:py-0 sm:w-56'>
                        <MapPin className='w-5 h-5 text-fuchsia-500 shrink-0' />
                        <input
                            type="text"
                            placeholder='Location (e.g. Remote)'
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
                            className='w-full py-2 bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 outline-none'
                        />
                    </div>

                    {/* Search CTA */}
                    <Button
                        onClick={() => searchJobHandler()}
                        className='bg-gradient-to-r from-indigo-600 via-indigo-500 to-fuchsia-600 hover:from-indigo-700 hover:to-fuchsia-700 text-white font-semibold rounded-xl sm:rounded-full px-7 py-6 text-sm shadow-md shadow-indigo-500/25 transition-all duration-200 hover:scale-102 flex items-center justify-center gap-2'
                    >
                        <span>Search Jobs</span>
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </motion.div>

                {/* Popular Keywords Chips */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className='flex items-center justify-center gap-2 flex-wrap text-xs text-slate-500 dark:text-slate-400 mb-14'
                >
                    <span className="font-medium text-slate-600 dark:text-slate-300">Trending Searches:</span>
                    {popularKeywords.map((tag) => (
                        <button
                            key={tag.label}
                            onClick={() => {
                                setQuery(tag.query);
                                searchJobHandler(tag.query);
                            }}
                            className='px-3 py-1 rounded-full bg-white/70 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-600 dark:text-slate-300 transition-colors shadow-2xs'
                        >
                            {tag.label}
                        </button>
                    ))}
                </motion.div>

                {/* Floating Metric Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className='grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto'
                >
                    {[
                        { 
                            icon: <TrendingUp className='w-5 h-5 text-indigo-500' />, 
                            title: '1,500+ Active Roles', 
                            desc: 'Updated hourly' 
                        },
                        { 
                            icon: <Building2 className='w-5 h-5 text-fuchsia-500' />, 
                            title: '500+ Verified Companies', 
                            desc: 'From Seed to Pre-IPO' 
                        },
                        { 
                            icon: <Users2 className='w-5 h-5 text-emerald-500' />, 
                            title: '15,000+ Job Seekers', 
                            desc: 'Hired in 2026' 
                        },
                        { 
                            icon: <Sparkles className='w-5 h-5 text-amber-500' />, 
                            title: 'Direct Recruiter DM', 
                            desc: 'Zero recruiter spam' 
                        },
                    ].map((item, idx) => (
                        <div 
                            key={idx}
                            className='p-4 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 shadow-sm backdrop-blur-md flex items-center gap-3 text-left'
                        >
                            <div className='p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0'>
                                {item.icon}
                            </div>
                            <div>
                                <h4 className='text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight'>
                                    {item.title}
                                </h4>
                                <p className='text-[11px] text-slate-500 dark:text-slate-400'>
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default HeroSection;