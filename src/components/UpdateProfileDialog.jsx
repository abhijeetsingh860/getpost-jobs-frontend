import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2, Upload, FileText, User, Mail, Phone, Code, Sparkles } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        bio: "",
        skills: "",
        file: null
    });

    useEffect(() => {
        if (user) {
            setInput({
                fullname: user.fullname || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                bio: user.profile?.bio || "",
                skills: Array.isArray(user.profile?.skills) 
                    ? user.profile.skills.join(", ") 
                    : (user.profile?.skills || ""),
                file: null
            });
        }
    }, [user, open]);

    const changeEventHandler = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput(prev => ({ ...prev, file }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);

        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message || "Profile updated successfully!");
                setOpen(false);
            }
        } catch (error) {
            console.error("Update profile error:", error);
            toast.error(error?.response?.data?.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl">
                <DialogHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
                    <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-indigo-500" />
                        Edit Profile & Resume
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={submitHandler} className="space-y-4 pt-2">
                    {/* Full Name */}
                    <div>
                        <Label htmlFor="fullname" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1.5">
                            <User className="w-3.5 h-3.5 text-indigo-500" /> Full Name
                        </Label>
                        <Input
                            id="fullname"
                            name="fullname"
                            type="text"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            placeholder="e.g. John Doe"
                            className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <Label htmlFor="email" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1.5">
                            <Mail className="w-3.5 h-3.5 text-indigo-500" /> Email Address
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder="john@example.com"
                            className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm"
                            required
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <Label htmlFor="phoneNumber" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1.5">
                            <Phone className="w-3.5 h-3.5 text-indigo-500" /> Phone Number
                        </Label>
                        <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            placeholder="9876543210"
                            className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm"
                            required
                        />
                    </div>

                    {/* Bio */}
                    <div>
                        <Label htmlFor="bio" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1.5">
                            Bio / One-liner
                        </Label>
                        <Input
                            id="bio"
                            name="bio"
                            type="text"
                            value={input.bio}
                            onChange={changeEventHandler}
                            placeholder="Full Stack Engineer passionate about React & Distributed Systems"
                            className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm"
                        />
                    </div>

                    {/* Skills */}
                    <div>
                        <Label htmlFor="skills" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1.5">
                            <Code className="w-3.5 h-3.5 text-indigo-500" /> Skills (Comma separated)
                        </Label>
                        <Input
                            id="skills"
                            name="skills"
                            type="text"
                            value={input.skills}
                            onChange={changeEventHandler}
                            placeholder="React, TypeScript, Node.js, Tailwind, Docker"
                            className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm"
                        />
                    </div>

                    {/* Resume Upload */}
                    <div>
                        <Label htmlFor="file" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1.5">
                            <FileText className="w-3.5 h-3.5 text-indigo-500" /> Upload New Resume (PDF)
                        </Label>
                        <div className="flex items-center gap-2">
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                accept="application/pdf,image/*"
                                onChange={fileChangeHandler}
                                className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-xs cursor-pointer file:rounded-lg file:border-0 file:bg-indigo-50 dark:file:bg-indigo-950 file:text-indigo-600 dark:file:text-indigo-300 file:font-semibold"
                            />
                        </div>
                        {user?.profile?.resumeOriginalName && (
                            <p className="text-[11px] text-slate-400 mt-1">
                                Current resume: <span className="text-indigo-500">{user.profile.resumeOriginalName}</span>
                            </p>
                        )}
                    </div>

                    <DialogFooter className="pt-4 border-t border-slate-100 dark:border-slate-800 gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="rounded-xl"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Saving...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;
