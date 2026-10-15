import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal, Globe, MapPin, Building2, ExternalLink } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filtered = companies?.filter((company) => {
            if (!searchCompanyByText) return true;
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase()) ||
                   company?.location?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        }) || [];
        setFilterCompany(filtered);
    }, [companies, searchCompanyByText]);

    if (!filterCompany || filterCompany.length === 0) {
        return (
            <div className="py-16 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
                    <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">No Companies Registered Yet</h3>
                <p className="text-xs text-slate-400 mt-1 mb-4">Register your employer organization to begin posting vacancies.</p>
                <Link to="/admin/companies/create">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors">
                        Register Company
                    </span>
                </Link>
            </div>
        );
    }

    return (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
            <Table>
                <TableHeader className="bg-slate-50/70 dark:bg-slate-800/50">
                    <TableRow className="border-b border-slate-200/80 dark:border-slate-800">
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Company</TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Location</TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Website</TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Registered</TableHead>
                        <TableHead className="text-right font-bold text-xs uppercase tracking-wider text-slate-500">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany.map((company) => (
                        <TableRow key={company._id} className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                            {/* Logo & Name */}
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0">
                                        <AvatarImage src={company.logo} alt={company.name} />
                                        <AvatarFallback className="bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-xs rounded-xl">
                                            {company.name?.charAt(0) || "C"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                                            {company.name}
                                        </h4>
                                        <p className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">
                                            {company.description || "Tech Company"}
                                        </p>
                                    </div>
                                </div>
                            </TableCell>

                            {/* Location */}
                            <TableCell className="text-xs text-slate-600 dark:text-slate-300">
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3 text-slate-400" />
                                    <span>{company.location || "Remote"}</span>
                                </div>
                            </TableCell>

                            {/* Website */}
                            <TableCell className="text-xs">
                                {company.website ? (
                                    <a
                                        href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1"
                                    >
                                        <Globe className="w-3 h-3" />
                                        <span className="truncate max-w-[140px]">{company.website.replace(/^https?:\/\//, "")}</span>
                                    </a>
                                ) : (
                                    <span className="text-slate-400">Not added</span>
                                )}
                            </TableCell>

                            {/* Date */}
                            <TableCell className="text-xs text-slate-400">
                                {company.createdAt ? company.createdAt.split("T")[0] : "Recently"}
                            </TableCell>

                            {/* Action */}
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 transition-colors">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-36 p-2 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900" align="end">
                                        <button
                                            onClick={() => navigate(`/admin/companies/${company._id}`)}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-left"
                                        >
                                            <Edit2 className="w-3.5 h-3.5 text-indigo-500" />
                                            Edit Details
                                        </button>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CompaniesTable;
