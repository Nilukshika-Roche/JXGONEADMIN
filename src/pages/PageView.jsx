import React from 'react';
import {
    Building2,
    Settings,
    ExternalLink,
    Users,
    Edit3,
    TrendingUp,
    Clock,
    BadgeCheck,
    MoreHorizontal
} from 'lucide-react';

const PageView = () => {
    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header Card */}
            <div className="card !p-0 overflow-hidden relative border-none">
                <div className="h-60 bg-orange-gradient relative">
                    {/* Abstract patterns */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                    <div className="absolute bottom-0 left-10 w-48 h-48 bg-black/5 rounded-full blur-2xl"></div>
                </div>

                <div className="relative px-10 pb-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 -mt-20">
                        <div className="flex flex-col md:flex-row items-end gap-6">
                            <div className="p-1.5 bg-white/20 dark:bg-slate-900/20 backdrop-blur-xl rounded-[2rem] shadow-2xl">
                                <div className="w-32 h-32 bg-white dark:bg-slate-800 rounded-[1.8rem] flex items-center justify-center shadow-inner border border-white/50 dark:border-slate-700 overflow-hidden group cursor-pointer relative">
                                    <Building2 size={64} className="text-orange-600 drop-shadow-sm group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/10 transition-colors flex items-center justify-center">
                                        {/* Hover state */}
                                    </div>
                                </div>
                            </div>
                            <div className="pb-2">
                                <div className="flex items-center gap-3">
                                    <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tighter italic">Janashakthi <span className="gradient-text">Group</span></h1>
                                    <BadgeCheck size={28} className="text-orange-500 fill-orange-500/20" />
                                </div>
                                <div className="flex items-center gap-4 mt-3">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 ring-1 ring-orange-100"></div>
                                        ))}
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest">
                                        <span className="text-orange-600">24,850</span> Followers <span className="mx-2 text-slate-200 dark:text-slate-700">•</span> Business & Tech
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 pb-2">
                            <button className="btn-primary">
                                <Edit3 size={18} /> Edit Page
                            </button>
                            <button className="btn-secondary">
                                <TrendingUp size={18} /> Promote
                            </button>
                            <button className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-orange-600 hover:border-orange-500/30 transition-all shadow-sm rounded-xl">
                                <Settings size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="px-10 flex gap-10 border-t border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30">
                    {['Home', 'Analytics', 'Content', 'People'].map((tab) => (
                        <button
                            key={tab}
                            className={`py-6 px-1 font-black text-xs uppercase tracking-[0.2em] transition-all relative ${tab === 'Home' ? 'text-orange-600' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                                }`}
                        >
                            {tab}
                            {tab === 'Home' && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-600 rounded-t-full shadow-[0_0_12px_rgba(234,88,12,0.5)]"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                    <div className="card !p-8">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="font-black text-slate-800 dark:text-white text-xl uppercase tracking-tighter italic">Recent Activity</h3>
                                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-1">Tracking live updates</p>
                            </div>
                            <button className="text-orange-600 dark:text-orange-400 font-black text-[10px] uppercase tracking-widest hover:underline">View History</button>
                        </div>
                        <div className="space-y-6">
                            {[
                                { title: 'New post published', sub: '"Annual General Meeting 2023 Highlights"', time: '2 hours ago', icon: <Edit3 className="text-amber-500" /> },
                                { title: 'Analytics updated', sub: 'Your reach increased by 15% this week', time: '5 hours ago', icon: <TrendingUp className="text-emerald-500" /> },
                                { title: 'Permission changed', sub: 'Sarah Miller was added as an Editor', time: 'Yesterday', icon: <Users className="text-blue-500" /> }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 p-4 rounded-2xl hover:bg-orange-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center shrink-0 border border-slate-50 dark:border-slate-700 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <p className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight italic">{item.title}</p>
                                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{item.time}</span>
                                        </div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">{item.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="card !p-8 bg-orange-600 text-white border-none shadow-orange-200">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-3 h-3 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]"></div>
                            <span className="font-black text-xs uppercase tracking-widest text-white/90">Page Health: Excellent</span>
                        </div>
                        <h4 className="text-2xl font-black mb-4 leading-tight">Your page is currently <span className="underline decoration-white/40 underline-offset-8">Public & Trending</span></h4>
                        <p className="text-white/80 text-sm font-medium leading-relaxed mb-8">
                            Post engagement is up by 45% compared to similar organizations in your industry.
                        </p>
                        <button className="w-full py-4 bg-white/20 hover:bg-white text-white hover:text-orange-600 rounded-xl font-black text-xs uppercase tracking-widest transition-all backdrop-blur-md">
                            Optimize View Settings
                        </button>
                    </div>

                    <div className="card !p-8">
                        <h4 className="font-black text-slate-800 dark:text-white text-lg mb-8 uppercase tracking-tighter italic">Real-time Statistics</h4>
                        <div className="space-y-6">
                            {[
                                { label: 'Post Reach', val: '12.5k', color: 'bg-orange-500' },
                                { label: 'Page Views', val: '3.2k', color: 'bg-amber-500' },
                                { label: 'Engagement Rate', val: '4.8%', color: 'bg-slate-800' }
                            ].map((stat, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{stat.label}</span>
                                        <span className="text-sm font-black text-slate-800 dark:text-white">{stat.val}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className={`h-full ${stat.color} w-3/4 shadow-sm`}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageView;
