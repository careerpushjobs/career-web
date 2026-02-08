import JobCard from '@/components/JobCard'
import SearchFilter from '@/components/SearchFilter'
import { supabase } from '@/lib/supabase'
import { Job } from '@/types'
import { Briefcase } from 'lucide-react'
import Link from 'next/link'

import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

interface SearchParams {
  q?: string
  type?: string
  page?: string
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<SearchParams> }): Promise<Metadata> {
  const params = await searchParams
  const query = params.q

  return {
    title: query
      ? `${query} Jobs - Career Push`
      : 'Find Freshers & Entry Level Jobs - Career Push',
    description: 'Browse the best job listings for students and fresh graduates.',
  }
}

export default async function Home({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams
  const query = params.q || ''
  const type = params.type || 'All'
  const page = Number(params.page) || 1
  const pageSize = 20

  let dbQuery = supabase
    .from('jobs')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (query) {
    dbQuery = dbQuery.or(`title.ilike.%${query}%,company.ilike.%${query}%`)
  }

  if (type && type !== 'All') {
    dbQuery = dbQuery.eq('type', type)
  }

  const start = (page - 1) * pageSize
  const end = start + pageSize - 1

  const { data: jobs, count, error } = await dbQuery.range(start, end)

  const totalPages = count ? Math.ceil(count / pageSize) : 0

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 py-12">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
          Find Your <span className="text-blue-600">Dream Job</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Browse the latest job openings for freshers and entry-level candidates.
          Start your career journey today.
        </p>
      </div>

      <SearchFilter />

      {error ? (
        <div className="text-center text-red-500 py-8 bg-red-50 rounded-lg">
          Error loading jobs. Please try again later.
        </div>
      ) : jobs && jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(jobs as Job[]).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="bg-gray-50 inline-flex p-4 rounded-full mb-4">
            <Briefcase className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-900">No jobs found</h3>
          <p className="text-gray-500 mt-2">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-8">
          <Link
            href={`/?q=${query}&type=${type}&page=${page - 1}`}
            className={`px-4 py-2 rounded-lg border ${page <= 1
              ? 'bg-gray-100 text-gray-400 pointer-events-none'
              : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
          >
            Previous
          </Link>
          <span className="px-4 py-2 text-gray-600">
            Page {page} of {totalPages}
          </span>
          <Link
            href={`/?q=${query}&type=${type}&page=${page + 1}`}
            className={`px-4 py-2 rounded-lg border ${page >= totalPages
              ? 'bg-gray-100 text-gray-400 pointer-events-none'
              : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
          >
            Next
          </Link>
        </div>
      )}
    </div>
  )
}
