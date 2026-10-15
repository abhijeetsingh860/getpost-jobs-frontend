import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT, USER_API_END_POINT } from '@/utils/constant';
import { setSingleJob, toggleSavedJobLocally } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { formatSalary } from '@/utils/formatSalary';
import Navbar from './shared/NavBar';
import Footer from './shared/Footer';
import LatestJobCards from './LatestJobCards';
import { 
    MapPin, 
    Briefcase, 
    IndianRupee, 
    Calendar, 
    Users, 
    Building2, 
    Globe, 
    CheckCircle2, 
    Bookmark, 
    Share2, 
    ArrowLeft,
    Sparkles,
    ShieldCheck
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const JobDescription = () => {
    const { singleJob, savedJobs } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isApplied, setIsApplied] = useState(false);
    const [applying, setApplying] = useState(false);
    const [similarJobs, setSimilarJobs] = useState([]);

    const isSaved = savedJobs?.some(j => (j._id || j) === jobId) || 
                    user?.savedJobs?.some(j => (j._id || j) === jobId);

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    const fetchedJob = res.data.job;
                    dispatch(setSingleJob(fetchedJob));
                    
                    const applied = fetchedJob.applications?.some(app => 
                        (app.applicant?._id || app.applicant) === user?._id
                    );
                    setIsApplied(Boolean(applied));
                }
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        };

        const fetchSimilar = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/similar/${jobId}`);
                if (res.data.success) {
                    setSimilarJobs(res.data.jobs || []);
                }
            } catch (error) {
                console.error("Error fetching similar jobs:", error);
            }
        };

        fetchSingleJob();
        fetchSimilar();
    }, [jobId, dispatch, user?._id]);

    const applyJobHandler = async () => {
        if (!user) {
            toast.error("Please log in or sign up to apply for this job");
            navigate("/login");
            return;
        }

        try {
            setApplying(true);
            const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {}, { withCredentials: true });
            
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...(singleJob.applications || []), { applicant: user._id }]
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message || "Application submitted successfully!");
            }
        } catch (error) {
            console.error("Apply job error:", error);
            toast.error(error?.response?.data?.message || "Failed to submit application");
        } finally {
            setApplying(false);
        }
    };

    const handleBookmark = async () => {
        if (!user) {
            toast.error("Please log in to save this job");
            navigate("/login");
            return;
        }

        try {
            const res = await axios.post(`${USER_API_END_POINT}/saved-jobs/${jobId}`, {}, { withCredentials: true });
            if (res.data.success) {
                dispatch(toggleSavedJobLocally(jobId));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error("Bookmark error:", error);
            toast.error("Failed to update bookmark");
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Job link copied to clipboard!");
    };

    const isClosed = singleJob?.status === 'closed';

    return (
        <div className='min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300'>
            <Navbar />

            <main className='flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                
                {/* Back Link */}
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Listings
                </button>

                {/* Hero Header Card */}
                <div className='p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-md mb-8'>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
                        
                        {/* Company & Role Info */}
                        <div className='flex items-start gap-4 sm:gap-5'>
                            <Avatar className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl border border-slate-200/80 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shrink-0 shadow-sm">
                                <AvatarImage src={singleJob?.company?.logo} alt={singleJob?.company?.name} />
                                <AvatarFallback className="bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-2xl rounded-2xl">
                                    {singleJob?.company?.name?.charAt(0) || "C"}
                                </AvatarFallback>
                            </Avatar>

                            <div>
                                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                    <span className='font-semibold text-slate-600 dark:text-slate-300 text-sm sm:text-base'>
                                        {singleJob?.company?.name}
                                    </span>
                                    <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                                    {isClosed ? (
                                        <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 px-2.5 py-0.5 rounded-full">
                                            Role Closed
                                        </span>
                                    ) : (
                                        <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            Actively Hiring
                                        </span>
                                    )}
                                </div>

                                <h1 className='text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3'>
                                    {singleJob?.title}
                                </h1>

                                <div className='flex items-center gap-2.5 flex-wrap'>
                                    <Badge variant="secondary" className='bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-100 dark:border-indigo-900 text-xs font-semibold px-3 py-1 rounded-full'>
                                        <MapPin className="w-3 h-3 mr-1 inline" />
                                        {singleJob?.location || "Remote"}
                                    </Badge>

                                    <Badge variant="secondary" className='bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-100 dark:border-purple-900 text-xs font-semibold px-3 py-1 rounded-full'>
                                        <Briefcase className="w-3 h-3 mr-1 inline" />
                                        {singleJob?.jobType}
                                    </Badge>

                                    <Badge variant="secondary" className='bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-900 text-xs font-semibold px-3 py-1 rounded-full'>
                                        <IndianRupee className="w-3 h-3 mr-0.5 inline" />
                                        {formatSalary(singleJob?.salary)} LPA
                                    </Badge>

                                    <Badge variant="secondary" className='bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-900 text-xs font-semibold px-3 py-1 rounded-full'>
                                        {singleJob?.position || 1} {singleJob?.position === 1 ? 'Opening' : 'Openings'}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* Top Actions */}
                        <div className='flex items-center gap-3 shrink-0 self-start md:self-center'>
                            <button
                                onClick={handleBookmark}
                                className={`p-3 rounded-2xl border transition-all duration-200 ${
                                    isSaved 
                                        ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                                        : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 dark:hover:border-indigo-700'
                                }`}
                                title={isSaved ? "Saved" : "Bookmark Job"}
                            >
                                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                            </button>

                            <button
                                onClick={handleShare}
                                className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200"
                                title="Share Job"
                            >
                                <Share2 className="w-5 h-5" />
                            </button>

                            <Button
                                onClick={isApplied || isClosed ? null : applyJobHandler}
                                disabled={isApplied || isClosed || applying}
                                className={`rounded-2xl px-7 py-6 text-sm font-bold shadow-md transition-all duration-200 ${
                                    isApplied 
                                        ? 'bg-emerald-600 hover:bg-emerald-600 text-white cursor-default'
                                        : (isClosed 
                                            ? 'bg-slate-400 text-white cursor-not-allowed'
                                            : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-fuchsia-600 hover:from-indigo-700 hover:to-fuchsia-700 text-white shadow-indigo-500/25 hover:scale-102')
                                }`}
                            >
                                {isApplied ? 'Application Sent ✓' : (isClosed ? 'Closed to Applicants' : (applying ? 'Submitting...' : 'Apply Now 🚀'))}
                            </Button>
                        </div>

                    </div>
                </div>

                {/* Two-Column Details Grid */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    
                    {/* Left Main Content (2 Columns) */}
                    <div className='lg:col-span-2 space-y-8'>
                        
                        {/* Application Status Banner (if already applied) */}
                        {isApplied && (
                            <div className='p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-500/30 dark:border-emerald-500/20'>
                                <div className='flex items-center gap-2 mb-2'>
                                    <CheckCircle2 className='w-5 h-5 text-emerald-600 dark:text-emerald-400' />
                                    <h3 className='font-bold text-sm text-slate-900 dark:text-white'>
                                        Your Application is Live
                                    </h3>
                                </div>
                                <p className='text-xs text-slate-600 dark:text-slate-300 mb-4'>
                                    The hiring team at {singleJob?.company?.name} has received your profile and resume.
                                </p>
                                
                                {/* 4-Step Progress Stepper */}
                                <div className='grid grid-cols-4 gap-2 pt-2'>
                                    {[
                                        { label: "Submitted", active: true },
                                        { label: "In Review", active: true },
                                        { label: "Interview", active: false },
                                        { label: "Decision", active: false },
                                    ].map((step, i) => (
                                        <div key={i} className='text-center'>
                                            <div className={`h-1.5 rounded-full mb-1.5 ${step.active ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
                                            <span className='text-[10px] font-semibold text-slate-500 dark:text-slate-400'>{step.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Job Description */}
                        <div className='p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs'>
                            <h2 className='text-lg font-bold text-slate-900 dark:text-white mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2'>
                                <Sparkles className="w-4 h-4 text-indigo-500" />
                                Role Overview & Responsibilities
                            </h2>
                            <div className='text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line'>
                                {singleJob?.description}
                            </div>
                        </div>

                        {/* Requirements & Skills */}
                        <div className='p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs'>
                            <h2 className='text-lg font-bold text-slate-900 dark:text-white mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2'>
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                Required Skills & Qualifications
                            </h2>

                            <div className='flex flex-wrap gap-2 mb-6'>
                                {Array.isArray(singleJob?.requirements) && singleJob.requirements.length > 0 ? (
                                    singleJob.requirements.map((req, index) => (
                                        <span 
                                            key={index}
                                            className='px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900'
                                        >
                                            {req}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-xs text-slate-400">See description for details</span>
                                )}
                            </div>

                            <div className='space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300'>
                                <div className='flex items-start gap-2.5'>
                                    <div className='w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0' />
                                    <span>Experience: Minimum {singleJob?.experienceLevel || singleJob?.experience || 0}+ years in a related capacity.</span>
                                </div>
                                <div className='flex items-start gap-2.5'>
                                    <div className='w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0' />
                                    <span>Strong problem-solving mindset with great cross-functional communication abilities.</span>
                                </div>
                                <div className='flex items-start gap-2.5'>
                                    <div className='w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0' />
                                    <span>Demonstrated proficiency building reliable, production-ready software solutions.</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column (Company & Snapshot Cards) */}
                    <div className='space-y-6'>
                        
                        {/* Company Card */}
                        <div className='p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs'>
                            <h3 className='text-xs font-bold uppercase tracking-wider text-slate-400 mb-4'>
                                About The Organization
                            </h3>

                            <div className='flex items-center gap-3.5 mb-4'>
                                <Avatar className="h-12 w-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                                    <AvatarImage src={singleJob?.company?.logo} alt={singleJob?.company?.name} />
                                    <AvatarFallback className="bg-indigo-600 text-white font-bold text-base rounded-xl">
                                        {singleJob?.company?.name?.charAt(0) || "C"}
                                    </AvatarFallback>
                                </Avatar>

                                <div>
                                    <h4 className='font-bold text-slate-900 dark:text-white text-sm'>
                                        {singleJob?.company?.name}
                                    </h4>
                                    <p className='text-xs text-slate-400'>
                                        {singleJob?.company?.location || singleJob?.location || "India"}
                                    </p>
                                </div>
                            </div>

                            <p className='text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3'>
                                {singleJob?.company?.description || "An innovative technology employer growing rapidly and hiring stellar talent."}
                            </p>

                            {singleJob?.company?.website && (
                                <a
                                    href={singleJob.company.website.startsWith("http") ? singleJob.company.website : `https://${singleJob.company.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline'
                                >
                                    <Globe className='w-3.5 h-3.5' />
                                    Visit Company Website
                                </a>
                            )}
                        </div>

                        {/* Snapshot Card */}
                        <div className='p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4'>
                            <h3 className='text-xs font-bold uppercase tracking-wider text-slate-400 mb-2'>
                                Job Snapshot
                            </h3>

                            <div className='flex items-center justify-between text-xs py-2 border-b border-slate-100 dark:border-slate-800'>
                                <span className='text-slate-500 flex items-center gap-1.5'>
                                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> Posted On
                                </span>
                                <span className='font-semibold text-slate-800 dark:text-slate-200'>
                                    {singleJob?.createdAt ? singleJob.createdAt.split("T")[0] : "Recently"}
                                </span>
                            </div>

                            <div className='flex items-center justify-between text-xs py-2 border-b border-slate-100 dark:border-slate-800'>
                                <span className='text-slate-500 flex items-center gap-1.5'>
                                    <Users className="w-3.5 h-3.5 text-slate-400" /> Total Applicants
                                </span>
                                <span className='font-semibold text-indigo-600 dark:text-indigo-400'>
                                    {singleJob?.applications?.length || 0} applied
                                </span>
                            </div>

                            <div className='flex items-center justify-between text-xs py-2 border-b border-slate-100 dark:border-slate-800'>
                                <span className='text-slate-500 flex items-center gap-1.5'>
                                    <Briefcase className="w-3.5 h-3.5 text-slate-400" /> Work Mode
                                </span>
                                <span className='font-semibold text-slate-800 dark:text-slate-200'>
                                    {singleJob?.jobType || "Full-time"}
                                </span>
                            </div>

                            <div className='flex items-center justify-between text-xs py-2'>
                                <span className='text-slate-500 flex items-center gap-1.5'>
                                    <Building2 className="w-3.5 h-3.5 text-slate-400" /> Available Positions
                                </span>
                                <span className='font-semibold text-slate-800 dark:text-slate-200'>
                                    {singleJob?.position || 1}
                                </span>
                            </div>
                        </div>

                        {/* Direct Support / Verified Trust Badge */}
                        <div className='p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60 flex items-start gap-3'>
                            <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                            <div className="text-xs text-slate-600 dark:text-slate-300">
                                <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5">Verified Recruiter Listing</span>
                                Applications are sent directly to the employer's dashboard with zero middlemen fees.
                            </div>
                        </div>

                    </div>

                </div>

                {/* Similar Jobs Carousel */}
                {similarJobs.length > 0 && (
                    <div className='mt-16 pt-10 border-t border-slate-200/80 dark:border-slate-800'>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className='text-xl sm:text-2xl font-bold text-slate-900 dark:text-white'>
                                    Related Opportunities
                                </h3>
                                <p className='text-xs text-slate-400 mt-0.5'>Similar openings you might be interested in</p>
                            </div>
                            <Link to="/jobs">
                                <Button variant="ghost" size="sm" className="text-xs font-semibold text-indigo-600">
                                    View All
                                </Button>
                            </Link>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                            {similarJobs.map((simJob) => (
                                <LatestJobCards key={simJob._id} job={simJob} />
                            ))}
                        </div>
                    </div>
                )}

            </main>

            <Footer />
        </div>
    );
};

export default JobDescription;