import React from 'react'
import Link from 'next/link'
import { auth } from '@/auth.ts'
import Signed_in from './signed_in'
import { headers } from 'next/headers'

const Navbar = async () => {
  const session = await auth();
  
  // Accessing headers to check the current URL context
  const headersList = await headers();
  const referer = headersList.get('referer') || "";
  
  // Check if the current route is the login page
  // We check if the referer ends with /login or contains it
  const isLoginPage = referer.includes('/login');

  if (session) {
    return <Signed_in />
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <Link href={'/'} className="flex items-center gap-2 group">
            <div className='bg-gradient-to-br from-purple-500 to-blue-600 w-8 h-8 rounded-lg flex items-center justify-center text-xs text-white font-black transition-transform group-hover:rotate-12'>
              S
            </div>
            <span className="font-extrabold text-white text-xl tracking-tighter">
              GetMeA<span className="text-blue-400">Soup</span>
            </span>
          </Link>

          {/* Navigation Actions */}
          <div className="flex items-center gap-4">
            {/* Server-side conditional rendering */}
            {!isLoginPage && (
              <Link href="/login">
                <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-bold text-white rounded-xl group bg-gradient-to-br from-purple-600 to-blue-500 transition-all active:scale-95 shadow-lg shadow-purple-500/20">
                  <span className="relative px-6 py-2 transition-all ease-in duration-75 bg-slate-900 rounded-[10px] group-hover:bg-opacity-0">
                    Login
                  </span>
                </button>
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar