import React from 'react';
import { Camera, Save, Globe, Lock, Bell, Building2, ChevronRight, ShieldCheck, Heart, Zap, Edit3, ShieldAlert } from 'lucide-react';

const EditPage = () => {
    return (
        <div className="max-w-5xl mx-auto space-y-12 pb-20 animate-in fade-in duration-700 font-sans">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <span className="text-orange-600 font-black uppercase tracking-[0.3em] text-[10px]">Global Control</span>
                    <h1 className="text-4xl font-black text-slate-800 dark:text-white mt-1 uppercase tracking-tighter italic">System <span className="gradient-text">Configuration</span></h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium italic">Fine-tune your experience and security preferences.</p>
                </div>
                <div className="flex gap-4">
                    <button className="btn-secondary dark:!bg-slate-800">Discard Changes</button>
                    <button className="btn-primary shadow-orange-200">
                        <Save size={18} /> Commit Updates
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                <div className="lg:col-span-1 space-y-8">
                    <nav className="flex flex-col gap-2 p-1 bg-white dark:bg-slate-800/50 rounded-[2rem] shadow-soft dark:shadow-none border border-orange-100/50 dark:border-slate-800">
                        {[
                            { label: 'General Info', icon: <Building2 size={18} />, active: true },
                            { label: 'Privacy & Access', icon: <Lock size={18} /> },
                            { label: 'Notifications', icon: <Bell size={18} /> },
                            { label: 'CSR Strategy', icon: <Heart size={18} /> },
                            { label: 'Staff Clearance', icon: <ShieldCheck size={18} /> },
                            { label: 'Technical SEO', icon: <Globe size={18} /> },
                        ].map((item, i) => (
                            <button
                                key={i}
                                className={`flex items-center justify-between px-6 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest transition-all ${item.active ? 'bg-orange-gradient text-white shadow-lg shadow-orange-200 dark:shadow-none' : 'text-slate-400 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-orange-600 dark:hover:text-orange-400 italic'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    {item.icon} {item.label}
                                </div>
                                {item.active && <ChevronRight size={14} className="text-white/50" />}
                            </button>
                        ))}
                    </nav>

                    <div className="p-6 bg-orange-600 rounded-[2.5rem] text-white relative overflow-hidden group shadow-lg shadow-orange-200 dark:shadow-none">
                        <div className="relative z-10">
                            <h4 className="font-black text-sm uppercase tracking-tight mb-2 italic">Pro Admin</h4>
                            <p className="text-[10px] text-white/70 font-bold mb-6 uppercase tracking-widest leading-relaxed">Upgrade to unlock advanced organizational analytics.</p>
                            <button className="w-full py-3 bg-white text-orange-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">Get Premium</button>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                    </div>
                </div>

                <div className="lg:col-span-3 space-y-10">
                    <div className="card !p-10">
                        <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tighter mb-10 pb-6 border-b border-slate-50 dark:border-slate-800 italic">Public Page Identity</h3>

                        <div className="space-y-10">
                            <div className="flex flex-col md:flex-row items-center gap-10">
                                <div className="relative group cursor-pointer">
                                    <div className="w-32 h-32 rounded-[2.5rem] bg-orange-50 dark:bg-slate-900 p-1.5 ring-8 ring-orange-100/30 dark:ring-slate-800 overflow-hidden relative border border-orange-100/50 dark:border-slate-700">
                                        <img src="https://ui-avatars.com/api/?name=Janashakthi+Group&background=f97316&color=fff&size=256" alt="Logo" className="w-full h-full rounded-[2rem] object-cover italic font-black" />
                                        <div className="absolute inset-0 bg-black/60 rounded-[2rem] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <Camera size={28} className="text-white animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-800 dark:text-white text-base uppercase tracking-tight italic">Company Brand Asset</h4>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mt-1 uppercase tracking-[0.2em] mb-4">SVG, PNG or WEBP (Max 5MB)</p>
                                    <div className="flex gap-3">
                                        <button className="px-5 py-2.5 bg-orange-gradient text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-orange-100 dark:shadow-none">Upload New Logo</button>
                                        <button className="px-5 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-xl font-black text-[10px] uppercase tracking-widest border border-slate-100 dark:border-slate-700 hover:text-rose-500 transition-colors">Delete</button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-orange-600 dark:text-orange-500 uppercase tracking-[0.2em] flex items-center gap-2 italic">
                                        <Building2 size={12} /> Registered Display Name
                                    </label>
                                    <input type="text" defaultValue="Janashakthi Group" className="input-field !text-xs !font-black !py-4 lg:!px-6 !bg-orange-50/20 dark:!bg-slate-900/50 !border-orange-100 dark:!border-slate-800 uppercase tracking-widest" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-orange-600 dark:text-orange-500 uppercase tracking-[0.2em] flex items-center gap-2 italic">
                                        <Zap size={12} /> Core Industry Sector
                                    </label>
                                    <div className="relative">
                                        <select className="input-field !text-xs !font-black !py-4 lg:!px-6 !bg-orange-50/20 dark:!bg-slate-900/50 !border-orange-100 dark:!border-slate-800 appearance-none uppercase tracking-widest w-full">
                                            <option>Insurance & Finance</option>
                                            <option>Technology Solutions</option>
                                            <option>Health & Wellness</option>
                                        </select>
                                        <ChevronRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-400 rotate-90" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-orange-600 dark:text-orange-500 uppercase tracking-[0.2em] flex items-center gap-2 italic">
                                    <Edit3 size={12} /> Professional Narrative / Bio
                                </label>
                                <textarea rows="4" className="input-field !text-[11px] !font-black !py-6 lg:!px-6 !bg-orange-50/20 dark:!bg-slate-900/50 !border-orange-100 dark:!border-slate-800 resize-none uppercase tracking-tight italic" defaultValue="Leading the way in ethical insurance and diversified financial services across Sri Lanka. Committed to excellence and community growth through strategic social governance."></textarea>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-orange-600 dark:text-orange-500 uppercase tracking-[0.2em] flex items-center gap-2 italic">
                                    <Globe size={12} /> Official Web Domain
                                </label>
                                <div className="flex relative overflow-hidden rounded-[1.5rem] border-2 border-orange-100 dark:border-slate-800 shadow-inner focus-within:border-orange-500 transition-all">
                                    <div className="px-6 flex items-center bg-orange-50 dark:bg-slate-900 text-orange-400 text-[10px] font-black uppercase tracking-widest border-r border-orange-100 dark:border-slate-800 italic">
                                        https://
                                    </div>
                                    <input type="text" defaultValue="www.janashakthi.com" className="flex-1 w-full bg-white dark:bg-slate-800 px-6 py-5 text-xs font-black text-slate-800 dark:text-white outline-none uppercase tracking-widest" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card !p-10 border-rose-100 dark:border-rose-900/30 bg-rose-50/50 dark:bg-rose-950/10 shadow-rose-100 dark:shadow-none relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-xl font-black text-rose-800 dark:text-rose-500 uppercase tracking-tighter mb-4 flex items-center gap-3 italic">
                                <ShieldAlert className="text-rose-500 animate-pulse" size={24} /> critical vulnerability zone
                            </h3>
                            <p className="text-xs text-rose-700/80 dark:text-rose-400/80 font-black leading-relaxed mb-10 max-w-xl uppercase tracking-widest italic">
                                Performing actions in this zone is irreversible. Deleting the page will purge all associated metadata, analytics and media assets from our master databases.
                            </p>
                            <button className="px-8 py-4 bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-500 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] border-2 border-rose-200 dark:border-rose-900/50 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all shadow-lg shadow-rose-100 dark:shadow-none italic tracking-tighter">Purge Page Forever</button>
                        </div>
                        <div className="absolute -top-20 -right-20 w-48 h-48 bg-rose-100 dark:bg-rose-900/10 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPage;
