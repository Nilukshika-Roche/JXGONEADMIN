import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell
} from 'recharts';
import {
    Users,
    Eye,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    ChevronRight,
    Search,
    UserPlus,
    Calendar,
    Activity,
    Shield,
    Zap,
    Bell,
    Settings,
    MoreHorizontal,
    Sparkles,
    LayoutDashboard
} from 'lucide-react';

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeInitiativeTab, setActiveInitiativeTab] = useState('events');

    const chartData = [
        { name: 'Mon', users: 4000, active: 2400 },
        { name: 'Tue', users: 3000, active: 1398 },
        { name: 'Wed', users: 2000, active: 9800 },
        { name: 'Thu', users: 2780, active: 3908 },
        { name: 'Fri', users: 1890, active: 4800 },
        { name: 'Sat', users: 2390, active: 3800 },
        { name: 'Sun', users: 3490, active: 4300 },
    ];

    const stats = [
        { label: 'Total Users', value: '45,284', trend: '+12.4%', color: '#3b82f6', icon: <Users size={18} /> },
        { label: 'Active Now', value: '1,284', trend: '+8.1%', color: '#f59e0b', icon: <Activity size={18} /> },
        { label: 'Platform Content', value: '8.4k', trend: '+2.4%', color: '#8b5cf6', icon: <Sparkles size={18} /> },
        { label: 'Avg Engagement', value: '74%', trend: '+5.2%', color: '#ec4899', icon: <Activity size={18} /> },
        { label: 'Marketplace Volume', value: '$12.8k', trend: '+15.2%', color: '#f97316', icon: <TrendingUp size={18} /> },
        { label: 'Active CSR', value: '8', trend: 'Stable', color: '#10b981', icon: <Sparkles size={18} /> },
        { label: 'Active Events', value: '12', trend: '+3', color: '#06b6d4', icon: <Calendar size={18} /> },
    ];

    const shortcuts = [
        { label: 'Members', icon: <Users size={20} />, active: true },
        { label: 'Events', icon: <Calendar size={20} /> },
        { label: 'Security', icon: <Shield size={20} /> },
        { label: 'Analysis', icon: <TrendingUp size={20} /> },
    ];

    const recentProjects = [
        { name: 'Global Onboarding', status: 'In Progress', progress: 75, color: '#f97316' },
        { name: 'Security Audit', status: 'Review', progress: 45, color: '#f59e0b' },
        { name: 'API Migration', status: 'Completed', progress: 100, color: '#10b981' },
    ];

    return (
        <div className="dash-wrapper">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="dash-container"
            >
                {/* 1. DASHBOARD HEADER */}
                <header className="dash-header-simple">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                    >
                        <h1 className="welcome-title">Welcome back, <span className="welcome-highlight">John Doe</span></h1>
                        <p className="welcome-sub">Here's an overview of your platform today.</p>
                    </motion.div>
                </header>

                {/* 2. EXECUTIVE KPI GRID (Below Hero) */}
                <div className="stats-bento-grid-mini">
                    {stats.map((s, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="stat-card-premium-mini card-glass"
                        >
                            <div className="kpi-icon-row">
                                <div className="kpi-icon-bg" style={{ backgroundColor: `${s.color}15`, color: s.color }}>
                                    {s.icon}
                                </div>
                                <div className="kpi-trend-pill-mini" style={{ color: s.color }}>
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

                {/* 3. BENTO GRID */}
                <div className="dash-bento">

                    {/* ROW 1: QUICK ACCESS & HIGHLIGHTS */}
                    <div className="bento-row main-insights">
                        {/* LEFT: Quick Access (Moved to Left) */}
                        <section className="quick-access-panel card-glass">
                            <div className="qa-header">
                                <div className="qa-title-group">
                                    <Zap size={16} className="qa-icon" style={{ color: '#ea580c' }} />
                                    <h3 className="qa-heading">Quick Access</h3>
                                </div>
                                <p className="qa-sub">Shortcuts to key actions</p>
                            </div>
                            <div className="qa-grid">
                                <motion.button whileHover={{ scale: 1.02, y: -2 }} className="qa-btn">
                                    <div className="qa-btn-icon" style={{ backgroundColor: '#e0f2fe', color: '#0ea5e9' }}><UserPlus size={18} /></div>
                                    <span>Add New User</span>
                                </motion.button>
                                <motion.button whileHover={{ scale: 1.02, y: -2 }} className="qa-btn">
                                    <div className="qa-btn-icon" style={{ backgroundColor: '#f3e8ff', color: '#a855f7' }}><Users size={18} /></div>
                                    <span>Manage Directory</span>
                                </motion.button>
                                <motion.button whileHover={{ scale: 1.02, y: -2 }} className="qa-btn relative-btn">
                                    <div className="qa-btn-icon" style={{ backgroundColor: '#fef08a', color: '#eab308' }}><UserPlus size={18} /></div>
                                    <span>Approvals</span>
                                    <span className="qa-badge">12</span>
                                </motion.button>
                                <motion.button whileHover={{ scale: 1.02, y: -2 }} className="qa-btn relative-btn">
                                    <div className="qa-btn-icon" style={{ backgroundColor: '#fee2e2', color: '#ef4444' }}><Shield size={18} /></div>
                                    <span>Reports</span>
                                    <span className="qa-badge bg-red-500">2</span>
                                </motion.button>
                                <motion.button whileHover={{ scale: 1.02, y: -2 }} className="qa-btn">
                                    <div className="qa-btn-icon" style={{ backgroundColor: '#e0e7ff', color: '#6366f1' }}><Calendar size={18} /></div>
                                    <span>Events</span>
                                </motion.button>
                                <motion.button whileHover={{ scale: 1.02, y: -2 }} className="qa-btn">
                                    <div className="qa-btn-icon" style={{ backgroundColor: '#dcfce7', color: '#22c55e' }}><Sparkles size={18} /></div>
                                    <span>CSR Hub</span>
                                </motion.button>
                                <motion.button whileHover={{ scale: 1.02, y: -2 }} className="qa-btn">
                                    <div className="qa-btn-icon" style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}><Settings size={18} /></div>
                                    <span>Settings</span>
                                </motion.button>
                            </div>
                        </section>

                        {/* RIGHT: Content & Marketplace Highlights (Moved to Right) */}
                        <div className="main-highlights-area">
                            <div className="highlight-card card-glass">
                                <div className="hc-header">
                                    <div className="hc-title">
                                        <TrendingUp size={16} style={{ color: '#ea580c' }} />
                                        <h4>Content Management</h4>
                                    </div>
                                    <button className="view-link">View All</button>
                                </div>
                                <div className="content-stats">
                                    <div className="cs-item">
                                        <span className="cs-label">Published</span>
                                        <span className="cs-value text-emerald-600">42</span>
                                    </div>
                                    <div className="cs-item">
                                        <span className="cs-label">Pending</span>
                                        <span className="cs-value text-amber-500">15</span>
                                    </div>
                                    <div className="cs-item">
                                        <span className="cs-label">Reported</span>
                                        <span className="cs-value text-slate-400">5</span>
                                    </div>
                                </div>
                                <div className="recent-post-snippet">
                                    <div className="rp-info">
                                        <p className="rp-text">"Summer Campaign Launch" exceeded 1.2k views...</p>
                                        <span className="rp-meta">By Sarah Wilson • 2h ago</span>
                                    </div>
                                </div>
                            </div>

                            <div className="highlight-card card-glass">
                                <div className="hc-header">
                                    <div className="hc-title">
                                        <Activity size={16} style={{ color: '#ea580c' }} />
                                        <h4>Marketplace</h4>
                                    </div>
                                    <button className="view-link">Manage</button>
                                </div>

                                <div className="trending-item pending-notice">
                                    <div className="ti-icon">
                                        <Clock size={16} />
                                    </div>
                                    <div className="ti-details">
                                        <span className="ti-name">12 Products Awaiting Approval</span>
                                        <span className="ti-price action-req">Action Required</span>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                    {/* ROW 2: ANALYTICS & EVENTS */}
                    <div className="bento-row secondary-insights">
                        {/* LEFT: Platform Analytics (Moved to Left) */}
                        <div className="bento-center card-glass">
                            <div className="panel-header-cool">
                                <div className="ph-left">
                                    <h3 className="analytics-title">Platform Analytics</h3>
                                    <p className="analytics-subtitle">Deep insights into user engagement and system load</p>
                                </div>
                                <div className="ph-right">
                                    <div className="custom-select-wrapper">
                                        <select className="cool-select-premium" defaultValue="Last 7 Days">
                                            <option>Last 7 Days</option>
                                            <option>Last 30 Days</option>
                                        </select>
                                        <ChevronRight size={14} className="select-arrow" />
                                    </div>
                                </div>
                            </div>
                            <div className="chart-large">
                                <ResponsiveContainer width="100%" height={250}>
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorOrange" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={5} />
                                        <YAxis hide />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                                        />
                                        <Area type="monotone" dataKey="active" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorOrange)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* RIGHT: Events & CSR Highlights (Moved to Right) */}
                        <div className="events-csr-highlights card-glass compact">
                            <div className="ph-header-tabs">
                                <div className="ph-left">
                                    <h3>Highlights</h3>
                                    <p>Upcoming happenings & impact</p>
                                </div>
                                <div className="quick-tabs">
                                    <button
                                        className={`q-tab ${activeInitiativeTab === 'events' ? 'active' : ''}`}
                                        onClick={() => setActiveInitiativeTab('events')}
                                    >
                                        Events
                                    </button>
                                    <button
                                        className={`q-tab ${activeInitiativeTab === 'csr' ? 'active' : ''}`}
                                        onClick={() => setActiveInitiativeTab('csr')}
                                    >
                                        CSR
                                    </button>
                                </div>
                            </div>

                            <div className="initiatives-list-compact">
                                <AnimatePresence mode="wait">
                                    {activeInitiativeTab === 'events' ? (
                                        <motion.div
                                            key="events"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="tab-content"
                                        >
                                            <div className="initiative-card-mini">
                                                <div className="ic-details-mini">
                                                    <h5>Annual Company Gala</h5>
                                                    <span className="ic-meta-mini">Feb 15 • 18:00</span>
                                                </div>
                                                <button className="ic-action-mini"><ChevronRight size={14} /></button>
                                            </div>
                                            <div className="initiative-card-mini">
                                                <div className="ic-details-mini">
                                                    <h5>Tech Summit 2024</h5>
                                                    <span className="ic-meta-mini">Mar 02 • 09:00</span>
                                                </div>
                                                <button className="ic-action-mini"><ChevronRight size={14} /></button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="csr"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="tab-content"
                                        >
                                            <div className="initiative-card-mini">
                                                <div className="ic-details-mini">
                                                    <h5>Beach Cleanup Drive</h5>
                                                    <span className="ic-meta-mini">Ongoing • 45 Vol.</span>
                                                </div>
                                                <button className="ic-action-mini"><ChevronRight size={14} /></button>
                                            </div>
                                            <div className="initiative-card-mini">
                                                <div className="ic-details-mini">
                                                    <h5>Tree Plantation</h5>
                                                    <span className="ic-meta-mini">Mar 10 • Colombo</span>
                                                </div>
                                                <button className="ic-action-mini"><ChevronRight size={14} /></button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>

            <style jsx>{`
                .dash-wrapper {
                    min-height: 100vh;
                    background: #f8fafc;
                    padding: 0rem 2rem 3rem;
                    color: #0f172a;
                }
                .dash-container {
                    max-width: 1440px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                /* SIMPLE HEADER */
                .dash-header-simple {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 0 0 0;
                }
                .welcome-title {
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: #1e293b;
                    margin: 0 0 2px 0;
                    letter-spacing: -0.02em;
                }
                .welcome-highlight {
                    color: #f97316;
                }
                .welcome-sub {
                    font-size: 0.85rem;
                    color: #64748b;
                    margin: 0;
                }

                .glass-card {
                    background: rgba(255,255,255,0.15);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255,255,255,0.25);
                    border-radius: 16px;
                    padding: 1rem;
                }
                .viz-header { display: flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 700; margin-bottom: 0.75rem; text-transform: uppercase; }

                /* BENTO GRID */
                .dash-bento {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }
                .card-glass {
                    background: white;
                    border: 1px solid #f1f5f9;
                    border-radius: 16px;
                    padding: 2rem;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.02);
                    transition: all 0.3s ease;
                }
                .card-glass.compact {
                    padding: 1.5rem;
                }
                .card-glass:hover {
                    box-shadow: 0 4px 15px rgba(0,0,0,0.03);
                }

                .bento-row {
                    display: grid;
                    gap: 2rem;
                }
                .main-insights {
                    grid-template-columns: 380px 1fr ;
                }
                .secondary-insights {
                    grid-template-columns: 1fr 300px;
                }

                .main-highlights-area {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 2rem;
                }

                .highlight-card {
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }
                .hc-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .hc-title {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .hc-title h4 {
                    font-size: 14px;
                    font-weight: 700;
                    color: #ea580c;
                    margin: 0;
                }
                .view-link {
                    font-size: 12px;
                    font-weight: 600;
                    color: #64748b;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 4px 8px;
                    border-radius: 6px;
                }
                .view-link:hover {
                    background: #f8fafc;
                    color: #0f172a;
                }

                .content-stats {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 15px;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid #f1f5f9;
                }
                .cs-item {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    background: #f8fafc;
                    padding: 10px;
                    border-radius: 8px;
                }
                .cs-label { font-size: 11px; font-weight: 500; color: #64748b; }
                .cs-value { font-size: 1.25rem; font-weight: 700; color: #0f172a; }

                .recent-post-snippet {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                    padding-top: 0.5rem;
                }
                .rp-text { font-size: 13px; color: #334155; font-weight: 500; margin: 0; line-height: 1.5; }
                .rp-meta { font-size: 11px; color: #94a3b8; }

                .marketplace-snippet {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 15px;
                }
                .ms-item { 
                    display: flex; flex-direction: column; gap: 4px; 
                    background: #f8fafc;
                    padding: 10px;
                    border-radius: 8px;
                }
                .ms-label { font-size: 11px; font-weight: 500; color: #64748b; }
                .ms-value { font-size: 1.25rem; font-weight: 700; color: #0f172a; }

                .trending-item {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    background: #f8fafc;
                    padding: 12px 14px;
                    border-radius: 12px;
                    border: 1px solid transparent;
                }
                .pending-notice {
                     background: white;
                     border-color: #f1f5f9;
                }
                .ti-icon {
                     background: #f1f5f9; 
                     color: #64748b; 
                     padding: 10px; 
                     border-radius: 10px;
                     display: flex;
                     align-items: center;
                     justify-content: center;
                }
                .ti-details { display: flex; flex-direction: column; gap: 2px; }
                .ti-name { font-size: 13px; font-weight: 600; color: #334155; }
                .ti-price { font-size: 11px; font-weight: 600; color: #64748b; }
                .action-req { color: #f59e0b; }

                /* PAGE INSIGHTS */
                .page-insights-mini {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .pi-mini-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: #fff7ed;
                    padding: 8px;
                    border-radius: 10px;
                    border: 1px solid #fed7aa;
                }
                .pi-progress-circle {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: white;
                    border: 3px solid #f97316;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .pi-progress-val { font-size: 9px; font-weight: 800; color: #f97316; }
                .pi-mini-info { display: flex; flex-direction: column; }
                .pi-mini-label { font-size: 10px; font-weight: 700; color: #1e293b; }
                .pi-mini-stats { font-size: 9px; color: #ea580c; font-weight: 600; }
                .pi-mini-footer {
                    display: flex;
                    justify-content: space-between;
                    border-top: 1px solid #f1f5f9;
                    padding-top: 6px;
                }
                .pif-item { display: flex; align-items: center; gap: 4px; font-size: 10px; font-weight: 700; color: #64748b; }

                /* ANALYTICS TITLE FONT */
                .analytics-title {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: #0f172a;
                    letter-spacing: -0.01em;
                    margin: 0;
                }
                .analytics-subtitle {
                    font-size: 13px;
                    color: #64748b;
                    margin-top: 4px;
                }

                /* QUICK ACCESS */
                .quick-access-panel { display: flex; flex-direction: column; gap: 1.5rem; }
                .qa-header { display: flex; flex-direction: column; gap: 4px; }
                .qa-title-group { display: flex; align-items: center; gap: 8px; }
                .qa-heading {
                    font-size: 15px;
                    font-weight: 700;
                    color: #ea580c;
                    margin: 0;
                }
                .qa-sub { font-size: 12px; color: #64748b; margin: 0; }
                .qa-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                }
                .qa-btn {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                    padding: 16px 10px;
                    background: transparent;
                    border: 1px solid #f1f5f9;
                    border-radius: 12px;
                    cursor: pointer;
                    font-size: 12px;
                    font-weight: 500;
                    color: #475569;
                    transition: all 0.2s ease;
                }
                .qa-btn:hover {
                    background: #f8fafc;
                    border-color: #e2e8f0;
                    color: #0f172a;
                }
                .relative-btn { position: relative; }
                .qa-badge {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: #f1f5f9;
                    color: #475569;
                    font-size: 10px;
                    font-weight: 600;
                    min-width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                }
                .bg-red-500 { background: #ef4444; }
                .qa-btn-icon {
                    width: 40px;
                    height: 40px;
                    background: #f1f5f9;
                    color: #475569;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }
                .qa-btn:hover .qa-btn-icon {
                    background: white;
                    color: #0f172a;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                }

                /* NEW PREMIUM DROPDOWN */
                .custom-select-wrapper { position: relative; display: flex; align-items: center; }
                .cool-select-premium {
                    appearance: none;
                    background: #fff7ed;
                    border: 1px solid #fed7aa;
                    padding: 6px 32px 6px 14px;
                    border-radius: 10px;
                    font-size: 11px;
                    font-weight: 700;
                    color: #ea580c;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .cool-select-premium:hover {
                    border-color: #f97316;
                    background: #ffedd5;
                }
                .select-arrow { 
                    position: absolute; 
                    right: 12px; 
                    pointer-events: none; 
                    color: #f97316;
                    transform: rotate(90deg);
                    width: 12px;
                }

                /* REFINED EVENTS & CSR TABS */
                .ph-header-tabs {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 0.75rem;
                }
                .ph-header-tabs h3 {
                    font-family: 'Georgia', serif;
                    font-size: 16px;
                    font-weight: 800;
                    margin-bottom: 2px;
                }
                .ph-header-tabs p {
                    font-family: 'Georgia', serif;
                    font-size: 11px;
                    font-style: italic;
                    color: #64748b;
                }
                .quick-tabs {
                    display: flex;
                    gap: 4px;
                    background: #f1f5f9;
                    padding: 4px;
                    border-radius: 10px;
                }
                .q-tab {
                    padding: 4px 12px;
                    border-radius: 7px;
                    border: none;
                    font-size: 10px;
                    font-weight: 800;
                    color: #64748b;
                    cursor: pointer;
                    transition: all 0.2s;
                    background: transparent;
                }
                .q-tab.active {
                    background: white;
                    color: #f97316;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
                }

                .initiatives-list-compact { display: flex; flex-direction: column; min-height: 60px; }
                .initiative-card-mini {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 4px 6px;
                    border-radius: 8px;
                    background: #f8fafc;
                    margin-bottom: 4px;
                    transition: all 0.2s;
                }
                .initiative-card-mini:hover { transform: translateX(2px); background: #f1f5f9; }
                .ic-icon-mini {
                    width: 24px; height: 24px;
                    border-radius: 5px;
                    display: flex; align-items: center; justify-content: center;
                }
                .event .ic-icon-mini { background: #fee2e2; color: #ef4444; }
                .csr .ic-icon-mini { background: #dcfce7; color: #10b981; }
                .ic-details-mini { flex: 1; display: flex; flex-direction: column; gap: 0px; }
                .ic-details-mini h5 { font-size: 10px; font-weight: 800; color: #1e293b; margin: 0; }
                .ic-meta-mini { font-size: 8px; color: #94a3b8; font-weight: 600; }
                .ic-action-mini { background: none; border: none; color: #cbd5e1; cursor: pointer; }

                /* FEED COMPACT */
                .feed-row-compact {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px 0;
                    border-bottom: 1px solid #f1f5f9;
                }
                .feed-avatar-small { width: 32px; height: 32px; border-radius: 8px; overflow: hidden; }
                .feed-avatar-small img { width: 100%; height: 100%; object-fit: cover; }

                /* STATS GRID MINI */
                .stats-bento-grid-mini {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 0.75rem;
                    margin-top: 0px;
                    margin-bottom: 1.5rem;
                }
                .stat-card-premium-mini {
                    background: white;
                    border: 1px solid #f1f5f9;
                    border-radius: 10px;
                    padding: 0.65rem 0.9rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02), 0 4px 6px -1px rgba(0, 0, 0, 0.03);
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    border-left: 3px solid transparent;
                    min-height: 65px;
                }
                .stat-card-premium-mini:hover {
                    border-left-color: #f97316;
                    background: #fffcf9;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px -5px rgba(249, 115, 22, 0.1);
                }
                .kpi-icon-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                }
                .kpi-icon-bg {
                    width: 24px;
                    height: 24px;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .kpi-icon-bg svg {
                    width: 14px;
                    height: 14px;
                }
                .kpi-label-xsmall {
                    font-size: 9px;
                    font-weight: 700;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .kpi-value-small {
                    font-size: 1.15rem;
                    font-weight: 600;
                    color: #0f172a;
                    line-height: 1;
                    margin: 2px 0 0 0;
                }
                .kpi-trend-pill-mini {
                    font-size: 8px;
                    font-weight: 800;
                    padding: 2px 5px;
                    border-radius: 4px;
                    background: rgba(241, 245, 249, 0.5);
                }

                @media (max-width: 1200px) {
                    .main-insights, .secondary-insights { grid-template-columns: 1fr; }
                    .main-highlights-area { grid-template-columns: repeat(2, 1fr); }
                    .main-highlights-area > :nth-child(3) { grid-column: auto; }
                }

                @media (max-width: 768px) {
                    .main-highlights-area { grid-template-columns: 1fr; }
                    .main-highlights-area > :nth-child(3) { grid-column: auto; }
                    .dash-header-simple { flex-direction: column; text-align: center; gap: 1rem; align-items: center; }
                    .welcome-title { font-size: 1.5rem; }
                }
            `}</style>
        </div>
    );
};

export default Dashboard;

