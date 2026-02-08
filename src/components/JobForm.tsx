'use client'

import { Job } from '@/types'
import { Save, Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'

interface JobFormProps {
    action: (formData: FormData) => Promise<void> | void
    initialData?: Job | null
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            disabled={pending}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
            {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {pending ? 'Saving...' : 'Save Job'}
        </button>
    )
}

export default function JobForm({ action, initialData }: JobFormProps) {
    return (
        <form action={action} className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={initialData?.title}
                        placeholder="e.g. Senior React Developer"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input
                        type="text"
                        name="company"
                        defaultValue={initialData?.company}
                        placeholder="e.g. Acme Corp"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <input
                            type="text"
                            name="location"
                            defaultValue={initialData?.location || ''}
                            placeholder="e.g. New York, NY (Optional)"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                        <select
                            name="type"
                            defaultValue={initialData?.type || 'Full Time'}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white"
                        >
                            <option value="Full Time">Full Time</option>
                            <option value="Internship">Internship</option>
                            <option value="Remote">Remote</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Contract">Contract</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Application Link</label>
                    <input
                        type="url"
                        name="apply_link"
                        defaultValue={initialData?.apply_link}
                        placeholder="https://company.com/careers/job-123"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1">Direct link to the job application.</p>
                </div>

                <div className="pt-4 flex items-center justify-end gap-4">
                    <Link
                        href="/admin/dashboard"
                        className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </Link>
                    <SubmitButton />
                </div>
            </div>
        </form>
    )
}
