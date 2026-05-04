"use client";

import React, { use } from 'react';
import Script from 'next/script';
import { useSession } from 'next-auth/react';
import { initiate } from '../actions/useractions';
import { useState, useEffect } from 'react'; // Consolidated imports
import { fetch_user, fetch_pay } from '../actions/useractions';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Payment_Page = ({ params }) => {
const { data: session } = useSession();
    const router = useRouter(); // Initialize router
    const data = use(params);

    const [payments, setPays] = useState([]);
    const [pics, setPics] = useState({ coverPic: "", profilePic: "" });
    const [pay_form, setForm] = useState({ amount: "", message: "" });
    const [userData, setUserData] = useState(null);
    const [loaded, setLoaded] = useState(false);

    // Function to load data (moved out so it can be called again)
    async function getData() {
        try {
            const x = await fetch_pay(data.user);
            const fetchedUser = await fetch_user(data.user);
            
            if (fetchedUser && fetchedUser.length > 0) {
                setUserData(fetchedUser);
                setPics({ 
                    coverPic: fetchedUser[0].coverPic, 
                    profilePic: fetchedUser[0].profilePic 
                });
                setLoaded(true);
            }
            setPays(x);
        } catch (error) {
            console.error("Failed to fetch user:", error);
        }
    }

    useEffect(() => {
        getData();
    }, [data.user]);

    const makePayment = async (amt = pay_form.amount) => {
        if (!userData || userData.length === 0) {
            toast.error("User data is still loading...");
            return;
        }

        let rz_key = userData[0].razorpay_id;
        const obj = { ...pay_form, amount: amt, to_username: data.user, name: session?.user.name };
        const a = await initiate(amt, data.user, obj);

        const options = {
            key: rz_key,
            amount: amt * 100,
            currency: "INR",
            name: "GetMeASoup",
            description: `Supporting ${data.user}`,
            order_id: a.id,
            handler: async function (response) {
                const res = await fetch("/api/razorpay", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(response),
                });
                
                if (res.ok) {
                    // 2. Success Toast
                    toast.success("✨ Thank you for the soup!", {
                        position: "top-right",
                        autoClose: 3000,
                        theme: "dark",
                    });

                    // 3. Refresh data without full page reload
                    await getData(); // Updates local state
                    router.refresh(); // Syncs server components
                    setForm({ amount: "", message: "" }); // Clear form
                } else {
                    toast.error("Payment verification failed.");
                }
            },
            prefill: {
                name: session?.user?.name || "",
                email: session?.user?.email || "",
            },
            theme: { color: "#8b5cf6" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };
    const h_chng = (e) => setForm({ ...pay_form, [e.target.name]: e.target.value });

    return (
        <div className="min-h-screen bg-slate-950 text-white pb-12">
            <ToastContainer 
                position="top-right"
                theme="dark"
                style={{ marginTop: "75px" }} 
            />
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            {/* Banner & Profile Section */}
            <div className="relative w-full h-[35vh]">
                <img src={pics.coverPic || "/default-cover.jpg"} alt="Cover" className="w-full h-full object-cover opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000"></div>
                        <img
                            src={pics.profilePic || "/default-avatar.png"}
                            alt="Profile"
                            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-slate-950 object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Profile Info */}
            <div className="mt-20 text-center px-4">
                <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 uppercase">
                    {data.user}
                </h1>
                <p className="text-slate-400 mt-2 max-w-md mx-auto text-sm md:text-base italic leading-relaxed">
                    Helping creators turn dreams into reality, one soup at a time. ✨
                </p>
                <div className="flex justify-center gap-6 mt-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <span>{payments.length} Supporters</span>
                    <span>•</span>
                    <span>12 Active Projects</span>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 mt-12 px-4">
                
                {/* Supporters List */}
                <div className="flex-1 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6 shadow-2xl">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <span className="text-purple-400">❤️</span> Recent Supporters
                    </h2>
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        {payments.length === 0 ? (
                            <div className="text-center py-10 text-slate-500">No soup yet. Be the first to fuel this creator!</div>
                        ) : (
                            payments.map((obj, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-sm">
                                        {obj.paid_from[0].toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold text-blue-400 text-sm">@{obj.paid_from}</span>
                                            <span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-tighter">₹{obj.amount}</span>
                                        </div>
                                        <p className="text-slate-300 text-sm mt-1 leading-snug">"{obj.message}"</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Payment Form */}
                <div className="flex-1 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6 shadow-2xl h-fit">
                    <h2 className="text-xl font-bold mb-6">Send <span className="text-blue-400">Support</span></h2>
                    
                    <div className="space-y-5">
                        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                            {[10, 20, 50, 100].map(val => (
                                <button 
                                    key={val} 
                                    onClick={() => setForm({...pay_form, amount: val})}
                                    className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500 hover:bg-purple-500/10 transition-all text-sm font-medium"
                                >
                                    ₹{val}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Amount (INR)</label>
                            <input
                                name="amount" type="number" onChange={h_chng} value={pay_form.amount}
                                className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all"
                                placeholder="0.00"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Message</label>
                            <textarea
                                name="message" onChange={h_chng} value={pay_form.message}
                                className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all h-24 resize-none"
                                placeholder="Say something encouraging..."
                            />
                        </div>

                        <button
                            onClick={() => makePayment()}
                            disabled={!loaded || !pay_form.amount || pay_form.amount <= 0}
                            className="w-full py-4 rounded-2xl font-black text-lg bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 active:scale-95 disabled:opacity-30 transition-all"
                        >
                            {loaded ? "PAY NOW" : "LOADING CREATOR..."}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Payment_Page;