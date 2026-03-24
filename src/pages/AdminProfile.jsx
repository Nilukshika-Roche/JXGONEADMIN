import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AdminProfile.css';
import './CompanyManagement.css'; // modal styles
import {
    Shield,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Edit3,
    Lock,
    User,
    Clock,
    Activity,
    Settings,
    Download,
    TrendingUp,
    CheckCircle2,
    AlertTriangle,
    Zap,
    X,
    Heart,
    MessageCircle,
    ThumbsUp,
    BarChart2,
    UserCircle,
    Repeat,
    Eye
} from 'lucide-react';

const AdminProfile = ({ setActiveTab: onNavigate }) => {
    const [adminData, setAdminData] = useState({
        name: 'John Anderson',
        role: 'Senior Administrator',
        email: 'john.anderson@jxg.com',
        phone: '+94 77 123 4567',
        location: 'Colombo, Sri Lanka',
        joinDate: 'March 15, 2023',
        avatar: 'https://i.pravatar.cc/150?u=john',
        bio: 'Dedicated Senior Administrator with over 8 years of experience in managing high-scale enterprise systems. Passionate about streamlining internal operations and ensuring top-tier security protocols.',
        permissions: [
            { id: 1, name: 'Full Access', description: 'Complete control over system modules', icon: <Shield size={16} /> },
            { id: 2, name: 'User Management', description: 'Create, edit & delete accounts', icon: <User size={16} /> },
            { id: 3, name: 'Security Config', description: 'Modify system-wide protocols', icon: <Lock size={16} /> },
            { id: 4, name: 'Audit Access', description: 'View system-wide activity logs', icon: <Clock size={16} /> }
        ],
        recentActivity: [
            {
                id: 1,
                icon: Shield,
                title: 'Updated Security Policy',
                description: 'Modified system-wide authentication rules and updated password complexity requirements for all users.',
                time: '2 hours ago',
                color: '#ef4444',
                meta: { reactions: 3, comments: 1 }
            },
            {
                id: 2,
                icon: User,
                title: 'Approved 5 User Requests',
                description: 'Reviewed and approved pending account creation requests from the Marketing and Finance departments.',
                time: '5 hours ago',
                color: '#3b82f6',
                meta: { comments: 2 }
            },
            {
                id: 3,
                icon: Settings,
                title: 'Modified Marketplace Filters',
                description: 'Updated product category filters and adjusted visibility rules for premium listings on the marketplace.',
                time: 'Yesterday',
                color: '#f97316',
                meta: { reactions: 7 }
            },
            {
                id: 4,
                icon: Eye,
                title: 'Reviewed Audit Logs',
                description: 'Performed a comprehensive review of system-wide audit logs for the past 7 days. No anomalies detected.',
                time: 'Yesterday',
                color: '#8b5cf6',
                meta: {}
            },
            {
                id: 5,
                icon: Lock,
                title: 'Locked Inactive Accounts',
                description: 'Automatically suspended 12 accounts that have been inactive for over 90 days per security policy.',
                time: '2 days ago',
                color: '#ec4899',
                meta: { reactions: 4, comments: 3 }
            },
            {
                id: 6,
                icon: TrendingUp,
                title: 'Published Monthly Analytics Report',
                description: 'Compiled and distributed the Q1 performance report to all department heads and senior stakeholders.',
                time: '2 days ago',
                color: '#10b981',
                meta: { reactions: 12, comments: 5 }
            },
            {
                id: 7,
                icon: CheckCircle2,
                title: 'Resolved System Alert',
                description: 'Investigated and resolved a high-priority system alert related to database connection pool exhaustion.',
                time: '3 days ago',
                color: '#22c55e',
                meta: { comments: 2 }
            },
            {
                id: 8,
                icon: BarChart2,
                title: 'Configured Dashboard Widgets',
                description: 'Added new KPI widgets to the Super Admin dashboard and reconfigured the data refresh intervals.',
                time: '4 days ago',
                color: '#0ea5e9',
                meta: { reactions: 6 }
            }
        ]
    });

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editForm, setEditForm] = useState({ ...adminData });

    const handleSaveProfile = () => {
        setAdminData({ ...editForm });
        setIsEditModalOpen(false);
    };

    return (
        <div className="ap-page">

            {/* ── Breadcrumb & Title ── */}
            <div className="ap-breadcrumb">
                <span onClick={() => onNavigate?.('dashboard')}>Admin</span>
                {' '}&gt;{' '}Admin Profile
            </div>
            <h1 className="ap-page-title">Admin Profile</h1>

            {/* ── Hero Card ── */}
            <motion.div
                className="ap-hero"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="ap-hero-left">
                    {/* Avatar */}
                    <div className="ap-avatar-wrap">
                        <img src={adminData.avatar} alt={adminData.name} className="ap-avatar" />
                        <div className="ap-online-dot" />
                    </div>

                    {/* Info */}
                    <div className="ap-hero-info">
                        <h2 className="ap-name">{adminData.name}</h2>
                        <div className="ap-role-row">
                            <span className="ap-role-tag">{adminData.role}</span>
                            <span className="ap-join-date">
                                <Calendar size={12} />
                                Joined {adminData.joinDate}
                            </span>
                        </div>
                        <div className="ap-hero-meta">
                            <span className="ap-meta-chip"><Mail size={13} /> {adminData.email}</span>
                            <span className="ap-meta-chip"><Phone size={13} /> {adminData.phone}</span>
                            <span className="ap-meta-chip"><MapPin size={13} /> {adminData.location}</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="ap-hero-actions">
                    <button
                        className="ap-btn-primary"
                        onClick={() => { setEditForm({ ...adminData }); setIsEditModalOpen(true); }}
                    >
                        <Edit3 size={15} /> Edit Profile
                    </button>
                    <button className="ap-btn-ghost">
                        <Mail size={15} /> Contact Support
                    </button>
                </div>
            </motion.div>

            {/* ── Two-column body ── */}
            <div className="ap-body">

                {/* ── LEFT: Admin Overview ── */}
                <motion.div
                    className="ap-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="ap-card-header">
                        <h3 className="ap-card-title">
                            <User size={14} /> Admin Overview
                        </h3>
                        <button
                            className="ap-card-action-btn"
                            onClick={() => { setEditForm({ ...adminData }); setIsEditModalOpen(true); }}
                        >
                            <Edit3 size={14} />
                        </button>
                    </div>
                    <div className="ap-card-body">
                        <p className="ap-bio-text">"{adminData.bio}"</p>
                        <div className="ap-details-list">
                            <div className="ap-detail-row">
                                <div className="ap-detail-icon orange"><Mail size={17} /></div>
                                <div>
                                    <div className="ap-detail-label">Email Address</div>
                                    <div className="ap-detail-value">{adminData.email}</div>
                                </div>
                            </div>
                            <div className="ap-detail-row">
                                <div className="ap-detail-icon blue"><Phone size={17} /></div>
                                <div>
                                    <div className="ap-detail-label">Direct Line</div>
                                    <div className="ap-detail-value">{adminData.phone}</div>
                                </div>
                            </div>
                            <div className="ap-detail-row">
                                <div className="ap-detail-icon green"><MapPin size={17} /></div>
                                <div>
                                    <div className="ap-detail-label">Work Location</div>
                                    <div className="ap-detail-value">{adminData.location}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── RIGHT: Admin Privileges ── */}
                <motion.div
                    className="ap-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                >
                    <div className="ap-card-header">
                        <h3 className="ap-card-title">
                            <Shield size={14} /> Admin Privileges
                        </h3>
                        <button className="ap-card-action-btn">
                            <Settings size={14} />
                        </button>
                    </div>
                    <div className="ap-card-body">
                        <div className="ap-perm-list">
                            {adminData.permissions.map((perm) => (
                                <div key={perm.id} className="ap-perm-item">
                                    <div className="ap-perm-icon">{perm.icon}</div>
                                    <div className="ap-perm-info">
                                        <h4>{perm.name}</h4>
                                        <p>{perm.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* ── Full-width Recent Activity ── */}
            <motion.div
                className="ap-card ap-activity-feed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="ap-card-header">
                    <h3 className="ap-card-title">
                        <Activity size={14} /> Recent Activity
                    </h3>
                    <button className="ap-card-action-btn" style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 700, color: '#f97316', letterSpacing: '0.06em', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer' }}>
                        <Download size={12} /> Export
                    </button>
                </div>
                <div className="ap-feed-subtitle-row">
                    <p className="ap-act-table-subtitle">Recent admin actions and system events</p>
                </div>
                <div className="ap-feed-container">
                    {adminData.recentActivity.map((act, idx) => (
                        <motion.div
                            key={act.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.07 }}
                            className="ap-feed-card"
                        >
                            <div className="ap-feed-icon" style={{ background: `${act.color}15`, color: act.color }}>
                                <act.icon size={20} />
                            </div>
                            <div className="ap-feed-content">
                                <div className="ap-feed-header">
                                    <h4 className="ap-feed-title">{act.title}</h4>
                                    <span className="ap-feed-time">
                                        <Clock size={12} />
                                        {act.time}
                                    </span>
                                </div>
                                <p className="ap-feed-description">{act.description}</p>
                                {act.meta && (act.meta.reactions || act.meta.comments) && (
                                    <div className="ap-feed-meta">
                                        {act.meta.reactions && (
                                            <div className="ap-feed-meta-item">
                                                <Heart size={13} />
                                                <span>{act.meta.reactions} reactions</span>
                                            </div>
                                        )}
                                        {act.meta.comments && (
                                            <div className="ap-feed-meta-item">
                                                <MessageCircle size={13} />
                                                <span>{act.meta.comments} comments</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
                <button className="ap-view-all-btn">View Full Logs</button>
            </motion.div>

            {/* ── Edit Profile Modal ── */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', duration: 0.3 }}
                            className="modal-container"
                            style={{ maxWidth: '650px' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <div className="modal-header-left">
                                    <div className="modal-icon"><User size={20} /></div>
                                    <div>
                                        <h2 className="modal-title">Edit Profile</h2>
                                        <p className="modal-subtitle">Update your personal information and bio</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsEditModalOpen(false)} className="modal-close-btn">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="modal-form">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">Full Name</label>
                                        <input
                                            type="text"
                                            value={editForm.name}
                                            onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Professional Role</label>
                                        <input
                                            type="text"
                                            value={editForm.role}
                                            onChange={e => setEditForm({ ...editForm, role: e.target.value })}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                        <label className="form-label">Short Biography</label>
                                        <textarea
                                            value={editForm.bio}
                                            onChange={e => setEditForm({ ...editForm, bio: e.target.value })}
                                            rows={4}
                                            className="form-input"
                                            style={{ minHeight: '110px', resize: 'none' }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Work Email</label>
                                        <input
                                            type="email"
                                            value={editForm.email}
                                            onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Contact Number</label>
                                        <input
                                            type="text"
                                            value={editForm.phone}
                                            onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                        <label className="form-label">Office Location</label>
                                        <input
                                            type="text"
                                            value={editForm.location}
                                            onChange={e => setEditForm({ ...editForm, location: e.target.value })}
                                            className="form-input"
                                        />
                                    </div>
                                </div>

                                <div className="modal-actions">
                                    <button onClick={() => setIsEditModalOpen(false)} className="cancel-btn">Cancel</button>
                                    <button onClick={handleSaveProfile} className="submit-btn">Save Changes</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminProfile;
