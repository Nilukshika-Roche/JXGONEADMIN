import React, { useState } from 'react';
import {
    Users,
    Search,
    UserPlus,
    MoreHorizontal,
    Shield,
    ShieldCheck,
    Mail,
    Filter,
    CheckCircle2,
    XCircle,
    Clock
} from 'lucide-react';

const PagePeople = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const users = [
        { id: 1, name: 'John Doe', email: 'john@jxg.com', role: 'Global Admin', status: 'Active', lastActive: '2 mins ago', avatar: 'https://i.pravatar.cc/150?u=1' },
        { id: 2, name: 'Sarah Miller', email: 'sarah@jxg.com', role: 'Content Manager', status: 'Active', lastActive: '1 hour ago', avatar: 'https://i.pravatar.cc/150?u=2' },
        { id: 3, name: 'Robert Chen', email: 'robert@jxg.com', role: 'Editor', status: 'Inactive', lastActive: '2 days ago', avatar: 'https://i.pravatar.cc/150?u=3' },
        { id: 4, name: 'Emma Wilson', email: 'emma@jxg.com', role: 'User', status: 'Active', lastActive: '5 mins ago', avatar: 'https://i.pravatar.cc/150?u=4' },
        { id: 5, name: 'Alex Thompson', email: 'alex@jxg.com', role: 'Editor', status: 'Pending', lastActive: 'Never', avatar: 'https://i.pravatar.cc/150?u=5' },
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Active': return 'bg-emerald-50 text-emerald-600 ring-emerald-100';
            case 'Inactive': return 'bg-rose-50 text-rose-600 ring-rose-100';
            default: return 'bg-amber-50 text-amber-600 ring-amber-100';
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <span className="text-orange-600 font-black uppercase tracking-[0.3em] text-[10px]">Access Control</span>
                    <h1 className="text-4xl font-black text-slate-800 dark:text-white mt-1 uppercase tracking-tighter italic">User <span className="gradient-text">Management</span></h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Manage and monitor organizational high-level access permissions.</p>
                </div>
                <button className="btn-primary">
                    <UserPlus size={18} /> Add New User
                </button>
            </div>

            {/* Content Card */}
            <div className="card !p-0 overflow-hidden">
                {/* Table Actions */}
                <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name, email or role..."
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-orange-500/20 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <button className="btn-secondary !py-3 flex-1 md:flex-initial">
                            <Filter size={18} /> Filter
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-900/50">
                                <th className="px-8 py-5 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">User Information</th>
                                <th className="px-8 py-5 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Security Role</th>
                                <th className="px-8 py-5 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Status</th>
                                <th className="px-8 py-5 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Last Active</th>
                                <th className="px-8 py-5 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {users.map((user) => (
                                <tr key={user.id} className="group hover:bg-orange-50/30 dark:hover:bg-slate-800/40 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <img src={user.avatar} className="w-12 h-12 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-800 group-hover:ring-orange-100 dark:group-hover:ring-orange-900/30 transition-all" alt="" />
                                                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-800 dark:text-white uppercase tracking-tight italic">{user.name}</p>
                                                <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest mt-0.5">
                                                    <Mail size={12} /> {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            {user.role === 'Global Admin' ? <ShieldCheck className="text-orange-500" size={16} /> : <Shield className="text-slate-300" size={16} />}
                                            <span className="text-sm font-black text-slate-600 dark:text-slate-300 uppercase tracking-tight">{user.role}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ${getStatusStyle(user.status)}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-black uppercase tracking-tighter">
                                            <Clock size={14} /> {user.lastActive}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <button className="p-2 text-slate-300 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/20 rounded-xl transition-all">
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PagePeople;
