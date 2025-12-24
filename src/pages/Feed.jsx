import React from 'react';
import { MessageSquare, Heart, MoreHorizontal, Share2, ExternalLink, Calendar } from 'lucide-react';

const Feed = () => {
    const feedItems = [
        {
            user: 'Sarah Miller',
            role: 'Content Manager',
            action: 'posted a new update',
            time: '12m ago',
            content: 'Just launched the new Q4 reports for Janashakthi Insurance. Great work by the design team! 🚀',
            tags: ['#Insurance', '#Reports2025'],
            likes: 24,
            comments: 3,
            avatar: 'https://i.pravatar.cc/150?u=sarah'
        },
        {
            user: 'David Chen',
            role: 'System Admin',
            action: 'updated permissions',
            time: '45m ago',
            content: 'Added 5 new members to the Marketing department. Please review their access levels in the staff directory.',
            tags: ['#SystemUpdate', '#Marketing'],
            likes: 8,
            comments: 1,
            avatar: 'https://i.pravatar.cc/150?u=david'
        },
        {
            user: 'Emma Watson',
            role: 'HR Specialist',
            action: 'shared a memory',
            time: '2h ago',
            content: "Looking back at last year's community garden project. So much has grown since then! Our rural reach has expanded significantly.",
            image: 'https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?auto=format&fit=crop&w=800&q=80',
            likes: 56,
            comments: 12,
            avatar: 'https://i.pravatar.cc/150?u=emma'
        }
    ];

    return (
        <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in duration-700">
            <div className="text-center">
                <span className="text-orange-600 font-black uppercase tracking-[0.3em] text-[10px]">What's New</span>
                <h1 className="text-4xl font-black text-slate-800 dark:text-white mt-1 uppercase tracking-tighter italic">Organization <span className="gradient-text">Feed</span></h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium italic">Synced with every department across the group.</p>
            </div>

            <div className="card !p-0 bg-orange-gradient p-[1px] shadow-orange-100 dark:shadow-none overflow-hidden group">
                <div className="bg-white dark:bg-slate-800 p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/20 flex items-center justify-center italic text-orange-600 font-black ring-4 ring-orange-50 dark:ring-orange-900/10">
                        JD
                    </div>
                    <input
                        type="text"
                        placeholder="Share a news or update..."
                        className="flex-1 bg-slate-50 dark:bg-slate-900/50 border-none rounded-2xl py-4 px-6 text-sm font-medium focus:ring-4 focus:ring-orange-500/10 outline-none transition-all dark:text-white dark:placeholder:text-slate-600"
                    />
                    <button className="btn-primary !p-3 rounded-[1.2rem]">
                        <Share2 size={20} />
                    </button>
                </div>
            </div>

            <div className="space-y-10">
                {feedItems.map((item, i) => (
                    <div key={i} className="card !p-0 overflow-hidden group hover:border-orange-200 dark:hover:border-slate-700 transition-all duration-500">
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex gap-4">
                                    <div className="relative">
                                        <img src={item.avatar} alt="" className="w-12 h-12 rounded-[1.2rem] ring-4 ring-orange-100/30 dark:ring-slate-700 grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500 object-cover" />
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-lg">
                                            <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight italic">
                                            {item.user} <span className="font-bold text-slate-400 dark:text-slate-500 normal-case ml-1 italic">{item.action}</span>
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/20 px-2 py-0.5 rounded-md italic">{item.role}</span>
                                            <span className="text-slate-200 dark:text-slate-700">•</span>
                                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{item.time}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-slate-300 dark:text-slate-600 hover:text-orange-600 dark:hover:text-orange-400 p-2 rounded-xl hover:bg-orange-50 dark:hover:bg-slate-800 transition-all">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>

                            <div className="mb-6 px-1">
                                <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed font-medium mb-4 italic uppercase tracking-tight">{item.content}</p>
                                {item.tags && (
                                    <div className="flex flex-wrap gap-2">
                                        {item.tags.map(tag => (
                                            <span key={tag} className="text-[10px] font-black text-orange-600 dark:text-orange-400 hover:text-orange-700 cursor-pointer bg-orange-50 dark:bg-orange-950/20 px-3 py-1 rounded-lg transition-colors italic uppercase tracking-widest">{tag}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {item.image && (
                            <div className="px-8 pb-8">
                                <div className="rounded-[2.5rem] overflow-hidden border-8 border-slate-50 dark:border-slate-900/50 shadow-inner group-hover:rotate-1 transition-transform duration-700">
                                    <img src={item.image} alt="Feed" className="w-full h-auto object-cover max-h-[500px]" />
                                </div>
                            </div>
                        )}

                        <div className="px-10 py-6 bg-slate-50/50 dark:bg-slate-900/50 flex items-center gap-10 border-t border-slate-100/50 dark:border-slate-800">
                            <button className="flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-rose-500 transition-all group/btn">
                                <div className="p-2 rounded-lg group-hover/btn:bg-rose-50 dark:group-hover/btn:bg-rose-950/20 transition-colors">
                                    <Heart size={20} className="group-hover/btn:fill-rose-500" />
                                </div>
                                <span className="text-[11px] font-black uppercase tracking-[0.2em]">{item.likes}</span>
                            </button>
                            <button className="flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-orange-600 dark:hover:text-orange-400 transition-all group/btn">
                                <div className="p-2 rounded-lg group-hover/btn:bg-orange-50 dark:group-hover/btn:bg-orange-950/20 transition-colors">
                                    <MessageSquare size={20} />
                                </div>
                                <span className="text-[11px] font-black uppercase tracking-[0.2em]">{item.comments}</span>
                            </button>
                            <button className="flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-white transition-all group/btn ml-auto">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Share Sync</span>
                                <div className="p-2 rounded-lg group-hover/btn:bg-white dark:group-hover/btn:bg-slate-800 group-hover/btn:shadow-sm transition-all">
                                    <ExternalLink size={18} />
                                </div>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center pt-8">
                <button className="btn-secondary !bg-white dark:!bg-slate-800 group">
                    <Calendar size={18} className="text-orange-400 group-hover:text-orange-600 transition-colors" />
                    <span className="uppercase tracking-[0.2em] text-[10px] font-black italic">Load Historical Feed</span>
                </button>
            </div>
        </div>
    );
};

export default Feed;
