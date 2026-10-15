import React, { useState } from 'react';
import Navbar from '../shared/NavBar';
import Footer from '../shared/Footer';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2, ArrowLeft, PlusCircle, Building2, Layers, Sparkles } from 'lucide-react';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';

const PostJob = () => {
    useGetAllCompanies();
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "Full-time",
        experience: "",
        position: 1,
        companyId: ""
    });

    const changeEventHandler = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const selectCompanyHandler = (value) => {
        setInput(prev => ({ ...prev, companyId: value }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!input.companyId) {
            toast.error("Please select a registered company first");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message || "Job opening posted successfully!");
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.error("Post job error:", error);
            toast.error(error?.response?.data?.message || "Failed to post job");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300">
            <Navbar />

            <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                <button
                    onClick={() => navigate("/admin/jobs")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Admin Jobs
                </button>

                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-md">
                    
                    <div className="pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-1">
                            <Sparkles className="w-3.5 h-3.5" />
                            Recruitment Suite
                        </div>
                        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                            Publish a New Job Opening
                        </h1>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Connect with verified talent looking for their next career breakthrough
                        </p>
                    </div>

                    {companies.length === 0 ? (
                        <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center">
                            <Building2 className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                            <h3 className="font-bold text-sm text-amber-800 dark:text-amber-200">Company Registration Required</h3>
                            <p className="text-xs text-amber-700 dark:text-amber-300 mt-1 mb-4">
                                You need to register at least one company profile before publishing job openings.
                            </p>
                            <Link to="/admin/companies/create">
                                <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white rounded-full text-xs">
                                    Register a Company First
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={submitHandler} className="space-y-5">
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Job Title</Label>
                                    <Input
                                        type="text"
                                        name="title"
                                        value={input.title}
                                        onChange={changeEventHandler}
                                        placeholder="e.g. Lead Full Stack Developer"
                                        className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Location / Remote Policy</Label>
                                    <Input
                                        type="text"
                                        name="location"
                                        value={input.location}
                                        onChange={changeEventHandler}
                                        placeholder="e.g. Remote, Bangalore, Delhi NCR"
                                        className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Job Description & Responsibilities</Label>
                                <textarea
                                    name="description"
                                    rows={5}
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    placeholder="Outline the core team objectives, day-to-day work, and qualifications needed..."
                                    className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    required
                                />
                            </div>

                            <div>
                                <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Skills & Tech Stack (Comma separated)</Label>
                                <Input
                                    type="text"
                                    name="requirements"
                                    value={input.requirements}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. React, TypeScript, Node.js, AWS, MongoDB"
                                    className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Annual Salary (LPA)</Label>
                                    <Input
                                        type="number"
                                        name="salary"
                                        value={input.salary}
                                        onChange={changeEventHandler}
                                        placeholder="e.g. 15"
                                        className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Experience Level (Years)</Label>
                                    <Input
                                        type="number"
                                        name="experience"
                                        value={input.experience}
                                        onChange={changeEventHandler}
                                        placeholder="e.g. 2"
                                        className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm"
                                    />
                                </div>

                                <div>
                                    <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Positions Available</Label>
                                    <Input
                                        type="number"
                                        name="position"
                                        value={input.position}
                                        onChange={changeEventHandler}
                                        placeholder="e.g. 1"
                                        className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Job Type</Label>
                                    <Input
                                        type="text"
                                        name="jobType"
                                        value={input.jobType}
                                        onChange={changeEventHandler}
                                        placeholder="Full-time, Internship, Contract, Part-time"
                                        className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Hiring Company</Label>
                                    <Select value={input.companyId} onValueChange={selectCompanyHandler}>
                                        <SelectTrigger className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm">
                                            <SelectValue placeholder="Select Company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {companies.map((c) => (
                                                    <SelectItem key={c._id} value={c._id}>
                                                        {c.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate("/admin/jobs")}
                                    className="rounded-xl text-xs font-semibold"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs px-6 py-2.5 shadow-md shadow-indigo-500/20"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Publishing Job...
                                        </>
                                    ) : (
                                        "Publish Job Opening"
                                    )}
                                </Button>
                            </div>

                        </form>
                    )}

                </div>

            </main>

            <Footer />
        </div>
    );
};

export default PostJob;
