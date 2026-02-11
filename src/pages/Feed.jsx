import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    Calendar,
    MoreVertical,
    Heart,
    MessageSquare,
    Repeat2,
    Share2,
    Users,
    TrendingUp,
    Zap,
    Filter,
    ChevronDown,
    Image as ImageIcon,
    Video,
    FileText,
    Play,
    Send,
    Eye,
    Globe,
    Download,
    Paperclip,
    Tag,
    Clock,
    Target,
    Bookmark,
    ChevronRight,
    Award,
    Hash
} from 'lucide-react';

// --- Following Modal Component ---
const FollowingModal = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('members'); // 'members' or 'pages'

    const members = [
        { id: 1, name: 'Sarah Miller', role: 'Content Manager', subsidiary: 'Janashakthi Life', joinedDate: 'Jan 12, 2023', avatar: 'S' },
        { id: 2, name: 'David Chen', role: 'System Admin', subsidiary: 'Janashakthi Finance', joinedDate: 'Mar 05, 2022', avatar: 'D' },
        { id: 3, name: 'Emma Watson', role: 'HR Specialist', subsidiary: 'Janashakthi Group', joinedDate: 'Nov 18, 2023', avatar: 'E' },
        { id: 4, name: 'Michael Ross', role: 'Lead Developer', subsidiary: 'Janashakthi Life', joinedDate: 'Jun 30, 2021', avatar: 'M' },
    ];

    const pages = [
        { id: 1, name: 'Janashakthi Life', category: 'Insurance', followers: '32K', avatar: 'JL' },
        { id: 2, name: 'Janashakthi Finance', category: 'Finance', followers: '12K', avatar: 'JF' },
    ];
    const totalCount = members.length + pages.length;

    const handleExport = () => {
        alert(`Exporting data for ${totalCount} connections...`);
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="following-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <div className="modal-title-section">
                        <Users className="modal-icon" size={24} />
                        <div>
                            <div className="modal-title-group">
                                <h3>All Followings</h3>
                                <div className="total-badge">{totalCount} total</div>
                            </div>
                            <p>Manage your network and interests</p>
                        </div>
                    </div>
                    <div className="modal-header-actions">
                        <button className="btn-export" onClick={handleExport}>
                            <Download size={16} />
                            <span>Export report</span>
                        </button>
                        <button className="modal-close" onClick={onClose}>
                            <Plus style={{ transform: 'rotate(45deg)' }} size={20} />
                        </button>
                    </div>
                </div>

                <div className="modal-tabs">
                    <button
                        className={`modal-tab ${activeTab === 'members' ? 'active' : ''}`}
                        onClick={() => setActiveTab('members')}
                    >
                        Members <span className="tab-count">{members.length}</span>
                    </button>
                    <button
                        className={`modal-tab ${activeTab === 'pages' ? 'active' : ''}`}
                        onClick={() => setActiveTab('pages')}
                    >
                        Pages <span className="tab-count">{pages.length}</span>
                    </button>
                </div>

                <div className="modal-body">
                    {activeTab === 'members' ? (
                        <div className="members-list">
                            {members.map(member => (
                                <div key={member.id} className="member-item">
                                    <div className="member-info-left">
                                        <div className="member-avatar">
                                            <span>{member.avatar}</span>
                                        </div>
                                        <div className="member-details">
                                            <h4>{member.name}</h4>
                                            <p className="member-role">{member.role}</p>
                                        </div>
                                    </div>
                                    <div className="member-info-right">
                                        <div className="member-meta">
                                            <span className="member-subsidiary">{member.subsidiary}</span>
                                            <span className="member-joined">Joined {member.joinedDate}</span>
                                        </div>
                                        <button className="btn-following">Following</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="pages-list">
                            {pages.map(page => (
                                <div key={page.id} className="member-item">
                                    <div className="member-info-left">
                                        <div className="member-avatar page-avatar">
                                            <span>{page.avatar}</span>
                                        </div>
                                        <div className="member-details">
                                            <h4>{page.name}</h4>
                                            <p className="member-role">{page.category}</p>
                                        </div>
                                    </div>
                                    <div className="member-info-right">
                                        <div className="member-meta">
                                            <span className="member-subsidiary">{page.followers} followers</span>
                                        </div>
                                        <button className="btn-following">Following</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

// --- Post Card Component ---
const PostCard = ({ post, index }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="post-card"
        >
            <div className="post-card-bg"></div>

            <div className="post-header">
                <div className="post-author">
                    <div className="post-avatar">
                        <div className="post-avatar-initial">{post.company.charAt(0)}</div>
                        {post.performance === 'High' && (
                            <div className="post-verified">
                                <TrendingUp size={10} />
                            </div>
                        )}
                    </div>
                    <div className="post-author-info">
                        <div className="post-author-name">
                            <h4>{post.company}</h4>
                            {post.performance === 'High' && (
                                <span className="post-trending-badge">
                                    <TrendingUp size={10} />
                                    Trending
                                </span>
                            )}
                        </div>
                        <div className="post-meta">
                            <span className="post-followers">
                                <Users size={12} />
                                {post.followers} followers
                            </span>
                            <span className="post-date">
                                <Clock size={12} />
                                {post.postedDate}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="post-actions-header">
                    <button
                        className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
                        onClick={() => setIsBookmarked(!isBookmarked)}
                    >
                        <Bookmark size={18} />
                    </button>
                    <div className="post-options">
                        <button
                            className="options-btn"
                            onClick={() => setShowOptions(!showOptions)}
                        >
                            <MoreVertical size={20} />
                        </button>
                        <AnimatePresence>
                            {showOptions && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="options-dropdown"
                                >
                                    <button className="option-item">
                                        <Share2 size={14} />
                                        <span>Share</span>
                                    </button>
                                    <button className="option-item">
                                        <Repeat2 size={14} />
                                        <span>Repost</span>
                                    </button>
                                    <button className="option-item">
                                        <Download size={14} />
                                        <span>Save</span>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <div className="post-content">
                <p>{post.description}</p>
                <div className="post-tags">
                    <span className="post-tag primary">
                        <Hash size={12} />
                        {post.category}
                    </span>
                    <span className="post-tag secondary">
                        {post.type}
                    </span>
                </div>
            </div>

            <div className="post-media">
                <div className="post-media-container">
                    <img
                        src={post.thumbnail}
                        alt="Post content"
                        className="post-media-image"
                    />
                    {post.type === 'video' && (
                        <div className="post-media-overlay">
                            <button className="play-button">
                                <Play size={24} />
                            </button>
                        </div>
                    )}
                    <div className="post-media-badge">
                        <TrendingUp size={14} />
                        <span>{post.engagement}</span>
                    </div>
                </div>
            </div>

            <div className="post-stats">
                <div className="post-stat">
                    <Eye size={16} />
                    <span>2.4K views</span>
                </div>
                <div className="post-stat">
                    <MessageSquare size={16} />
                    <span>142 comments</span>
                </div>
                <div className="post-stat">
                    <Share2 size={16} />
                    <span>84 shares</span>
                </div>
            </div>

            <div className="post-actions">
                <button
                    className={`post-action-btn ${isLiked ? 'liked' : ''}`}
                    onClick={() => setIsLiked(!isLiked)}
                >
                    <Heart size={18} />
                    <span>Like</span>
                    <span className="action-count">245</span>
                </button>
                <button className="post-action-btn">
                    <MessageSquare size={18} />
                    <span>Comment</span>
                </button>
                <button className="post-action-btn">
                    <Repeat2 size={18} />
                    <span>Repost</span>
                </button>
                <button className="post-action-btn primary">
                    <Share2 size={16} />
                    <span>Share</span>
                </button>
            </div>
        </motion.div>
    );
};



// --- Main Page Component ---
const MediaHubPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);

    const posts = useMemo(() => [
        {
            id: 1,
            company: 'Janashakthi Group',
            followers: '45.8K',
            postedDate: '2 hours ago',
            description: 'Redefining excellence in digital insurance. Our latest mobile-first approach is setting new industry standards. Proud of our tech innovators who are revolutionizing the landscape!',
            thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
            type: 'image',
            engagement: '+12.5%',
            performance: 'High',
            category: 'Corporate'
        },
        {
            id: 2,
            company: 'Janashakthi Life',
            followers: '32.1K',
            postedDate: '5 hours ago',
            description: 'Community at the heart of everything we do. Our annual outreach program has touched over 5,000 lives this quarter. Witness the journey of care.',
            thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
            type: 'video',
            engagement: '+8.2%',
            performance: 'Medium',
            category: 'CSR'
        },
        {
            id: 3,
            company: 'Janashakthi Finance',
            followers: '12.5K',
            postedDate: '1 day ago',
            description: 'Strategic growth and financial resilience. Unveiling our performance metrics for Q4 2024. A robust path forward for our shareholders.',
            thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
            type: 'image',
            engagement: '+15.3%',
            performance: 'High',
            category: 'Finance'
        }
    ], []);

    const filteredPosts = useMemo(() => posts.filter(post =>
        post.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase())
    ), [posts, searchQuery]);



    return (
        <div className="analytics-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="analytics-content"
            >


                <div className="mediahub-layout">
                    <div className="mediahub-main">



                        {/* Followings Button Section */}
                        <div className="followings-trigger-section">
                            <button
                                className="followings-btn-large"
                                onClick={() => setIsFollowingModalOpen(true)}
                            >
                                <div className="btn-content">
                                    <div className="btn-icon-group">
                                        <Users size={24} />
                                        <div className="btn-badge">
                                            <TrendingUp size={12} />
                                        </div>
                                    </div>
                                    <div className="btn-text">
                                        <span className="btn-label">Network Insights</span>
                                        <span className="btn-title">Followings</span>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="arrow-icon" />
                            </button>
                        </div>


                        {/* Posts Feed */}
                        <div className="posts-feed">
                            {filteredPosts.map((post, index) => (
                                <PostCard key={post.id} post={post} index={index} />
                            ))}

                            {filteredPosts.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="empty-state"
                                >
                                    <div className="empty-icon">
                                        <Search size={32} />
                                    </div>
                                    <h3>No posts found</h3>
                                    <p>Try adjusting your search terms</p>
                                </motion.div>
                            )}
                        </div>

                        {/* Load More */}
                        {filteredPosts.length > 0 && (
                            <div className="load-more">
                                <button className="load-more-btn">
                                    <span>Load more posts</span>
                                    <ChevronDown size={16} />
                                </button>
                            </div>
                        )}

                        {/* Following Modal */}
                        <AnimatePresence>
                            {isFollowingModalOpen && (
                                <FollowingModal onClose={() => setIsFollowingModalOpen(false)} />
                            )}
                        </AnimatePresence>
                    </div>


                </div>
            </motion.div>

            <style jsx>{`
                /* Container */
                .analytics-container {
                    min-height: 100vh;
                    background: #f8fafc;
                }
                .analytics-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 1rem;
                }



                /* Layout */
                .mediahub-layout {
                    max-width: 1200px;
                    margin: 0 auto;
                }



                /* Composer Card */
                .composer-card {
                    background: white;
                    border-radius: 16px;
                    padding: 2rem;
                    margin-bottom: 2rem;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                }


                .composer-header {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }
                .composer-badge {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .composer-badge-line {
                    width: 16px;
                    height: 2px;
                    background: linear-gradient(90deg, #f97316, #fbbf24);
                    border-radius: 2px;
                }
                .composer-badge-text {
                    color: #f97316;
                    font-size: 10px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .composer-title {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #0f172a;
                    font-size: 16px;
                    font-weight: 700;
                }
                .composer-body {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .composer-input-section {
                    display: flex;
                    gap: 1rem;
                }
                .composer-avatar {
                    flex-shrink: 0;
                }
                .avatar-initial {
                    width: 48px;
                    height: 48px;
                    background: linear-gradient(135deg, #f97316, #fbbf24);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 700;
                    font-size: 18px;
                }
                .composer-input-wrapper {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .composer-textarea {
                    width: 100%;
                    min-height: 100px;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 16px;
                    font-size: 16px;
                    color: #0f172a;
                    resize: vertical;
                    outline: none;
                }
                .composer-textarea:focus {
                    border-color: #f97316;
                }
                .composer-input-actions {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .composer-visibility {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 12px;
                    background: #f1f5f9;
                    border-radius: 6px;
                    font-size: 12px;
                    color: #64748b;
                }
                .composer-char-count {
                    font-size: 12px;
                    color: #94a3b8;
                }
                .composer-actions {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .composer-media-buttons {
                    display: flex;
                    gap: 0.5rem;
                }
                .media-button {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 12px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 12px;
                    color: #64748b;
                    cursor: pointer;
                }
                .media-button:hover {
                    border-color: #f97316;
                    color: #f97316;
                }
                .composer-submit {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 10px 24px;
                    background: linear-gradient(135deg, #f97316, #fbbf24);
                    border: none;
                    border-radius: 8px;
                    color: white;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                }

                /* Feed Header */
                .feed-header {
                    background: white;
                    border-radius: 12px;
                    padding: 2rem;
                    margin-bottom: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                @media (min-width: 768px) {
                    .feed-header {
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                    }
                }
                .feed-header-left {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                .feed-icon {
                    width: 36px;
                    height: 36px;
                    background: #fff7ed;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #f97316;
                }
                .feed-title {
                    font-size: 18px;
                    font-weight: 700;
                    color: #0f172a;
                    margin: 0;
                }
                .feed-subtitle {
                    font-size: 12px;
                    color: #64748b;
                    margin: 0;
                }
                 .feed-header-right {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                .feed-search-bar {
                    display: flex;
                    align-items: center;
                    background: #f1f5f9;
                    border-radius: 8px;
                    padding: 8px 12px;
                    gap: 8px;
                    width: 300px;
                    transition: all 0.2s;
                }
                .feed-search-bar:focus-within {
                    background: white;
                    box-shadow: 0 0 0 2px rgba(249,115,22,0.1);
                    width: 400px;
                }
                .feed-search-icon {
                    color: #94a3b8;
                }
                .feed-search-input {
                    border: none;
                    background: none;
                    outline: none;
                    font-size: 13px;
                    color: #0f172a;
                    width: 100%;
                }
                .date-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 12px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 12px;
                    color: #475569;
                    cursor: pointer;
                }
                .filter-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 12px;
                    background: #f1f5f9;
                    border: none;
                    border-radius: 8px;
                    font-size: 12px;
                    color: #475569;
                    cursor: pointer;
                }

                /* Post Card */
                .post-card {
                    background: white;
                    border-radius: 16px;
                    padding: 2rem;
                    margin-bottom: 1.5rem;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
                }
                .post-card-bg {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 100px;
                    height: 100px;
                    background: linear-gradient(135deg, rgba(249,115,22,0.05), rgba(251,191,36,0.05));
                    border-radius: 0 16px 0 100px;
                }
                .post-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1.25rem;
                }
                .post-author {
                    display: flex;
                    gap: 1rem;
                }
                .post-avatar {
                    position: relative;
                }
                .post-avatar-initial {
                    width: 48px;
                    height: 48px;
                    background: linear-gradient(135deg, #f97316, #fbbf24);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 700;
                    font-size: 18px;
                }
                .post-verified {
                    position: absolute;
                    bottom: -4px;
                    right: -4px;
                    width: 20px;
                    height: 20px;
                    background: #10b981;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    border: 2px solid white;
                }
                .post-author-info {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .post-author-name {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .post-author-name h4 {
                    font-size: 18px;
                    font-weight: 700;
                    color: #0f172a;
                    margin: 0;
                }
                .post-trending-badge {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    padding: 4px 8px;
                    background: #d1fae5;
                    border-radius: 12px;
                    font-size: 10px;
                    font-weight: 700;
                    color: #065f46;
                }
                .post-meta {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .post-followers, .post-date {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 11px;
                    color: #64748b;
                }
                .post-actions-header {
                    display: flex;
                    gap: 8px;
                }
                .bookmark-btn {
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f1f5f9;
                    border: none;
                    border-radius: 8px;
                    color: #94a3b8;
                    cursor: pointer;
                }
                .bookmark-btn.active {
                    background: #fef3c7;
                    color: #f97316;
                }
                .post-options {
                    position: relative;
                }
                .options-btn {
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f1f5f9;
                    border: none;
                    border-radius: 8px;
                    color: #94a3b8;
                    cursor: pointer;
                }
                .options-dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    margin-top: 8px;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                    border: 1px solid #e2e8f0;
                    padding: 8px;
                    z-index: 10;
                    min-width: 140px;
                }
                .option-item {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 12px;
                    background: none;
                    border: none;
                    border-radius: 6px;
                    font-size: 12px;
                    color: #475569;
                    cursor: pointer;
                }
                .option-item:hover {
                    background: #f1f5f9;
                }

                .post-content {
                    margin-bottom: 1.5rem;
                }
                .post-content p {
                    font-size: 16px;
                    line-height: 1.6;
                    color: #475569;
                    margin-bottom: 1rem;
                }
                .post-tags {
                    display: flex;
                    gap: 8px;
                }
                .post-tag {
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                .post-tag.primary {
                    background: #fff7ed;
                    color: #f97316;
                }
                .post-tag.secondary {
                    background: #f1f5f9;
                    color: #64748b;
                }

                .post-media {
                    margin-bottom: 1.5rem;
                }
                .post-media-container {
                    position: relative;
                    border-radius: 12px;
                    overflow: hidden;
                    background: #f1f5f9;
                }
                .post-media-image {
                    width: 100%;
                    height: 500px;
                    object-fit: cover;
                }
                .post-media-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(0,0,0,0.1);
                }
                .play-button {
                    width: 60px;
                    height: 60px;
                    background: rgba(249,115,22,0.9);
                    border: none;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    cursor: pointer;
                }
                .post-media-badge {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 12px;
                    background: rgba(255,255,255,0.9);
                    backdrop-filter: blur(4px);
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 700;
                    color: #f97316;
                }

                .post-stats {
                    display: flex;
                    gap: 24px;
                    padding: 16px 0;
                    border-top: 1px solid #f1f5f9;
                    border-bottom: 1px solid #f1f5f9;
                    margin-bottom: 16px;
                }
                .post-stat {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 12px;
                    color: #64748b;
                }

                .post-actions {
                    display: flex;
                    gap: 8px;
                }
                .post-action-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 10px 16px;
                    background: #f1f5f9;
                    border: none;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 600;
                    color: #64748b;
                    cursor: pointer;
                    flex: 1;
                    justify-content: center;
                }
                .post-action-btn:hover {
                    background: #e2e8f0;
                }
                .post-action-btn.liked {
                    background: #fef2f2;
                    color: #dc2626;
                }
                .post-action-btn.primary {
                    background: linear-gradient(135deg, #f97316, #fbbf24);
                    color: white;
                }
                .action-count {
                    margin-left: auto;
                    font-size: 10px;
                }

                /* Empty State */
                .empty-state {
                    text-align: center;
                    padding: 60px 20px;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
                }
                .empty-icon {
                    width: 64px;
                    height: 64px;
                    background: #f1f5f9;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    color: #94a3b8;
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

                /* Load More */
                .load-more {
                    text-align: center;
                    padding: 20px;
                }
                .load-more-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 24px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #475569;
                    cursor: pointer;
                }



                /* Followings Trigger */
                .followings-trigger-section {
                    margin-bottom: 2rem;
                }
                .followings-btn-large {
                    width: 100%;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 16px;
                    padding: 1.5rem 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                }
                .followings-btn-large:hover {
                    border-color: #f97316;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 30px rgba(249,115,22,0.1);
                }
                .btn-content {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }
                .btn-icon-group {
                    position: relative;
                    width: 56px;
                    height: 56px;
                    background: #fff7ed;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #f97316;
                }
                .btn-badge {
                    position: absolute;
                    top: -6px;
                    right: -6px;
                    width: 24px;
                    height: 24px;
                    background: #10b981;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    border: 2px solid white;
                    box-shadow: 0 2px 8px rgba(16,185,129,0.3);
                }
                .btn-text {
                    text-align: left;
                    display: flex;
                    flex-direction: column;
                }
                .btn-label {
                    font-size: 11px;
                    font-weight: 700;
                    color: #f97316;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 4px;
                }
                .btn-title {
                    font-size: 20px;
                    font-weight: 800;
                    color: #0f172a;
                }
                .arrow-icon {
                    color: #94a3b8;
                    transition: transform 0.3s ease;
                }
                .followings-btn-large:hover .arrow-icon {
                    transform: translateX(4px);
                    color: #f97316;
                }

                /* Following Modal */
                .following-modal {
                    background: white;
                    width: 90%;
                    max-width: 650px;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
                    z-index: 1001;
                    display: flex;
                    flex-direction: column;
                    max-height: 80vh;
                }
                .modal-header {
                    padding: 2rem;
                    background: #fff;
                    border-bottom: 1px solid #f1f5f9;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .modal-title-section {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                .modal-icon {
                    padding: 12px;
                    background: #fff7ed;
                    border-radius: 12px;
                    color: #f97316;
                }
                .modal-title-section h3 {
                    font-size: 20px;
                    font-weight: 800;
                    color: #0f172a;
                    margin: 0;
                }
                .modal-title-group {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .total-badge {
                    padding: 2px 10px;
                    background: #f1f5f9;
                    border-radius: 100px;
                    font-size: 11px;
                    font-weight: 700;
                    color: #475569;
                    border: 1px solid #e2e8f0;
                }
                .modal-title-section p {
                    font-size: 13px;
                    color: #64748b;
                    margin: 2px 0 0 0;
                }
                .modal-header-actions {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .btn-export {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    background: #f97316;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s;
                    box-shadow: 0 4px 12px rgba(249,115,22,0.2);
                }
                .btn-export:hover {
                    background: #ea580c;
                    transform: translateY(-1px);
                    box-shadow: 0 6px 15px rgba(249,115,22,0.3);
                }
                .modal-close {
                    background: #f1f5f9;
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #64748b;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .modal-close:hover {
                    background: #fee2e2;
                    color: #ef4444;
                }
                .modal-tabs {
                    display: flex;
                    padding: 0 2rem;
                    background: #fff;
                    border-bottom: 1px solid #f1f5f9;
                }
                .modal-tab {
                    padding: 1.25rem 1.5rem;
                    background: none;
                    border: none;
                    font-size: 14px;
                    font-weight: 700;
                    color: #64748b;
                    cursor: pointer;
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .modal-tab.active {
                    color: #f97316;
                }
                .modal-tab.active::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: #f97316;
                    border-radius: 3px 3px 0 0;
                }
                .tab-count {
                    font-size: 11px;
                    padding: 2px 8px;
                    background: #f1f5f9;
                    border-radius: 10px;
                    color: #475569;
                }
                .modal-tab.active .tab-count {
                    background: #fff7ed;
                    color: #f97316;
                }
                .modal-body {
                    padding: 1.5rem;
                    overflow-y: auto;
                    background: #f8fafc;
                    flex: 1;
                }
                .members-list, .pages-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .member-item {
                    background: white;
                    padding: 1.25rem;
                    border-radius: 12px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border: 1px solid #e2e8f0;
                    transition: all 0.2s;
                }
                .member-item:hover {
                    transform: scale(1.01);
                    border-color: #fbbf24;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.03);
                }
                .member-info-left {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                .member-avatar {
                    width: 48px;
                    height: 48px;
                    background: linear-gradient(135deg, #f97316, #fbbf24);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 700;
                    font-size: 18px;
                }
                .page-avatar {
                    background: linear-gradient(135deg, #0a66c2, #004182);
                }
                .member-details h4 {
                    font-size: 15px;
                    font-weight: 700;
                    color: #0f172a;
                    margin: 0;
                }
                .member-role {
                    font-size: 12px;
                    color: #64748b;
                    margin: 2px 0 0 0;
                }
                .member-info-right {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }
                .member-meta {
                    text-align: right;
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }
                .member-subsidiary {
                    font-size: 12px;
                    font-weight: 600;
                    color: #0f172a;
                }
                .member-joined {
                    font-size: 10px;
                    color: #94a3b8;
                }
                .btn-following {
                    padding: 8px 16px;
                    background: #f1f5f9;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 700;
                    color: #475569;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .btn-following:hover {
                    background: #fee2e2;
                    color: #ef4444;
                    border-color: #fecaca;
                }



                .dark .btn-export {
                    box-shadow: 0 4px 12px rgba(249,115,22,0.1);
                }

                .modal-backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(15, 23, 42, 0.4);
                    backdrop-filter: blur(8px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 1rem;
                }
            `}</style>
        </div>
    );
};

export default MediaHubPage;