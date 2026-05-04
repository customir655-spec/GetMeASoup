"use client"

import { signOut } from "next-auth/react" // Use the client-side signOut
import Link from 'next/link'

const Logout= () => {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="text-white hover:scale-105 transition-transform  hover:bg-gray-500  font-medium rounded-lg text-sm px-1 py-[0.5px] text-center"
    >
      Sign Out
    </button>
  )
}

export default Logout