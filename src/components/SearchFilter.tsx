'use client'

import { Search, Filter } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export default function SearchFilter() {
    const searchParams = useSearchParams()
    const router = useRouter()

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('q', term)
        } else {
            params.delete('q')
        }
        router.replace(`/?${params.toString()}`)
    }, 300)

    const handleFilter = (type: string) => {
        const params = new URLSearchParams(searchParams)
        if (type && type !== 'All') {
            params.set('type', type)
        } else {
            params.delete('type')
        }
        router.replace(`/?${params.toString()}`)
    }

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search by job title or company..."
                    defaultValue={searchParams.get('q')?.toString()}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all placeholder:text-gray-400 text-gray-700"
                />
            </div>

            <div className="relative w-full md:w-48">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                    onChange={(e) => handleFilter(e.target.value)}
                    defaultValue={searchParams.get('type')?.toString()}
                    className="w-full pl-10 pr-8 py-2 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none appearance-none cursor-pointer text-gray-700"
                >
                    <option value="All">All Types</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    )
}
