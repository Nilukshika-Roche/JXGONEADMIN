import React, { useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
    Search,
    ChevronDown,
    ChevronRight,
    Home,
    MoreVertical,
    PlayCircle,
    ImageIcon,
    FileText,
    Sun,
    Moon,
    ArrowUpRight,
    Filter,
    Download
} from 'lucide-react';

const ContentManagement = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [activeMenuId, setActiveMenuId] = useState(null);
    const { isDarkMode, toggleTheme } = useTheme();

    // Close menu when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (activeMenuId && !event.target.closest('.menu-container')) {
                setActiveMenuId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeMenuId]);

    // Mock Data
    const summaryStats = [
        {
            id: 'published',
            label: 'Published Today',
            count: 12,
            trend: '+12.4%',
            icon: <FileText size={24} className="text-white" />,
            bg: 'bg-gradient-to-br from-green-400 to-emerald-600',
            badgeBg: 'bg-green-100',
            badgeColor: 'text-green-700'
        },
        {
            id: 'pending',
            label: 'Pending Reviews',
            count: 5,
            trend: '+8.1%',
            icon: <ClockIcon size={24} className="text-white" />,
            bg: 'bg-gradient-to-br from-orange-400 to-red-500',
            badgeBg: 'bg-orange-100',
            badgeColor: 'text-orange-700'
        },
        {
            id: 'reported',
            label: 'Reported Content',
            count: 3,
            trend: '-2.5%',
            icon: <AlertCircleIcon size={24} className="text-white" />,
            bg: 'bg-gradient-to-br from-red-500 to-pink-600',
            badgeBg: 'bg-red-100',
            badgeColor: 'text-red-700'
        }
    ];

    const contentData = [
        { id: 1, title: 'Summer Vacation Vlog', author: 'Sarah Jenkins', type: 'Reel', status: 'Published', notes: 'Viral potential', date: '2 hrs ago' },
        { id: 2, title: 'Project Update Q1', author: 'Michael Ross', type: 'Post', status: 'Pending', notes: 'Needs fact check', date: '4 hrs ago' },
        { id: 3, title: 'Inappropriate Comment Thread', author: 'User_992', type: 'Story', status: 'Reported', notes: 'Violates community guidelines', date: '1 day ago' },
        { id: 4, title: 'Office Tour 2024', author: 'Marketing Team', type: 'Reel', status: 'Published', notes: 'Approved by Lead', date: '5 hrs ago' },
        { id: 5, title: 'New Policy Announcement', author: 'HR Dept', type: 'Post', status: 'Pending', notes: 'Waiting for legal review', date: '1 hr ago' },
        { id: 6, title: 'Spam Promotion', author: 'Bot_Alice', type: 'Post', status: 'Reported', notes: 'Multiple reports', date: '30 mins ago' },
    ];

    const filteredContent = useMemo(() => {
        if (activeFilter === 'all') return contentData;
        return contentData.filter(item => item.status.toLowerCase() === activeFilter.toLowerCase());
    }, [activeFilter]);

    const getTypeIcon = (type) => {
        switch (type) {
            case 'Reel': return <PlayCircle size={16} className="text-purple-500" />;
            case 'Story': return <ImageIcon size={16} className="text-blue-500" />;
            case 'Post': return <FileText size={16} className="text-slate-500" />;
            default: return <FileText size={16} />;
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Published': return 'bg-green-100 text-green-700';
            case 'Pending': return 'bg-orange-100 text-orange-700';
            case 'Reported': return 'bg-red-100 text-red-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header Area */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        <span className="cursor-pointer hover:text-slate-600">Admin</span>
                        <ChevronRight size={12} />
                        <span className="text-orange-600">Content Management</span>
                    </nav>
                    <h1 className="text-3xl font-black text-slate-800 dark:text-white">
                        Content Management
                    </h1>
                    <p className="text-slate-500 mt-1">Manage and moderate platform content.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all shadow-sm"
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-all shadow-sm">
                        <Filter size={16} />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-orange-200 transition-all shadow-md">
                        <Download size={16} />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {summaryStats.map((stat) => (
                    <button
                        key={stat.id}
                        onClick={() => setActiveFilter(activeFilter === stat.id ? 'all' : stat.id)}
                        className={`bg-white p-6 rounded-2xl border transition-all duration-200 text-left relative overflow-hidden group
                            ${activeFilter === stat.id ? 'ring-2 ring-orange-500 ring-offset-2 border-orange-200 shadow-lg' : 'border-slate-100 shadow-sm hover:shadow-md'}
                        `}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg} shadow-lg`}>
                                {stat.icon}
                            </div>
                            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${stat.badgeBg} ${stat.badgeColor}`}>
                                <ArrowUpRight size={14} />
                                {stat.trend}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-black text-slate-800">{stat.count}</h3>
                        </div>
                    </button>
                ))}
            </div>

            {/* Content Table Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Table Header */}
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Content List</h2>
                        <p className="text-sm text-slate-500">View and manage all platform posts</p>
                    </div>
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search content..."
                            className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 w-full sm:w-64 transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 border-b border-slate-100">
                            <tr>
                                <th className="p-4 pl-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-[50px]">
                                    <span className="sr-only">Actions</span>
                                </th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Content</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Author</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="p-4 pr-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Notes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredContent.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="p-4 pl-6 relative">
                                        <div className="relative menu-container">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveMenuId(activeMenuId === item.id ? null : item.id);
                                                }}
                                                className="p-2 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition-all"
                                            >
                                                <MoreVertical size={16} />
                                            </button>

                                            {activeMenuId === item.id && (
                                                <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                                    <div className="p-1.5">
                                                        {[
                                                            { label: 'View Content', action: () => console.log('View', item.id) },
                                                            { label: 'Edit Content', action: () => console.log('Edit', item.id) },
                                                            { label: 'Hide/Unpublish', action: () => console.log('Hide', item.id) },
                                                            { label: 'Remove Content', action: () => console.log('Remove', item.id), className: 'text-red-600 bg-red-50 hover:bg-red-100' },
                                                            { label: 'Warn User', action: () => console.log('Warn', item.id), className: 'text-orange-600' },
                                                            { label: 'Approve', action: () => console.log('Approve', item.id), className: 'text-green-600 font-medium' },
                                                        ].map((option, idx) => (
                                                            <button
                                                                key={idx}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    option.action();
                                                                    setActiveMenuId(null);
                                                                }}
                                                                className={`w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-slate-100 transition-colors mb-0.5 last:mb-0 ${option.className || 'text-slate-600'}`}
                                                            >
                                                                {option.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-slate-800 text-sm">{item.title}</span>
                                            <span className="text-xs text-slate-400">{item.date}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 border border-slate-200">
                                                {item.author.charAt(0)}
                                            </div>
                                            <span className="text-sm font-medium text-slate-600">{item.author}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            {getTypeIcon(item.type)}
                                            <span className="text-sm text-slate-600">{item.type}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusStyle(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-4 pr-6 text-right">
                                        <span className="text-sm text-slate-400 italic truncate max-w-[150px] inline-block" title={item.notes}>
                                            {item.notes}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {filteredContent.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="p-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-400">
                                            <Filter size={48} className="mb-4 opacity-20" />
                                            <p className="text-lg font-medium">No content found</p>
                                            <p className="text-sm">Try adjusting your filters</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <span className="text-xs font-medium text-slate-500">Showing {filteredContent.length} items</span>
                    <button className="text-xs font-bold text-orange-600 hover:text-orange-700 hover:bg-orange-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                        Show More <ChevronDown size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Helper Icons (Simple local components to avoid missing imports)
const ClockIcon = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);
const AlertCircleIcon = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
);

export default ContentManagement;
