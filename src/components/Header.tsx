import Link from 'next/link'
import { Briefcase } from 'lucide-react'

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-blue-600 p-2 rounded-lg text-white group-hover:bg-blue-700 transition-colors">
                        <Briefcase className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        Career Push
                    </span>
                </Link>

                <nav>
                    <Link
                        href="/admin/login"
                        className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
                    >
                        Admin
                    </Link>
                </nav>
            </div>
        </header>
    )
}
