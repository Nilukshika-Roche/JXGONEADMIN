import React from 'react';
import {
    Plus,
    MessageSquare,
    Share2,
    Heart,
    Play,
    MoreHorizontal,
    Calendar,
    Eye,
    Send
} from 'lucide-react';

const MediaHubPage = () => {
    const posts = [
        {
            id: 1,
            type: 'video',
            caption: 'Celebrating our annual achievement award ceremony! Proud of our team of innovators.',
            date: 'Dec 22, 2025',
            likes: '1.2K',
            comments: '45',
            shares: '12',
            views: '5.6K',
            status: 'Published',
            thumbnail: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 2,
            type: 'image',
            caption: 'New office opening in the heart of Colombo. A milestone for Janashakthi Group expansion.',
            date: 'Dec 20, 2025',
            likes: '850',
            comments: '22',
            shares: '5',
            views: '2.1K',
            status: 'Draft',
            thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
        }
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <span className="text-orange-600 font-black uppercase tracking-[0.3em] text-[10px]">Media Hub</span>
                    <h1 className="text-4xl font-black text-slate-800 dark:text-white mt-1 uppercase tracking-tighter italic">Content <span className="gradient-text">Management</span></h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Create, publish, and monitor your social interaction.</p>
                </div>
                <button className="btn-primary shadow-orange-200">
                    <Plus size={20} /> Create New Post
                </button>
            </div>

            <div className="flex gap-4 border-b border-orange-100 dark:border-slate-800 pb-2 overflow-x-auto touch-pan-x no-scrollbar">
                {['All Posts', 'Published', 'Drafts', 'Scheduled', 'Archives'].map((tab, i) => (
                    <button key={tab} className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all rounded-t-xl ${i === 0 ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-slate-800/50 italic'}`}>
                        {tab}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <div key={post.id} className="card !p-0 overflow-hidden flex flex-col group hover:-translate-y-2">
                        <div className="relative aspect-[16/10] bg-slate-200 dark:bg-slate-800 overflow-hidden">
                            <img src={post.thumbnail} alt="Post" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                            {post.type === 'video' && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-14 h-14 bg-orange-gradient rounded-full flex items-center justify-center shadow-2xl ring-4 ring-white/30 transform group-hover:scale-125 transition-all duration-300">
                                        <Play size={24} className="text-white ml-1 fill-white" />
                                    </div>
                                </div>
                            )}

                            <div className="absolute top-4 right-4 flex gap-2">
                                <div className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-white backdrop-blur-md border border-white/20 ${post.status === 'Published' ? 'bg-emerald-500/80 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-orange-500/80'}`}>
                                    {post.status}
                                </div>
                                <button className="bg-white/20 backdrop-blur-md p-1.5 rounded-lg border border-white/20 text-white hover:bg-orange-600 transition-colors">
                                    <MoreHorizontal size={18} />
                                </button>
                            </div>

                            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white">
                                <div className="flex items-center gap-1.5 font-black text-[10px] uppercase">
                                    <Calendar size={12} className="text-orange-400" /> {post.date}
                                </div>
                                <div className="flex items-center gap-1.5 font-black text-[10px] uppercase">
                                    <Eye size={12} className="text-orange-400" /> {post.views}
                                </div>
                            </div>
                        </div>

                        <div className="p-8 flex-1 flex flex-col bg-white dark:bg-slate-800/40">
                            <p className="text-slate-800 dark:text-slate-200 font-black text-sm leading-relaxed line-clamp-2 mb-8 group-hover:text-orange-600 transition-colors uppercase tracking-tight italic">{post.caption}</p>

                            <div className="grid grid-cols-3 gap-3 mt-auto">
                                <button className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-transparent hover:border-orange-100 dark:hover:border-slate-700 hover:bg-orange-50 dark:hover:bg-slate-800 group/btn transition-all">
                                    <Heart size={16} className="text-slate-300 group-hover/btn:text-orange-500 transition-colors" />
                                    <span className="text-xs font-black text-slate-800 dark:text-slate-300">{post.likes}</span>
                                </button>
                                <button className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-transparent hover:border-orange-100 dark:hover:border-slate-700 hover:bg-orange-50 dark:hover:bg-slate-800 group/btn transition-all">
                                    <MessageSquare size={16} className="text-slate-300 group-hover/btn:text-orange-500 transition-colors" />
                                    <span className="text-xs font-black text-slate-800 dark:text-slate-300">{post.comments}</span>
                                </button>
                                <button className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-transparent hover:border-orange-100 dark:hover:border-slate-700 hover:bg-orange-50 dark:hover:bg-slate-800 group/btn transition-all">
                                    <Send size={16} className="text-slate-300 group-hover/btn:text-orange-500 transition-colors" />
                                    <span className="text-xs font-black text-slate-800 dark:text-slate-300">{post.shares}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="card flex flex-col items-center justify-center border-4 border-dashed border-orange-100 dark:border-slate-800 bg-orange-50/20 dark:bg-slate-900/20 shadow-none cursor-pointer hover:bg-orange-100/30 dark:hover:bg-orange-950/10 transition-all group min-h-[400px]">
                    <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-[2rem] flex items-center justify-center mb-6 shadow-soft dark:shadow-none group-hover:scale-110 transition-transform duration-500 border border-orange-50 dark:border-slate-700">
                        <Plus size={32} className="text-orange-400 group-hover:text-orange-600 transition-colors" />
                    </div>
                    <p className="text-orange-600 dark:text-orange-400 font-black uppercase tracking-[0.2em] text-xs italic">Upload New Assets</p>
                    <p className="text-slate-400 dark:text-slate-500 text-[10px] mt-2 font-bold uppercase tracking-widest">DRAG AND DROP MEDIA</p>
                </div>
            </div>
        </div>
    );
};

export default MediaHubPage;
