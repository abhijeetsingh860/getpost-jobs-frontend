import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    setSelectedLocation, 
    setSelectedJobType, 
    setSelectedSalaryRange, 
    clearAllFilters 
} from '@/redux/jobSlice';
import { Filter, RotateCcw, MapPin, Briefcase, IndianRupee } from 'lucide-react';
import { Button } from './ui/button';

const locations = ["All", "Remote", "Bangalore", "Delhi NCR", "Hyderabad", "Pune", "Mumbai", "Noida"];
const jobTypes = ["All", "Full-time", "Part-time", "Remote", "Internship", "Contract"];
const salaryRanges = [
    { label: "All Salaries", value: "all" },
    { label: "Up to ₹6 LPA", value: "0-6" },
    { label: "₹6 - ₹15 LPA", value: "6-15" },
    { label: "₹15 - ₹30 LPA", value: "15-30" },
    { label: "₹30+ LPA", value: "30+" },
];

const FilterCard = () => {
    const dispatch = useDispatch();
    const { 
        selectedLocation, 
        selectedJobType, 
        selectedSalaryRange 
    } = useSelector(store => store.job);

    const hasActiveFilters = selectedLocation || selectedJobType || selectedSalaryRange;

    return (
        <aside className='w-full p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs backdrop-blur-md sticky top-24'>
            {/* Header */}
            <div className='flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5'>
                <div className='flex items-center gap-2'>
                    <div className='p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'>
                        <Filter className="w-4 h-4" />
                    </div>
                    <h2 className='font-bold text-sm text-slate-900 dark:text-white'>Filter Openings</h2>
                </div>

                {hasActiveFilters && (
                    <button
                        onClick={() => dispatch(clearAllFilters())}
                        className='text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 transition-colors'
                        title="Reset all filters"
                    >
                        <RotateCcw className="w-3 h-3" />
                        Reset
                    </button>
                )}
            </div>

            <div className='space-y-6'>
                {/* 1. Job Type */}
                <div>
                    <h3 className='text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center gap-1.5'>
                        <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
                        Employment Type
                    </h3>
                    <div className='flex flex-wrap gap-1.5'>
                        {jobTypes.map((type) => {
                            const isSelected = (!selectedJobType && type === "All") || selectedJobType === type;
                            return (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => dispatch(setSelectedJobType(type === "All" ? "" : type))}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                                        isSelected
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xs'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                                    }`}
                                >
                                    {type}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 2. Location */}
                <div>
                    <h3 className='text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center gap-1.5'>
                        <MapPin className="w-3.5 h-3.5 text-fuchsia-500" />
                        Location / Work Mode
                    </h3>
                    <div className='flex flex-wrap gap-1.5'>
                        {locations.map((loc) => {
                            const isSelected = (!selectedLocation && loc === "All") || selectedLocation === loc;
                            return (
                                <button
                                    key={loc}
                                    type="button"
                                    onClick={() => dispatch(setSelectedLocation(loc === "All" ? "" : loc))}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                                        isSelected
                                            ? 'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-xs'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                                    }`}
                                >
                                    {loc}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 3. Salary Range */}
                <div>
                    <h3 className='text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center gap-1.5'>
                        <IndianRupee className="w-3.5 h-3.5 text-emerald-500" />
                        Annual Compensation
                    </h3>
                    <div className='flex flex-col gap-1.5'>
                        {salaryRanges.map((sal) => {
                            const isSelected = (!selectedSalaryRange && sal.value === "all") || selectedSalaryRange === sal.value;
                            return (
                                <button
                                    key={sal.value}
                                    type="button"
                                    onClick={() => dispatch(setSelectedSalaryRange(sal.value === "all" ? "" : sal.value))}
                                    className={`px-3 py-2 rounded-xl text-xs font-medium text-left transition-all duration-200 flex items-center justify-between ${
                                        isSelected
                                            ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-semibold'
                                            : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                                    }`}
                                >
                                    <span>{sal.label}</span>
                                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {hasActiveFilters && (
                <div className='pt-5 mt-5 border-t border-slate-100 dark:border-slate-800'>
                    <Button
                        onClick={() => dispatch(clearAllFilters())}
                        variant="outline"
                        className="w-full text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300"
                    >
                        Clear All Active Filters
                    </Button>
                </div>
            )}
        </aside>
    );
};

export default FilterCard;
