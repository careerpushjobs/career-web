import JobForm from '@/components/JobForm'
import { updateJob } from '../../../actions'
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface Props {
    params: Promise<{ id: string }>
}

export default async function EditJobPage({ params }: Props) {
    const { id } = await params

    const { data: job } = await supabase.from('jobs').select('*').eq('id', id).single()

    if (!job) {
        notFound()
    }

    const updateAction = updateJob.bind(null, job.id)

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="container mx-auto px-4 h-16 flex items-center">
                    <h1 className="text-xl font-bold text-gray-900">Edit Job</h1>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8">
                <JobForm action={updateAction} initialData={job} />
            </main>
        </div>
    )
}
