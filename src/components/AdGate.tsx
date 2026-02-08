'use client'

import { useState, useEffect } from 'react'
import AdSenseUnit from './AdSenseUnit'
import { X, Play } from 'lucide-react'

type Props = {
    client: string
    slot: string
}

export default function AdGate({ client, slot }: Props) {
    const [isOpen, setIsOpen] = useState(true)
    const [canClose, setCanClose] = useState(false)
    const [timeLeft, setTimeLeft] = useState(5)

    useEffect(() => {
        if (!isOpen) return

        // Prevent scrolling when open
        document.body.style.overflow = 'hidden'

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setCanClose(true)
                    clearInterval(timer)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => {
            document.body.style.overflow = 'unset'
            clearInterval(timer)
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-lg bg-gray-900 rounded-2xl border border-gray-800 p-6 relative">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Welcome to Career Push</h2>
                </div>

                {/* Ad Container */}
                <div className="min-h-[250px] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-6">
                    <AdSenseUnit
                        client={client}
                        slot={slot}
                        format="rectangle"
                        responsive={true}
                        style={{ display: 'block', minWidth: '300px', minHeight: '250px' }}
                    />
                </div>

                {/* Action Button */}
                <button
                    onClick={() => canClose && setIsOpen(false)}
                    disabled={!canClose}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2
            ${canClose
                            ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transform hover:scale-[1.02]'
                            : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    {canClose ? (
                        <>
                            Enter Website <X className="w-5 h-5" />
                        </>
                    ) : (
                        <>
                            <Play className="w-5 h-5 animate-pulse" />
                            Wait {timeLeft}s...
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}
