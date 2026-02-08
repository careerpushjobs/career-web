'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function login(prevState: any, formData: FormData) {
    const password = formData.get('password') as string

    // Simple password check - in production use proper auth!
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123' // Fallback only if env is missing, but better to set it
    if (password === adminPassword) {
        const cookieStore = await cookies()
        cookieStore.set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 // 1 day
        })
        redirect('/admin/dashboard')
    } else {
        return { error: 'Invalid password' }
    }
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('admin_session')
    redirect('/admin/login')
}

export async function createJob(formData: FormData) {
    const title = formData.get('title') as string
    const company = formData.get('company') as string
    const location = formData.get('location') as string
    const type = formData.get('type') as string
    const apply_link = formData.get('apply_link') as string

    const { error } = await supabase.from('jobs').insert({
        title,
        company,
        location,
        type,
        apply_link
    })

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath('/')
    revalidatePath('/admin/dashboard')
    redirect('/admin/dashboard')
}

export async function deleteJob(id: number) {
    const { error } = await supabase.from('jobs').delete().eq('id', id)

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath('/')
    revalidatePath('/admin/dashboard')
}

export async function updateJob(id: number, formData: FormData) {
    const title = formData.get('title') as string
    const company = formData.get('company') as string
    const location = formData.get('location') as string
    const type = formData.get('type') as string
    const apply_link = formData.get('apply_link') as string

    const { error } = await supabase.from('jobs').update({
        title,
        company,
        location,
        type,
        apply_link
    }).eq('id', id)

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath('/')
    revalidatePath('/admin/dashboard')
    redirect('/admin/dashboard')
}
