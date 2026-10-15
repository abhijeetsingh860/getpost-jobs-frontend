import React, { useEffect, useState } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, ArrowLeft, Sparkles, Building2, Layers } from 'lucide-react';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';

const EditJob = () => {
    useGetAllCompanies();
    const params = useParams();
    const jobId = params.id;
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 1,
        companyId: "",
        status: "active"
    });

    useEffect(() => {
        const fetchJob = async () => {
            try {
                setFetching(true);
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success && res.data.job) {
                    const job = res.data.job;
                    setInput({
                        title: job.title || "",
                        description: job.description || "",
                        requirements: Array.isArray(job.requirements) ? job.requirements.join(", ") : (job.requirements || ""),
                        salary: job.salary || "",
                        location: job.location || "",
                        jobType: job.jobType || "",
                        experience: job.experienceLevel !== undefined ? job.experienceLevel : (job.experience || ""),
                        position: job.position || 1,
                        companyId: job.company?._id || job.company || "",
                        status: job.status || "active"
                    });
                }
            } catch (error) {
                console.error("Error fetching job to edit:", error);
                toast.error("Failed to load job details");
            } finally {
                setFetching(false);
            }
        };

        if (jobId) {
            fetchJob();
        }
    }, [jobId]);

    const changeEventHandler = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const selectCompanyHandler = (value) => {
        setInput(prev => ({ ...prev, companyId: value }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.put(`${JOB_API_END_POINT}/update/${jobId}`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message || "Job updated successfully!");
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.error("Update job error:", error);
            toast.error(error?.response?.data?.message || "Failed to update job opening");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                </div>
            </div>
        );
    }

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
                    
                    <div className="pb-6 mb-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div>
                            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-1">
                                <Layers className="w-3.5 h-3.5" />
                                Recruiter Portal
                            </div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                Edit Job Opening
                            </h1>
                            <p className="text-xs text-slate-400 mt-0.5">
                                Modify requirements, compensation, and active status for this listing
                            </p>
                        </div>

                        {/* Status Toggle Badge */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-slate-500">Status:</span>
                            <select
                                name="status"
                                value={input.status}
                                onChange={changeEventHandler}
                                className={`text-xs font-bold px-3 py-1.5 rounded-full border outline-none ${
                                    input.status === 'active'
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
                                        : 'bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-800 dark:text-slate-400'
                                }`}
                            >
                                <option value="active">Active (Accepting)</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-5">
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Job Title</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    value={input.title}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. Senior Frontend Engineer"
                                    className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Location / Work Mode</Label>
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
                            <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Role Description</Label>
                            <textarea
                                name="description"
                                rows={5}
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="Describe the role mission, expected impact, and day-to-day responsibilities..."
                                className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500/20"
                                required
                            />
                        </div>

                        <div>
                            <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Requirements & Skills (Comma separated)</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                placeholder="e.g. React, Next.js, TypeScript, REST APIs, Jest"
                                className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Salary (LPA)</Label>
                                <Input
                                    type="number"
                                    name="salary"
                                    value={input.salary}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. 18"
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
                                    placeholder="e.g. 3"
                                    className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm"
                                />
                            </div>

                            <div>
                                <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">No. of Open Positions</Label>
                                <Input
                                    type="number"
                                    name="position"
                                    value={input.position}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. 2"
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
                                    placeholder="e.g. Full-time, Internship, Contract"
                                    className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Associated Company</Label>
                                <Select value={input.companyId} onValueChange={selectCompanyHandler}>
                                    <SelectTrigger className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm">
                                        <SelectValue placeholder="Select Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies?.map((c) => (
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
                                        Updating Job...
                                    </>
                                ) : (
                                    "Save Job Changes"
                                )}
                            </Button>
                        </div>

                    </form>

                </div>

            </main>

            <Footer />
        </div>
    );
};

export default EditJob;
