import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Phone,
    TrendingUp,
    MoreVertical,
    Bookmark,
    Share2,
    Repeat2,
    Download,
    Eye,
    MessageSquare,
    Play,
    Hash,
    Clock,
    Heart,
    Users,
    Image as ImageIcon,
    ChevronDown,
    Video,
    BadgeCheck,
    Plus,
    Edit3,
    Globe,
    MapPin,
    FileText,
    Info,
    Calendar,
    Zap,
    Award,
    Building2
} from 'lucide-react';

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
                <button className="post-action-btn primary">
                    <Repeat2 size={18} />
                    <span>Repost</span>
                </button>
                <button className="post-action-btn">
                    <Share2 size={18} />
                    <span>Send</span>
                </button>
            </div>
        </motion.div>
    );
};

const PageView = ({ setActiveTab, companyData }) => {
    const [activeTab, setActiveTabLocal] = useState('posts');
    const [activeSubTab, setActiveSubTabLocal] = useState('overview');
    const [showCoverMenu, setShowCoverMenu] = useState(false);

    const recentPosts = [
        {
            id: 1,
            company: 'Janashakthi Group',
            followers: '24.8K',
            postedDate: '2 hours ago',
            description: 'We are thrilled to announce our the launch of the JXG-ONE internal excellence program. Empowering our teams to reach new heights of innovation and collaboration.',
            thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80',
            type: 'image',
            engagement: '+12.5%',
            performance: 'High',
            category: 'Innovation'
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
        }
    ];


    return (
        <div className="analytics-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="analytics-content"
            >
                {/* Cover Photo Section */}
                <div className="cover-section">
                    <div className="cover-photo">
                        <img
                            src={companyData.coverPhoto}
                            alt="Cover"
                            className="cover-image"
                        />
                        <div className="cover-overlay">
                            <div className="cover-actions">
                                <button
                                    className="cover-action-btn"
                                    onClick={() => setShowCoverMenu(!showCoverMenu)}
                                >
                                    <ImageIcon size={18} />
                                    <span>Edit Cover</span>
                                    <ChevronDown size={12} />
                                </button>
                                {showCoverMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="cover-menu"
                                    >
                                        <button className="menu-item">
                                            <ImageIcon size={14} />
                                            <span>Upload Photo</span>
                                        </button>
                                        <button className="menu-item">
                                            <Video size={14} />
                                            <span>Upload Video</span>
                                        </button>
                                        <button className="menu-item">
                                            <Download size={14} />
                                            <span>Download</span>
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Page Info Card */}
                    <div className="page-info-card">
                        <div className="page-info-content">
                            <div className="page-info-main">
                                <div className="page-avatar-section">
                                    <div className="page-avatar">
                                        <img
                                            src={companyData.logo}
                                            alt={companyData.name}
                                            className="avatar-image"
                                        />
                                    </div>
                                    <div className="page-actions">
                                        <button className="page-action-btn primary">
                                            <Plus size={16} />
                                            <span>Create a Story</span>
                                        </button>
                                        <button
                                            className="page-action-btn secondary"
                                            onClick={() => setActiveTab('edit')}
                                        >
                                            <Edit3 size={16} />
                                            <span>Edit Page</span>
                                        </button>
                                        <button className="page-action-btn icon">
                                            <MoreVertical size={20} />
                                        </button>
                                    </div>
                                </div>

                                <div className="page-details">
                                    <div className="page-header">
                                        <h1 className="page-title">{companyData.name}</h1>
                                    </div>

                                    <div className="page-meta">
                                        <div className="meta-item">
                                            <span>{companyData.tagline}</span>
                                        </div>
                                        <div className="meta-divider"></div>
                                        <div className="meta-item">
                                            <MapPin size={14} />
                                            <span>{companyData.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="page-tabs-wrapper">
                                <div className="tabs">
                                    {[
                                        { id: 'posts', label: 'Posts', icon: <FileText size={16} /> },
                                        { id: 'about', label: 'About', icon: <Info size={16} /> },
                                        { id: 'people', label: 'People', icon: <Users size={16} /> },
                                        { id: 'photos', label: 'Photos', icon: <ImageIcon size={16} /> },
                                        { id: 'reels', label: 'Reels', icon: <Video size={16} /> },
                                        { id: 'events', label: 'Events', icon: <Calendar size={16} /> },
                                        { id: 'csr', label: 'CSR', icon: <Heart size={16} /> }
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTabLocal(tab.id)}
                                            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                                        >
                                            {tab.icon}
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {activeTab === 'posts' && (
                    <div className="posts-container">
                        {/* Recent Posts */}
                        <div className="section-card">
                            <div className="posts-feed">
                                {recentPosts.map((post, index) => (
                                    <PostCard key={post.id} post={post} index={index} />
                                ))}

                                {recentPosts.length === 0 && (
                                    <div className="empty-state">
                                        <div className="empty-icon"><FileText size={32} /></div>
                                        <h3>No posts found</h3>
                                        <p>Try adjusting your search or filters</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'about' && (
                    <div className="about-section">
                        <div className="sub-nav-card shadow-sm">
                            <div className="sub-tabs">
                                {[
                                    { id: 'overview', label: 'Overview' },
                                    { id: 'products', label: 'Products and Services' },
                                    { id: 'awards', label: 'Awards & Recognitions' },
                                    { id: 'locations', label: 'Locations' }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveSubTabLocal(tab.id)}
                                        className={`sub-tab ${activeSubTab === tab.id ? 'active' : ''}`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {activeSubTab === 'overview' && (
                            <div className="overview-content">
                                <div className="info-card">
                                    <h3 className="info-title">Company Introduction</h3>
                                    <p className="introduction-text">
                                        {companyData.overview || companyData.description}
                                    </p>
                                </div>

                                <div className="info-card">
                                    <div className="details-header">
                                        <h3 className="info-title">Company Details</h3>
                                        <div className="header-actions">
                                            <button className="edit-details-btn" onClick={() => setActiveTab('edit')}>
                                                <Plus size={14} /> Add
                                            </button>
                                            <button className="edit-details-btn" onClick={() => setActiveTab('edit')}>
                                                <Edit3 size={14} /> Edit
                                            </button>
                                        </div>
                                    </div>

                                    <div className="details-grid">
                                        <div className="detail-item">
                                            <div className="detail-icon"><Globe size={20} /></div>
                                            <div className="detail-info">
                                                <span className="detail-label">Website</span>
                                                <a href="#" className="detail-value link">{companyData.website || 'Add website'}</a>
                                            </div>
                                        </div>
                                        <div className="detail-item">
                                            <div className="detail-icon"><Phone size={20} /></div>
                                            <div className="detail-info">
                                                <span className="detail-label">Phone</span>
                                                <span className="detail-value">{companyData.phone || 'Add phone'}</span>
                                            </div>
                                        </div>
                                        <div className="detail-item">
                                            <div className="detail-icon"><Building2 size={20} /></div>
                                            <div className="detail-info">
                                                <span className="detail-label">Industry</span>
                                                <span className="detail-value">{companyData.industry || 'Add industry'}</span>
                                            </div>
                                        </div>
                                        <div className="detail-item">
                                            <div className="detail-icon"><Users size={20} /></div>
                                            <div className="detail-info">
                                                <span className="detail-label">Company Size</span>
                                                <span className="detail-value">{companyData.companySize || 'Add size'}</span>
                                            </div>
                                        </div>
                                        <div className="detail-item">
                                            <div className="detail-icon"><MapPin size={20} /></div>
                                            <div className="detail-info">
                                                <span className="detail-label">Headquarters</span>
                                                <span className="detail-value">{companyData.headquarters || companyData.location || 'Add location'}</span>
                                            </div>
                                        </div>
                                        <div className="detail-item">
                                            <div className="detail-icon"><Calendar size={20} /></div>
                                            <div className="detail-info">
                                                <span className="detail-label">Founded</span>
                                                <span className="detail-value">{companyData.founded || 'Add year'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {
                            activeSubTab === 'products' && (
                                <div className="overview-content">
                                    <div className="info-card">
                                        <div className="details-header">
                                            <h3 className="info-title">Products & Services</h3>
                                            <div className="header-actions">
                                                <button className="edit-details-btn" onClick={() => setActiveTab('edit')}>
                                                    <Edit3 size={14} /> Edit
                                                </button>
                                            </div>
                                        </div>

                                        <div className="products-services-display" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                                            {/* Products Column */}
                                            <div className="display-column">
                                                <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Products</h4>
                                                <div className="display-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                    {Array.isArray(companyData.products) && companyData.products.length > 0 ? (
                                                        companyData.products.map((item, index) => (
                                                            <div key={item.id || index} className="display-item" style={{ fontSize: '15px', color: '#0f172a', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                                                                {item.name}
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '14px' }}>No products listed</div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Services Column */}
                                            <div className="display-column">
                                                <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Services</h4>
                                                <div className="display-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                    {Array.isArray(companyData.services) && companyData.services.length > 0 ? (
                                                        companyData.services.map((item, index) => (
                                                            <div key={item.id || index} className="display-item" style={{ fontSize: '15px', color: '#0f172a', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                                                                {item.name}
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '14px' }}>No services listed</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {
                            activeSubTab === 'awards' && (
                                <div className="overview-content">
                                    <div className="info-card">
                                        <div className="details-header">
                                            <h3 className="info-title">Awards & Recognitions</h3>
                                            <div className="header-actions">
                                                <button className="edit-details-btn" onClick={() => setActiveTab('edit')}>
                                                    <Plus size={14} /> Add
                                                </button>
                                                <button className="edit-details-btn" onClick={() => setActiveTab('edit')}>
                                                    <Edit3 size={14} /> Edit
                                                </button>
                                            </div>
                                        </div>
                                        <div className="awards-list">
                                            {Array.isArray(companyData.awards) && companyData.awards.length > 0 ? (
                                                companyData.awards.map(award => (
                                                    <div key={award.id} className="award-card-item">
                                                        <div className="award-icon-box"><Award size={20} /></div>
                                                        <div className="award-content-box">
                                                            <h4 className="award-title">{award.title}</h4>
                                                            <span className="award-date">{award.date}</span>
                                                            <p className="award-desc">{award.description}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="empty-text">No awards listed.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {
                            activeSubTab === 'locations' && (
                                <div className="overview-content">
                                    <div className="info-card">
                                        <div className="details-header">
                                            <h3 className="info-title">Locations</h3>
                                            <div className="header-actions">
                                                <button className="edit-details-btn" onClick={() => setActiveTab('edit')}>
                                                    <Plus size={14} /> Add
                                                </button>
                                                <button className="edit-details-btn" onClick={() => setActiveTab('edit')}>
                                                    <Edit3 size={14} /> Edit
                                                </button>
                                            </div>
                                        </div>
                                        <div className="map-view-container">
                                            <div className="map-placeholder-box">
                                                <div className="map-bg"></div>
                                                <div className="map-center">
                                                    <div className="map-pin-circle"><MapPin size={24} /></div>
                                                    <span>Map View Helper</span>
                                                </div>
                                            </div>
                                            <div className="address-details-card">
                                                <div className="address-row">
                                                    <MapPin size={18} className="text-gray" />
                                                    <div>
                                                        <h4>Headquarters</h4>
                                                        <p>{companyData.location}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div >
                )}

                {
                    activeTab !== 'posts' && activeTab !== 'about' && (
                        <div className="empty-section">
                            <div className="empty-icon">
                                {activeTab === 'people' ? <Users size={48} /> :
                                    activeTab === 'photos' ? <ImageIcon size={48} /> :
                                        activeTab === 'reels' ? <Video size={48} /> :
                                            activeTab === 'events' ? <Calendar size={48} /> :
                                                <Heart size={48} />}
                            </div>
                            <h3 className="empty-title">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Content Coming Soon</h3>
                            <p className="empty-subtitle">We are currently updating this section with exciting new content for our community.</p>
                        </div>
                    )
                }
            </motion.div >

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

                /* Cover Section */
                .cover-section {
                    margin-bottom: 2rem;
                    position: relative;
                }
                .cover-photo {
                    position: relative;
                    height: 320px;
                    border-radius: 20px;
                    overflow: hidden;
                }
                .cover-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .cover-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3));
                }
                .cover-actions {
                    position: absolute;
                    bottom: 20px;
                    right: 20px;
                }
                .cover-action-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 16px;
                    background: rgba(255,255,255,0.9);
                    backdrop-filter: blur(4px);
                    border: none;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 600;
                    color: #0f172a;
                    cursor: pointer;
                }
                .cover-menu {
                    position: absolute;
                    bottom: 100%;
                    right: 0;
                    margin-bottom: 8px;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
                    padding: 8px;
                    min-width: 160px;
                }
                .menu-item {
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
                .menu-item:hover {
                    background: #f1f5f9;
                }

                /* Page Info Card */
                .page-info-card {
                    position: relative;
                    margin-top: -80px;
                    padding: 0 2rem;
                }
                .page-info-content {
                    background: white;
                    border-radius: 16px;
                    padding: 0;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.08);
                    overflow: hidden;
                }
                .page-info-main {
                    padding: 2rem 2rem 1rem 2rem;
                }
                .page-tabs-wrapper {
                    padding: 0 2rem;
                    border-top: 1px solid #f1f5f9;
                }
                .tabs {
                    display: flex;
                    gap: 32px;
                    padding: 12px 0;
                    overflow-x: auto;
                    scrollbar-width: none;
                    position: relative;
                    z-index: 10;
                }
                .tabs::-webkit-scrollbar {
                    display: none;
                }
                .tab {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    border-radius: 100px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #64748b;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    white-space: nowrap;
                    transition: all 0.2s ease;
                }
                .tab:hover {
                    color: #ea580c;
                    background: rgba(255, 255, 255, 0.5);
                }
                .tab.active {
                    color: #c2410c;
                    background: white;
                    box-shadow: 0 2px 4px rgba(249, 115, 22, 0.1);
                }
                .page-avatar-section {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 1.5rem;
                }
                .page-avatar {
                    position: relative;
                }
                .avatar-image {
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    border: 6px solid white;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
                    object-fit: cover;
                }
                .avatar-initial {
                    width: 150px;
                    height: 150px;
                    background: linear-gradient(135deg, #f97316, #fbbf24);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    border: 6px solid white;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
                }
                
                .page-actions {
                    display: flex;
                    gap: 0.75rem;
                }
                .page-action-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 10px 16px;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    border: none;
                }
                .page-action-btn.primary {
                    background: linear-gradient(135deg, #f97316, #fbbf24);
                    color: white;
                }
                .page-action-btn.secondary {
                    background: #f1f5f9;
                    color: #475569;
                }
                .page-action-btn.icon {
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f1f5f9;
                    color: #475569;
                }

                .page-details {
                    max-width: 800px;
                }
                .page-header {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }
                .page-title {
                    font-size: 32px;
                    font-weight: 800;
                    color: #0f172a;
                    margin: 0;
                }
                
                .page-meta {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }
                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 13px;
                    color: #64748b;
                }
                .meta-divider {
                    width: 4px;
                    height: 4px;
                    background: #cbd5e1;
                    border-radius: 50%;
                }
                .page-description {
                    font-size: 14px;
                    line-height: 1.6;
                    color: #475569;
                    margin: 0;
                }



                /* Section Cards */
                .section-card {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
                }
                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }
                .section-header-left {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                .section-icon {
                    width: 36px;
                    height: 36px;
                    background: #fff7ed;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #f97316;
                }
                .section-title {
                    font-size: 18px;
                    font-weight: 700;
                    color: #0f172a;
                    margin: 0;
                }
                .section-subtitle {
                    font-size: 12px;
                    color: #64748b;
                    margin: 0;
                }
                .view-all-btn {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 12px;
                    font-weight: 600;
                    color: #f97316;
                    background: none;
                    border: none;
                    cursor: pointer;
                }

                /* Posts Feed */
                .posts-feed {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
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

                .dark .post-card {
                    background: #1e293b;
                    border-color: #334155;
                }
                .dark .post-author-name h4 {
                    color: white;
                }
                .dark .post-content p {
                    color: #94a3b8;
                }
                .dark .post-tag.primary {
                    background: #334155;
                    color: #fb923c;
                }
                .dark .post-tag.secondary {
                    background: #334155;
                    color: #94a3b8;
                }
                .dark .post-media-container {
                    background: #334155;
                }
                .dark .post-stats {
                    border-color: #334155;
                }
                .dark .post-action-btn {
                    background: #334155;
                    color: #94a3b8;
                }
                .dark .post-action-btn:hover {
                    background: #475569;
                }
                .dark .empty-state {
                    background: #1e293b;
                }
                .dark .empty-state h3 {
                    color: white;
                }
                .dark .empty-state p {
                    color: #94a3b8;
                }

                /* About Section */
                .about-section {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .sub-nav-card {
                    background: white;
                    padding: 0.5rem;
                    border-radius: 12px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }
                .sub-tabs {
                    display: flex;
                    gap: 0.5rem;
                    overflow-x: auto;
                    scrollbar-width: none;
                    position: relative;
                    z-index: 10;
                }
                .sub-tabs::-webkit-scrollbar {
                    display: none;
                }
                .sub-tab {
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #64748b;
                    background: none;
                    border: none;
                    cursor: pointer;
                    white-space: nowrap;
                    transition: all 0.2s ease;
                }
                .sub-tab:hover {
                    background: #f8fafc;
                    color: #0f172a;
                }
                .sub-tab.active {
                    background: #fff7ed;
                    color: #f97316;
                }

                /* Overview Content */
                .overview-content {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .info-card {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 16px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                }
                .info-title {
                    font-size: 18px;
                    font-weight: 700;
                    color: #0f172a;
                    margin: 0 0 1rem 0;
                }
                .introduction-text {
                    font-size: 15px;
                    line-height: 1.6;
                    color: #475569;
                    margin: 0;
                }

                .details-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }
                .edit-details-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    background: #f1f5f9;
                    color: #475569;
                    border: none;
                    border-radius: 8px;
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .edit-details-btn:hover {
                    background: #e2e8f0;
                    color: #0f172a;
                }

                .details-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 2rem;
                }
                .detail-item {
                    display: flex;
                    gap: 1rem;
                    align-items: flex-start;
                }
                .detail-icon {
                    width: 40px;
                    height: 40px;
                    background: #f8fafc;
                    color: #f97316;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .detail-info {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .detail-label {
                    font-size: 12px;
                    font-weight: 600;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .detail-value {
                    font-size: 15px;
                    font-weight: 600;
                    color: #334155;
                }
                .detail-value.link {
                    color: #f97316;
                    text-decoration: none;
                }
                .detail-value.link:hover {
                    text-decoration: underline;
                }

                /* Empty States */
                .empty-section {
                    background: white;
                    padding: 4rem 2rem;
                    border-radius: 16px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                }
                .empty-icon {
                    width: 80px;
                    height: 80px;
                    background: #f8fafc;
                    color: #cbd5e1;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                }
                .empty-title {
                    font-size: 20px;
                    font-weight: 700;
                    color: #0f172a;
                    margin-bottom: 0.5rem;
                }
                .empty-subtitle {
                    font-size: 15px;
                    color: #64748b;
                    max-width: 400px;
                }

                /* Helper styles */
                .text-gray { color: #64748b; }
                .badge-gray {
                    display: inline-block;
                    padding: 4px 8px;
                    background: #f1f5f9;
                    color: #475569;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 500;
                }

                /* Header Actions */
            .header-actions {
                display: flex;
                gap: 8px;
            }

            /* Edit Button */
                .edit-details-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    border: none;
                    background: none;
                    color: #f97316;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    padding: 4px 8px;
                    border-radius: 4px;
                }
                .edit-details-btn:hover {
                    background-color: #fff7ed;
                }

                /* Products Table */
                .products-table-container {
                    margin-top: 16px;
                    overflow-x: auto;
                }
                .products-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 14px;
                }
                .products-table th {
                    text-align: left;
                    padding: 12px 16px;
                    border-bottom: 1px solid #e2e8f0;
                    color: #64748b;
                    font-weight: 600;
                }
                .products-table td {
                    padding: 12px 16px;
                    border-bottom: 1px solid #f1f5f9;
                    color: #334155;
                }
                .products-table tr:last-child td {
                    border-bottom: none;
                }
                .product-name-cell {
                    font-weight: 500;
                }
                .empty-cell {
                    color: #94a3b8;
                    font-style: italic;
                    text-align: center;
                    padding: 24px;
                }

                /* Awards List */
                .awards-list {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    margin-top: 16px;
                }
                .award-card-item {
                    display: flex;
                    gap: 16px;
                    padding: 16px;
                    background: #f8fafc;
                    border-radius: 8px;
                    border: 1px solid #e2e8f0;
                }
                .award-icon-box {
                    width: 40px;
                    height: 40px;
                    background: #fffac1;
                    color: #b45309;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .award-content-box {
                    flex: 1;
                }
                .award-title {
                    margin: 0 0 4px 0;
                    font-size: 16px;
                    font-weight: 600;
                    color: #1e293b;
                }
                .award-date {
                    display: block;
                    font-size: 12px;
                    color: #64748b;
                    margin-bottom: 8px;
                }
                .award-desc {
                    margin: 0;
                    font-size: 14px;
                    color: #475569;
                    line-height: 1.5;
                }

                /* Map View */
                .map-view-container {
                    margin-top: 16px;
                }
                .map-placeholder-box {
                    position: relative;
                    width: 100%;
                    height: 200px;
                    background-color: #e2e8f0;
                    border-radius: 8px;
                    overflow: hidden;
                    margin-bottom: 16px;
                }
                .map-bg {
                    width: 100%;
                    height: 100%;
                    background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
                    background-size: 20px 20px;
                    opacity: 0.5;
                }
                .map-center {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    color: #475569;
                    font-weight: 500;
                }
                .map-pin-circle {
                    width: 48px;
                    height: 48px;
                    background: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    color: #ea580c;
                }
                .address-details-card {
                    padding: 16px;
                    background: #f8fafc;
                    border-radius: 8px;
                    border: 1px solid #e2e8f0;
                }
                .address-row {
                    display: flex;
                    gap: 12px;
                    align-items: flex-start;
                }
                .address-row h4 {
                    margin: 0 0 4px 0;
                    font-size: 15px;
                    color: #1e293b;
                }
                .address-row p {
                    margin: 0;
                    font-size: 14px;
                    color: #475569;
                }
            `}</style>
        </div >
    );
};

export default PageView;
