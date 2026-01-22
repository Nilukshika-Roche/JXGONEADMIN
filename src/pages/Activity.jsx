import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Heart,
    MessageCircle,
    Eye,
    BarChart2,
    Users,
    ThumbsUp,
    UserCircle,
    Clock,
    Filter,
    Calendar,
    ChevronDown,
    Download,
    Zap,
    Activity,
    Repeat,
} from 'lucide-react';

const ActivityDashboard = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [timeRange, setTimeRange] = useState('24h');

    const navItems = [
        { id: 'all', label: 'All', icon: <Activity size={18} /> },
        { id: 'comments', label: 'Comments', icon: <MessageCircle size={18} /> },
        { id: 'mentions', label: 'Mentions', icon: <Users size={18} /> },
        { id: 'reactions', label: 'Reactions', icon: <Heart size={18} /> },
        { id: 'reposts', label: 'Reposts', icon: <Repeat size={18} /> }
    ];



    const activityData = {
        reactions: [
            {
                id: 1,
                icon: Users,
                title: 'Praaharth K A and 867 others reacted to your company update',
                description: 'SCRIUM: What is Scrum? Scrum is an Agile framework designed to deliver adaptive solutions for complex problems.',
                time: '2 hours ago',
                meta: {
                    reactions: 868,
                    comments: 26
                },
                color: '#f97316'
            },
            {
                id: 2,
                icon: ThumbsUp,
                title: 'Thandi Magagula and 7 others reacted to your company update',
                description: 'How Business Analysts Drive the SDLC! Understanding the SDLC is one of the most important foundations for anyone in tech.',
                time: '4 hours ago',
                meta: {
                    reactions: 8,
                    comments: 3
                },
                color: '#8b5cf6'
            }
        ],
        visitors: [
            {
                id: 1,
                icon: BarChart2,
                title: 'DA INSIGHTS has 2 new visitors',
                description: 'Your company page received new visitors in the last 24 hours.',
                time: '1 hour ago',
                color: '#3b82f6'
            },
            {
                id: 2,
                icon: BarChart2,
                title: 'Page traffic increased by 15%',
                description: 'Your page is trending with increased engagement metrics.',
                time: '3 hours ago',
                color: '#10b981'
            }
        ],
        comments: [
            {
                id: 1,
                icon: UserCircle,
                title: 'Dorebaku commented on your company update',
                description: '"Great insights on Business Analysts and the SDLC! This is very helpful for our team."',
                time: '2 hours ago',
                meta: {
                    likes: 12,
                    replies: 3
                },
                color: '#f97316'
            }
        ],
        reposts: [
            {
                id: 1,
                icon: Repeat,
                title: 'Sarah Jenkins reposted your company update',
                description: 'Great initiative! Proud to be part of this team. #CompanyCulture #Growth',
                time: '5 hours ago',
                meta: {
                    likes: 45,
                    comments: 2
                },
                color: '#22c55e'
            }
        ]
    };

    const getFilteredActivities = () => {
        if (activeTab === 'all') {
            return [...activityData.reactions, ...activityData.visitors, ...activityData.comments, ...(activityData.reposts || [])];
        }
        if (activeTab === 'reactions') return activityData.reactions;
        if (activeTab === 'comments') return activityData.comments;
        if (activeTab === 'reposts') return activityData.reposts || [];
        return [];
    };

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
                        {navItems.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Title and Actions Rows removed as requested */}

                {/* Metrics */}


                {/* Time Range Selector */}


                {/* Activity Feed */}
                <div className="activity-feed">
                    <div className="feed-header">
                        <div className="feed-header-left">
                            <div className="feed-icon">
                                <Activity size={20} />
                            </div>
                            <div>
                                <h3 className="feed-title">Recent Activity</h3>
                                <p className="feed-subtitle">Live updates from your network</p>
                            </div>
                        </div>
                        <div className="feed-header-right">
                            <button className="date-btn">
                                <Calendar size={16} />
                                <span>Today</span>
                                <ChevronDown size={12} />
                            </button>
                        </div>
                    </div>

                    <div className="feed-container">
                        {getFilteredActivities().map((activity, idx) => (
                            <motion.div
                                key={activity.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="activity-card"
                            >
                                <div className="activity-icon" style={{ background: `${activity.color}15`, color: activity.color }}>
                                    <activity.icon size={20} />
                                </div>
                                <div className="activity-content">
                                    <div className="activity-header">
                                        <h4 className="activity-title">{activity.title}</h4>
                                        <span className="activity-time">
                                            <Clock size={12} />
                                            {activity.time}
                                        </span>
                                    </div>
                                    <p className="activity-description">{activity.description}</p>

                                    {activity.meta && (
                                        <div className="activity-meta">
                                            {activity.meta.reactions && (
                                                <div className="meta-item">
                                                    <Heart size={14} />
                                                    <span>{activity.meta.reactions} reactions</span>
                                                </div>
                                            )}
                                            {activity.meta.comments && (
                                                <div className="meta-item">
                                                    <MessageCircle size={14} />
                                                    <span>{activity.meta.comments} comments</span>
                                                </div>
                                            )}
                                            {activity.meta.likes && (
                                                <div className="meta-item">
                                                    <ThumbsUp size={14} />
                                                    <span>{activity.meta.likes} likes</span>
                                                </div>
                                            )}
                                            {activity.meta.replies && (
                                                <div className="meta-item">
                                                    <MessageCircle size={14} />
                                                    <span>{activity.meta.replies} replies</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}

                        {getFilteredActivities().length === 0 && (
                            <div className="empty-state">
                                <div className="empty-icon">
                                    <Activity size={32} />
                                </div>
                                <h3>No activities found</h3>
                                <p>Try selecting a different filter</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Engagement Summary */}

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

                /* Tabs Row */
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
                }

                /* Title Row */
                .title-row {
                    display: flex;
                    align-items: center;
                    margin-bottom: 1.5rem;
                    padding: 0 0.5rem;
                }
                .title-left {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                .title-icon {
                    width: 32px;
                    height: 32px;
                    background: linear-gradient(135deg, #f97316, #fbbf24);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                }
                .page-title {
                    font-size: 16px;
                    font-weight: 700;
                    color: #1e293b;
                    margin: 0;
                }
                .activity-count {
                    padding: 4px 8px;
                    background: #f1f5f9;
                    border-radius: 6px;
                    font-size: 11px;
                    font-weight: 700;
                    color: #64748b;
                }

                /* Actions Row */
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
                .date-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 10px;
                    font-size: 13px;
                    font-weight: 500;
                    color: #475569;
                    cursor: pointer;
                    transition: all 0.2s;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
                }
                .date-btn:hover {
                    border-color: #f97316;
                    color: #f97316;
                    background: #fff7ed;
                }
                .report-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 16px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 12px;
                    color: #475569;
                    cursor: pointer;
                }
                .primary-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 16px;
                    background: linear-gradient(135deg, #f97316, #fbbf24);
                    border: none;
                    border-radius: 8px;
                    color: white;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
                    transition: transform 0.2s;
                }
                .primary-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 6px 16px rgba(249, 115, 22, 0.4);
                }

                /* Activity Feed */
                .activity-feed {
                    background: white;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
                    border: 1px solid #f1f5f9;
                    margin-bottom: 1.5rem;
                }
                .feed-header {
                    padding: 1.5rem;
                    border-bottom: 1px solid #f1f5f9;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: linear-gradient(to right, #fff, #fff7ed);
                }
                .feed-header-left {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                .feed-icon {
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #fff7ed, #ffedd5);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #ea580c;
                    box-shadow: 0 2px 4px rgba(249, 115, 22, 0.05);
                }
                .feed-title {
                    font-size: 18px;
                    font-weight: 700;
                    color: #0f172a;
                    margin: 0;
                }
                .feed-subtitle {
                    font-size: 13px;
                    color: #64748b;
                    margin: 4px 0 0 0;
                }
                .feed-container {
                    padding: 0;
                    max-height: 650px;
                    overflow-y: auto;
                }
                .activity-card {
                    display: flex;
                    gap: 1.25rem;
                    padding: 1.5rem;
                    border-bottom: 1px solid #f8fafc;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    border-left: 3px solid transparent;
                }
                .activity-card:hover {
                    background: #fff7ed;
                    border-left-color: #f97316;
                    transform: translateX(2px);
                }
                .activity-card:last-child {
                    border-bottom: none;
                }
                .activity-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    transition: transform 0.3s ease;
                }
                .activity-card:hover .activity-icon {
                    transform: scale(1.05);
                }
                .activity-content {
                    flex: 1;
                }
                .activity-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 0.5rem;
                }
                .activity-title {
                    font-size: 15px;
                    font-weight: 600;
                    color: #1e293b;
                    margin: 0;
                    flex: 1;
                    line-height: 1.4;
                }
                .activity-time {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 11px;
                    font-weight: 500;
                    color: #94a3b8;
                    background: #f8fafc;
                    padding: 4px 8px;
                    border-radius: 12px;
                }
                .activity-description {
                    font-size: 14px;
                    color: #475569;
                    line-height: 1.6;
                    margin-bottom: 1rem;
                }
                .activity-meta {
                    display: flex;
                    gap: 1.25rem;
                    padding-top: 0.75rem;
                    border-top: 1px dashed #e2e8f0;
                }
                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 12px;
                    font-weight: 500;
                    color: #64748b;
                    transition: color 0.2s;
                }
                .meta-item:hover {
                    color: #ea580c;
                }

                /* Empty State */
                .empty-state {
                    text-align: center;
                    padding: 80px 20px;
                }
                .empty-icon {
                    width: 72px;
                    height: 72px;
                    background: #fff7ed;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 24px;
                    color: #f97316;
                    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.1);
                }
                .empty-state h3 {
                    font-size: 18px;
                    font-weight: 700;
                    color: #0f172a;
                    margin: 0 0 8px;
                }
                .empty-state p {
                    font-size: 14px;
                    color: #64748b;
                    margin: 0;
                }

                /* Scrollbar */
                .feed-container::-webkit-scrollbar {
                    width: 6px;
                }
                .feed-container::-webkit-scrollbar-track {
                    background: transparent;
                }
                .feed-container::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 3px;
                }
                .feed-container::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }

                /* Dark Mode */
                .dark .analytics-container { background: #0f172a; }
                .dark .tabs-row, .dark .feed-header { background: #1e293b; border-color: #334155; }
                .dark .tabs { background: #0f172a; }
                .dark .tab.active { background: #1e293b; color: #fb923c; }
                .dark .activity-feed { background: #1e293b; border-color: #334155; }
                .dark .activity-card { border-bottom-color: #334155; }
                .dark .activity-card:hover { background: #1e293b; border-left-color: #f97316; }
                .dark .feed-title, .dark .activity-title { color: #f1f5f9; }
                .dark .activity-description { color: #cbd5e1; }
                .dark .date-btn { background: #1e293b; border-color: #334155; color: #cbd5e1; }
                .dark .date-btn:hover { border-color: #fb923c; color: #fb923c; }
                .dark .meta-item { color: #94a3b8; }
                .dark .activity-time { background: #334155; color: #cbd5e1; }
            `}</style>
        </div>
    );
};

export default ActivityDashboard;