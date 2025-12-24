import React from 'react';
import { Skull, AlertTriangle, FileSearch, Trash2, Download, Filter, Search, Ghost } from 'lucide-react';

const DeadRecord = () => {
    const staleRecords = [
        { id: 'DR-001', entity: 'User Metadata #842', type: 'Orphaned JSON', size: '124KB', lastSync: '14 Months Ago', risk: 'Low' },
        { id: 'DR-002', entity: 'Old Analytics Cache', type: 'Legacy Table', size: '2.4MB', lastSync: '2 Years Ago', risk: 'Medium' },
        { id: 'DR-003', entity: 'Temporary Uploads 2023', type: 'Blob Files', size: '4.8GB', lastSync: '2.5 Years Ago', risk: 'High' },
        { id: 'DR-004', entity: 'Draft Content (Global)', type: 'Serialized Obj', size: '89KB', lastSync: '11 Months Ago', risk: 'Low' },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <span className="text-rose-500 font-black uppercase tracking-[0.3em] text-[10px]">Maintenance</span>
                    <h1 className="text-4xl font-black text-slate-800 dark:text-white mt-1 uppercase tracking-tighter italic">
                        DeadRecord <span className="text-rose-600">Purge</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Monitoring and cleaning outdated or orphaned enterprise data.</p>
                </div>
                <div className="flex gap-3">
                    <button className="btn-secondary">
                        <FileSearch size={18} /> Deep Scan
                    </button>
                    <button className="btn-primary !bg-rose-600 !hover:bg-rose-700 shadow-rose-200">
                        <Trash2 size={18} /> Purge All Junk
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-8">
                    <div className="card !bg-slate-900 border-none relative overflow-hidden group">
                        <div className="relative z-10 text-white">
                            <Skull size={40} className="text-rose-600 mb-6 group-hover:rotate-12 transition-transform" />
                            <h3 className="text-3xl font-black uppercase tracking-tighter italic">12.4 GB</h3>
                            <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mt-1">Stale Data detected</p>
                            <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase mb-2">
                                    <span>Database Health</span>
                                    <span className="text-rose-500">84%</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div className="w-[84%] h-full bg-rose-600"></div>
                                </div>
                            </div>
                        </div>
                        <Ghost size={120} className="absolute -bottom-10 -right-10 text-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    </div>

                    <div className="card !p-8 border-orange-100/50">
                        <h4 className="font-black text-slate-800 dark:text-white uppercase tracking-tight mb-4 flex items-center gap-2 italic">
                            <AlertTriangle size={18} className="text-orange-500" /> Cleanup Advisory
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed uppercase tracking-tighter">
                            Orphaned records can cause minor indexing delays during search. Weekly maintenance is recommended for optimal console performance.
                        </p>
                    </div>
                </div>

                <div className="md:col-span-2 card !p-0 overflow-hidden">
                    <div className="p-8 flex justify-between items-center border-b border-slate-50 dark:border-slate-700">
                        <div className="relative w-full max-w-xs">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                            <input type="text" placeholder="Search stale IDs..." className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl py-2 pl-10 pr-4 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-4 focus:ring-orange-500/10" />
                        </div>
                        <button className="p-2.5 text-slate-400 hover:text-orange-600 transition-colors">
                            <Filter size={18} />
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-400 text-[9px] uppercase font-black tracking-[0.2em]">
                                    <th className="px-8 py-6">Record Identity</th>
                                    <th className="px-8 py-6">Type</th>
                                    <th className="px-8 py-6">Size</th>
                                    <th className="px-8 py-6">Last Sync</th>
                                    <th className="px-8 py-6 text-right">Delete</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                                {staleRecords.map((record, i) => (
                                    <tr key={i} className="hover:bg-rose-50/30 dark:hover:bg-rose-950/10 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div>
                                                <p className="text-[11px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight">{record.entity}</p>
                                                <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5 tracking-widest">{record.id}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{record.type}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">{record.size}</span>
                                        </td>
                                        <td className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                            {record.lastSync}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-2 text-slate-200 hover:text-rose-600 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-8 bg-slate-50/20 dark:bg-slate-800/20 text-center border-t border-slate-50 dark:border-slate-700">
                        <button className="text-[10px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest hover:underline flex items-center gap-2 mx-auto">
                            Export Cleanup Report <Download size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeadRecord;
