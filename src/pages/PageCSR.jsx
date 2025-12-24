import React from 'react';
import {
    Heart,
    Users,
    MapPin,
    Calendar,
    TrendingUp,
    ArrowRight,
    Star,
    CheckCircle2,
    Clock,
    ChevronRight,
    HandHeart
} from 'lucide-react';

const PageCSR = () => {
    const initiatives = [
        {
            id: 1,
            title: 'Digital Literacy 2024',
            location: 'Colombo North',
            beneficiaries: '1,200+',
            status: 'Ongoing',
            progress: 75,
            image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&q=80'
        },
        {
            id: 2,
            title: 'Clean Water Initiative',
            location: 'Gampaha District',
            beneficiaries: '850',
            status: 'Completed',
            progress: 100,
            image: 'https://images.unsplash.com/photo-1541444338782-6492e7069e2b?w=800&q=80'
        },
        {
            id: 3,
            title: 'Community Health Camp',
            location: 'Kandy Region',
            beneficiaries: '450',
            status: 'Upcoming',
            progress: 0,
            image: 'https://images.unsplash.com/photo-1505751172107-57324a007bc0?w=800&q=80'
        }
    ];

    const stats = [
        { label: 'Total Impacted', value: '45.8K', icon: <Users size={24} className="text-orange-600" />, trend: '+12%' },
        { label: 'Volunteers', value: '840', icon: <Heart size={24} className="text-emerald-600" />, trend: '+5%' },
        { label: 'Active Projects', value: '24', icon: <Star size={24} className="text-blue-600" />, trend: '+2' },
        { label: 'CSR Funding', value: '$1.2M', icon: <TrendingUp size={24} className="text-rose-600" />, trend: '15%' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <span className="text-emerald-600 font-black uppercase tracking-[0.3em] text-[10px]">Impact & Purpose</span>
                    <h1 className="text-4xl font-black text-slate-800 dark:text-white mt-1 uppercase tracking-tighter italic">CSR <span className="gradient-text">Activity</span></h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium max-w-xl">Deep tracking and orchestration of corporate social responsibility initiatives across the island.</p>
                </div>
                <button className="btn-primary">
                    <HandHeart size={18} /> Plan New Initiative
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="card group hover:-translate-y-1">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl group-hover:bg-orange-50 dark:group-hover:bg-orange-950/30 transition-colors duration-300">
                                {stat.icon}
                            </div>
                            <span className="text-emerald-500 text-xs font-black">{stat.trend}</span>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{stat.label}</p>
                        <h3 className="text-3xl font-black text-slate-800 dark:text-white mt-1 italic tracking-tighter">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter">Current <span className="text-orange-600 underline decoration-4 underline-offset-8">Projects</span></h2>
                    <button className="text-xs font-black text-orange-600 uppercase tracking-widest flex items-center gap-2 group">
                        View Archive <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {initiatives.map((item) => (
                        <div key={item.id} className="card !p-0 overflow-hidden group">
                            <div className="relative h-48 overflow-hidden">
                                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                <div className="absolute top-4 right-4">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl ring-2 ring-white/20 backdrop-blur-md ${item.status === 'Completed' ? 'bg-emerald-500 text-white' : item.status === 'Ongoing' ? 'bg-orange-500 text-white' : 'bg-slate-800 text-white'}`}>
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tighter italic leading-none">{item.title}</h3>
                                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">
                                        <MapPin size={12} /> {item.location}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                        <span className="text-slate-400">Impact Progress</span>
                                        <span className="text-orange-600">{item.progress}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                                        <div className="h-full bg-orange-gradient transition-all duration-1000" style={{ width: `${item.progress}%` }}></div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3].map((_, i) => (
                                            <img key={i} src={`https://i.pravatar.cc/100?u=${item.id}${i}`} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 object-cover" alt="" />
                                        ))}
                                        <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-[8px] font-black">+12</div>
                                    </div>
                                    <button className="p-2 bg-orange-50 dark:bg-orange-950/20 text-orange-600 rounded-xl hover:bg-orange-600 hover:text-white transition-all">
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PageCSR;
