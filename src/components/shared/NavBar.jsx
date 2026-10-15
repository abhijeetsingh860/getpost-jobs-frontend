import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
    LogOut, 
    User2, 
    Briefcase, 
    Sun, 
    Moon, 
    Bookmark, 
    PlusCircle, 
    Layers, 
    Building, 
    Menu, 
    X,
    Sparkles,
    CheckCircle2
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const { savedJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, setTheme } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message || "Logged out successfully");
            }
        } catch (error) {
            console.error("Logout error:", error);
            toast.error(error?.response?.data?.message || "Failed to logout");
        }
    };

    const isRecruiter = user?.role === 'recruiter';
    const isActive = (path) => location.pathname === path;

    const navLinkClass = (path) => `
        px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200
        ${isActive(path)
            ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400 font-semibold shadow-xs'
            : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
        }
    `;

    return (
        <header className='sticky top-0 z-50 bg-white/80 dark:bg-slate-900/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 shadow-xs'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8'>
                
                {/* Brand Logo */}
                <Link to="/" className="flex items-center gap-2.5 group">
                    <div className='relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-fuchsia-600 text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200'>
                        <Briefcase className='h-5 w-5' />
                        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-fuchsia-500"></span>
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className='text-xl font-black tracking-tight text-slate-900 dark:text-white'>
                            GetPost<span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600'>Jobs</span>
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1 flex items-center gap-1">
                            Career Portal <Sparkles className="w-2.5 h-2.5 text-amber-500 inline" />
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav Links */}
                <nav className='hidden md:flex items-center gap-1 lg:gap-2'>
                    {isRecruiter ? (
                        <>
                            <Link to="/admin/companies" className={navLinkClass('/admin/companies')}>
                                <Building className="w-4 h-4 inline mr-1.5" />
                                Companies
                            </Link>
                            <Link to="/admin/jobs" className={navLinkClass('/admin/jobs')}>
                                <Layers className="w-4 h-4 inline mr-1.5" />
                                Manage Jobs
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/" className={navLinkClass('/')}>
                                Home
                            </Link>
                            <Link to="/jobs" className={navLinkClass('/jobs')}>
                                Find Jobs
                            </Link>
                            <Link to="/browse" className={navLinkClass('/browse')}>
                                Browse Categories
                            </Link>
                            {user && (
                                <Link to="/profile" className={navLinkClass('/profile')}>
                                    <Bookmark className="w-4 h-4 inline mr-1" />
                                    Saved ({savedJobs?.length || user?.savedJobs?.length || 0})
                                </Link>
                            )}
                        </>
                    )}
                </nav>

                {/* Right Actions */}
                <div className='flex items-center gap-3'>
                    
                    {/* Recruiter "Post a Job" quick CTA */}
                    {isRecruiter && (
                        <Link to="/admin/jobs/create" className="hidden sm:inline-flex">
                            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full shadow-md shadow-indigo-500/20 px-4 py-2 text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 hover:scale-105">
                                <PlusCircle className="w-4 h-4" />
                                Post a Job
                            </Button>
                        </Link>
                    )}

                    {/* Dark/Light Mode Toggle */}
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className='p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-700 transition-all duration-200 border border-slate-200/50 dark:border-slate-700/50'
                        aria-label="Toggle theme"
                        title="Toggle dark/light mode"
                    >
                        {theme === 'dark' ? (
                            <Sun className='h-4 w-4 text-amber-400' />
                        ) : (
                            <Moon className='h-4 w-4 text-slate-600' />
                        )}
                    </button>

                    {/* Auth Status / Profile */}
                    {!user ? (
                        <div className='flex items-center gap-2'>
                            <Link to="/login">
                                <Button variant="ghost" className='text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium rounded-full text-sm px-4'>
                                    Sign In
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-700 hover:to-fuchsia-700 text-white rounded-full px-5 py-2 text-sm font-semibold shadow-md shadow-indigo-500/20 transition-all duration-200 hover:scale-105">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className='flex items-center gap-2 p-1.5 pr-3 rounded-full border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 bg-slate-50/80 dark:bg-slate-800/60 transition-all duration-200 group'>
                                    <Avatar className="h-8 w-8 ring-2 ring-indigo-500/20 group-hover:ring-indigo-500">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                        <AvatarFallback className="bg-indigo-600 text-white font-bold text-xs">
                                            {user?.fullname?.charAt(0) || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="hidden sm:flex flex-col text-left">
                                        <span className='text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight'>
                                            {user?.fullname?.split(' ')[0]}
                                        </span>
                                        <span className='text-[10px] text-slate-400 capitalize'>
                                            {user?.role}
                                        </span>
                                    </div>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-5 shadow-2xl rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl" align="end">
                                <div className='flex items-center gap-3.5 pb-4 border-b border-slate-100 dark:border-slate-800'>
                                    <Avatar className="h-12 w-12 ring-2 ring-indigo-500/20">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                        <AvatarFallback className="bg-indigo-600 text-white font-bold text-lg">
                                            {user?.fullname?.charAt(0) || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <h4 className='font-bold text-slate-900 dark:text-white truncate text-sm'>
                                                {user?.fullname}
                                            </h4>
                                            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                                        </div>
                                        <p className='text-xs text-slate-500 dark:text-slate-400 truncate'>
                                            {user?.email}
                                        </p>
                                        <span className='inline-block text-[10px] font-semibold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full mt-1.5'>
                                            {user?.role} Account
                                        </span>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-1 pt-3'>
                                    {isRecruiter ? (
                                        <>
                                            <Link 
                                                to="/admin/companies" 
                                                className='flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors'
                                            >
                                                <Building className='w-4 h-4 text-indigo-500' />
                                                Manage Registered Companies
                                            </Link>
                                            <Link 
                                                to="/admin/jobs" 
                                                className='flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors'
                                            >
                                                <Layers className='w-4 h-4 text-indigo-500' />
                                                Job Postings & Applicants
                                            </Link>
                                            <Link 
                                                to="/admin/jobs/create" 
                                                className='flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors'
                                            >
                                                <PlusCircle className='w-4 h-4 text-indigo-500' />
                                                Create New Job Opening
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link 
                                                to="/profile" 
                                                className='flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors'
                                            >
                                                <User2 className='w-4 h-4 text-indigo-500' />
                                                My Profile & Resumes
                                            </Link>
                                            <Link 
                                                to="/jobs" 
                                                className='flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors'
                                            >
                                                <Briefcase className='w-4 h-4 text-indigo-500' />
                                                Browse All Opportunities
                                            </Link>
                                        </>
                                    )}

                                    <button 
                                        onClick={logoutHandler} 
                                        className='flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left mt-2 border-t border-slate-100 dark:border-slate-800'
                                    >
                                        <LogOut className='w-4 h-4 text-rose-500' />
                                        Sign Out
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className='md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    >
                        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
                <div className='md:hidden px-4 pt-2 pb-4 space-y-2 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 backdrop-blur-xl'>
                    {isRecruiter ? (
                        <>
                            <Link 
                                to="/admin/companies" 
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                Companies
                            </Link>
                            <Link 
                                to="/admin/jobs" 
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                Job Postings
                            </Link>
                            <Link 
                                to="/admin/jobs/create" 
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2 rounded-lg text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40"
                            >
                                + Post a Job
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link 
                                to="/" 
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                Home
                            </Link>
                            <Link 
                                to="/jobs" 
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                Find Jobs
                            </Link>
                            <Link 
                                to="/browse" 
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                Browse Categories
                            </Link>
                            {user && (
                                <Link 
                                    to="/profile" 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                                >
                                    Saved Jobs & Profile
                                </Link>
                            )}
                        </>
                    )}
                </div>
            )}
        </header>
    );
};

export default Navbar;