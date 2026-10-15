import React, { useEffect, useState } from 'react';
import Navbar from '../shared/NavBar';
import Footer from '../shared/Footer';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';
import { Building2, PlusCircle, Search, X } from 'lucide-react';

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { companies } = useSelector(store => store.company);

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input, dispatch]);

    return (
        <div className='min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300'>
            <Navbar />

            <main className='flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                
                {/* Header */}
                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8'>
                    <div>
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-1">
                            <Building2 className="w-3.5 h-3.5" />
                            Recruiter Operations
                        </div>
                        <h1 className='text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight'>
                            Employer Organizations
                        </h1>
                        <p className='text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1'>
                            Manage your registered company brands and publish vacancies on their behalf.
                        </p>
                    </div>

                    <Button 
                        onClick={() => navigate("/admin/companies/create")}
                        className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs px-5 py-2.5 shadow-md shadow-indigo-500/20 flex items-center gap-2 self-start sm:self-center"
                    >
                        <PlusCircle className="w-4 h-4" />
                        <span>Register Company</span>
                    </Button>
                </div>

                {/* Search Bar */}
                <div className='mb-6 flex items-center justify-between gap-4'>
                    <div className='flex items-center gap-2 px-3.5 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs w-full max-w-sm'>
                        <Search className='w-4 h-4 text-slate-400 shrink-0' />
                        <input
                            type="text"
                            placeholder="Filter by company name or location..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="text-xs sm:text-sm bg-transparent outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400 w-full"
                        />
                        {input && (
                            <button onClick={() => setInput("")} className="text-slate-400 hover:text-slate-600">
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>

                    <span className="text-xs font-semibold text-slate-400">
                        {companies?.length || 0} Registered
                    </span>
                </div>

                {/* Companies Table */}
                <CompaniesTable />

            </main>

            <Footer />
        </div>
    );
};

export default Companies;
