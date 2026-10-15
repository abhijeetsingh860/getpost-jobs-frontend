import React from 'react';
import { Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-950/80 backdrop-blur-xl py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-fuchsia-600 text-white">
                                <Briefcase className="h-4 w-4" />
                            </div>
                            <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                                GetPost<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">Jobs</span>
                            </span>
                        </Link>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
                            A next-generation career platform connecting exceptional engineers, designers, and innovators with high-impact startups and leading tech companies.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                            For Job Seekers
                        </h4>
                        <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                            <li><Link to="/jobs" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Explore All Jobs</Link></li>
                            <li><Link to="/browse" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Browse By Tech Stack</Link></li>
                            <li><Link to="/profile" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Saved Bookmarks</Link></li>
                        </ul>
                    </div>

                    {/* Recruiter */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                            For Recruiters
                        </h4>
                        <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                            <li><Link to="/admin/jobs/create" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Post an Opportunity</Link></li>
                            <li><Link to="/admin/companies" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Register Company</Link></li>
                            <li><Link to="/admin/jobs" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Applicant Dashboard</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Centered Bottom Bar */}
                <div className="pt-8 border-t border-slate-200/60 dark:border-slate-800/80 flex flex-col items-center justify-center gap-3.5 text-center">
                    
                    {/* Developer Highlight Pill with gradual shifting gradient */}
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs backdrop-blur-md animate-gradient-border">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 animate-dot-glow"></span>
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                            Crafted & Developed by
                        </span>
                        <a 
                            href="https://github.com/abhijeetsingh860" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-xs font-extrabold animate-gradient-flow hover:opacity-85 transition-opacity"
                        >
                            Abhijeet Singh
                        </a>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex items-center space-x-3 text-slate-400">
                        <a 
                            href="https://github.com/abhijeetsingh860" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="p-2 rounded-xl hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-indigo-400 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700/60" 
                            aria-label="GitHub Profile"
                            title="GitHub - Abhijeet Singh"
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                        </a>
                        <a 
                            href="https://linkedin.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="p-2 rounded-xl hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-indigo-400 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700/60" 
                            aria-label="LinkedIn"
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
                        <a 
                            href="https://twitter.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="p-2 rounded-xl hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-indigo-400 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700/60" 
                            aria-label="Twitter / X"
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>
                    </div>

                    {/* Copyright statement */}
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        © {new Date().getFullYear()} <span className="font-semibold text-slate-700 dark:text-slate-200">GetPost Jobs</span>. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;