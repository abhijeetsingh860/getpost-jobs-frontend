import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { formatSalary } from '@/utils/formatSalary'
import { MapPin, Clock, IndianRupee, ArrowUpRight } from 'lucide-react'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='group relative p-6 rounded-2xl bg-white border border-gray-100 cursor-pointer hover:border-purple-200 hover:shadow-xl transition-all duration-300 overflow-hidden'
        >
            {/* Hover gradient effect */}
            <div className='absolute inset-0 bg-gradient-to-br from-purple-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            
            {/* Arrow icon on hover */}
            <div className='absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <div className='bg-[#6A38C2] p-1.5 rounded-full'>
                    <ArrowUpRight className='h-4 w-4 text-white' />
                </div>
            </div>

            <div className='relative'>
                {/* Company Info */}
                <div className='flex items-center gap-3 mb-3'>
                    <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center font-bold text-[#6A38C2] text-sm'>
                        {job?.company?.name?.charAt(0)}
                    </div>
                    <div>
                        <h1 className='font-semibold text-gray-800'>{job?.company?.name}</h1>
                        <div className='flex items-center gap-1'>
                            <MapPin className='h-3 w-3 text-gray-400' />
                            <p className='text-xs text-gray-400'>India</p>
                        </div>
                    </div>
                </div>

                {/* Job Title */}
                <h1 className='font-bold text-lg text-gray-900 mb-1 group-hover:text-[#6A38C2] transition-colors duration-200'>{job?.title}</h1>
                
                {/* Description */}
                <p className='text-sm text-gray-500 mb-4 line-clamp-2'>{job?.description}</p>

                {/* Badges */}
                <div className='flex items-center gap-2 flex-wrap'>
                    <Badge className='bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100 font-medium text-xs px-3 py-1'>
                        <Clock className='h-3 w-3 mr-1' />
                        {job?.position} Positions
                    </Badge>
                    <Badge className='bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100 font-medium text-xs px-3 py-1'>
                        {job?.jobType}
                    </Badge>
                    <Badge className='bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100 font-medium text-xs px-3 py-1'>
                        <IndianRupee className='h-3 w-3 mr-1' />
                        {formatSalary(job?.salary)} LPA
                    </Badge>
                </div>
            </div>
        </div>
    )
}

export default LatestJobCards