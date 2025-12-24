import React from 'react';
import {
    Users,
    Eye,
    MousePointer2,
    TrendingUp,
    ArrowUpRight,
    Clock,
    ChevronRight,
    MoreVertical,
    Search,
    CheckCircle2,
    AlertCircle,
    UserPlus,
    Filter,
    Download
} from 'lucide-react';

const styles = {
    content: {
        padding: '0px'
    },
    btnPrimary: {
        background: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
        color: 'white',
        fontWeight: 600,
        padding: '10px 20px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px'
    },
    btnSecondary: {
        background: 'white',
        color: '#64748b',
        fontWeight: 600,
        padding: '10px 20px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px'
    },
    card: {
        background: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '24px',
        marginBottom: '32px'
    },
    statCard: {
        background: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px'
    },
    trendBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        color: '#059669',
        fontSize: '12px',
        fontWeight: 700,
        backgroundColor: '#d1fae5',
        padding: '4px 12px',
        borderRadius: '20px'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse'
    },
    tableHeader: {
        backgroundColor: '#f8fafc',
        textAlign: 'left'
    },
    tableCell: {
        padding: '16px',
        borderBottom: '1px solid #f1f5f9'
    },
    roleBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 500,
        backgroundColor: '#dbeafe',
        color: '#1d4ed8'
    },
    statusBadge: (status) => ({
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 500,
        backgroundColor: status === 'Active' ? '#d1fae5' : '#fef3c7',
        color: status === 'Active' ? '#065f46' : '#92400e'
    })
};

const Dashboard = () => {
    const stats = [
        { label: 'Total Users', value: '45.2K', icon: <Users size={24} />, trend: '+12.4%', color: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)' },
        { label: 'Active Sessions', value: '1,284', icon: <Clock size={24} />, trend: '+8.1%', color: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' },
        { label: 'Page Views', value: '185.4K', icon: <Eye size={24} />, trend: '+15.2%', color: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)' },
        { label: 'Conversion Rate', value: '5.8%', icon: <MousePointer2 size={24} />, trend: '+1.2%', color: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)' },
    ];

    const recentMembers = [
        { name: 'Amelia Watson', email: 'amelia@company.com', role: 'Admin', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=amelia' },
        { name: 'Michael Chen', email: 'm.chen@company.com', role: 'Editor', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=michael' },
        { name: 'David Kim', email: 'david.k@company.com', role: 'Editor', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=david' },
        { name: 'Emma Wilson', email: 'emma@company.com', role: 'Viewer', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=emma' },
    ];

    return (
        <React.Fragment>
            {/* Header / Page Title Info */}
            <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <span style={{
                                color: '#ea580c',
                                fontWeight: 900,
                                fontSize: '12px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.3em'
                            }}>
                                Dashboard
                            </span>
                            <ChevronRight size={16} color="#94a3b8" />
                            <span style={{
                                color: '#94a3b8',
                                fontWeight: 700,
                                fontSize: '12px',
                                textTransform: 'uppercase'
                            }}>
                                Overview
                            </span>
                        </div>
                        <h1 style={{
                            fontSize: '36px',
                            fontWeight: 900,
                            color: '#1e293b',
                            marginBottom: '8px'
                        }}>
                            Welcome back, <span style={{ color: '#f97316' }}>John</span>
                        </h1>
                        <p style={{
                            color: '#64748b',
                            fontWeight: 500,
                            fontSize: '16px'
                        }}>
                            Here's what's happening with your platform today.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button style={styles.btnSecondary}>
                            <Filter size={16} />
                            Filter
                        </button>
                        <button style={styles.btnPrimary}>
                            <TrendingUp size={16} />
                            Generate Report
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div style={styles.statsGrid}>
                {stats.map((stat, index) => (
                    <div key={index} style={styles.statCard}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <div style={{
                                padding: '12px',
                                borderRadius: '12px',
                                background: stat.color
                            }}>
                                {stat.icon}
                            </div>
                            <div style={styles.trendBadge}>
                                <ArrowUpRight size={14} />
                                {stat.trend}
                            </div>
                        </div>
                        <div>
                            <p style={{
                                color: '#64748b',
                                fontSize: '12px',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                marginBottom: '4px'
                            }}>
                                {stat.label}
                            </p>
                            <h3 style={{
                                fontSize: '30px',
                                fontWeight: 700,
                                color: '#1e293b'
                            }}>
                                {stat.value}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* User Management Table */}
            <div style={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                        <h2 style={{
                            fontSize: '20px',
                            fontWeight: 700,
                            color: '#1e293b',
                            marginBottom: '4px'
                        }}>
                            User Management
                        </h2>
                        <p style={{
                            color: '#64748b',
                            fontSize: '14px'
                        }}>
                            Manage all user accounts and permissions
                        </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} style={{
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#94a3b8'
                            }} />
                            <input
                                type="text"
                                placeholder="Search users..."
                                style={{
                                    padding: '8px 12px 8px 36px',
                                    backgroundColor: 'white',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    minWidth: '200px'
                                }}
                            />
                        </div>
                        <button style={{ ...styles.btnPrimary, fontSize: '14px', padding: '8px 16px' }}>
                            <UserPlus size={18} />
                            Add User
                        </button>
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={styles.table}>
                        <thead style={styles.tableHeader}>
                            <tr>
                                <th style={{ ...styles.tableCell, fontSize: '14px', fontWeight: 600, color: '#475569' }}>User</th>
                                <th style={{ ...styles.tableCell, fontSize: '14px', fontWeight: 600, color: '#475569' }}>Role</th>
                                <th style={{ ...styles.tableCell, fontSize: '14px', fontWeight: 600, color: '#475569' }}>Status</th>
                                <th style={{ ...styles.tableCell, fontSize: '14px', fontWeight: 600, color: '#475569', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentMembers.map((person, index) => (
                                <tr key={index}>
                                    <td style={styles.tableCell}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <img
                                                src={person.avatar}
                                                alt={person.name}
                                                style={{ width: '40px', height: '40px', borderRadius: '8px' }}
                                            />
                                            <div>
                                                <p style={{ fontWeight: 600, color: '#1e293b' }}>
                                                    {person.name}
                                                </p>
                                                <p style={{ fontSize: '14px', color: '#64748b' }}>
                                                    {person.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={styles.tableCell}>
                                        <span style={styles.roleBadge}>
                                            {person.role}
                                        </span>
                                    </td>
                                    <td style={styles.tableCell}>
                                        <div style={styles.statusBadge(person.status)}>
                                            {person.status === 'Active' ? (
                                                <CheckCircle2 size={12} />
                                            ) : (
                                                <AlertCircle size={12} />
                                            )}
                                            {person.status}
                                        </div>
                                    </td>
                                    <td style={{ ...styles.tableCell, textAlign: 'right' }}>
                                        <button style={{
                                            padding: '8px',
                                            color: '#94a3b8',
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            borderRadius: '8px'
                                        }}>
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{
                    marginTop: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>
                        Showing 4 of 124 users
                    </p>
                    <button style={{
                        color: '#ea580c',
                        fontWeight: 600,
                        fontSize: '14px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        View all users
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <style>
                {`
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                    margin-bottom: 32px;
                }

                @media (max-width: 1024px) {
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
                
                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
                `}
            </style>
        </React.Fragment>
    );
};

export default Dashboard;