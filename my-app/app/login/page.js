import React from 'react'
import { signIn } from "@/auth"

const page = () => {
  return (
    // Main container with a subtle radial gradient to draw eyes to the center
    <div className='flex flex-col items-center justify-center min-h-[85vh] text-white p-6'>
      
      {/* Login Card with enhanced Glassmorphism */}
      <div className='relative group w-full max-w-md'>
        {/* Animated Background Glow behind the card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        
        <div className='relative bg-slate-900/80 backdrop-blur-xl p-10 rounded-[2rem] shadow-2xl border border-white/10 w-full text-center'>
          
          <h1 className='text-4xl font-black mb-3 tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent'>
            Welcome Back
          </h1>
          <p className='text-slate-400 mb-10 text-sm font-medium'>
            Select your preferred platform to continue
          </p>

          <div className='space-y-4'>
            {/* Google Button - Made to look more "Premium" */}
            <form
              action={async () => {
                "use server"
                await signIn("google", { redirectTo: "http://localhost:3000/dashboard" })
              }}
              className="w-full"
            >
              <button 
                type="submit"
                className='w-full flex items-center justify-center gap-4 bg-white hover:bg-gray-50 text-slate-900 font-bold py-3.5 px-6 rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-[0.98]'
              >
                <svg className='w-5 h-5' viewBox='0 0 24 24'>
                  <path fill='#ea4335' d='M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.102 6.612l4.164 3.153z'></path>
                  <path fill='#34a853' d='M16.04 18.013c-1.09.61-2.4 1.077-4.04 1.077a7.077 7.077 0 0 1-6.734-4.856l-4.164 3.153C3.198 21.302 7.27 24 12 24c3.218 0 6.136-1.127 8.355-3.036l-4.314-2.95z'></path>
                  <path fill='#4285f4' d='M19.89 12.164C19.89 11.473 19.827 10.745 19.709 10.036H12v4.036h4.373c-.2 1.073-.836 1.945-1.745 2.582l4.314 2.95c2.518-2.31 3.945-5.71 3.945-9.44z'></path>
                  <path fill='#fbbc05' d='M5.266 14.235a7.077 7.077 0 0 1 0-4.47l-4.164-3.153c-1.473 2.855-1.473 6.306 0 9.16l4.164-3.153z'></path>
                </svg>
                <span>Continue with Google</span>
              </button>
            </form>

            <div className="flex items-center gap-4 my-6">
                <div className="h-[1px] bg-white/10 flex-1"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">OR</span>
                <div className="h-[1px] bg-white/10 flex-1"></div>
            </div>

            {/* GitHub Button - Styled to match the dark theme */}
            <form
              action={async () => {
                "use server"
                await signIn("github", { redirectTo: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000/dashboard" })
              }}
              className="w-full"
            >
              <button 
                type="submit"
                className='w-full flex items-center justify-center gap-4 bg-slate-800/50 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-2xl transition-all duration-300 border border-white/10 hover:border-white/20 active:scale-[0.98]'
              >
                <svg className='w-5 h-5' viewBox='0 0 24 24' fill='currentColor'>
                  <path fillRule='evenodd' clipRule='evenodd' d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.81 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z'/>
                </svg>
                <span>Continue with GitHub</span>
              </button>
            </form>
          </div>

          {/* Footer Link */}
          <div className='mt-10 pt-6 border-t border-white/5'>
            <p className='text-slate-500 text-sm'>
              New here? <a href='/signup' className='text-blue-400 hover:text-blue-300 font-bold transition-colors'>Create an account</a>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default page;