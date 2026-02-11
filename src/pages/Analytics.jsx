import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import {
    Calendar,
    Download,
    TrendingUp,
    MessageSquare,
    Heart,
    FileText,
    Eye,
    Users,
    ChevronDown,
    Zap,
    Target,
    BarChart3
} from 'lucide-react';

const data = [
    { name: 'Mon', views: 4000, visitors: 2400, engagement: 240 },
    { name: 'Tue', views: 3000, visitors: 1398, engagement: 190 },
    { name: 'Wed', views: 6000, visitors: 9800, engagement: 400 },
    { name: 'Thu', views: 4780, visitors: 3908, engagement: 280 },
    { name: 'Fri', views: 5890, visitors: 4800, engagement: 350 },
    { name: 'Sat', views: 7390, visitors: 3800, engagement: 500 },
    { name: 'Sun', views: 9490, visitors: 4300, engagement: 620 },
];

const followerData = [
    { name: 'Mon', followers: 2400 },
    { name: 'Tue', followers: 2550 },
    { name: 'Wed', followers: 2800 },
    { name: 'Thu', followers: 3100 },
    { name: 'Fri', followers: 3400 },
    { name: 'Sat', followers: 3800 },
    { name: 'Sun', followers: 4200 },
];

const followerListData = [
    { name: 'Alice Johnson', role: 'UX Designer', subsidiary: 'Janashakthi Life', date: '2024-12-25' },
    { name: 'Bob Smith', role: 'Frontend Developer', subsidiary: 'Janashakthi Insurance', date: '2024-12-24' },
    { name: 'Charlie Davis', role: 'Project Manager', subsidiary: 'Janashakthi Group', date: '2024-12-23' },
    { name: 'Diana Prince', role: 'Business Analyst', subsidiary: 'Janashakthi Life', date: '2024-12-22' },
    { name: 'Ethan Hunt', role: 'Security Specialist', subsidiary: 'Janashakthi Insurance', date: '2024-12-21' },
];

const visitorData = [
    { name: 'John Doe', role: 'Software Engineer', subsidiary: 'Janashakthi Life', date: '2024-12-24' },
    { name: 'Jane Smith', role: 'Marketing Manager', subsidiary: 'Janashakthi Insurance', date: '2024-12-24' },
    { name: 'Michael Brown', role: 'Financial Analyst', subsidiary: 'Janashakthi Life', date: '2024-12-23' },
    { name: 'Sarah Wilson', role: 'HR Specialist', subsidiary: 'Janashakthi Group', date: '2024-12-23' },
    { name: 'David Lee', role: 'Sales Executive', subsidiary: 'Janashakthi Insurance', date: '2024-12-22' },
];

const Analytics = () => {
    const [activeDomain, setActiveDomain] = useState('content');

    const domains = [
        { id: 'content', label: 'Content', icon: <FileText size={16} /> },
        { id: 'followers', label: 'Followers', icon: <Users size={16} /> },
        { id: 'visitors', label: 'Visitors', icon: <BarChart3 size={16} /> }
    ];

    const contentHighlights = [
        { label: 'Impressions', value: '125,480', trend: '+12.5%', icon: <Eye size={18} />, color: 'orange' },
        { label: 'Reactions', value: '45,210', trend: '+8.2%', icon: <Heart size={18} />, color: 'rose' },
        { label: 'Comments', value: '12,845', trend: '+15.4%', icon: <MessageSquare size={18} />, color: 'amber' },
        { label: 'Posts', value: '840', trend: '+2.1%', icon: <BarChart3 size={18} />, color: 'emerald' },
    ];

    const followerHighlights = [
        { label: 'Total Followers', value: '12,840', trend: '+5.2%', icon: <Users size={18} />, color: 'orange' },
        { label: 'New Followers', value: '1,245', trend: '+12.8%', icon: <TrendingUp size={18} />, color: 'emerald' },
    ];

    const visitorHighlights = [
        { label: 'Page Views', value: '15,240', trend: '+18.2%', icon: <Eye size={18} />, color: 'orange' },
        { label: 'Unique Visitors', value: '4,850', trend: '+12.4%', icon: <Users size={18} />, color: 'amber' },
    ];

    return (
        <div className="analytics-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="analytics-content"
            >
                {/* Tabs Row */}
                <div className="tabs-row">
                    <div className="tabs">
                        {domains.map((domain) => (
                            <button
                                key={domain.id}
                                onClick={() => setActiveDomain(domain.id)}
                                className={`tab ${activeDomain === domain.id ? 'active' : ''}`}
                            >
                                {domain.icon}
                                {domain.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Actions removed from here and moved to highlights cards */}

                <AnimatePresence mode="wait">
                    {activeDomain === 'content' && (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="panel"
                        >
                            {/* Highlights Card */}
                            <div className="highlights-section-card">
                                <div className="section-title-row">
                                    <div className="section-title-left">
                                        <div className="control-icon-small">
                                            <Zap size={14} />
                                        </div>
                                        <h2 className="section-title">Highlights</h2>
                                    </div>
                                    <div className="section-actions">
                                        <button className="date-btn">
                                            <Calendar size={14} />
                                            <span>Dec 01 - 24, 2024</span>
                                            <ChevronDown size={10} />
                                        </button>
                                        <button className="report-btn">
                                            <Download size={14} />
                                            <span>Export</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="metrics">
                                    {contentHighlights.map((metric, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ y: -4 }}
                                            className={`metric ${metric.color}`}
                                        >
                                            <div className="metric-bg"></div>
                                            <div className="metric-content">
                                                <div className="metric-header">
                                                    <div className="metric-icon">
                                                        {metric.icon}
                                                    </div>
                                                    <div className="metric-trend">
                                                        <TrendingUp size={12} />
                                                        <span>{metric.trend}</span>
                                                    </div>
                                                </div>
                                                <div className="metric-body">
                                                    <p className="metric-label">{metric.label}</p>
                                                    <h3 className="metric-value">{metric.value}</h3>
                                                </div>
                                            </div>
                                            <div className="metric-progress">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "70%" }}
                                                    className="metric-progress-fill"
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Chart */}
                            <div className="chart">
                                <div className="chart-header">
                                    <div className="chart-header-left">
                                        <div className="chart-icon">
                                            <Target size={20} />
                                        </div>
                                        <div>
                                            <h3 className="chart-title">Engagement Overview</h3>
                                            <p className="chart-subtitle">Weekly performance metrics</p>
                                        </div>
                                    </div>
                                    <div className="chart-stats">
                                        <div className="chart-stat">
                                            <div className="chart-dot orange"></div>
                                            <span>Views</span>
                                            <span className="stat-value">45.8K <span className="positive">+12%</span></span>
                                        </div>
                                        <div className="chart-divider"></div>
                                        <div className="chart-stat">
                                            <div className="chart-dot gray"></div>
                                            <span>Visitors</span>
                                            <span className="stat-value">12.2K <span className="negative">-4%</span></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="chart-container">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={data}>
                                            <defs>
                                                <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                            <XAxis
                                                dataKey="name"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#64748b', fontSize: 11 }}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#64748b', fontSize: 11 }}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    borderRadius: '8px',
                                                    border: '1px solid #fed7aa',
                                                    background: 'white',
                                                    padding: '12px',
                                                    fontSize: '12px'
                                                }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="views"
                                                stroke="#f97316"
                                                strokeWidth={3}
                                                fill="url(#viewsGradient)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeDomain === 'visitors' && (
                        <motion.div
                            key="visitors"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="panel"
                        >
                            {/* Highlights Card */}
                            <div className="highlights-section-card">
                                <div className="section-title-row">
                                    <div className="section-title-left">
                                        <div className="control-icon-small">
                                            <BarChart3 size={14} />
                                        </div>
                                        <h2 className="section-title">Highlights</h2>
                                    </div>
                                    <div className="section-actions">
                                        <button className="date-btn">
                                            <Calendar size={14} />
                                            <span>Dec 01 - 24, 2024</span>
                                            <ChevronDown size={10} />
                                        </button>
                                        <button className="report-btn">
                                            <Download size={14} />
                                            <span>Export</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="metrics visitor-metrics">
                                    {visitorHighlights.map((metric, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ y: -4 }}
                                            className={`metric ${metric.color}`}
                                        >
                                            <div className="metric-bg"></div>
                                            <div className="metric-content">
                                                <div className="metric-header">
                                                    <div className="metric-icon">
                                                        {metric.icon}
                                                    </div>
                                                    <div className="metric-trend">
                                                        <TrendingUp size={12} />
                                                        <span>{metric.trend}</span>
                                                    </div>
                                                </div>
                                                <div className="metric-body">
                                                    <p className="metric-label">{metric.label}</p>
                                                    <h3 className="metric-value">{metric.value}</h3>
                                                </div>
                                            </div>
                                            <div className="metric-progress">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "85%" }}
                                                    className="metric-progress-fill"
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Visitor Chart */}
                            <div className="chart">
                                <div className="chart-header">
                                    <div className="chart-header-left">
                                        <div className="chart-icon">
                                            <TrendingUp size={20} />
                                        </div>
                                        <div>
                                            <h3 className="chart-title">Visitor Traffic</h3>
                                            <p className="chart-subtitle">Unique visitors vs Page views</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="chart-container">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={data}>
                                            <defs>
                                                <linearGradient id="visitorsGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="pageViewsGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                                            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #fed7aa', background: 'white', padding: '12px', fontSize: '12px' }} />
                                            <Area type="monotone" dataKey="visitors" stroke="#f97316" strokeWidth={3} fill="url(#visitorsGradient)" />
                                            <Area type="monotone" dataKey="views" stroke="#fbbf24" strokeWidth={3} fill="url(#pageViewsGradient)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* All Visitors List */}
                            <div className="visitors-list-card">
                                <div className="table-header">
                                    <div className="table-header-left">
                                        <h3 className="table-title">All Visitors</h3>
                                        <p className="table-subtitle">Recent visitor interactions</p>
                                    </div>
                                    <div className="table-header-right">
                                        <button className="export-btn-small">
                                            <Download size={14} />
                                            <span>Export</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="followers-list-container">
                                    {visitorData.map((visitor, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="follower-item"
                                        >
                                            <div className="follower-left">
                                                <div className="avatar-large">{visitor.name.charAt(0)}</div>
                                                <div className="follower-info">
                                                    <h4 className="follower-name-text">{visitor.name}</h4>
                                                    <div className="follower-details">
                                                        <span className="follower-role-text">{visitor.role}</span>
                                                        <span className="dot-separator">•</span>
                                                        <span className="follower-sub-text">{visitor.subsidiary}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="follower-right">
                                                <div className="follower-date-badge">
                                                    <Calendar size={12} />
                                                    <span>Visited {visitor.date}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeDomain === 'followers' && (
                        <motion.div
                            key="followers"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="panel"
                        >
                            {/* Highlights Card */}
                            <div className="highlights-section-card">
                                <div className="section-title-row">
                                    <div className="section-title-left">
                                        <div className="control-icon-small">
                                            <Users size={14} />
                                        </div>
                                        <h2 className="section-title">Highlights</h2>
                                    </div>
                                    <div className="section-actions">
                                        <button className="date-btn">
                                            <Calendar size={14} />
                                            <span>Dec 01 - 24, 2024</span>
                                            <ChevronDown size={10} />
                                        </button>
                                        <button className="report-btn">
                                            <Download size={14} />
                                            <span>Export</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="metrics visitor-metrics">
                                    {followerHighlights.map((metric, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ y: -4 }}
                                            className={`metric ${metric.color}`}
                                        >
                                            <div className="metric-bg"></div>
                                            <div className="metric-content">
                                                <div className="metric-header">
                                                    <div className="metric-icon">
                                                        {metric.icon}
                                                    </div>
                                                    <div className="metric-trend">
                                                        <TrendingUp size={12} />
                                                        <span>{metric.trend}</span>
                                                    </div>
                                                </div>
                                                <div className="metric-body">
                                                    <p className="metric-label">{metric.label}</p>
                                                    <h3 className="metric-value">{metric.value}</h3>
                                                </div>
                                            </div>
                                            <div className="metric-progress">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "92%" }}
                                                    className="metric-progress-fill"
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Chart */}
                            <div className="chart">
                                <div className="chart-header">
                                    <div className="chart-header-left">
                                        <div className="chart-icon">
                                            <TrendingUp size={20} />
                                        </div>
                                        <div>
                                            <h3 className="chart-title">Follower Growth</h3>
                                            <p className="chart-subtitle">Daily growth in the last 7 days</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="chart-container">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={followerData}>
                                            <defs>
                                                <linearGradient id="followersGrowthGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                                            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #fed7aa', background: 'white', padding: '12px', fontSize: '12px' }} />
                                            <Area type="monotone" dataKey="followers" stroke="#f97316" strokeWidth={3} fill="url(#followersGrowthGradient)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* All Followers List */}
                            <div className="followers-list-card">
                                <div className="table-header">
                                    <div className="table-header-left">
                                        <h3 className="table-title">All Followers</h3>
                                        <p className="table-subtitle">List of people following the page</p>
                                    </div>
                                    <div className="table-header-right">
                                        <button className="export-btn-small">
                                            <Download size={14} />
                                            <span>Export</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="followers-list-container">
                                    {followerListData.map((follower, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="follower-item"
                                        >
                                            <div className="follower-left">
                                                <div className="avatar-large">{follower.name.charAt(0)}</div>
                                                <div className="follower-info">
                                                    <h4 className="follower-name-text">{follower.name}</h4>
                                                    <div className="follower-details">
                                                        <span className="follower-role-text">{follower.role}</span>
                                                        <span className="dot-separator">•</span>
                                                        <span className="follower-sub-text">{follower.subsidiary}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="follower-right">
                                                <div className="follower-date-badge">
                                                    <Calendar size={12} />
                                                    <span>Joined {follower.date}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <style jsx>{`
                /* Container */
                .analytics-container {
                    min-height: 100vh;
                    background: #f8fafc;
                }
                .analytics-content {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 0.75rem 2rem 0.75rem;
                }

                /* Header Rows */
                .tabs-row {
                    position: sticky;
                    top: -12px;
                    z-index: 50;
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(8px);
                    margin: -12px -1.5rem 1.5rem -1.5rem;
                    padding: 4px 24px;
                    border-bottom: 1px solid #fed7aa; /* Orange tint border */
                    display: flex;
                    align-items: center;
                    box-shadow: 0 4px 6px -1px rgba(249, 115, 22, 0.05); /* Orange shadow */
                }
                .actions-row {
                    display: flex;
                    justify-content: flex-end;
                    margin-bottom: 1.5rem;
                    padding: 0 0.75rem;
                }
                .top-actions {
                    display: flex;
                    gap: 0.75rem;
                }

                /* Tabs */
                .tabs {
                    display: flex;
                    gap: 16px;
                    background: transparent;
                    padding: 0;
                    border-radius: 0;
                }
                .tab {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 12px;
                    font-size: 14px;
                    font-weight: 600;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    color: #64748b;
                    position: relative;
                    transition: all 0.3s ease;
                    border-radius: 8px;
                }
                .tab:hover {
                    color: #ea580c;
                    background: rgba(255, 255, 255, 0.5);
                }
                .tab.active {
                    color: #c2410c; /* Stronger orange */
                    background: white;
                    box-shadow: 0 2px 4px rgba(249, 115, 22, 0.1);
                    border-bottom: none;
                }

                /* Content Panel */
                .panel {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                /* Highlights Section Card */
                .highlights-section-card {
                    background: white;
                    border-radius: 12px;
                    padding: 1rem;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                }
                .highlights-section-card .section-title-row {
                    margin-bottom: 0.75rem;
                }
                .highlights-section-card .metrics {
                    gap: 0.5rem;
                }

                /* Section Header */
                .section-title-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                    padding: 0 0.25rem;
                }
                .section-title-left {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .section-actions {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .control-icon-small {
                    width: 24px;
                    height: 24px;
                    background: linear-gradient(135deg, #f97316, #fbbf24);
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                }
                .section-title {
                    font-size: 14px;
                    font-weight: 700;
                    color: #475569;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin: 0;
                }
                .controls-right {
                    display: flex;
                    gap: 0.75rem;
                }
                .date-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 100px;
                    font-size: 13px;
                    font-weight: 600;
                    color: #475569;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
                }
                .date-btn:hover {
                    border-color: #f97316;
                    color: #f97316;
                    background: #fff7ed;
                    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.1);
                }
                .date-btn svg:first-child {
                    color: #f97316;
                }
                .report-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 12px;
                    background: linear-gradient(135deg, #f97316, #fbbf24);
                    border: none;
                    border-radius: 8px;
                    font-size: 11px;
                    font-weight: 700;
                    color: white;
                    cursor: pointer;
                    transition: all 0.2s;
                    box-shadow: 0 2px 8px rgba(249, 115, 22, 0.2);
                }
                .report-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
                }

                .metrics {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                    gap: 0.5rem;
                }
                .visitor-metrics {
                    grid-template-columns: repeat(2, 1fr);
                }
                .metric {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    padding: 0.75rem;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.03);
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                .metric:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.08);
                }

                /* Color Variants */
                .metric.emerald { background: #f0fdf4; border-color: #bbf7d0; }
                .metric.amber { background: #fffbeb; border-color: #fde68a; }
                .metric.orange { background: #fff7ed; border-color: #fed7aa; }
                .metric.rose { background: #fff1f2; border-color: #fecdd3; }

                .metric-bg {
                    position: absolute;
                    top: -20px;
                    right: -20px;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    filter: blur(10px);
                    opacity: 0.5;
                }
                .metric.emerald .metric-bg { background: rgba(16, 185, 129, 0.2); }
                .metric.amber .metric-bg { background: rgba(251, 191, 36, 0.2); }
                .metric.orange .metric-bg { background: rgba(249, 115, 22, 0.2); }
                .metric.rose .metric-bg { background: rgba(244, 63, 94, 0.2); }

                .metric-content {
                    position: relative;
                    z-index: 1;
                }
                .metric-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                }
                .metric-icon {
                    padding: 6px;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .metric.emerald .metric-icon { background: #dcfce7; color: #10b981; }
                .metric.amber .metric-icon { background: #fef3c7; color: #fbbf24; }
                .metric.orange .metric-icon { background: #ffedd5; color: #f97316; }
                .metric.rose .metric-icon { background: #ffe4e6; color: #f43f5e; }

                .metric-icon svg {
                    width: 16px;
                    height: 16px;
                }
                .metric-trend {
                    display: flex;
                    align-items: center;
                    gap: 3px;
                    padding: 2px 6px;
                    border-radius: 20px;
                    font-size: 10px;
                    font-weight: 700;
                }
                .metric.emerald .metric-trend { background: #d1fae5; color: #065f46; }
                .metric.amber .metric-trend { background: #ffedd5; color: #92400e; }
                .metric.orange .metric-trend { background: #ffedd5; color: #9a3412; }
                .metric.rose .metric-trend { background: #ffe4e6; color: #9f1239; }

                .metric-body {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }
                .metric-label {
                    font-size: 10px;
                    font-weight: 600;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin: 0;
                }
                .metric-value {
                    font-size: 20px;
                    font-weight: 800;
                    color: #0f172a;
                    margin: 0;
                }
                .metric-progress {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 3px;
                    background: rgba(0,0,0,0.05);
                }
                .metric-progress-fill {
                    height: 100%;
                    transition: width 1s ease-out; 
                }
                .metric.emerald .metric-progress-fill { background: #10b981; }
                .metric.amber .metric-progress-fill { background: #fbbf24; }
                .metric.orange .metric-progress-fill { background: #f97316; }
                .metric.rose .metric-progress-fill { background: #f43f5e; }

                /* Chart */
                .chart {
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
                }
                .chart-header {
                    padding: 0.75rem 1rem;
                    border-bottom: 1px solid #e2e8f0;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                @media (min-width: 768px) {
                    .chart-header {
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                    }
                }
                .chart-header-left {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                .chart-icon {
                    width: 36px;
                    height: 36px;
                    background: #fff7ed;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #f97316;
                }
                .chart-title {
                    font-size: 18px;
                    font-weight: 700;
                    color: #0f172a;
                    margin: 0;
                }
                .chart-subtitle {
                    font-size: 12px;
                    color: #64748b;
                    margin: 0;
                }
                .chart-stats {
                    display: flex;
                    gap: 1.5rem;
                    background: #f8fafc;
                    padding: 1rem;
                    border-radius: 8px;
                }
                .chart-stat {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .chart-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 3px;
                }
                .chart-dot.orange {
                    background: #f97316;
                }
                .chart-dot.gray {
                    background: #94a3b8;
                }
                .chart-stat span {
                    font-size: 12px;
                    color: #64748b;
                }
                .stat-value {
                    font-size: 16px;
                    font-weight: 700;
                    color: #0f172a;
                }
                .positive {
                    color: #10b981;
                    font-size: 11px;
                }
                .negative {
                    color: #f43f5e;
                    font-size: 11px;
                }
                .chart-divider {
                    width: 1px;
                    background: #e2e8f0;
                }
                .chart-container {
                    padding: 0.75rem 1rem;
                    height: 200px;
                }

                /* Visitors Table */
                .visitors-table-card {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                    overflow: hidden;
                    margin-top: 1rem;
                }
                .table-header {
                    padding: 1.5rem;
                    border-bottom: 1px solid #e2e8f0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: #fffaf5;
                }
                .table-title {
                    font-size: 18px;
                    font-weight: 700;
                    color: #0f172a;
                    margin: 0;
                }
                .table-subtitle {
                    font-size: 12px;
                    color: #64748b;
                    margin: 0;
                }
                .table-header-right {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                .date-display {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 12px;
                    background: white;
                    border: 1px solid #fed7aa;
                    border-radius: 6px;
                    font-size: 12px;
                    font-weight: 600;
                    color: #f97316;
                }
                .export-btn-small {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 12px;
                    background: #f97316;
                    border: none;
                    border-radius: 6px;
                    color: white;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: transform 0.2s;
                }
                .export-btn-small:hover {
                    transform: scale(1.05);
                    background: #ea580c;
                }
                .table-container {
                    overflow-x: auto;
                }
                .visitor-table {
                    width: 100%;
                    border-collapse: collapse;
                    text-align: left;
                }
                .visitor-table th {
                    padding: 1rem 1.5rem;
                    background: #f8fafc;
                    color: #64748b;
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    border-bottom: 1px solid #e2e8f0;
                }
                .visitor-table td {
                    padding: 1rem 1.5rem;
                    border-bottom: 1px solid #f1f5f9;
                    font-size: 13px;
                    color: #334155;
                }
                .visitor-name {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-weight: 600;
                    color: #0f172a;
                }
                .avatar-small {
                    width: 28px;
                    height: 28px;
                    background: linear-gradient(135deg, #fed7aa, #f97316);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 12px;
                    font-weight: 700;
                }
                .role-badge {
                    padding: 4px 10px;
                    background: #fff7ed;
                    color: #f97316;
                    border-radius: 6px;
                    font-size: 11px;
                    font-weight: 600;
                    border: 1px solid #ffedd5;
                }
                .date-cell {
                    color: #94a3b8;
                    font-size: 12px;
                }

                /* Followers List Redesign */
                .followers-list-card {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                    overflow: hidden;
                    margin-top: 1rem;
                }
                .followers-list-container {
                    padding: 0.5rem 1.5rem 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                .follower-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem;
                    background: #f8fafc;
                    border-radius: 12px;
                    transition: all 0.2s;
                    border: 1px solid transparent;
                }
                .follower-item:hover {
                    background: white;
                    border-color: #fed7aa;
                    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.08);
                    transform: translateX(4px);
                }
                .follower-left {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                .avatar-large {
                    width: 48px;
                    height: 48px;
                    background: linear-gradient(135deg, #f97316, #fbbf24);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 18px;
                    font-weight: 700;
                    box-shadow: 0 4px 10px rgba(249, 115, 22, 0.2);
                }
                .follower-info {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }
                .follower-name-text {
                    font-size: 16px;
                    font-weight: 700;
                    color: #0f172a;
                    margin: 0;
                }
                .follower-details {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 12px;
                }
                .follower-role-text {
                    color: #f97316;
                    font-weight: 600;
                }
                .dot-separator {
                    color: #cbd5e1;
                }
                .follower-sub-text {
                    color: #64748b;
                }
                .follower-right {
                    display: flex;
                    align-items: center;
                }
                .follower-date-badge {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 12px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 600;
                    color: #94a3b8;
                }

                /* Construction */
                .construction {
                    background: white;
                    border-radius: 12px;
                    padding: 3rem 2rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    gap: 1.5rem;
                }
                .construction-icon {
                    position: relative;
                    width: 80px;
                    height: 80px;
                }
                .spinner {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border: 3px solid #fed7aa;
                    border-top-color: #f97316;
                    border-radius: 50%;
                }
                .construction-text h2 {
                    font-size: 20px;
                    font-weight: 700;
                    color: #0f172a;
                    margin: 0 0 0.5rem 0;
                }
                .construction-text p {
                    font-size: 14px;
                    color: #64748b;
                    margin: 0;
                }
                .back-btn {
                    padding: 10px 20px;
                    background: linear-gradient(135deg, #f97316, #fbbf24);
                    border: none;
                    border-radius: 8px;
                    color: white;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                }


            `}</style>
        </div>
    );
};

export default Analytics;