"use client"
import React, { useState, useEffect } from 'react'
import { updateUser, fetch_user } from '../actions/useractions';
import { useSession } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    const { data: session, update } = useSession();
    const [form, setForm] = useState({
        name: "",
        profilePic: "",
        coverPic: "",
        email: "",
        razorpay_id: "",
        razorpay_secret: ""
    });

    useEffect(() => {
        const getData = async () => {
            // Priority 1: Fetch absolute latest from DB using session name as the key
            if (session?.user?.name) {
                const dbUser = await fetch_user(session.user.name);
                
                if (dbUser && dbUser.length > 0) {
                    const u = dbUser[0];
                    console.log(u);

                    setForm({
                        name: u.name || "",
                        profilePic: u.profilePic || "",
                        email: u.email || "",
                        coverPic: u.coverPic || "",
                        razorpay_id: u.razorpay_id || "",
                        razorpay_secret: u.razorpay_secret || ""
                    });
                } else {
                    // Priority 2: Fallback to OAuth session data for brand-new users
                    setForm({
                        name: session.user.name || "",
                        email: session.user.email || "",
                        profilePic: session.user.image || "",
                        coverPic: "",
                        razorpay_id: "",
                        razorpay_secret: ""
                    });
                }
            }
        };
        getData();
    }, [session]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        // Since we are using a custom handler with toast, we prevent default
        if(e && e.preventDefault) e.preventDefault();
        
        const id = toast.loading("Saving your profile settings...");
        
        try {
            // session.user.name is the 'oldusername' used for finding the record
            const res = await updateUser(form, session.user.name);
            
            if (res.success) {
                // Instantly sync the Navbar and Session with the new Name/Pic
                await update({
                    ...session.user,
                    name: res.user.name,
                    image: res.user.profilePic
                });

                toast.update(id, { 
                    render: "✨ Profile synced successfully!", 
                    type: "success", 
                    isLoading: false, 
                    autoClose: 3000 
                });
            } else {
                toast.update(id, { 
                    render: `❌ ${res.error}`, 
                    type: "error", 
                    isLoading: false, 
                    autoClose: 4000 
                });
            }
        } catch (error) {
            toast.update(id, { 
                render: "❌ System error. Please try again.", 
                type: "error", 
                isLoading: false, 
                autoClose: 3000 
            });
        }
    };
    
    return (
        <div className="min-h-screen py-12 px-4 text-white bg-slate-950">
           
            <ToastContainer 
    position="top-right" 
    theme="dark" 
    style={{ marginTop: "70px" }} // Pushes it down below the Navbar
/>
            <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-slate-900/40 backdrop-blur-xl shadow-2xl border border-white/5">
                
                {/* Header / Cover Section */}
                <div className="relative h-48 w-full bg-slate-900">
                    {form.coverPic ? (
                        <img src={form.coverPic} className="h-full w-full object-cover transition-opacity duration-500" alt="Cover" />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 opacity-50" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                    
                    {/* Profile Picture Overlay */}
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0">
                        <div className="h-28 w-28 md:h-32 md:w-32 rounded-3xl border-4 border-slate-950 bg-slate-800 shadow-2xl overflow-hidden relative group">
                            {form.profilePic ? (
                                <img src={form.profilePic} className="h-full w-full object-cover transition-transform group-hover:scale-110" alt="Profile" />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center bg-slate-800 text-[10px] font-black tracking-widest text-slate-500">USER</div>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                <span className="text-[10px] font-bold">PREVIEW</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <div className="mt-14 p-6 md:p-10">
                    <div className="mb-10">
                        <h1 className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                            Creator Settings
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">Manage your platform identity and payment integration.</p>
                    </div>

                    {/* We use onSubmit to handle both Enter key and Button click */}
                    <form onSubmit={handleFormSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                            
                            {/* Input Mapping */}
                            {[
                                { label: "Your Handle", name: "name", type: "text", value: form.name, placeholder: "username" },
                                { label: "Email (Linked)", name: "email", type: "email", value: form.email, disabled: true },
                                { label: "Profile Image URL", name: "profilePic", type: "text", value: form.profilePic, placeholder: "https://..." },
                                { label: "Banner Image URL", name: "coverPic", type: "text", value: form.coverPic, placeholder: "https://..." },
                                { label: "Razorpay Key ID", name: "razorpay_id", type: "password", value: form.razorpay_id, placeholder: "rzp_test_..." },
                                { label: "Razorpay Secret", name: "razorpay_secret", type: "password", value: form.razorpay_secret, placeholder: "••••••••" },
                            ].map((field) => (
                                <div key={field.name} className={`flex flex-col gap-2 ${field.disabled ? 'opacity-50' : ''}`}>
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">
                                        {field.label}
                                    </label>
                                    <input 
                                        name={field.name} 
                                        value={field.value} 
                                        onChange={handleChange} 
                                        type={field.type}
                                        disabled={field.disabled}
                                        placeholder={field.placeholder || ""}
                                        className={`w-full bg-slate-950/50 p-4 rounded-2xl border border-white/5 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all placeholder:text-slate-700 text-sm font-medium ${field.disabled ? 'cursor-not-allowed bg-transparent' : ''}`} 
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Payment Warning */}
                        <div className="bg-amber-500/5 border border-amber-500/20 p-5 rounded-2xl flex items-start gap-4">
                            <span className="text-xl">🛡️</span>
                            <div>
                                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Payment Security</h4>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    We never store your Razorpay Secret on the client side. Your credentials are used exclusively to generate payment links for your supporters. 
                                </p>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-[10px] text-slate-500 italic font-medium uppercase tracking-widest text-center md:text-left">
                                All changes are synced to your public profile immediately.
                            </p>
                            <button 
                                type="submit" 
                                className="w-full md:w-auto px-12 py-4 font-black text-xs tracking-widest text-white rounded-2xl transition-all bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-[0_10px_30px_rgba(147,51,234,0.3)] hover:-translate-y-0.5 active:scale-95"
                            >
                                SAVE SETTINGS
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Dashboard