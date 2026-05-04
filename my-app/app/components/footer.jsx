import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='bg-slate-950 border-t border-white/5 py-8 text-slate-400'>
            <div className='max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4'>
                
                {/* Brand & Copyright */}
                <div className='flex items-center gap-2'>
                    <div className='bg-gradient-to-br from-purple-500 to-blue-600 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] text-white font-black'>
                        S
                    </div>
                    <span className='text-sm font-bold text-white tracking-tight'>
                        GetMeASoup <span className='text-slate-500 font-medium'>© {currentYear}</span>
                    </span>
                </div>

                {/* Status/Info */}
                <div className='flex items-center gap-6 text-xs font-semibold uppercase tracking-widest'>
                    <div className='flex items-center gap-2'>
                        <span className='w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse'></span>
                        <span>Systems Operational</span>
                    </div>
                    <div className='hidden md:block w-[1px] h-3 bg-white/10'></div>
                    <span className='hover:text-white transition-colors cursor-pointer'>Privacy</span>
                    <span className='hover:text-white transition-colors cursor-pointer'>Terms</span>
                </div>

                {/* Secondary Rights Text */}
                <div className='text-[11px] text-slate-600 font-medium'>
                    Handcrafted for creators worldwide.
                </div>

            </div>
        </footer>
    )
}

export default Footer