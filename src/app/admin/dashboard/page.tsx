import { supabase } from '@/lib/supabase'
import { Job } from '@/types'
import { Plus, Trash2, Edit, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { deleteJob, logout } from '../actions'

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
    const { data: jobs, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                    <form action={logout}>
                        <button className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors">
                            Logout
                        </button>
                    </form>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Job Listings</h2>
                    <Link
                        href="/admin/jobs/new"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Add New Job
                    </Link>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                        Failed to load jobs: {error.message}
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Company</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Link</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {jobs?.map((job: Job) => (
                                    <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{job.title}</td>
                                        <td className="px-6 py-4 text-gray-500">{job.company}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium border border-blue-100">
                                                {job.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a
                                                href={job.apply_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-400 hover:text-blue-600 transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end items-center gap-2">
                                                <Link
                                                    href={`/admin/jobs/${job.id}/edit`}
                                                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded hover:bg-blue-50"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <form action={deleteJob.bind(null, job.id)}>
                                                    <button
                                                        className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded hover:bg-red-50"
                                                        title="Delete Job"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {(!jobs || jobs.length === 0) && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                            No jobs found. Click "Add New Job" to create one.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}
