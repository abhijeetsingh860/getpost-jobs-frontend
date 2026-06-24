import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Briefcase, Sun, Moon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { useTheme } from 'next-themes'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                
                {/* Logo */}
                <Link to="/">
                    <div className='flex items-center gap-2'>
                        <div className='bg-gradient-to-r from-[#6A38C2] to-[#F83002] p-2 rounded-lg'>
                            <Briefcase className='h-5 w-5 text-white' />
                        </div>
                        <h1 className='text-2xl font-bold dark:text-white'>
                            GetPost<span className='text-transparent bg-clip-text bg-gradient-to-r from-[#6A38C2] to-[#F83002]'>Jobs</span>
                        </h1>
                    </div>
                </Link>

                {/* Nav Links + Buttons */}
                <div className='flex items-center gap-8'>
                    <ul className='flex font-medium items-center gap-6'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li>
                                    <Link to="/admin/companies" className='text-gray-600 dark:text-gray-300 hover:text-[#6A38C2] transition-colors duration-200 font-medium'>
                                        Companies
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/jobs" className='text-gray-600 dark:text-gray-300 hover:text-[#6A38C2] transition-colors duration-200 font-medium'>
                                        Jobs
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/" className='text-gray-600 dark:text-gray-300 hover:text-[#6A38C2] transition-colors duration-200 font-medium'>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/jobs" className='text-gray-600 dark:text-gray-300 hover:text-[#6A38C2] transition-colors duration-200 font-medium'>
                                        Jobs
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/browse" className='text-gray-600 dark:text-gray-300 hover:text-[#6A38C2] transition-colors duration-200 font-medium'>
                                        Browse
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Dark Mode Toggle */}
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className='p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200'
                    >
                        {theme === 'dark' ? 
                            <Sun className='h-5 w-5 text-yellow-500' /> : 
                            <Moon className='h-5 w-5 text-gray-600' />
                        }
                    </button>

                    {!user ? (
                        <div className='flex items-center gap-3'>
                            <Link to="/login">
                                <Button variant="outline" className='border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white transition-all duration-200'>
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] hover:from-[#5b30a6] hover:to-[#7C3AED] text-white transition-all duration-200 shadow-md">
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className='flex items-center gap-2 cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-full transition-all duration-200'>
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                    <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>{user?.fullname?.split(' ')[0]}</span>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-4 shadow-xl border border-gray-100 dark:border-gray-700 dark:bg-gray-800 rounded-xl">
                                <div>
                                    <div className='flex gap-3 pb-3 border-b border-gray-100 dark:border-gray-700'>
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-semibold text-gray-800 dark:text-white'>{user?.fullname}</h4>
                                            <p className='text-sm text-gray-500 dark:text-gray-400'>{user?.profile?.bio || "No bio added"}</p>
                                            <span className='text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium capitalize mt-1 inline-block'>{user?.role}</span>
                                        </div>
                                    </div>
                                    <div className='flex flex-col mt-3 gap-1'>
                                        {user && user.role === 'student' && (
                                            <div className='flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 px-2 py-2 rounded-lg transition-colors'>
                                                <User2 className='h-4 w-4 text-gray-500' />
                                                <Button variant="link" className='p-0 h-auto text-gray-700 dark:text-gray-300'>
                                                    <Link to="/profile">View Profile</Link>
                                                </Button>
                                            </div>
                                        )}
                                        <div className='flex items-center gap-2 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 px-2 py-2 rounded-lg transition-colors'>
                                            <LogOut className='h-4 w-4 text-red-500' />
                                            <Button onClick={logoutHandler} variant="link" className='p-0 h-auto text-red-500'>
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar