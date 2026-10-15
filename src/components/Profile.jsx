import React, { useState } from 'react';
import Navbar from "./shared/NavBar";
import Footer from "./shared/Footer";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { 
    Mail, 
    Phone, 
    Pen, 
    FileText, 
    Bookmark, 
    Briefcase, 
    CheckCircle2, 
    ExternalLink, 
    Clock, 
    Sparkles,
    Download
} from 'lucide-react';
import { Badge } from './ui/badge';
import AppliedJobTable from './AppliedJobTable';
import Job from './Job';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import useGetSavedJobs from '@/hooks/useGetSavedJobs';

const Profile = () => {
    useGetAppliedJobs();
    useGetSavedJobs();

    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("applied"); // 'applied' or 'saved'
    const { user } = useSelector(store => store.auth);
    const { allAppliedJobs, savedJobs } = useSelector(store => store.job);

    const acceptedCount = allAppliedJobs?.filter(a => a.status === 'accepted')?.length || 0;
    const pendingCount = allAppliedJobs?.filter(a => a.status === 'pending')?.length || 0;

    return (
        <div className='min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300'>
            <Navbar />

            <main className='flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                
                {/* Profile Overview Card (Hero) */}
                <div className='p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs backdrop-blur-md mb-8'>
                    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800'>
                        
                        {/* Avatar & Basics */}
                        <div className='flex items-center gap-4 sm:gap-5'>
                            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl border-2 border-indigo-500/20 shadow-md">
                                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                <AvatarFallback className="bg-gradient-to-tr from-indigo-600 via-purple-600 to-fuchsia-600 text-white font-black text-2xl sm:text-3xl rounded-2xl">
                                    {user?.fullname?.charAt(0) || "U"}
                                </AvatarFallback>
                            </Avatar>

                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className='text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight'>
                                        {user?.fullname}
                                    </h1>
                                    <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                                </div>
                                <p className='text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl'>
                                    {user?.profile?.bio || "No bio added yet. Click edit to add your career summary and aspirational roles."}
                                </p>
                                <span className='inline-block text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 px-2.5 py-0.5 rounded-full mt-2'>
                                    {user?.role === 'recruiter' ? 'Recruiter / Employer' : 'Student / Candidate'}
                                </span>
                            </div>
                        </div>

                        {/* Edit Button */}
                        <Button
                            onClick={() => setOpen(true)}
                            variant="outline"
                            className="rounded-full border-slate-200 dark:border-slate-700 hover:border-indigo-500 flex items-center gap-2 text-xs font-semibold px-4 py-2 self-start sm:self-center"
                        >
                            <Pen className="w-3.5 h-3.5 text-indigo-500" />
                            <span>Edit Profile</span>
                        </Button>
                    </div>

                    {/* Contact & Resume Row */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 pt-6'>
                        
                        {/* Contact details */}
                        <div className='space-y-3'>
                            <h3 className='text-xs font-bold uppercase tracking-wider text-slate-400'>
                                Contact Information
                            </h3>
                            <div className='flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300'>
                                <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                                <span className="truncate">{user?.email || "Not specified"}</span>
                            </div>
                            <div className='flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300'>
                                <Phone className="w-4 h-4 text-fuchsia-500 shrink-0" />
                                <span>{user?.phoneNumber || "Not specified"}</span>
                            </div>
                        </div>

                        {/* Skills Cloud */}
                        <div className='space-y-3'>
                            <h3 className='text-xs font-bold uppercase tracking-wider text-slate-400'>
                                Verified Skills
                            </h3>
                            <div className='flex items-center gap-1.5 flex-wrap'>
                                {user?.profile?.skills && user.profile.skills.length > 0 ? (
                                    user.profile.skills.map((skill, index) => (
                                        <Badge 
                                            key={index}
                                            variant="secondary"
                                            className="bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-100 dark:border-indigo-900 text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                                        >
                                            {skill}
                                        </Badge>
                                    ))
                                ) : (
                                    <span className="text-xs text-slate-400">No skills added yet</span>
                                )}
                            </div>
                        </div>

                        {/* Resume Card */}
                        <div className='space-y-3'>
                            <h3 className='text-xs font-bold uppercase tracking-wider text-slate-400'>
                                Primary Resume
                            </h3>
                            {user?.profile?.resume ? (
                                <div className="p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <div className="p-2 rounded-xl bg-indigo-600 text-white shrink-0">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                                                {user.profile.resumeOriginalName || "Candidate_Resume.pdf"}
                                            </p>
                                            <span className="text-[10px] text-emerald-600 font-semibold">Active for Applications</span>
                                        </div>
                                    </div>

                                    <a
                                        href={user.profile.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700 shadow-2xs shrink-0 transition-colors"
                                        title="View/Download Resume"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            ) : (
                                <p className="text-xs text-slate-400">
                                    No resume uploaded. Click Edit Profile to upload your PDF resume.
                                </p>
                            )}
                        </div>

                    </div>
                </div>

                {/* Metric Summary Cards */}
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8'>
                    <div className='p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between'>
                        <div>
                            <span className='text-xs font-bold uppercase tracking-wider text-slate-400'>Total Applied</span>
                            <h3 className='text-2xl font-black text-slate-900 dark:text-white mt-1'>{allAppliedJobs?.length || 0}</h3>
                        </div>
                        <div className='p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'>
                            <Briefcase className="w-5 h-5" />
                        </div>
                    </div>

                    <div className='p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between'>
                        <div>
                            <span className='text-xs font-bold uppercase tracking-wider text-slate-400'>Shortlisted / Offers</span>
                            <h3 className='text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1'>{acceptedCount}</h3>
                        </div>
                        <div className='p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'>
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                    </div>

                    <div className='p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between'>
                        <div>
                            <span className='text-xs font-bold uppercase tracking-wider text-slate-400'>Bookmarked Jobs</span>
                            <h3 className='text-2xl font-black text-purple-600 dark:text-purple-400 mt-1'>{savedJobs?.length || 0}</h3>
                        </div>
                        <div className='p-3 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400'>
                            <Bookmark className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Tab Navigation: Applied Jobs vs Saved Jobs */}
                <div className='flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 mb-6'>
                    <button
                        onClick={() => setActiveTab("applied")}
                        className={`pb-3 text-sm font-bold transition-all relative ${
                            activeTab === "applied"
                                ? 'text-indigo-600 dark:text-indigo-400'
                                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                        }`}
                    >
                        <span>Applied Jobs ({allAppliedJobs?.length || 0})</span>
                        {activeTab === "applied" && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600" />
                        )}
                    </button>

                    <button
                        onClick={() => setActiveTab("saved")}
                        className={`pb-3 text-sm font-bold transition-all relative ${
                            activeTab === "saved"
                                ? 'text-indigo-600 dark:text-indigo-400'
                                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                        }`}
                    >
                        <span>Saved Bookmarks ({savedJobs?.length || 0})</span>
                        {activeTab === "saved" && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600" />
                        )}
                    </button>
                </div>

                {/* Tab Contents */}
                {activeTab === "applied" ? (
                    <AppliedJobTable />
                ) : (
                    <div>
                        {savedJobs?.length <= 0 ? (
                            <div className='py-16 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8'>
                                <Bookmark className="w-10 h-10 mx-auto text-slate-400 mb-2" />
                                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">No Saved Jobs Yet</h3>
                                <p className="text-xs text-slate-400 mt-1">Click the bookmark icon on any job card to save it for quick access later.</p>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                                {savedJobs.map((job) => (
                                    <Job key={job._id || job} job={job} />
                                ))}
                            </div>
                        )}
                    </div>
                )}

            </main>

            <Footer />
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
