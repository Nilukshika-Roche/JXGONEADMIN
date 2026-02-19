import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
    Shield,
    Building2,
    Users,
    Activity,
    Search,
    Calendar,
    ChevronDown,
    UserPlus,
    TrendingUp,
    Zap,
    AlertCircle,
    CheckCircle2,
    MessageSquare,
    Globe,
    Plus,
    FileText,
    Megaphone,
    Layout,
    Download,
    LifeBuoy,
    Sparkles,
    Settings,
    MoreVertical,
    Filter,
    UserCheck,
    MousePointer2,
    History
} from 'lucide-react';
import './SuperAdminDashboard.css';

const SuperAdminDashboard = () => {
    const [selectedEntity, setSelectedEntity] = useState('Group View');
    const [isEntityOpen, setIsEntityOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState('Last 30 Days');

    const entities = ['Group View', 'Janashakthi Insurance', 'JXG Finance', 'Lanka Holdings', 'First Capital'];
    const timeRanges = ['Today', 'Last 7 Days', 'Last 30 Days', 'Custom Range'];

    const stats = [
        { label: 'Companies', value: '12', trend: 'Stable', color: '#f97316', icon: Building2 },
        { label: 'Total Users', value: '12,482', trend: '+12.4%', color: '#3b82f6', icon: Users },
        { label: 'Active Today', value: '1,284', trend: '+8.1%', color: '#10b981', icon: Zap },
        { label: 'Total Posts', value: '842', trend: '+15%', color: '#8b5cf6', icon: Megaphone },
        { label: 'Engagement', value: '64.2%', trend: '+2.4%', color: '#ec4899', icon: Activity },
        { label: 'Reports', value: '12', trend: '-5.0%', color: '#ef4444', icon: AlertCircle },
        { label: 'Pending', value: '28', trend: 'Critical', color: '#f59e0b', icon: LifeBuoy },
        { label: 'Sys Health', value: 'Optimal', trend: '98.2%', color: '#06b6d4', icon: Shield },
    ];

    const adminEngagement = [
        { label: 'Active Admins', value: '14 / 28', percent: 50, color: '#f97316', icon: UserCheck },
        { label: 'Actions (24h)', value: '1,284', percent: 85, color: '#3b82f6', icon: MousePointer2 },
        { label: 'Avg Latency', value: '12m', percent: 92, color: '#10b981', icon: History },
    ];

    const activeAdmins = [
        { name: 'Sarah J.', bu: 'Insurance', status: 'Active' },
        { name: 'Michael K.', bu: 'Finance', status: 'In-Meeting' },
        { name: 'Lakshani R.', bu: 'Holdings', status: 'Active' },
        { name: 'Naveen P.', bu: 'Capital', status: 'Active' },
    ];

    const buComparison = [
        { bu: 'Janashakthi Insurance', users: 5200, active: '72%', posts: 420, engagement: '74%', reports: 2, growth: '+14%', color: '#f97316' },
        { bu: 'JXG Finance', users: 3100, active: '68%', posts: 210, engagement: '62%', reports: 5, growth: '+8%', color: '#3b82f6' },
        { bu: 'Lanka Holdings', users: 2400, active: '54%', posts: 115, engagement: '45%', reports: 4, growth: '-2%', color: '#10b981' },
        { bu: 'First Capital', users: 1782, active: '82%', posts: 97, engagement: '80%', reports: 1, growth: '+22%', color: '#8b5cf6' },
    ];

    const growthTrend = [
        { name: 'Week 1', Group: 4000, BU_Avg: 2400 },
        { name: 'Week 2', Group: 3000, BU_Avg: 1398 },
        { name: 'Week 3', Group: 2000, BU_Avg: 9800 },
        { name: 'Week 4', Group: 2780, BU_Avg: 3908 },
    ];

    const alerts = [
        { id: 1, type: 'Critical', text: 'Spike in reported content', bu: 'JXG Finance', time: '2m ago' },
        { id: 2, type: 'Security', text: 'Unusual login pattern detected', bu: 'Lanka Holdings', time: '15m ago' },
        { id: 3, type: 'Policy', text: 'Multi-post violation detected', bu: 'First Capital', time: '1h ago' },
    ];

    return (
        <div className="sa-group-wrapper">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="sa-container"
            >

                <header className="sa-hero">
                    <div className="hero-content">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="hero-text"
                        >
                            <div className="hero-badge">
                                <Shield size={14} />
                                <span>Group-Level Admin operational</span>
                            </div>
                            <h1>Welcome back, <span className="highlight">John Anderson</span></h1>
                            <p>You have <span style={{ fontWeight: 600 }}>3 priority alerts</span> requiring Group oversight.</p>

                            <div className="hero-actions">
                                <button className="hero-btn primary">
                                    <Building2 size={18} />
                                    Register Company
                                </button>
                                <button className="hero-btn secondary">
                                    <UserPlus size={18} />
                                    Add Admin
                                </button>
                                <button className="hero-btn secondary">
                                    <FileText size={18} />
                                    Group Report
                                </button>
                            </div>
                        </motion.div>
                        <div className="hero-visual" style={{ width: '280px' }}>
                            <div className="card-glass" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', padding: '16px' }}>
                                <div className="viz-header" style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <TrendingUp size={14} />
                                    <span>Global Growth Trend</span>
                                </div>
                                <ResponsiveContainer width="100%" height={80}>
                                    <AreaChart data={growthTrend}>
                                        <Area
                                            type="monotone"
                                            dataKey="Group"
                                            stroke="#fff"
                                            strokeWidth={3}
                                            fillOpacity={0.2}
                                            fill="#fff"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </header>

                {/* 2. FILTER CONTROL ROW (Relocated below Hero) */}
                <div className="sa-control-row">
                    <div className="entity-selector-wrap" style={{ position: 'relative' }}>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="filter-btn-premium"
                            onClick={() => setIsEntityOpen(!isEntityOpen)}
                        >
                            <Layout size={18} />
                            <span>{selectedEntity}</span>
                            <ChevronDown size={14} style={{ transition: '0.3s', transform: isEntityOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                        </motion.button>
                        <AnimatePresence>
                            {isEntityOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="entity-dropdown"
                                    style={{
                                        position: 'absolute', top: '120%', left: 0, width: '220px',
                                        background: 'white', borderRadius: '16px', padding: '8px',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)', zIndex: 100, border: '1px solid #e2e8f0'
                                    }}
                                >
                                    {entities.map(e => (
                                        <button
                                            key={e}
                                            onClick={() => { setSelectedEntity(e); setIsEntityOpen(false); }}
                                            style={{
                                                width: '100%', padding: '10px 14px', textAlign: 'left', borderRadius: '10px',
                                                border: 'none', background: 'transparent', fontWeight: 600, color: '#475569', cursor: 'pointer'
                                            }}
                                        >
                                            {e}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="time-filter-wrap">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="filter-btn-premium time-filter-btn"
                        >
                            <Calendar size={18} />
                            <span>{selectedTime}</span>
                            <ChevronDown size={14} />
                        </motion.button>
                    </div>
                </div>

                {/* 3. EXECUTIVE KPI GRID (Below Hero) */}
                <div className="sa-kpi-row">
                    {stats.map((s, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="kpi-card-bento card-premium-mini"
                        >
                            <div className="kpi-icon-row">
                                <div className="kpi-icon-bg" style={{ backgroundColor: `${s.color}15`, color: s.color }}>
                                    <s.icon size={14} />
                                </div>
                                <div className={`kpi-trend-pill-mini ${s.trend.includes('+') ? 'up' : s.trend === 'Critical' ? 'down' : ''}`} style={{ color: s.color }}>
                                    {s.trend}
                                </div>
                            </div>
                            <div className="kpi-info-wrap">
                                <span className="kpi-label-xsmall">{s.label}</span>
                                <h4 className="kpi-value-small">{s.value}</h4>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 4. BENTO GRID */}
                <div className="sa-bento-grid">

                    {/* CENTER COLUMN: BU COMPARISON */}
                    <div className="sa-center-panel card-glass">
                        <div className="comparison-header">
                            <div>
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Building2 size={20} color="#f97316" />
                                    Business Unit Benchmarking
                                </h3>
                                <p>Cross-BU performance & governance insights</p>
                            </div>
                            <button className="btn-secondary-mini" style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                <Download size={14} /> Export Dataset
                            </button>
                        </div>

                        <div className="comparison-table-wrap">
                            <table className="comparison-table">
                                <thead>
                                    <tr>
                                        <th>Business Unit</th>
                                        <th>Users</th>
                                        <th>Active %</th>
                                        <th>Posts</th>
                                        <th>Engagement</th>
                                        <th>Risks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {buComparison.map((bu, idx) => (
                                        <tr key={idx}>
                                            <td className="bu-name-cell">
                                                <div className="bu-dot" style={{ backgroundColor: bu.color }}></div>
                                                {bu.bu}
                                            </td>
                                            <td>{bu.users.toLocaleString()}</td>
                                            <td>{bu.active}</td>
                                            <td>{bu.posts}</td>
                                            <td>{bu.engagement}</td>
                                            <td>
                                                <span style={{
                                                    color: bu.reports > 3 ? '#ef4444' : '#10b981',
                                                    fontWeight: 600,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px'
                                                }}>
                                                    <AlertCircle size={14} />
                                                    {bu.reports} Alerts
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="chart-card-bento" style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
                            <div className="chart-header" style={{ marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <TrendingUp size={18} color="#f97316" />
                                    Group Engagement Velocity
                                </h3>
                            </div>
                            <ResponsiveContainer width="100%" height={180}>
                                <AreaChart data={growthTrend}>
                                    <defs>
                                        <linearGradient id="colorOrange" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: '12px' }}
                                    />
                                    <Area type="monotone" dataKey="Group" stroke="#f97316" strokeWidth={4} fillOpacity={1} fill="url(#colorOrange)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: INSIGHTS & HEALTH */}
                    <div className="sa-right-panel">
                        <div className="engagement-panel card-glass-premium expanded">
                            <div className="panel-header-compact">
                                <UserCheck size={14} color="#f97316" />
                                <span>Group Admin Engagement</span>
                            </div>

                            <div className="engagement-metrics-grid">
                                {adminEngagement.map((d, i) => (
                                    <div key={i} className="engagement-stat-box">
                                        <div className="stat-icon-mini" style={{ color: d.color }}>
                                            <d.icon size={12} />
                                        </div>
                                        <div className="stat-content">
                                            <span className="stat-label">{d.label}</span>
                                            <span className="stat-value">{d.value}</span>
                                        </div>
                                        <div className="stat-progress-bar">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${d.percent}%` }}
                                                className="progress-fill"
                                                style={{ backgroundColor: d.color }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="active-admins-section">
                                <div className="section-subtitle">Active Admins Now</div>
                                <div className="admin-avatar-list">
                                    {activeAdmins.map((admin, idx) => (
                                        <div
                                            key={idx}
                                            className="admin-avatar-mini"
                                            title={`${admin.name} (${admin.bu})`}
                                        >
                                            {admin.name.charAt(0)}
                                            <span className={`status-dot ${admin.status.toLowerCase().replace(' ', '-')}`}></span>
                                        </div>
                                    ))}
                                    <div className="admin-count-pill">+10 More</div>
                                </div>
                            </div>
                        </div>


                        <div className="health-pulse card-glass">
                            <div className="system-pulse">
                                <div className="pulse-header">
                                    <Zap size={16} />
                                    <span>Group System Status</span>
                                </div>
                                <div className="pulse-circle-wrap">
                                    <div className="pulse-circle">
                                        <span className="pulse-val">98%</span>
                                        <span className="pulse-lbl">Health</span>
                                        <div className="pulse-wave"></div>
                                    </div>
                                </div>
                                <div style={{ marginTop: '20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                                        <span style={{ color: '#64748b', fontWeight: 600 }}>Server Uptime</span>
                                        <span style={{ color: '#10b981', fontWeight: 600 }}>99.99%</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                                        <span style={{ color: '#64748b', fontWeight: 600 }}>API Latency</span>
                                        <span style={{ color: '#f97316', fontWeight: 600 }}>42ms</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. QUICK ACTION BAR (Bottom) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginTop: '1.5rem' }}>
                    <motion.button whileHover={{ y: -5 }} className="card-glass" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1.25rem', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}>
                        <Megaphone size={20} color="#f97316" />
                        <span style={{ fontWeight: 700, fontSize: '14px' }}>Post Group Msg</span>
                    </motion.button>
                    <motion.button whileHover={{ y: -5 }} className="card-glass" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1.25rem', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}>
                        <LifeBuoy size={20} color="#3b82f6" />
                        <span style={{ fontWeight: 700, fontSize: '14px' }}>Audit Logs</span>
                    </motion.button>
                    <motion.button whileHover={{ y: -5 }} className="card-glass" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1.25rem', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}>
                        <AlertCircle size={20} color="#ef4444" />
                        <span style={{ fontWeight: 700, fontSize: '14px' }}>Policy Engine</span>
                    </motion.button>
                    <motion.button whileHover={{ y: -5 }} className="card-glass" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1.25rem', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}>
                        <Settings size={20} color="#64748b" />
                        <span style={{ fontWeight: 700, fontSize: '14px' }}>System Config</span>
                    </motion.button>
                </div>
            </motion.div >

        </div >
    );
};

export default SuperAdminDashboard;
