'use client'

import { useActionState } from 'react'
import { login } from '../actions'
import { Briefcase } from 'lucide-react'

// Initial state for the form
const initialState = {
    error: '',
}

export default function LoginPage() {
    const [state, formAction] = useActionState(login, initialState)

    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="flex justify-center mb-6">
                    <div className="bg-blue-100 p-3 rounded-full">
                        <Briefcase className="w-8 h-8 text-blue-600" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Admin Login</h2>

                <form action={formAction} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                            placeholder="Enter admin password"
                            required
                        />
                    </div>

                    {state?.error && (
                        <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                            {state.error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}
