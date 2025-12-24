import React, { useState } from 'react';
import {
    Bell,
    Lock,
    User,
    Building2,
    Save,
    ChevronRight,
    ShieldCheck,
    RefreshCw,
    Sun,
    Moon,
    Smartphone,
    Globe
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const AppSettings = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [activeSubTab, setActiveSubTab] = useState('general');

    const tabs = [
        { id: 'general', label: 'Global Setup', icon: <Building2 size={18} /> },
        { id: 'security', label: 'Security & Access', icon: <Lock size={18} /> },
        { id: 'notifications', label: 'System Alerts', icon: <Bell size={18} /> },
        { id: 'profile', label: 'Super Admin Profile', icon: <User size={18} /> },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-700 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <span className="text-orange-600 font-black uppercase tracking-[0.3em] text-[10px]">Configuration</span>
                    <h1 className="text-4xl font-black text-slate-800 dark:text-white mt-1 uppercase tracking-tighter italic">
                        App <span className="gradient-text">Settings</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Fine-tune the enterprise console core parameters.</p>
                </div>
                <div className="flex gap-3">
                    <button className="btn-secondary !text-xs !py-3 uppercase tracking-widest">Discard</button>
                    <button className="btn-primary !text-xs !py-3 uppercase tracking-widest">
                        <Save size={16} /> Deploy Changes
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Navigation Column */}
                <div className="lg:col-span-1 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveSubTab(tab.id)}
                            className={`w-full flex items-center justify-between px-6 py-5 rounded-[1.5rem] transition-all duration-300 font-black text-[10px] uppercase tracking-widest ${activeSubTab === tab.id
                                ? 'bg-orange-gradient text-white shadow-lg shadow-orange-200 dark:shadow-none'
                                : 'bg-white dark:bg-slate-800/50 text-slate-400 hover:text-orange-600 dark:hover:text-orange-400'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                {tab.icon}
                                {tab.label}
                            </div>
                            {activeSubTab === tab.id && <ChevronRight size={14} className="opacity-50" />}
                        </button>
                    ))}

                    <div className="mt-10 p-8 bg-orange-50 dark:bg-slate-800/50 rounded-[2.5rem] border border-orange-100 dark:border-slate-700 relative overflow-hidden group">
                        <div className="relative z-10">
                            <RefreshCw size={24} className="text-orange-500 mb-4 animate-spin-slow" />
                            <h4 className="font-black text-sm text-slate-800 dark:text-white uppercase tracking-tight">System Status</h4>
                            <div className="mt-2 flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Operational V3.1.2</span>
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-100 dark:bg-slate-900 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
                    </div>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="card !p-10">
                        <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter mb-10 italic">Core <span className="text-orange-600">Preferences</span></h3>

                        <div className="space-y-10">
                            {/* Theme Settings Component */}
                            <div className="p-8 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 group transition-all duration-500 hover:border-orange-500/20">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-[1.5rem] bg-white dark:bg-slate-800 shadow-soft flex items-center justify-center text-orange-600">
                                            {isDarkMode ? <Moon size={32} /> : <Sun size={32} />}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-slate-800 dark:text-white uppercase tracking-tight">Display Interface Theme</h4>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Currently operating in {isDarkMode ? 'Dark' : 'Light'} Mode</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={toggleTheme}
                                        className="px-8 py-3 bg-orange-gradient text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-orange-100 dark:shadow-none hover:scale-105 active:scale-95 transition-all"
                                    >
                                        Toggle To {isDarkMode ? 'Light' : 'Dark'} Appearance
                                    </button>
                                </div>
                            </div>

                            {/* General Form Inputs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Globe size={14} /> Console Language Proxy
                                    </label>
                                    <select className="input-field !py-4 lg:!px-6 !font-black !text-xs !uppercase !tracking-widest appearance-none cursor-pointer">
                                        <option>English (United States)</option>
                                        <option>Sinhala (LKA) Proxy</option>
                                        <option>Tamil (LKA) Proxy</option>
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Smartphone size={14} /> Mobile Sync Protocol
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1">
                                            <input type="text" defaultValue="PWA-SYNC-V2" className="input-field !py-4 lg:!px-6 !font-black !text-xs !uppercase !tracking-widest" />
                                        </div>
                                        <button className="p-3.5 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 font-black text-[10px] hover:bg-emerald-500 hover:text-white transition-all uppercase">Active</button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <ShieldCheck size={14} /> Organization Meta Tag Line
                                </label>
                                <textarea rows="3" className="input-field !py-6 lg:!px-8 !font-black !text-xs !uppercase !tracking-[0.1em] leading-relaxed resize-none" defaultValue="Leading the digital transformation of Janashakthi Group with premium administrative controls and data-driven insights."></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="card !p-10 border-rose-100 bg-rose-50/20 dark:bg-rose-950/20 shadow-rose-100 dark:shadow-none">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h4 className="text-xl font-black text-rose-800 dark:text-rose-400 uppercase tracking-tight italic">Reset System Parameters</h4>
                                <p className="text-[10px] font-bold text-rose-600/70 uppercase tracking-widest mt-2">Caution: This will reset all console UI preferences to default.</p>
                            </div>
                            <button className="px-8 py-4 bg-white dark:bg-slate-900 text-rose-600 border border-rose-200 dark:border-rose-900/50 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                                Master Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppSettings;
