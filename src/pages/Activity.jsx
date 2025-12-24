import React from 'react';
import {
    User,
    Shield,
    Database,
    Trash2,
    Lock,
    RefreshCw,
    Search,
    Filter,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';

const Activity = () => {
    const activities = [
        { type: 'security', user: 'Admin', action: 'Changed system firewall settings', time: '10:45 AM', date: 'Dec 23, 2025', status: 'success', icon: <Shield size={18} /> },
        { type: 'user', user: 'Emma W.', action: 'Removed guest access for project "Alpha"', time: '09:20 AM', date: 'Dec 23, 2025', status: 'success', icon: <User size={18} /> },
        { type: 'database', user: 'System', action: 'Daily backup completed successfully', time: '03:00 AM', date: 'Dec 23, 2025', status: 'success', icon: <Database size={18} /> },
        { type: 'alert', user: 'David C.', action: 'Suspicious login attempt blocked from JP', time: 'Yesterday', date: 'Dec 22, 2025', status: 'warning', icon: <AlertCircle size={18} /> },
        { type: 'access', user: 'Sarah J.', action: 'Updated branding assets in Media Library', time: 'Yesterday', date: 'Dec 22, 2025', status: 'success', icon: <Lock size={18} /> },
        { type: 'system', user: 'Cloud', action: 'Automated cleanup of temporary files', time: 'Dec 21', date: 'Dec 21, 2025', status: 'success', icon: <RefreshCw size={18} /> },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <span className="text-orange-600 font-black uppercase tracking-[0.3em] text-[10px]">Audit Trail</span>
                    <h1 className="text-4xl font-black text-slate-800 dark:text-white mt-1 uppercase tracking-tighter italic">System <span className="gradient-text">Activity</span></h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium italic">Monitoring critical administrator and system events.</p>
                </div>
                <div className="flex gap-3">
                    <button className="btn-secondary">
                        <Filter size={18} /> Filter Logs
                    </button>
                    <button className="btn-secondary !text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 border-rose-100 dark:border-rose-900/30">
                        <Trash2 size={18} /> Purge Logs
                    </button>
                </div>
            </div>

            <div className="card !p-0 overflow-hidden border-orange-100/30">
                <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/20 dark:bg-slate-800/20">
                    <div className="relative w-full max-w-md group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 group-focus-within:text-orange-500 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search by event, user or tag..."
                            className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl py-3 pl-12 pr-4 text-[11px] font-black uppercase tracking-widest focus:ring-4 focus:ring-orange-500/10 outline-none transition-all dark:text-white dark:placeholder:text-slate-600"
                        />
                    </div>
                    <div className="hidden md:flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest italic">System Operational</span>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto h-[600px] overflow-y-auto no-scrollbar">
                    <table className="w-full text-left">
                        <thead className="sticky top-0 z-10">
                            <tr className="bg-orange-50/50 dark:bg-slate-900 text-slate-400 dark:text-slate-500 text-[10px] uppercase font-black tracking-[0.2em] backdrop-blur-md">
                                <th className="px-10 py-6">Identity & Type</th>
                                <th className="px-10 py-6">Administrator</th>
                                <th className="px-10 py-6">Event Description</th>
                                <th className="px-10 py-6">Status Indicator</th>
                                <th className="px-10 py-6 text-right">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {activities.map((log, i) => (
                                <tr key={i} className="hover:bg-orange-50/10 dark:hover:bg-slate-800 transition-colors group">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-[1.2rem] bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                                                {log.icon}
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest italic">{log.type}</p>
                                                <p className="text-[10px] font-bold text-slate-300 dark:text-slate-600 uppercase mt-0.5 tracking-tighter italic">Log ID: #{8429 + i}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight italic">{log.user}</span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <p className="text-sm font-black text-slate-600 dark:text-slate-400 leading-snug group-hover:text-slate-900 dark:group-hover:text-white transition-colors uppercase tracking-tight italic">{log.action}</p>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border w-fit ${log.status === 'success' ? 'bg-emerald-50/50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/10 dark:text-emerald-400 dark:border-emerald-900/30' : 'bg-orange-50/50 text-orange-600 border-orange-100 dark:bg-orange-950/10 dark:text-orange-400 dark:border-orange-900/30'}`}>
                                            {log.status === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                                            <span className="text-[10px] font-black uppercase tracking-widest">{log.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <p className="text-xs font-black text-slate-800 dark:text-slate-300 uppercase tracking-tighter italic">{log.time}</p>
                                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-widest">{log.date}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-10 flex justify-center border-t border-slate-50 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-800/20">
                    <button className="text-orange-600 dark:text-orange-400 font-black text-xs uppercase tracking-[0.2em] hover:bg-orange-600 dark:hover:bg-orange-600 hover:text-white px-8 py-3 rounded-2xl border-2 border-orange-100 dark:border-slate-700 hover:border-orange-600 transition-all flex items-center gap-3 italic">
                        Retrieve Deep Audit History <RefreshCw size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Activity;
