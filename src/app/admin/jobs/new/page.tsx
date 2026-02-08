import JobForm from '@/components/JobForm'
import { createJob } from '../../actions'

export default function NewJobPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="container mx-auto px-4 h-16 flex items-center">
                    <h1 className="text-xl font-bold text-gray-900">Add New Job</h1>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8">
                <JobForm action={createJob} />
            </main>
        </div>
    )
}
