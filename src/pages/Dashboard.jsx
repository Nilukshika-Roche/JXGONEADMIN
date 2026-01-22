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
        { label: 'Total Users', value: '45,284', trend: '+12.4%', color: '#f97316', icon: <Users size={18} /> },
        { label: 'Active Now', value: '1,284', trend: '+8.1%', color: '#f59e0b', icon: <Activity size={18} /> },
        { label: 'System Perf', value: '98.2%', trend: '+0.5%', color: '#ea580c', icon: <Zap size={18} /> },
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
                {/* 1. ULTRA PREMIUM PERSONALIZED HERO */}
                <header className="hero-welcome">
                    <div className="hero-content">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="hero-text"
                        >
                            <div className="hero-badge">
                                <Sparkles size={14} className="sparkle-icon" />
                                <span>Administrative Intelligence Active</span>
                            </div>
                            <h1>Welcome back, <span className="highlight">John Doe</span></h1>
                            <p>You have <span className="bold-white">12 new members</span> to approve and <span className="bold-white">3 events</span> starting today. Your platform health is optimal.</p>

                            <div className="hero-actions">
                                <button className="hero-btn primary">
                                    <UserPlus size={18} />
                                    Add New User
                                </button>
                                <button className="hero-btn secondary">
                                    <Settings size={18} />
                                    Quick Config
                                </button>
                            </div>
                        </motion.div>
                        <div className="hero-visual">
                            <div className="glass-card main-viz">
                                <div className="viz-header">
                                    <TrendingUp size={16} />
                                    <span>Weekly Growth</span>
                                </div>
                                <div className="viz-body">
                                    <ResponsiveContainer width="100%" height={120}>
                                        <AreaChart data={chartData}>
                                            <defs>
                                                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#fff" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <Area type="monotone" dataKey="users" stroke="#fff" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* 2. BENTO GRID */}
                <div className="dash-bento">

                    {/* LEFT COLUMN: SHORTCUTS & STATS */}
                    <div className="bento-side">
                        <div className="shortcuts-bar card-glass">
                            {shortcuts.map((s, idx) => (
                                <button key={idx} className={`sc-item ${s.active ? 'active' : ''}`}>
                                    {s.icon}
                                    <span>{s.label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="stats-column">
                            {stats.map((s, idx) => (
                                <motion.div
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    key={idx}
                                    className="small-stat-card card-glass"
                                >
                                    <div className="stat-info-wrap">
                                        <span className="stat-label-tiny">{s.label}</span>
                                        <h4 className="stat-value-med">{s.value}</h4>
                                    </div>
                                    <div className="stat-trend-wrap" style={{ color: s.color }}>
                                        {s.icon}
                                        <span>{s.trend}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* CENTER COLUMN: BIG GRAPH */}
                    <div className="bento-center card-glass">
                        <div className="panel-header-cool">
                            <div className="ph-left">
                                <h3>Platform Analytics</h3>
                                <p>Deep insights into user engagement and system load</p>
                            </div>
                            <div className="ph-right">
                                <select className="cool-select">
                                    <option>Last 7 Days</option>
                                    <option>Last 30 Days</option>
                                </select>
                            </div>
                        </div>
                        <div className="chart-large">
                            <ResponsiveContainer width="100%" height={280}>
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorOrange" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="active" stroke="#f97316" strokeWidth={4} fillOpacity={1} fill="url(#colorOrange)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: RECENT PROJECTS & HEALTH */}
                    <div className="bento-right">
                        <div className="projects-panel card-glass">
                            <h3 className="section-title-sm">Active Initiatives</h3>
                            <div className="project-list">
                                {recentProjects.map((p, idx) => (
                                    <div key={idx} className="project-item">
                                        <div className="pi-header">
                                            <span className="pi-name">{p.name}</span>
                                            <span className="pi-percent">{p.progress}%</span>
                                        </div>
                                        <div className="pi-bar">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${p.progress}%` }}
                                                className="pi-fill"
                                                style={{ backgroundColor: p.color }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="health-pulse card-glass">
                            <div className="pulse-header">
                                <Activity size={16} />
                                <span>Platform Pulse</span>
                            </div>
                            <div className="pulse-circle-wrap">
                                <div className="pulse-circle">
                                    <span className="pulse-val">99%</span>
                                    <span className="pulse-lbl">Uptime</span>
                                    <div className="pulse-wave"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. CONDENSED DIRECTORY FEED */}
                <section className="directory-feed card-glass">
                    <div className="feed-header">
                        <div className="fh-title">
                            <h3>Real-time Member Activity</h3>
                            <p>Stream of latest registrations and role adjustments</p>
                        </div>
                        <div className="fh-search">
                            <Search size={16} />
                            <input type="text" placeholder="Filter stream..." />
                        </div>
                    </div>
                    <div className="feed-items">
                        {[1, 2, 3].map((_, idx) => (
                            <div key={idx} className="feed-row">
                                <div className="feed-user">
                                    <div className="feed-avatar-glow">
                                        <img src={`https://i.pravatar.cc/150?u=${idx}`} alt="" />
                                    </div>
                                    <div className="feed-meta">
                                        <span className="fm-name">Sarah Jenkins</span>
                                        <span className="fm-action">Joined as <span className="orange-role">Content Editor</span></span>
                                    </div>
                                </div>
                                <div className="feed-status">
                                    <span className="status-dot"></span>
                                    Online
                                </div>
                                <div className="feed-time">2m ago</div>
                                <button className="feed-btn"><ChevronRight size={18} /></button>
                            </div>
                        ))}
                    </div>
                </section>
            </motion.div>

            <style jsx>{`
                .dash-wrapper {
                    min-height: 100vh;
                    background: #fdfaf7; /* Very light orange tint */
                    padding: 0rem 1.5rem 2rem;
                    color: #1e293b;
                }
                .dash-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                /* HERO WELCOME */
                .hero-welcome {
                    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
                    border-radius: 24px;
                    padding: 1.75rem 2.5rem;
                    color: white;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 15px 30px rgba(249, 115, 22, 0.15);
                }
                .hero-welcome::before {
                    content: '';
                    position: absolute;
                    top: -50px;
                    right: -50px;
                    width: 250px;
                    height: 250px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 50%;
                    filter: blur(50px);
                }
                .hero-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: relative;
                    z-index: 2;
                }
                .hero-text { max-width: 550px; }
                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: rgba(255,255,255,0.2);
                    padding: 4px 12px;
                    border-radius: 12px;
                    font-size: 10px;
                    font-weight: 700;
                    text-transform: uppercase;
                    margin-bottom: 1rem;
                    backdrop-filter: blur(10px);
                }
                .hero-text h1 {
                    font-size: 2.25rem;
                    font-weight: 800;
                    margin-bottom: 0.5rem;
                    letter-spacing: -0.01em;
                }
                .highlight {
                    color: #fff;
                    background: linear-gradient(90deg, #fff, #ffedd5);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .hero-text p {
                    font-size: 0.95rem;
                    opacity: 0.9;
                    line-height: 1.5;
                    margin-bottom: 1.5rem;
                }
                .bold-white { font-weight: 700; color: white; }
                .hero-actions { display: flex; gap: 12px; }
                .hero-btn {
                    padding: 10px 20px;
                    border-radius: 12px;
                    font-weight: 700;
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                    border: none;
                }
                .hero-btn.primary {
                    background: white;
                    color: #f97316;
                }
                .hero-btn.secondary {
                    background: rgba(255,255,255,0.2);
                    color: white;
                    backdrop-filter: blur(10px);
                }
                .hero-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 15px rgba(0,0,0,0.1); }

                .hero-visual { width: 280px; }
                .glass-card {
                    background: rgba(255,255,255,0.15);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255,255,255,0.2);
                    border-radius: 20px;
                    padding: 1.25rem;
                }
                .viz-header { display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 700; margin-bottom: 0.75rem; text-transform: uppercase; }

                /* BENTO GRID */
                .dash-bento {
                    display: grid;
                    grid-template-columns: 280px 1fr 280px;
                    gap: 1.5rem;
                }
                .card-glass {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 24px;
                    padding: 1.5rem;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.02);
                }

                .bento-side { display: flex; flex-direction: column; gap: 1.5rem; }
                .shortcuts-bar {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 10px;
                }
                .sc-item {
                    height: 80px;
                    background: #f8fafc;
                    border: 1px solid #f1f5f9;
                    border-radius: 16px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    color: #64748b;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .sc-item.active { background: #fff7ed; color: #f97316; border-color: #fed7aa; }
                .sc-item span { font-size: 10px; font-weight: 700; text-transform: uppercase; }
                .sc-item:hover { border-color: #f97316; color: #f97316; }

                .stats-column { display: flex; flex-direction: column; gap: 1rem; }
                .small-stat-card {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .stat-label-tiny { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
                .stat-value-med { font-size: 1.5rem; font-weight: 800; color: #1e293b; margin: 2px 0 0; }
                .stat-trend-wrap { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; font-size: 11px; font-weight: 700; }

                .bento-center { min-height: 400px; display: flex; flex-direction: column; }
                .panel-header-cool { display: flex; justify-content: space-between; margin-bottom: 2rem; }
                .ph-left h3 { font-size: 1.25rem; font-weight: 800; color: #1e293b; margin: 0; }
                .ph-left p { font-size: 0.85rem; color: #64748b; margin: 4px 0 0; }
                .cool-select { padding: 8px 16px; border-radius: 10px; border: 1px solid #e2e8f0; font-size: 12px; font-weight: 600; background: #f8fafc; outline: none; }

                .bento-right { display: flex; flex-direction: column; gap: 1.5rem; }
                .section-title-sm { font-size: 14px; font-weight: 800; color: #1e293b; margin-bottom: 1.25rem; }
                .project-list { display: flex; flex-direction: column; gap: 1.25rem; }
                .project-item { display: flex; flex-direction: column; gap: 8px; }
                .pi-header { display: flex; justify-content: space-between; font-size: 12px; font-weight: 700; }
                .pi-bar { height: 6px; background: #f1f5f9; border-radius: 10px; overflow: hidden; }
                .pi-fill { height: 100%; border-radius: 10px; }

                .health-pulse { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; }
                .pulse-header { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; color: #f97316; margin-bottom: 1.5rem; text-transform: uppercase; }
                .pulse-circle-wrap { position: relative; }
                .pulse-circle {
                    width: 100px;
                    height: 100px;
                    border: 4px solid #fff7ed;
                    border-radius: 50%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background: white;
                    position: relative;
                    z-index: 2;
                }
                .pulse-val { font-size: 1.5rem; font-weight: 900; color: #f97316; line-height: 1; }
                .pulse-lbl { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
                .pulse-wave {
                    position: absolute;
                    top: -10px; left: -10px; right: -10px; bottom: -10px;
                    border: 2px solid #f97316;
                    border-radius: 50%;
                    animation: circle-pulse 2s infinite;
                    opacity: 0;
                }
                @keyframes circle-pulse {
                    0% { transform: scale(0.8); opacity: 0.5; }
                    100% { transform: scale(1.3); opacity: 0; }
                }

                /* DIRECTORY FEED */
                .directory-feed { padding: 2rem; }
                .feed-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
                .fh-title h3 { font-size: 1.25rem; font-weight: 800; margin: 0; }
                .fh-title p { font-size: 0.85rem; color: #64748b; margin: 4px 0 0; }
                .fh-search { background: #f8fafc; padding: 10px 16px; border-radius: 14px; display: flex; align-items: center; gap: 10px; border: 1px solid #f1f5f9; }
                .fh-search input { border: none; background: transparent; outline: none; font-size: 13px; color: #1e293b; width: 200px; }

                .feed-row {
                    display: grid;
                    grid-template-columns: 1fr 140px 100px 40px;
                    align-items: center;
                    padding: 1rem 0;
                    border-bottom: 1px solid #f1f5f9;
                }
                .feed-user { display: flex; align-items: center; gap: 12px; }
                .feed-avatar-glow {
                    width: 40px;
                    height: 40px;
                    border-radius: 12px;
                    padding: 2px;
                    background: linear-gradient(135deg, #f97316, #fbbf24);
                }
                .feed-avatar-glow img { width: 100%; height: 100%; border-radius: 10px; }
                .feed-meta { display: flex; flex-direction: column; }
                .fm-name { font-size: 14px; font-weight: 700; }
                .fm-action { font-size: 12px; color: #64748b; }
                .orange-role { color: #f97316; font-weight: 600; }
                
                .feed-status { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #059669; }
                .status-dot { width: 6px; height: 6px; background: #10b981; border-radius: 50%; }
                .feed-time { font-size: 12px; font-weight: 600; color: #94a3b8; }
                .feed-btn { background: none; border: none; color: #cbd5e1; cursor: pointer; }
                .feed-btn:hover { color: #f97316; }

                @media (max-width: 1280px) {
                    .dash-bento { grid-template-columns: 1fr 1fr; }
                    .bento-right { grid-column: span 2; display: grid; grid-template-columns: 1fr 1fr; }
                }
                @media (max-width: 900px) {
                    .dash-bento { grid-template-columns: 1fr; }
                    .bento-right { grid-template-columns: 1fr; }
                    .hero-content { flex-direction: column; text-align: center; gap: 2rem; }
                    .hero-text h1 { font-size: 2.5rem; }
                    .hero-actions { justify-content: center; }
                    .feed-row { display: flex; flex-direction: column; gap: 10px; align-items: flex-start; }
                }
            `}</style>
        </div>
    );
};

export default Dashboard;

