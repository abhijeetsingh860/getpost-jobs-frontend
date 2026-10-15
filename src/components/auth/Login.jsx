import React, { useEffect, useState } from 'react';
import Navbar from '../shared/NavBar';
import Footer from '../shared/Footer';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2, Eye, EyeOff, Briefcase, GraduationCap, Mail, Lock, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "student",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

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
                    toast.success(res.data.message || "Logged in successfully!");
                    navigate("/admin/companies");
                }
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error?.response?.data?.message || "Invalid credentials");
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300">
            <Navbar />

            {/* Welcome Celebration Modal */}
            <AnimatePresence>
                {showWelcome && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='fixed inset-0 bg-slate-950/70 z-50 flex items-center justify-center px-4 backdrop-blur-sm'
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className='bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-slate-200 dark:border-slate-800'
                        >
                            <div className='text-6xl mb-4'>🎉</div>

                            <h2 className='text-2xl font-black text-slate-900 dark:text-white mb-2'>
                                Welcome back, <span className='text-indigo-600 dark:text-indigo-400'>{loggedInUser?.fullname?.split(' ')[0]}!</span>
                            </h2>

                            <p className='text-sm text-slate-500 dark:text-slate-400 mb-6'>
                                Your dream career is one application away. Let's find your next role.
                            </p>

                            <div className='bg-indigo-50/80 dark:bg-indigo-950/50 rounded-2xl p-4 mb-6 border border-indigo-100 dark:border-indigo-900'>
                                <div className='flex items-center justify-center gap-2 mb-1'>
                                    <Briefcase className='h-4 w-4 text-indigo-600 dark:text-indigo-400' />
                                    <span className='font-bold text-indigo-700 dark:text-indigo-300 text-sm'>500+ Top Companies</span>
                                </div>
                                <p className='text-xs text-slate-500 dark:text-slate-400'>are actively hiring engineers & designers today!</p>
                            </div>

                            <div className='flex gap-3'>
                                <Button
                                    onClick={() => { setShowWelcome(false); navigate("/jobs"); }}
                                    className='flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl py-5 text-xs font-bold'
                                >
                                    Explore Jobs
                                </Button>
                                <Button
                                    onClick={() => { setShowWelcome(false); navigate("/"); }}
                                    variant="outline"
                                    className='flex-1 rounded-xl py-5 text-xs font-bold'
                                >
                                    Home Feed
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl backdrop-blur-xl">
                    
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 mb-3">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                            Sign In to GetPost
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Access your job applications and recruiter dashboard
                        </p>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-4">
                        
                        {/* Role Selector Pills */}
                        <div>
                            <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 block">
                                Account Type:
                            </Label>
                            <div className="grid grid-cols-2 gap-2.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
                                <button
                                    type="button"
                                    onClick={() => setInput(prev => ({ ...prev, role: "student" }))}
                                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                                        input.role === "student"
                                            ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                                    }`}
                                >
                                    <GraduationCap className="w-4 h-4" />
                                    <span>Candidate</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setInput(prev => ({ ...prev, role: "recruiter" }))}
                                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                                        input.role === "recruiter"
                                            ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                                    }`}
                                >
                                    <Briefcase className="w-4 h-4" />
                                    <span>Recruiter</span>
                                </button>
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Email Address</Label>
                            <div className="relative">
                                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <Input
                                    type="email"
                                    name="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    placeholder="your-email@example.com"
                                    className="pl-10 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm py-5"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Password</Label>
                            <div className="relative">
                                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={input.password}
                                    onChange={changeEventHandler}
                                    placeholder="Enter your password"
                                    className="pl-10 pr-10 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm py-5"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full py-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-fuchsia-600 hover:from-indigo-700 hover:to-fuchsia-700 text-white font-bold text-sm shadow-md shadow-indigo-500/20 transition-all duration-200 mt-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>

                        <p className="text-xs text-center text-slate-500 dark:text-slate-400 pt-2">
                            Don't have an account yet?{" "}
                            <Link to="/signup" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                                Sign Up
                            </Link>
                        </p>

                    </form>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Login;