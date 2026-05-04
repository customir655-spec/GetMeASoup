import React from 'react'
import Link from 'next/link'
import { fetchAllCreators } from '../actions/useractions';

const CreatorsPage = async () => {
    const creators = await fetchAllCreators();

    return (
        <div className="min-h-screen bg-slate-950 text-white py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Top Soup Creators
                </h1>
                <p className="text-slate-400 text-center mb-12 text-lg">
                    Support your favorite developers and creators today.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {creators.map((creator) => (
                        <Link 
                            key={creator._id} 
                            href={`/${creator.name}`} 
                            className="group relative bg-slate-900/50 border border-white/10 rounded-2xl p-6 transition-all hover:border-purple-500/50 hover:bg-slate-900/80 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]"
                        >
                            <div className="flex flex-col items-center">
                                {/* Profile Picture with Hover Effect */}
                                <div className="relative mb-4">
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity" />
                                    <img 
                                        src={creator.profilePic || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"} 
                                        alt={creator.name} 
                                        className="relative w-24 h-24 rounded-full object-cover border-2 border-slate-800 group-hover:border-purple-400 transition-colors"
                                    />
                                </div>

                                {/* Creator Info */}
                                <h2 className="text-xl font-bold group-hover:text-purple-400 transition-colors">
                                    @{creator.name}
                                </h2>
                                
                                <button className="mt-6 w-full py-2 bg-slate-800 rounded-xl text-sm font-semibold group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all">
                                    View Profile
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>

                {creators.length === 0 && (
                    <div className="text-center text-slate-500 mt-20">
                        No creators found yet. Be the first!
                    </div>
                )}
            </div>
        </div>
    )
}

export default CreatorsPage