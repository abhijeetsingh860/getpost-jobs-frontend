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
import { setLoading } from '@/redux/authSlice';
import { Loader2, Eye, EyeOff, User, Mail, Phone, Lock, Upload, Sparkles, Briefcase, GraduationCap } from 'lucide-react';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "student",
        file: null
    });
    const [showPassword, setShowPassword] = useState(false);
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const changeFileHandler = (e) => {
        setInput(prev => ({ ...prev, file: e.target.files?.[0] }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message || "Account created successfully!");
                navigate("/login");
            }
        } catch (error) {
            console.error("Signup error:", error);
            toast.error(error?.response?.data?.message || "Registration failed");
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

            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-lg p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl backdrop-blur-xl">
                    
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-fuchsia-600 text-white shadow-md shadow-indigo-500/20 mb-3">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                            Create Your Account
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Join thousands of candidates and recruiters on GetPost Jobs
                        </p>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-4">
                        
                        {/* Role Selector Pills */}
                        <div>
                            <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 block">
                                I want to join as:
                            </Label>
                            <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
                                <button
                                    type="button"
                                    onClick={() => setInput(prev => ({ ...prev, role: "student" }))}
                                    className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                                        input.role === "student"
                                            ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                                    }`}
                                >
                                    <GraduationCap className="w-4 h-4" />
                                    <span>Job Seeker / Student</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setInput(prev => ({ ...prev, role: "recruiter" }))}
                                    className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                                        input.role === "recruiter"
                                            ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                                    }`}
                                >
                                    <Briefcase className="w-4 h-4" />
                                    <span>Recruiter / Employer</span>
                                </button>
                            </div>
                        </div>

                        {/* Full Name */}
                        <div>
                            <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Full Name</Label>
                            <div className="relative">
                                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <Input
                                    type="text"
                                    name="fullname"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. Alex Sharma"
                                    className="pl-10 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm py-5"
                                    required
                                />
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
                                    placeholder="alex@example.com"
                                    className="pl-10 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm py-5"
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Phone Number</Label>
                            <div className="relative">
                                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <Input
                                    type="tel"
                                    name="phoneNumber"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    placeholder="9876543210"
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
                                    placeholder="Create a strong password"
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

                        {/* Profile Photo */}
                        <div>
                            <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Profile Photo (Optional)</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-xs cursor-pointer file:rounded-lg file:border-0 file:bg-indigo-50 dark:file:bg-indigo-950 file:text-indigo-600 dark:file:text-indigo-300 file:font-semibold"
                            />
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
                                    Creating Account...
                                </>
                            ) : (
                                "Sign Up"
                            )}
                        </Button>

                        <p className="text-xs text-center text-slate-500 dark:text-slate-400 pt-2">
                            Already have an account?{" "}
                            <Link to="/login" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                                Log In
                            </Link>
                        </p>

                    </form>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Signup;
