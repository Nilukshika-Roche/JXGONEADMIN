import React from 'react';
import { motion } from 'framer-motion';
import {
    Building2,
    Globe,
    Users,
    Shield,
    Calendar,
    ArrowLeft,
    ExternalLink,
    Edit2,
    Download,
    ChevronRight,
    TrendingUp,
    Zap
} from 'lucide-react';
import './CompanyProfile.css';

const CompanyProfile = ({ company, onBack, onManage }) => {
    if (!company) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="cp-wrapper"
        >
            {/* Header / Breadcrumb */}
            <div className="cp-breadcrumb">
                <button onClick={onBack} className="back-btn">
                    <ArrowLeft size={16} />
                    <span>Back to Directory</span>
                </button>
                <div className="breadcrumb-divider">/</div>
                <span className="breadcrumb-current">{company.name}</span>
            </div>

            {/* Profile Hero Section */}
            <div className="cp-hero">
                <div className="cp-hero-content">
                    <div className="cp-logo-container">
                        <div className="cp-logo-placeholder">{company.logo}</div>
                    </div>
                    <div className="cp-info-main">
                        <div className="cp-status-row">
                            <span className={`cp-status-badge ${company.status?.toLowerCase()}`}>
                                {company.status}
                            </span>
                            <span className="cp-id-tag">{company.id}</span>
                        </div>
                        <h1 className="cp-name">{company.name}</h1>
                        <div className="cp-meta-row">
                            <div className="cp-meta-item">
                                <Building2 size={14} />
                                <span>{company.industry}</span>
                            </div>
                            <div className="cp-meta-item">
                                <Globe size={14} />
                                <span>{company.region} Hub</span>
                            </div>
                            <div className="cp-meta-item">
                                <Calendar size={14} />
                                <span>Joined {company.date || 'Jan 2024'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="cp-hero-actions">
                    <button onClick={onManage} className="cp-btn-primary">
                        <Zap size={16} />
                        <span>Manage Admin Portal</span>
                    </button>
                    <button className="cp-btn-secondary">
                        <Edit2 size={16} />
                    </button>
                </div>
            </div>

            <div className="cp-grid">
                {/* Left Column - Details */}
                <div className="cp-col-left">
                    <div className="cp-card">
                        <div className="cp-card-header">
                            <h3 className="cp-card-title">Entity Overview</h3>
                            <button className="cp-card-action">View Full Audit</button>
                        </div>
                        <div className="cp-details-list">
                            <div className="cp-detail-item">
                                <span className="cp-detail-label">Full Entity Name</span>
                                <span className="cp-detail-value">{company.name} Private Ltd.</span>
                            </div>
                            <div className="cp-detail-item">
                                <span className="cp-detail-label">Primary Industry</span>
                                <span className="cp-detail-value">{company.industry}</span>
                            </div>
                            <div className="cp-detail-item">
                                <span className="cp-detail-label">Service Plan</span>
                                <span className={`cp-plan-badge ${(company.plan || 'Standard').toLowerCase()}`}>
                                    {company.plan || 'Standard'}
                                </span>
                            </div>
                            <div className="cp-detail-item">
                                <span className="cp-detail-label">Registered Region</span>
                                <span className="cp-detail-value">{company.region}, Sri Lanka</span>
                            </div>
                        </div>
                    </div>

                    <div className="cp-card">
                        <div className="cp-card-header">
                            <h3 className="cp-card-title">Quick Actions</h3>
                        </div>
                        <div className="cp-actions-grid">
                            <button className="cp-action-box">
                                <Download size={20} />
                                <span>Export Data</span>
                            </button>
                            <button className="cp-action-box">
                                <Shield size={20} />
                                <span>Security Logs</span>
                            </button>
                            <button className="cp-action-box">
                                <Users size={20} />
                                <span>Admin Access</span>
                            </button>
                            <button className="cp-action-box">
                                <ExternalLink size={20} />
                                <span>Public Page</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Stats & Insights */}
                <div className="cp-col-right">
                    <div className="cp-stats-card">
                        <div className="cp-stat-item">
                            <div className="cp-stat-icon-bg users">
                                <Users size={20} />
                            </div>
                            <div className="cp-stat-info">
                                <span className="cp-stat-label">Active Users</span>
                                <div className="cp-stat-value-row">
                                    <span className="cp-stat-value">{company.users || '0'}</span>
                                    <span className="cp-stat-trend positive">+12%</span>
                                </div>
                            </div>
                        </div>

                        <div className="cp-stat-item">
                            <div className="cp-stat-icon-bg growth">
                                <TrendingUp size={20} />
                            </div>
                            <div className="cp-stat-info">
                                <span className="cp-stat-label">Engagement Rate</span>
                                <div className="cp-stat-value-row">
                                    <span className="cp-stat-value">84.2%</span>
                                    <span className="cp-stat-trend positive">+5.4%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="cp-card">
                        <div className="cp-card-header">
                            <h3 className="cp-card-title">Recent Activity</h3>
                        </div>
                        <div className="cp-activity-timeline">
                            <div className="cp-timeline-item">
                                <div className="cp-timeline-dot"></div>
                                <div className="cp-timeline-content">
                                    <p className="cp-activity-text">Portal settings updated by <strong>System Admin</strong></p>
                                    <span className="cp-activity-time">2 hours ago</span>
                                </div>
                            </div>
                            <div className="cp-timeline-item">
                                <div className="cp-timeline-dot"></div>
                                <div className="cp-timeline-content">
                                    <p className="cp-activity-text">New administrator added: <strong>S. Perera</strong></p>
                                    <span className="cp-activity-time">Yesterday at 4:20 PM</span>
                                </div>
                            </div>
                            <div className="cp-timeline-item">
                                <div className="cp-timeline-dot"></div>
                                <div className="cp-timeline-content">
                                    <p className="cp-activity-text">Monthly usage report generated</p>
                                    <span className="cp-activity-time">3 days ago</span>
                                </div>
                            </div>
                        </div>
                        <button className="cp-view-all">
                            View All Activity <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CompanyProfile;
