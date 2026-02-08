export type JobType = 'Full Time' | 'Internship' | 'Remote' | 'Contract' | 'Part Time'

export interface Job {
    id: number
    created_at: string
    title: string
    company: string
    location: string | null
    type: JobType | null
    apply_link: string
}
