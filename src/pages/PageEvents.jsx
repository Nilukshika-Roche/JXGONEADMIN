import React from 'react';
import {
    Calendar as CalendarIcon,
    MapPin,
    Users,
    ArrowRight,
    Clock,
    Tag,
    Star,
    Zap,
    ChevronRight,
    Filter,
    Plus
} from 'lucide-react';

const PageEvents = () => {
    const events = [
        {
            id: 1,
            title: 'Annual Tech Summit 2024',
            date: 'September 15, 2024',
            time: '09:00 AM',
            location: 'Main Ballroom, Hilton',
            attendees: '450+',
            type: 'Conference',
            status: 'Upcoming',
            image: 'https://images.unsplash.com/photo-1540575861501-7c0011e7398a?w=800&q=80'
        },
        {
            id: 2,
            title: 'Leadership Workshop',
            date: 'August 28, 2024',
            time: '14:30 PM',
            location: 'Innovation Hub',
            attendees: '85',
            type: 'Workshop',
            status: 'Full',
            image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80'
        },
        {
            id: 3,
            title: 'Community Outreach',
            date: 'August 12, 2024',
            time: '08:00 AM',
            location: 'Colombo Region',
            attendees: '120',
            type: 'CSR',
            status: 'Completed',
            image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&q=80'
        }
    ];

    const stats = [
        { label: 'Total Events', value: '156', icon: <CalendarIcon size={24} className="text-orange-600" />, trend: 'Season 2024' },
        { label: 'Attendance', value: '8.4K', icon: <Users size={24} className="text-blue-600" />, trend: '+15.2%' },
        { label: 'Rating', value: '4.8', icon: <Star size={24} className="text-yellow-600" />, trend: 'Top Rated' },
        { label: 'Engage Rate', value: '92%', icon: <Zap size={24} className="text-rose-600" />, trend: '+4.5%' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <span className="text-orange-600 font-black uppercase tracking-[0.3em] text-[10px]">Operations & Scheduling</span>
                    <h1 className="text-4xl font-black text-slate-800 dark:text-white mt-1 uppercase tracking-tighter italic">Event <span className="gradient-text">Orchestration</span></h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium max-w-xl">Coordinating enterprise events and key activations with precision and performance tracking.</p>
                </div>
                <div className="flex gap-3">
                    <button className="btn-secondary !px-4 !py-2.5">
                        <Filter size={18} /> Filter Events
                    </button>
                    <button className="btn-primary">
                        <Plus size={18} /> Schedule Event
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="card group hover:-translate-y-1">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl group-hover:bg-orange-50 dark:group-hover:bg-orange-950/30 transition-colors duration-300">
                                {stat.icon}
                            </div>
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{stat.trend}</span>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{stat.label}</p>
                        <h3 className="text-3xl font-black text-slate-800 dark:text-white mt-1 italic tracking-tighter">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                    <div key={event.id} className="card !p-0 overflow-hidden group border-slate-100 dark:border-slate-800">
                        <div className="relative h-48 overflow-hidden">
                            <img src={event.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                            <div className="absolute top-4 left-4">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl ring-2 ring-white/20 backdrop-blur-md ${event.status === 'Completed' ? 'bg-emerald-500 text-white' : event.status === 'Full' ? 'bg-rose-500 text-white' : 'bg-orange-500 text-white'}`}>
                                    {event.status}
                                </span>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg text-white/90">
                                    <Tag size={12} className="text-orange-400" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{event.type}</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tighter italic leading-tight">{event.title}</h3>
                                <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest mt-3">
                                    <MapPin size={12} /> {event.location}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50 dark:border-slate-800">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Date & Time</p>
                                    <div className="flex items-center gap-2 text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-tighter">
                                        <CalendarIcon size={12} className="text-orange-500" /> {event.date}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Attendees</p>
                                    <div className="flex items-center gap-2 text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-tighter">
                                        <Users size={12} className="text-orange-500" /> {event.attendees}
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] bg-slate-50 dark:bg-slate-900 text-slate-400 hover:bg-orange-600 hover:text-white transition-all duration-300">
                                Event Details <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PageEvents;
