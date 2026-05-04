

import Image from "next/image";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { useSession } from "next-auth/react";
import Link from "next/link";
export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        {/* Animated Radial Background Sparkle */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950"></div>

        <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-700">
          <div className="flex justify-center items-center gap-2">
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 tracking-tight">
              Buy Me A Soup
            </h1>
            <img src="/coffee.gif" alt="Soup" className="w-12 h-12 md:w-16 md:h-16" />
          </div>

          <p className="text-slate-300 text-lg md:text-xl max-w-lg leading-relaxed">
            A crowdfunding platform for creators. Get fueled by the fans who love your work!
          </p>

          <div className="flex mt-6 gap-4 flex-wrap justify-center">
            <Link href="/login">
              <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-white rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-800">
                <span className="relative px-6 py-2.5 transition-all ease-in duration-75 bg-slate-950 rounded-full group-hover:bg-opacity-0">
                  Get Started
                </span>
              </button>
            </Link>
            
            <Link href="/about">
              <button className="px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 border border-slate-700 rounded-full hover:bg-slate-800 focus:outline-none">
                Read More
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent opacity-50"></div>

      {/* Feature Section */}
      <section className="py-16 px-4">
        <h2 className="text-center mb-12 text-white text-3xl font-bold">
          Your fans can buy you a <span className="text-blue-400">Soup</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:scale-105 transition-transform">
            <img src="man.gif" alt="Support" className="w-24 h-24 rounded-full border-2 border-purple-500/30 p-1 mb-4" />
            <p className="text-slate-200 font-medium text-lg text-center">Fans want to help</p>
            <p className="text-slate-400 text-sm text-center mt-2">Your community is ready to support your creative journey.</p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:scale-105 transition-transform">
            <img src="coin_spin.webp" alt="Earn" className="w-24 h-24 rounded-full border-2 border-blue-500/30 p-1 mb-4" />
            <p className="text-slate-200 font-medium text-lg text-center">Direct Funding</p>
            <p className="text-slate-400 text-sm text-center mt-2">Receive payments directly without complex setups.</p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:scale-105 transition-transform">
            <img src="money.gif" alt="Grow" className="w-24 h-24 rounded-full border-2 border-green-500/30 p-1 mb-4" />
            <p className="text-slate-200 font-medium text-lg text-center">Crowd Support</p>
            <p className="text-slate-400 text-sm text-center mt-2">Scale your projects with the power of the crowd.</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 flex flex-col items-center">
        <div className="max-w-4xl w-full">
          <h2 className="text-center mb-8 text-white text-3xl font-bold">
            See The message from  <span className="text-purple-400">GetMeASoup</span> 
          </h2>
          
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/10">
            {/* The YouTube Embed */}
            <iframe 
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/qjPGf1TVaaI" 
              title="Crowdfunding for Creators"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>

          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm italic">
              Learn how to launch your project and start receiving support today.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
