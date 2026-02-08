import { Job } from '@/types'
import { MapPin, Briefcase, ExternalLink, Building2 } from 'lucide-react'
import Link from 'next/link'

interface JobCardProps {
    job: Job
}

export default function JobCard({ job }: JobCardProps) {
    return (
        <div className="group bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {job.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                            <Building2 className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{job.company}</span>
                        </div>

                        {job.location && (
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span>{job.location}</span>
                            </div>
                        )}

                        {job.type && (
                            <div className="flex items-center gap-1.5">
                                <Briefcase className="w-4 h-4 text-gray-400" />
                                <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-medium border border-blue-100">
                                    {job.type}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <Link
                    href={job.apply_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow active:scale-95 transform duration-150 whitespace-nowrap"
                >
                    Apply Now
                    <ExternalLink className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}
