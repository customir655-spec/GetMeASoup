"use client"

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import Logout from './logout'
import Link from 'next/link'
import { useRef } from 'react'
import { useEffect } from 'react'
const Signed_in = () => {
  const [show, setShow] = useState(false);
  const { data: session, status } = useSession();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") return (
    <div className="h-16 flex items-center px-8 bg-slate-950">
      <div className="h-4 w-24 bg-slate-800 animate-pulse rounded-full"></div>
    </div>
  );

  if (!session) return null;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href={'/'} className="group">
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-xl tracking-tighter">
              GetMeASoup
            </span>
          </Link>

          <div className="relative" ref={dropdownRef}>
            {/* Trigger Button */}
            <button 
              onClick={() => setShow(!show)}
              className="flex items-center gap-3 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all focus:ring-2 focus:ring-purple-500/50"
            >
              <img 
                src={session.user?.image ?? "/default-avatar.png"} 
                alt="Profile" 
                className='w-8 h-8 rounded-full border border-purple-500/50 object-cover'
              />
              <span className='hidden sm:block text-white text-sm font-medium'>
                {session.user?.name?.split(' ')[0]}
              </span>
              <svg className={`w-4 h-4 text-slate-400 transition-transform ${show ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            {/* Premium Dropdown Menu */}
            {show && (
              <div className="absolute right-0 mt-3 w-48 origin-top-right rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur-xl shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-3 border-b border-white/5 bg-white/5">
                  <p className="text-xs text-slate-400">Signed in as</p>
                  <p className="text-sm font-medium text-white truncate">{session.user?.email}</p>
                </div>

                <div className="p-2">
                  <Link href='/dashboard' onClick={() => setShow(false)} className="flex items-center px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors group">
                    <span className="mr-3 opacity-60 group-hover:opacity-100">📊</span> Dashboard
                  </Link>
                  
                  <Link href={`/${session.user.name}`} onClick={() => setShow(false)} className="flex items-center px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors group">
                    <span className="mr-3 opacity-60 group-hover:opacity-100">👤</span> Your Page
                  </Link>

                  <Link href='/settings' onClick={() => setShow(false)} className="flex items-center px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors group">
                    <span className="mr-3 opacity-60 group-hover:opacity-100">⚙️</span> Settings
                  </Link>
                </div>

                <div className="p-2 border-t border-white/5 bg-red-500/5">
                  <div className="hover:bg-red-500/10 rounded-lg transition-colors">
                    <Logout />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Signed_in;