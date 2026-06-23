import React, { useEffect, useState } from 'react'
import Navbar from '../shared/NavBar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Eye, EyeOff, PartyPopper, Briefcase } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                if (res.data.user.role === 'student') {
                    setLoggedInUser(res.data.user);
                    setShowWelcome(true);
                } else {
                    navigate("/");
                    toast.success(res.data.message);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) { navigate("/"); }
    }, [])

    return (
        <div>
            <Navbar />

            {/* Welcome Popup */}
            <AnimatePresence>
                {showWelcome && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4'
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className='bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl'
                        >
                            {/* Celebration Icon */}
                            <motion.div
                                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className='text-6xl mb-4'
                            >
                                🎉
                            </motion.div>

                            <h2 className='text-2xl font-bold text-gray-800 mb-2'>
                                Welcome back, <span className='text-[#6A38C2]'>{loggedInUser?.fullname?.split(' ')[0]}!</span>
                            </h2>

                            <p className='text-gray-500 mb-6'>
                                Great to see you again! Your dream job is waiting.
                            </p>

                            {/* Stats */}
                            <div className='bg-gradient-to-r from-purple-50 to-orange-50 rounded-2xl p-4 mb-6'>
                                <div className='flex items-center justify-center gap-2 mb-2'>
                                    <Briefcase className='h-5 w-5 text-[#6A38C2]' />
                                    <span className='font-bold text-[#6A38C2] text-lg'>500+ Companies</span>
                                </div>
                                <p className='text-sm text-gray-500'>are actively hiring right now!</p>
                            </div>

                            {/* Buttons */}
                            <div className='flex gap-3'>
                                <Button
                                    onClick={() => { setShowWelcome(false); navigate("/jobs"); }}
                                    className='flex-1 bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] hover:from-[#5b30a6] hover:to-[#7C3AED] text-white rounded-xl py-5'
                                >
                                    🔍 Explore Jobs
                                </Button>
                                <Button
                                    onClick={() => { setShowWelcome(false); navigate("/"); }}
                                    variant="outline"
                                    className='flex-1 rounded-xl py-5 border-gray-200'
                                >
                                    Go to Home
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Login Form */}
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="abhijeet@gmail.com"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <div className='relative'>
                            <Input
                                type={showPassword ? "text" : "password"}
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="abhijeet@123"
                                className="pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        loading ? 
                        <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</Button> : 
                        <Button type="submit" className="w-full my-4">Login</Button>
                    }
                    <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login