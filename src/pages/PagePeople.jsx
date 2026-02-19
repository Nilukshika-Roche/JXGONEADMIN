import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Search,
    Filter,
    ChevronDown,
    Mail,
    Shield,
    ShieldCheck,
    Clock,
    Download,
    Calendar,
    Zap,
    UserPlus
} from 'lucide-react';

const PagePeople = () => {
    const [searchQuery, setSearchQuery] = useState('');


    const [filters, setFilters] = useState({
        department: 'All',
        role: 'All',
        status: 'All'
    });

    const [openFilter, setOpenFilter] = useState(null);

    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'John Doe',
            email: 'john@jxg.com',
            role: 'Global Admin',
            status: 'Active',
            joinedDate: 'Dec 12, 2023',
            avatar: 'https://i.pravatar.cc/150?u=1',
            department: 'IT Security',
            permissions: 8,
            lastActive: '2 mins ago'
        },
        {
            id: 2,
            name: 'Sarah Miller',
            email: 'sarah@jxg.com',
            role: 'Content Manager',
            status: 'Active',
            joinedDate: 'Jan 15, 2024',
            avatar: 'https://i.pravatar.cc/150?u=2',
            department: 'Marketing',
            permissions: 6,
            lastActive: '1 hour ago'
        },
        {
            id: 3,
            name: 'Robert Chen',
            email: 'robert@jxg.com',
            role: 'Editor',
            status: 'Inactive',
            joinedDate: 'Nov 08, 2023',
            avatar: 'https://i.pravatar.cc/150?u=3',
            department: 'Content',
            permissions: 4,
            lastActive: '2 days ago'
        },
        {
            id: 4,
            name: 'Emma Wilson',
            email: 'emma@jxg.com',
            role: 'User',
            status: 'Active',
            joinedDate: 'Feb 20, 2024',
            avatar: 'https://i.pravatar.cc/150?u=4',
            department: 'Sales',
            permissions: 3,
            lastActive: '5 mins ago'
        },
        {
            id: 5,
            name: 'Alex Thompson',
            email: 'alex@jxg.com',
            role: 'Editor',
            status: 'Pending',
            joinedDate: 'Mar 10, 2024',
            avatar: 'https://i.pravatar.cc/150?u=5',
            department: 'Content',
            permissions: 2,
            lastActive: 'Never'
        },
    ]);



    const uniqueDepartments = ['All', ...new Set(users.map(u => u.department))];
    const uniqueRoles = ['All', ...new Set(users.map(u => u.role))];
    const uniqueStatuses = ['All', ...new Set(users.map(u => u.status))];

    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.department.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesDept = filters.department === 'All' || user.department === filters.department;
        const matchesRole = filters.role === 'All' || user.role === filters.role;
        const matchesStatus = filters.status === 'All' || user.status === filters.status;

        return matchesSearch && matchesDept && matchesRole && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return '#10b981';
            case 'Inactive': return '#f43f5e';
            case 'Pending': return '#f97316';
            default: return '#94a3b8';
        }
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'Global Admin': return '#f97316';
            case 'Content Manager': return '#8b5cf6';
            case 'Editor': return '#3b82f6';
            default: return '#64748b';
        }
    };

    const toggleFilter = (filterName) => {
        setOpenFilter(openFilter === filterName ? null : filterName);
    };

    const handleFilterSelect = (type, value) => {
        setFilters(prev => ({ ...prev, [type]: value }));
        setOpenFilter(null);
    };

    return (
        <div className="analytics-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="analytics-content"
            >

                {/* Compact Toolbar (Ported from PeopleManagement) */}
                <div className="compact-toolbar">
                    <div className="toolbar-info">
                        <div className="directory-badge">
                            <Users size={14} />
                            <span className="directory-title">Team Members</span>
                            <span className="member-count">{filteredUsers.length} Members</span>
                        </div>
                    </div>

                    <div className="toolbar-controls">
                        <div className="search-compact">
                            <Search size={12} />
                            <input
                                type="text"
                                placeholder="Search members..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input-compact"
                            />
                        </div>


                    </div>
                </div>

                {/* Search Bar */}


                <div className="user-table-card">


                    <div className="table-container">
                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>
                                        <div className="table-filter-header">
                                            User Details
                                        </div>
                                    </th>
                                    <th>
                                        <div className="table-filter-header" onClick={() => toggleFilter('department')}>
                                            <span>Department</span>
                                            <ChevronDown size={14} className={openFilter === 'department' ? 'rotate' : ''} />
                                        </div>
                                    </th>
                                    <th>
                                        <div className="table-filter-header" onClick={() => toggleFilter('role')}>
                                            <span>Role</span>
                                            <ChevronDown size={14} className={openFilter === 'role' ? 'rotate' : ''} />
                                        </div>
                                    </th>
                                    <th>
                                        <div className="table-filter-header" onClick={() => toggleFilter('status')}>
                                            <span>Status</span>
                                            <ChevronDown size={14} className={openFilter === 'status' ? 'rotate' : ''} />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user, idx) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="user-row"
                                    >
                                        <td className="user-info">
                                            <div className="user-avatar">
                                                <img src={user.avatar} alt={user.name} />
                                                <div
                                                    className="status-indicator"
                                                    style={{ backgroundColor: getStatusColor(user.status) }}
                                                />
                                            </div>
                                            <div className="user-details">
                                                <div className="user-name">{user.name}</div>
                                                <div className="user-email">
                                                    <Mail size={12} />
                                                    {user.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="department">{user.department}</span>
                                        </td>
                                        <td>
                                            <div
                                                className="role-badge"
                                                style={{
                                                    background: `${getRoleColor(user.role)}15`,
                                                    color: getRoleColor(user.role),
                                                    borderColor: `${getRoleColor(user.role)}30`
                                                }}
                                            >
                                                {user.role === 'Global Admin' ? <ShieldCheck size={14} /> : <Shield size={14} />}
                                                {user.role}
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                className="status-badge"
                                                style={{
                                                    background: `${getStatusColor(user.status)}15`,
                                                    color: getStatusColor(user.status)
                                                }}
                                            >
                                                <div
                                                    className="status-dot"
                                                    style={{ backgroundColor: getStatusColor(user.status) }}
                                                />
                                                {user.status}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredUsers.length === 0 && (
                        <div className="empty-state">
                            <div className="empty-icon">
                                <Users size={32} />
                            </div>
                            <h3>No users found</h3>
                            <p>Try adjusting your search terms</p>
                        </div>
                    )}
                </div>

                {/* Filter Dropdowns */}
                <AnimatePresence>
                    {openFilter === 'department' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="filter-dropdown-overlay"
                        >
                            <div className="filter-dropdown-card">
                                <div className="filter-dropdown-header">
                                    <h4>Filter by Department</h4>
                                </div>
                                <div className="filter-options">
                                    {uniqueDepartments.map((dept) => (
                                        <button
                                            key={dept}
                                            className={`filter-option ${filters.department === dept ? 'active' : ''}`}
                                            onClick={() => handleFilterSelect('department', dept)}
                                        >
                                            {dept}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {openFilter === 'role' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="filter-dropdown-overlay"
                        >
                            <div className="filter-dropdown-card">
                                <div className="filter-dropdown-header">
                                    <h4>Filter by Role</h4>
                                </div>
                                <div className="filter-options">
                                    {uniqueRoles.map((role) => (
                                        <button
                                            key={role}
                                            className={`filter-option ${filters.role === role ? 'active' : ''}`}
                                            onClick={() => handleFilterSelect('role', role)}
                                        >
                                            {role}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {openFilter === 'status' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="filter-dropdown-overlay"
                        >
                            <div className="filter-dropdown-card">
                                <div className="filter-dropdown-header">
                                    <h4>Filter by Status</h4>
                                </div>
                                <div className="filter-options">
                                    {uniqueStatuses.map((status) => (
                                        <button
                                            key={status}
                                            className={`filter-option ${filters.status === status ? 'active' : ''}`}
                                            onClick={() => handleFilterSelect('status', status)}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
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

                /* Compact Toolbar (Ported from PeopleManagement) */
                .compact-toolbar {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    background: white;
                    padding: 16px;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    margin-bottom: 16px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
                }
                
                @media (min-width: 768px) {
                    .compact-toolbar {
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        padding: 12px 20px;
                    }
                }
                
                .toolbar-info {
                    display: flex;
                    align-items: center;
                }
                
                .directory-badge {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 12px;
                    background: #fff7ed;
                    border-radius: 8px;
                    border: 1px solid #fed7aa;
                }
                
                .directory-badge svg {
                    color: #f97316;
                }
                
                .directory-title {
                    font-size: 14px;
                    font-weight: 700;
                    color: #0f172a;
                }
                
                .member-count {
                    font-size: 11px;
                    font-weight: 600;
                    color: #f97316;
                    background: white;
                    padding: 2px 6px;
                    border-radius: 4px;
                    margin-left: 4px;
                }
                
                .toolbar-controls {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    width: 100%;
                }
                
                @media (min-width: 768px) {
                    .toolbar-controls {
                        flex-direction: row;
                        align-items: center;
                        justify-content: flex-end;
                        width: auto;
                        gap: 8px;
                    }
                }
                
                .search-compact {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 6px 12px;
                    flex: 1;
                    min-width: 200px;
                    transition: all 0.2s;
                }
                
                @media (min-width: 768px) {
                    .search-compact {
                        flex: 0 1 240px;
                    }
                }
                
                .search-compact:focus-within {
                    background: white;
                    border-color: #f97316;
                    box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.1);
                }
                
                .search-compact svg {
                    color: #94a3b8;
                    flex-shrink: 0;
                }
                
                .search-input-compact {
                    border: none;
                    background: transparent;
                    outline: none;
                    font-size: 13px;
                    color: #0f172a;
                    width: 100%;
                }
                
                .control-buttons {
                    display: flex;
                    gap: 8px;
                }
                
                .control-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 16px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 600;
                    color: #475569;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                
                .control-btn:hover {
                    background: #f8fafc;
                    border-color: #cbd5e1;
                    color: #0f172a;
                }

                /* User Table Card Header Ported */
                .user-table-card {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                    overflow: hidden;
                }
                .table-header {
                    padding: 1.5rem;
                    border-bottom: 1px solid #e2e8f0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: #fffaf5;
                }
                .table-title {
                    font-size: 18px;
                    font-weight: 700;
                    color: #0f172a;
                    margin: 0;
                }
                .table-subtitle {
                    font-size: 13px;
                    color: #64748b;
                    margin: 4px 0 0;
                    font-weight: 500;
                }
                .table-header-right {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                .date-display {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 12px;
                    background: white;
                    border: 1px solid #fed7aa;
                    border-radius: 6px;
                    font-size: 12px;
                    font-weight: 600;
                    color: #f97316;
                }
                .table-container {
                    overflow-x: auto;
                }
                .user-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .user-table th {
                    padding: 1rem 1.5rem;
                    background: #f8fafc;
                    color: #64748b;
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    border-bottom: 1px solid #e2e8f0;
                    text-align: left;
                }
                .user-table td {
                    padding: 1rem 1.5rem;
                    border-bottom: 1px solid #f1f5f9;
                    font-size: 13px;
                    color: #334155;
                }
                .user-row {
                    transition: background-color 0.2s;
                }
                .user-row:hover {
                    background: #fffaf5;
                }

                .user-info {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                .user-avatar {
                    position: relative;
                }
                .user-avatar img {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    object-fit: cover;
                }
                .status-indicator {
                    position: absolute;
                    bottom: -2px;
                    right: -2px;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    border: 2px solid white;
                }
                .user-details {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }
                .user-name {
                    font-weight: 600;
                    color: #0f172a;
                }
                .user-email {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 11px;
                    color: #64748b;
                }

                .department {
                    font-weight: 600;
                    color: #475569;
                }

                .role-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 12px;
                    border-radius: 6px;
                    font-size: 12px;
                    font-weight: 600;
                    border: 1px solid;
                }

                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 600;
                }
                .status-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                }

                /* Table Filter Header */
                .table-filter-header {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    cursor: pointer;
                    user-select: none;
                }
                .table-filter-header:hover {
                    color: #f97316;
                }
                .table-filter-header .rotate {
                    transform: rotate(180deg);
                    transition: transform 0.2s;
                }

                /* Filter Dropdown Overlay */
                .filter-dropdown-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 100;
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                    padding-top: 100px;
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(2px);
                }
                .filter-dropdown-card {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
                    min-width: 200px;
                    max-width: 300px;
                }
                .filter-dropdown-header {
                    margin-bottom: 1rem;
                }
                .filter-dropdown-header h4 {
                    font-size: 14px;
                    font-weight: 700;
                    color: #0f172a;
                    margin: 0;
                }
                .filter-options {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .filter-option {
                    padding: 8px 12px;
                    background: none;
                    border: none;
                    border-radius: 6px;
                    font-size: 13px;
                    color: #475569;
                    text-align: left;
                    cursor: pointer;
                }
                .filter-option:hover {
                    background: #f1f5f9;
                }
                .filter-option.active {
                    background: #fff7ed;
                    color: #f97316;
                    font-weight: 600;
                }

                /* Empty State */
                .empty-state {
                    text-align: center;
                    padding: 60px 20px;
                    border-top: 1px solid #e2e8f0;
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


            `}</style>
        </div >
    );
};

export default PagePeople;