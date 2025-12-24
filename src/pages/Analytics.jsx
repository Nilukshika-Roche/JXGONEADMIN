import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { Calendar, Filter, Download, ArrowUpRight, MousePointer2, UserCheck, TrendingUp } from 'lucide-react';

const data = [
    { name: 'Mon', views: 4000, visitors: 2400 },
    { name: 'Tue', views: 3000, visitors: 1398 },
    { name: 'Wed', views: 6000, visitors: 9800 },
    { name: 'Thu', views: 4780, visitors: 3908 },
    { name: 'Fri', views: 5890, visitors: 4800 },
    { name: 'Sat', views: 7390, visitors: 3800 },
    { name: 'Sun', views: 9490, visitors: 4300 },
];

const Analytics = () => {
    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <span className="text-orange-600 font-black uppercase tracking-[0.3em] text-[10px]">Data & Insights</span>
                    <h1 className="text-4xl font-black text-slate-800 dark:text-white mt-1 uppercase tracking-tighter italic">Deep <span className="gradient-text">Analytics</span></h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Monitoring your performance with precision.</p>
                </div>
                <div className="flex gap-3">
                    <button className="btn-secondary !px-4 !py-2.5">
                        <Calendar size={18} /> Last 30 Days
                    </button>
                    <button className="btn-secondary !p-2.5">
                        <Filter size={18} />
                    </button>
                    <button className="btn-primary">
                        <Download size={18} /> Export Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Page Views', value: '45.2K', trend: '+12%', icon: <MousePointer2 size={18} /> },
                    { label: 'Unq. Visitors', value: '12.8K', trend: '+8%', icon: <UserCheck size={18} /> },
                    { label: 'Reach', value: '185.4K', trend: '+15%', icon: <ArrowUpRight size={18} /> },
                    { label: 'Engagement', value: '8.4%', trend: '+2%', icon: <TrendingUp size={18} /> },
                ].map((metric, i) => (
                    <div key={i} className="card group hover:-translate-y-1">
                        <div className="flex justify-between items-center mb-4">
                            <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                                {metric.icon}
                            </div>
                            <div className="text-emerald-500 font-black text-xs">{metric.trend}</div>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{metric.label}</p>
                        <h3 className="text-2xl font-black text-slate-800 dark:text-white mt-1 italic tracking-tighter">{metric.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-8">
                <div className="card !p-10">
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h3 className="font-black text-slate-800 dark:text-white text-2xl uppercase tracking-tighter italic">Daily Visitor Traffic</h3>
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-1 uppercase tracking-wider">Trend analysis for the current week</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-orange-500 rounded-full shadow-lg shadow-orange-200"></div>
                                <span className="text-xs font-bold text-slate-500">Page Views</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-orange-200 rounded-full"></div>
                                <span className="text-xs font-bold text-slate-500">Visitors</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#fdba74" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#fdba74" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                                    dy={15}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                                />
                                <Tooltip
                                    cursor={{ stroke: '#f97316', strokeWidth: 1 }}
                                    contentStyle={{
                                        borderRadius: '1.5rem',
                                        border: 'none',
                                        boxShadow: '0 20px 25px -5px rgba(249, 115, 22, 0.1)',
                                        padding: '1rem'
                                    }}
                                    itemStyle={{ fontWeight: 900, color: '#f97316' }}
                                />
                                <Area type="monotone" dataKey="views" stroke="#f97316" strokeWidth={4} fillOpacity={1} fill="url(#colorViews)" />
                                <Area type="monotone" dataKey="visitors" stroke="#fdba74" strokeWidth={2} fillOpacity={1} fill="url(#colorVisitors)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card !p-10">
                    <h3 className="font-black text-slate-800 dark:text-white text-xl mb-8 uppercase tracking-tighter italic">Performance Breakdown</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b-2 border-slate-50">
                                    <th className="py-6 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Metric Type</th>
                                    <th className="py-6 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Current Value</th>
                                    <th className="py-6 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Previous Period</th>
                                    <th className="py-6 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Performance Change</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { name: 'Organic Reach', cur: '124,580', prev: '98,450', change: '+26%' },
                                    { name: 'Paid Impressions', cur: '60,820', prev: '72,100', change: '-15%' },
                                    { name: 'Engagement Rate', cur: '8.4%', prev: '6.2%', change: '+35%' },
                                    { name: 'Conversion Pts', cur: '1,245', prev: '1,100', change: '+14%' },
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-slate-50 dark:border-slate-700 last:border-0 hover:bg-orange-50/30 dark:hover:bg-slate-800/40 transition-colors group">
                                        <td className="py-6">
                                            <div className="font-black text-slate-800 dark:text-slate-200 text-sm group-hover:text-orange-600 transition-colors uppercase tracking-tight">{row.name}</div>
                                        </td>
                                        <td className="py-6 text-sm font-bold text-slate-600">{row.cur}</td>
                                        <td className="py-6 text-sm font-medium text-slate-400">{row.prev}</td>
                                        <td className="py-6">
                                            <span className={`text-xs font-black uppercase px-3 py-1.5 rounded-full ${row.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100' : 'bg-rose-50 text-rose-600 ring-1 ring-rose-100'}`}>
                                                {row.change}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
