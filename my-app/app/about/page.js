import React from 'react';
import Link from 'next/link';
const About = () => {
  return (
    <div className="min-h-screen bg-blue-950 text-slate-200 selection:bg-blue-500/30">
      {/* Hero Section */}
      <header className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent)]"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
            Fueling Creativity, <br/> One Bowl at a Time.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            GetMeASoup is the modern home for creators to connect with their community and turn passion into a sustainable career.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 pb-24 space-y-24">
        
        {/* Mission Section */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <div className="p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-blue-500/40 transition-all duration-500 shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-white">The Mission</h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              We believe the internet is better when creators are empowered. 
              <strong> GetMeASoup</strong> was built to strip away the complexity of traditional 
              monetization. No algorithms, no gatekeepers—just a direct line 
              for your fans to support your work.
            </p>
          </div>
          
          {/* Glassmorphism Decorative Code Card */}
          <div className="relative group hidden md:block">
             <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
             <div className="relative bg-blue-900/40 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                <pre className="text-blue-300 font-mono text-sm leading-6">
{`// Your Growth Engine
const GetMeASoup = {
  mission: "Empower Creators",
  fuel: "Community Support",
  status: "Cooking..."
};

function deliverValue(passion) {
  return passion + " + Support";
}`}
                </pre>
             </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Us?</h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BoltIcon />}
              title="Seamless Flow"
              desc="Instant payouts and a friction-less checkout experience for your supporters."
            />
            <FeatureCard 
              icon={<ShieldIcon />}
              title="Secure by Design"
              desc="Enterprise-grade security ensuring every transaction is safe and transparent."
            />
            <FeatureCard 
              icon={<UsersIcon />}
              title="Direct Access"
              desc="Own your audience. No middleman, just pure connection with your fans."
            />
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-blue-900/20 p-16 rounded-[3rem] border border-white/5 backdrop-blur-sm">
          <h2 className="text-4xl font-bold mb-8 text-white">Start Your Kitchen Today</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-10 py-4 bg-blue-600 hover:bg-blue-500 hover:scale-105 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-900/20">
              <Link href="\dashboard"> Create My Page </Link>
            </button>
            <button className="px-10 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all">
              <Link href="\creators">View Creators</Link>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

// Reusable Feature Card Component
const FeatureCard = ({ icon, title, desc }) => (
  <div className="group p-8 rounded-2xl bg-blue-900/10 border border-white/5 hover:bg-blue-900/20 transition-all">
    <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{desc}</p>
  </div>
);

// Icons
const BoltIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
);
const ShieldIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
);
const UsersIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
);

export default About;
