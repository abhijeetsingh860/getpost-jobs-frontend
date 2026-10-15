import React, { useEffect, useState } from 'react';
import Navbar from '../shared/NavBar';
import Footer from '../shared/Footer';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2, Building2, Upload, Globe, MapPin } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });

    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
                file: null
            });
        }
    }, [singleCompany]);

    const changeEventHandler = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput(prev => ({ ...prev, file }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message || "Company information updated!");
                navigate("/admin/companies");
            }
        } catch (error) {
            console.error("Company update error:", error);
            toast.error(error?.response?.data?.message || "Failed to update company");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300">
            <Navbar />

            <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button
                    onClick={() => navigate("/admin/companies")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Companies
                </button>

                <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-md">
                    
                    <div className="flex items-center gap-4 pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
                        <Avatar className="h-14 w-14 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                            <AvatarImage src={singleCompany?.logo} alt={input.name} />
                            <AvatarFallback className="bg-indigo-600 text-white font-bold text-xl rounded-2xl">
                                {input.name?.charAt(0) || "C"}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                Company Brand Setup
                            </h1>
                            <p className="text-xs text-slate-400 mt-0.5">
                                Configure logo, description, and headquarters for {singleCompany?.name || "your company"}
                            </p>
                        </div>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Company Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                    className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Headquarters / Location</Label>
                                <Input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. Bangalore, India"
                                    className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Official Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                placeholder="https://example.com"
                                className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm"
                            />
                        </div>

                        <div>
                            <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Company Description</Label>
                            <textarea
                                name="description"
                                rows={4}
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="Write a short paragraph about what your company builds, its culture, and mission..."
                                className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500/20"
                            />
                        </div>

                        <div>
                            <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Company Logo Image</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-xs cursor-pointer file:rounded-lg file:border-0 file:bg-indigo-50 dark:file:bg-indigo-950 file:text-indigo-600 dark:file:text-indigo-300 file:font-semibold"
                            />
                        </div>

                        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate("/admin/companies")}
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
                                        Updating...
                                    </>
                                ) : (
                                    "Save Company Setup"
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

export default CompanySetup;
