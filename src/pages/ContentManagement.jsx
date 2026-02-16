
import React, { useState } from 'react';
import {
    Search,
    Filter,
    MoreHorizontal,
    MessageSquare,
    Heart,
    Share2,
    Image,
    Smile,
    Calendar,
    MapPin,
    Hash,
    X,
    Trash2,
    BarChart2,
    Clock,
    User,
    ChevronDown,
    Send
} from 'lucide-react';

const ContentManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [showComposer, setShowComposer] = useState(false);
    const [newPost, setNewPost] = useState('');

    const stats = [
        { label: 'Total Posts', value: '1,248', change: '+12%', icon: MessageSquare },
        { label: 'Engagement', value: '84.5k', change: '+5%', icon: Heart },
        { label: 'Avg. Reach', value: '12.2k', change: '+8%', icon: BarChart2 },
        { label: 'Active Users', value: '856', change: '+3%', icon: User },
    ];

    const initialPosts = [
        {
            id: 1,
            author: {
                name: "Sarah Chen",
                role: "Product Design Lead",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            },
            content: "Just wrapped up our quarterly design sync! 🎨 Exploring some exciting new directions for the upcoming mobile app refresh. The team's creativity never ceases to amaze me. Can't wait to share more updates soon! #DesignSystem #UX #TeamWork",
            timestamp: "2 hours ago",
            stats: { likes: 124, comments: 18, shares: 5 },
            tags: ["Design", "Team Updates"],
            media: [
                "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=500&fit=crop",
                "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=500&fit=crop"
            ]
        },
        {
            id: 2,
            author: {
                name: "Marcus Rodriguez",
                role: "Engineering Manager",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
            },
            content: "Huge shoutout to the backend team for optimizing our API response times by 40%! 🚀 The performance gains are already visible in production. Great work everyone on the migration project.",
            timestamp: "4 hours ago",
            stats: { likes: 89, comments: 12, shares: 3 },
            tags: ["Engineering", "Milestone"],
            media: []
        },
        {
            id: 3,
            author: {
                name: "Emily Watson",
                role: "HR Director",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
            },
            content: "Welcoming 5 new members to the JXG family today! 👋 Orientation session was a blast. Excited to see you all grow with us. Don't forget to grab your welcome kits from the HR desk!",
            timestamp: "5 hours ago",
            stats: { likes: 256, comments: 45, shares: 12 },
            tags: ["Culture", "Onboarding"],
            media: [
                "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=500&fit=crop"
            ]
        }
    ];

    const [posts, setPosts] = useState(initialPosts);

    // Filter posts based on search query
    const filteredPosts = posts.filter(post =>
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="media-hub-page dark">
            {/* Stats Overview */}
            <div className="stats-grid">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="stat-card">
                            <div className="stat-icon-wrapper">
                                <Icon size={20} className="stat-icon" />
                            </div>
                            <div className="stat-content">
                                <span className="stat-label">{stat.label}</span>
                                <div className="stat-value-row">
                                    <span className="stat-value">{stat.value}</span>
                                    <span className="stat-change">{stat.change}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="layout-grid">
                {/* Main Feed Column */}
                <div className="feed-column">
                    <div className="section-header">
                        <div className="header-left">
                            <h2 className="section-title">Feed</h2>
                            <p className="section-subtitle">Latest updates from your organization</p>
                        </div>
                        <div className="feed-search-bar">
                            <Search size={18} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search updates..."
                                className="feed-search-input"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="posts-feed">
                        {filteredPosts.length === 0 ? (
                            <div className="empty-state">
                                <Search size={48} className="empty-icon" style={{ opacity: 0.2 }} />
                                <h3>No posts found</h3>
                                <p>Try searching for different keywords</p>
                            </div>
                        ) : (
                            filteredPosts.map(post => (
                                <div key={post.id} className="post-card">
                                    <div className="post-header">
                                        <div className="post-author-info">
                                            <img src={post.author.avatar} alt={post.author.name} className="post-avatar" />
                                            <div>
                                                <div className="post-author-name">
                                                    <h4>{post.author.name}</h4>
                                                    <span className="author-role">{post.author.role}</span>
                                                </div>
                                                <div className="post-meta">
                                                    <Clock size={12} />
                                                    <span>{post.timestamp}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="post-options-btn">
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </div>

                                    <div className="post-content">
                                        <p>{post.content}</p>
                                        <div className="post-tags">
                                            {post.tags.map((tag, i) => (
                                                <span key={i} className="post-tag secondary">#{tag}</span>
                                            ))}
                                        </div>
                                    </div>

                                    {post.media.length > 0 && (
                                        <div className={`post-media-container grid-${Math.min(post.media.length, 3)}`}>
                                            {post.media.map((url, i) => (
                                                <div key={i} className="media-item">
                                                    <img src={url} alt="Post attachment" loading="lazy" />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="post-footer">
                                        <div className="post-stats">
                                            <div className="stat-group">
                                                <div className="reaction-icons">
                                                    <span className="reaction-icon">❤️</span>
                                                    <span className="reaction-icon">👍</span>
                                                </div>
                                                <span>{post.stats.likes}</span>
                                            </div>
                                            <div className="stat-group-right">
                                                <span>{post.stats.comments} comments</span>
                                                <span>•</span>
                                                <span>{post.stats.shares} shares</span>
                                            </div>
                                        </div>

                                        <div className="post-actions">
                                            <button className="post-action-btn">
                                                <Heart size={18} />
                                                <span>Like</span>
                                            </button>
                                            <button className="post-action-btn">
                                                <MessageSquare size={18} />
                                                <span>Comment</span>
                                            </button>
                                            <button className="post-action-btn">
                                                <Share2 size={18} />
                                                <span>Share</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                        <button className="load-more-btn">Load More Posts</button>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="sidebar-column">
                    <div className="sidebar-card">
                        <div className="sidebar-header">
                            <h3>Trending Topics</h3>
                            <button className="view-all-btn">View All</button>
                        </div>
                        <div className="trending-list">
                            {[
                                { tag: "Innovation", count: "1.2k posts" },
                                { tag: "TeamBuilding", count: "856 posts" },
                                { tag: "ProjectLaunch", count: "654 posts" },
                                { tag: "OfficeLife", count: "432 posts" },
                                { tag: "Wellness", count: "231 posts" }
                            ].map((topic, i) => (
                                <div key={i} className="trending-item">
                                    <div className="trending-info">
                                        <span className="trending-tag">#{topic.tag}</span>
                                        <span className="trending-count">{topic.count}</span>
                                    </div>
                                    <TrendingUpIcon size={16} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="sidebar-card">
                        <div className="sidebar-header">
                            <h3>Active Members</h3>
                            <span className="active-dot"></span>
                        </div>
                        <div className="members-grid">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <div key={i} className="member-avatar-wrapper" title="Online">
                                    <img
                                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                        alt="Member"
                                        className="member-avatar"
                                    />
                                    <span className="online-indicator"></span>
                                </div>
                            ))}
                        </div>
                        <button className="invite-btn">Invite Colleagues</button>
                    </div>
                </div>
            </div>

            {/* Inline Styles */}
            <style>{`
                .media-hub-page {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 1rem 2rem 1rem;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    background-color: #f8fafc;
                    min-height: 100vh;
                }
                .media-hub-page.dark {
                    background-color: #0f172a;
                    color: #fff;
                }

                /* Stats Grid */
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }
                .stat-card {
                    background: white;
                    border-radius: 16px;
                    padding: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .dark .stat-card {
                    background: #1e293b;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
                }
                .stat-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
                }
                .stat-icon-wrapper {
                    padding: 12px;
                    border-radius: 12px;
                    background: #fff7ed;
                    color: #f97316;
                }
                .dark .stat-icon-wrapper {
                    background: rgba(249, 115, 22, 0.1);
                }
                .stat-content {
                    flex: 1;
                }
                .stat-label {
                    display: block;
                    font-size: 0.875rem;
                    color: #64748b;
                    font-weight: 500;
                    margin-bottom: 4px;
                }
                .dark .stat-label {
                    color: #94a3b8;
                }
                .stat-value-row {
                    display: flex;
                    align-items: baseline;
                    gap: 8px;
                }
                .stat-value {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #1e293b;
                }
                .dark .stat-value {
                    color: white;
                }
                .stat-change {
                    font-size: 0.75rem;
                    color: #10b981;
                    font-weight: 600;
                    background: #ecfdf5;
                    padding: 2px 6px;
                    border-radius: 100px;
                }
                .dark .stat-change {
                    background: rgba(16, 185, 129, 0.1);
                }

                /* Layout Grid */
                .layout-grid {
                    display: grid;
                    grid-template-columns: 1fr 340px;
                    gap: 2rem;
                    align-items: start;
                }
                @media (max-width: 1024px) {
                    .layout-grid {
                        grid-template-columns: 1fr;
                    }
                }

                /* Composer Card */
                .composer-card {
                    background: white;
                    border-radius: 16px;
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }
                .dark .composer-card {
                    background: #1e293b;
                }
                .composer-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 1rem;
                }
                .composer-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    object-fit: cover;
                }
                .composer-textarea {
                    width: 100%;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    padding: 1rem;
                    font-family: inherit;
                    resize: vertical;
                    min-height: 80px;
                    outline: none;
                    transition: border-color 0.2s;
                }
                .composer-textarea:focus {
                    border-color: #f97316;
                }
                .composer-actions {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 1rem;
                    padding-top: 1rem;
                    border-top: 1px solid #f1f5f9;
                }
                .dark .composer-actions {
                    border-color: #334155;
                }
                .media-buttons {
                    display: flex;
                    gap: 8px;
                }
                .media-button {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 12px;
                    border-radius: 8px;
                    border: none;
                    background: transparent;
                    color: #64748b;
                    font-size: 0.875rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .media-button:hover {
                    background: #f1f5f9;
                    color: #f97316;
                }
                .dark .media-button:hover {
                    background: #334155;
                }
                .post-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: #f97316;
                    color: white;
                    border: none;
                    padding: 8px 20px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .post-btn:hover {
                    background: #ea580c;
                }
                .post-btn:disabled {
                    background: #cbd5e1;
                    cursor: not-allowed;
                }

                /* Section Header */
                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 1.5rem;
                }
                .section-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin: 0;
                    color: #1e293b;
                }
                .dark .section-title {
                    color: white;
                }
                .section-subtitle {
                    color: #64748b;
                    margin: 4px 0 0 0;
                    font-size: 0.9rem;
                }
                .dark .section-subtitle {
                    color: #94a3b8;
                }
                .feed-search-bar {
                    position: relative;
                    width: 300px;
                }
                .search-icon {
                    position: absolute;
                    left: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #94a3b8;
                }
                .feed-search-input {
                    width: 100%;
                    padding: 10px 16px 10px 40px;
                    border-radius: 100px;
                    border: 1px solid #e2e8f0;
                    background: white;
                    font-size: 0.9rem;
                    outline: none;
                    transition: all 0.2s;
                }
                .dark .feed-search-input {
                    background: #1e293b;
                    border-color: #334155;
                    color: white;
                }
                .feed-search-input:focus {
                    border-color: #f97316;
                    box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
                }

                /* Post Card */
                .post-card {
                    background: white;
                    border-radius: 16px;
                    padding: 0;
                    margin-bottom: 2rem;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                    border: 1px solid #f1f5f9;
                    overflow: hidden;
                    transition: transform 0.2s;
                }
                .dark .post-card {
                    background: #1e293b;
                    border-color: #334155;
                }
                .post-header {
                    padding: 1.5rem 1.5rem 0 1.5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1rem;
                }
                .post-author-info {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .post-avatar {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .post-author-name h4 {
                    margin: 0;
                    font-size: 1rem;
                    font-weight: 700;
                    color: #1e293b;
                    line-height: 1.2;
                }
                .dark .post-author-name h4 {
                    color: #f1f5f9;
                }
                .author-role {
                    font-size: 0.8rem;
                    color: #64748b;
                }
                .post-meta {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    margin-top: 4px;
                    font-size: 0.75rem;
                    color: #94a3b8;
                }
                .post-options-btn {
                    background: none;
                    border: none;
                    color: #94a3b8;
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 50%;
                    transition: background 0.2s;
                }
                .post-options-btn:hover {
                    background: #f1f5f9;
                    color: #1e293b;
                }

                .post-content {
                    padding: 0 1.5rem 1rem 1.5rem;
                }
                .post-content p {
                    font-size: 0.95rem;
                    line-height: 1.6;
                    color: #334155;
                    margin: 0 0 1rem 0;
                }
                .dark .post-content p {
                    color: #cbd5e1;
                }
                .post-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                .post-tag {
                    font-size: 0.8rem;
                    font-weight: 600;
                    padding: 4px 10px;
                    border-radius: 100px;
                }
                .post-tag.secondary {
                    background: #f1f5f9;
                    color: #64748b;
                }
                .dark .post-tag.secondary {
                    background: #334155;
                    color: #94a3b8;
                }

                .post-media-container {
                    background: #000;
                    margin-bottom: 1rem;
                    display: grid;
                    gap: 2px;
                }
                .media-item {
                    position: relative;
                    padding-bottom: 60%;
                    overflow: hidden;
                }
                .media-item img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .grid-1 { grid-template-columns: 1fr; }
                .grid-2 { grid-template-columns: 1fr 1fr; }
                .grid-3 { grid-template-columns: 1fr 1fr; .media-item:first-child { grid-row: span 2; } }

                .post-footer {
                    padding: 0 1.5rem 1rem 1.5rem;
                }
                .post-stats {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 12px;
                    border-bottom: 1px solid #f1f5f9;
                    margin-bottom: 8px;
                    font-size: 0.85rem;
                    color: #64748b;
                }
                .dark .post-stats {
                    border-color: #334155;
                    color: #94a3b8;
                }
                .stat-group {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .reaction-icons {
                    display: flex;
                    align-items: center;
                }
                .reaction-icon {
                    margin-right: -4px;
                    border: 2px solid white;
                    border-radius: 50%;
                    background: white;
                    font-size: 14px;
                }
                .stat-group-right {
                    display: flex;
                    gap: 12px;
                }

                .post-actions {
                    display: flex;
                    justify-content: space-between;
                    padding-top: 4px;
                }
                .post-action-btn {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    padding: 8px;
                    background: transparent;
                    border: none;
                    border-radius: 8px;
                    color: #64748b;
                    font-weight: 600;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .post-action-btn:hover {
                    background: #f1f5f9;
                    color: #1e293b;
                }
                .dark .post-action-btn {
                    color: #94a3b8;
                }
                .dark .post-action-btn:hover {
                    background: #334155;
                    color: #f1f5f9;
                }

                .empty-state {
                    text-align: center;
                    padding: 4rem 2rem;
                    background: white;
                    border-radius: 16px;
                    border: 1px solid #f1f5f9;
                }
                .dark .empty-state {
                    background: #1e293b;
                    border-color: #334155;
                }
                .empty-icon {
                    margin-bottom: 1rem;
                    color: #94a3b8;
                }
                .empty-state h3 {
                    margin: 0 0 8px 0;
                    color: #1e293b;
                }
                .dark .empty-state h3 {
                    color: #f1f5f9;
                }
                .empty-state p {
                    margin: 0;
                    color: #64748b;
                }

                .load-more-btn {
                    display: block;
                    width: 100%;
                    padding: 12px;
                    text-align: center;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    color: #64748b;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .load-more-btn:hover {
                    background: #f8fafc;
                    border-color: #cbd5e1;
                    color: #1e293b;
                }
                .dark .load-more-btn {
                    background: #1e293b;
                    border-color: #334155;
                    color: #94a3b8;
                }
                .dark .load-more-btn:hover {
                    background: #334155;
                    color: white;
                }


                /* Sidebar */
                .sidebar-card {
                    background: white;
                    border-radius: 16px;
                    padding: 1.5rem;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                    margin-bottom: 2rem;
                    border: 1px solid #f1f5f9;
                }
                .dark .sidebar-card {
                    background: #1e293b;
                    border-color: #334155;
                }
                .sidebar-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.25rem;
                }
                .sidebar-header h3 {
                    margin: 0;
                    font-size: 1rem;
                    font-weight: 700;
                    color: #1e293b;
                }
                .dark .sidebar-header h3 {
                    color: #f1f5f9;
                }
                .view-all-btn {
                    font-size: 0.8rem;
                    color: #f97316;
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-weight: 600;
                }

                .trending-list {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .trending-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #64748b;
                    cursor: pointer;
                    transition: transform 0.2s;
                }
                .trending-item:hover {
                    transform: translateX(4px);
                }
                .trending-info {
                    display: flex;
                    flex-direction: column;
                }
                .trending-tag {
                    color: #1e293b;
                    font-weight: 600;
                    font-size: 0.9rem;
                    margin-bottom: 2px;
                }
                .dark .trending-tag {
                    color: #f1f5f9;
                }
                .trending-count {
                    font-size: 0.75rem;
                    color: #94a3b8;
                }

                .members-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 12px;
                    margin-bottom: 1.5rem;
                }
                .member-avatar-wrapper {
                    position: relative;
                    cursor: pointer;
                }
                .member-avatar {
                    width: 100%;
                    aspect-ratio: 1;
                    border-radius: 12px;
                    object-fit: cover;
                    border: 2px solid transparent;
                    transition: border-color 0.2s;
                }
                .member-avatar-wrapper:hover .member-avatar {
                    border-color: #f97316;
                }
                .online-indicator {
                    position: absolute;
                    bottom: -2px;
                    right: -2px;
                    width: 10px;
                    height: 10px;
                    background: #22c55e;
                    border: 2px solid white;
                    border-radius: 50%;
                }
                .invite-btn {
                    width: 100%;
                    padding: 10px;
                    background: #fff7ed;
                    color: #f97316;
                    border: 1px dashed #fdba74;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .invite-btn:hover {
                    background: #ffedd5;
                    border-color: #f97316;
                }
                .dark .invite-btn {
                    background: rgba(249, 115, 22, 0.1);
                    border-color: rgba(249, 115, 22, 0.3);
                }
                .dark .invite-btn:hover {
                    background: rgba(249, 115, 22, 0.2);
                }

                /* Active Dot for Sidebar Title */
                .active-dot {
                    width: 8px;
                    height: 8px;
                    background: #22c55e;
                    border-radius: 50%;
                }

                /* Dummy Icon component if needed */
                function TrendingUpIcon({ size, className }) {
                    return (
                        <svg 
                            width={size} 
                            height={size} 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            className={className}
                        >
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                            <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                    );
                }
            `}</style>
        </div>
    );
};

export default ContentManagement;
