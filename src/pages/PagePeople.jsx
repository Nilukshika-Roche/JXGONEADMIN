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
    UserPlus,
    UserSearch
} from 'lucide-react';

const PagePeople = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const [filters, setFilters] = useState({
        department: 'All',
        role: 'All',
        status: 'All'
    });

    const [openFilter, setOpenFilter] = useState(null);
    const [tableFilters, setTableFilters] = useState({
        department: 'All',
        role: 'All',
        status: 'All'
    });

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
            status: 'Inactive',
            joinedDate: 'Mar 10, 2024',
            avatar: 'https://i.pravatar.cc/150?u=5',
            department: 'Content',
            permissions: 2,
            lastActive: 'Never'
        },
    ]);

    const generateMorePeople = () => {
        const roles = ['Global Admin', 'Admin', 'Content Manager', 'Editor', 'User'];
        const statuses = ['Active', 'Inactive'];
        const departments = ['IT Security', 'Marketing', 'Content', 'Operations', 'Sales', 'HR', 'Finance'];
        const names = [
            'John Smith', 'Emily Johnson', 'Michael Brown', 'Sarah Davis', 'David Wilson',
            'Lisa Anderson', 'James Taylor', 'Maria Garcia', 'William Lee', 'Linda Rodriguez'
        ];

        const newPeople = [];
        const currentMaxId = Math.max(...users.map(u => u.id));

        for (let i = 1; i <= 5; i++) {
            const name = names[Math.floor(Math.random() * names.length)];
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            newPeople.push({
                id: currentMaxId + i,
                name: `${name} ${currentMaxId + i}`,
                email: `${name.toLowerCase().replace(' ', '.')}@jxg.com`,
                role: roles[Math.floor(Math.random() * roles.length)],
                status: status,
                joinedDate: new Date().toISOString().split('T')[0],
                avatar: `https://i.pravatar.cc/150?u=${currentMaxId + i}`,
                department: departments[Math.floor(Math.random() * departments.length)],
                permissions: Math.floor(Math.random() * 8) + 1,
                lastActive: 'Just now'
            });
        }
        setUsers([...users, ...newPeople]);
    };

    const uniqueDepartments = ['All', ...new Set(users.map(u => u.department))];
    const uniqueRoles = ['All', ...new Set(users.map(u => u.role))];
    const uniqueStatuses = ['All', ...new Set(users.map(u => u.status))];

    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.department.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesDept = tableFilters.department === 'All' || user.department === tableFilters.department;
        const matchesRole = tableFilters.role === 'All' || user.role === tableFilters.role;
        const matchesStatus = tableFilters.status === 'All' || user.status === tableFilters.status;

        return matchesSearch && matchesDept && matchesRole && matchesStatus;
    });

    const getStatusColor = (status) => {
        if (status === 'Active') return '#10b981';
        else return '#64748b';
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'Global Admin': return '#f97316';
            case 'Admin': return '#8b5cf6';
            case 'Content Manager': return '#3b82f6';
            case 'Editor': return '#10b981';
            default: return '#64748b';
        }
    };

    const toggleFilter = (filterName) => {
        setOpenFilter(openFilter === filterName ? null : filterName);
    };

    const handleFilterSelect = (type, value) => {
        setTableFilters(prev => ({ ...prev, [type]: value }));
        setOpenFilter(null);
    };

    return (
        <div className="p-6 max-w-[1400px] mx-auto font-sans text-slate-800">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
                    <div>
                        <div className="text-sm text-slate-500 font-medium mb-1 tracking-wide">
                            Admin &gt; Team
                        </div>
                        <h1 className="text-3xl font-bold text-slate-800" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Team Members
                        </h1>
                    </div>
                </div>

                <div className="user-table-card">
                    <div className="table-container">
                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '40%' }}>
                                        <div className="table-filter-header" style={{ cursor: 'default' }}>
                                            User
                                            <div className="table-search-container">
                                                <Search size={16} className="table-search-icon" />
                                                <input
                                                    type="text"
                                                    placeholder="Search users..."
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    className="table-search-input"
                                                />
                                            </div>
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
                                        className="user-row hover:bg-slate-50"
                                    >
                                        <td>
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                                                    style={{ background: getRoleColor(user.role) }}
                                                >
                                                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-slate-800 text-sm">{user.name}</span>
                                                    <span className="text-xs text-slate-400">{user.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td><div className="text-sm font-medium text-slate-600">{user.department}</div></td>
                                        <td>
                                            <span className="text-sm font-medium text-slate-600">
                                                {user.role}
                                            </span>
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
                                                    style={{ color: getStatusColor(user.status) }}
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
                                <UserSearch size={32} />
                            </div>
                            <h3>No users found</h3>
                            <p>Try adjusting your search terms</p>
                        </div>
                    )}

                    <div className="showing">
                        <div>Showing {filteredUsers.length} results</div>
                        <button
                            onClick={generateMorePeople}
                            className="show-more-btn"
                        >
                            <ChevronDown size={16} />
                            <span>Show More</span>
                        </button>
                    </div>
                </div>

                {/* Filter Dropdowns */}
                <AnimatePresence>
                    {openFilter && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="filter-dropdown-overlay"
                            onClick={() => setOpenFilter(null)}
                        >
                            <div className="filter-dropdown-card" onClick={e => e.stopPropagation()}>
                                <div className="filter-dropdown-header">
                                    <h4>Filter by {openFilter.charAt(0).toUpperCase() + openFilter.slice(1)}</h4>
                                </div>
                                <div className="filter-options">
                                    {(openFilter === 'department' ? uniqueDepartments :
                                        openFilter === 'role' ? uniqueRoles :
                                            uniqueStatuses).map((val) => (
                                                <button
                                                    key={val}
                                                    className={`filter-option ${tableFilters[openFilter] === val ? 'active' : ''}`}
                                                    onClick={() => handleFilterSelect(openFilter, val)}
                                                >
                                                    {val}
                                                </button>
                                            ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div >

            <style jsx>{`
                /* User Table Card Header Ported */
                .user-table-card {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                    overflow: hidden;
                    margin-top: 1.5rem;
                    border: 1px solid #e2e8f0;
                }
                .table-header {
                    padding: 1.5rem;
                    border-radius: 12px 12px 0 0;
                    border-bottom: 1px solid #e2e8f0;
                    background: #fffaf5;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .table-header-left { display: flex; gap: 1rem; align-items: center; }
                .user-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .user-table th {
                    padding: 1rem 1.5rem;
                    background: #f8fafc;
                    color: #64748b;
                    font-size: 14px;
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
                    vertical-align: middle;
                }
                .user-row {
                    transition: background-color 0.2s;
                }
                .user-row:hover {
                    background: #f8fafc;
                }

                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: default;
                }
                .status-badge[onClick] {
                    cursor: pointer;
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
                    transition: all 0.2s;
                }
                .table-filter-header:hover {
                    color: #f97316;
                }
                .table-filter-header .rotate {
                    transform: rotate(180deg);
                }
                .table-filter-header svg {
                    transition: transform 0.2s;
                }

                /* Table Search Bar */
                .table-search-container {
                    position: relative;
                    margin-left: 1rem;
                    flex: 1;
                    max-width: 320px;
                }
                .table-search-input {
                    width: 100%;
                    padding: 8px 12px 8px 36px;
                    background-color: #f1f5f9;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #1e293b;
                    outline: none;
                    transition: all 0.2s;
                    font-family: inherit;
                }
                .table-search-input:focus {
                    background-color: #fff;
                    border-color: #cbd5e1;
                    box-shadow: 0 0 0 4px rgba(241, 245, 249, 0.5);
                }
                .table-search-icon {
                    position: absolute;
                    left: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #94a3b8;
                    pointer-events: none;
                }

                /* Show More Button */
                .show-more-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 10px 16px;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    border: none;
                    background: transparent;
                    color: #475569;
                }
                .show-more-btn:hover {
                    background: #f1f5f9;
                }
                .show-more-btn svg {
                    transition: transform 0.2s;
                }
                .show-more-btn:hover svg {
                    transform: translateY(2px);
                }

                .showing{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 16px;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    border: none;   
                }

                /* Filter Dropdown Overlay */
                .filter-dropdown-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 10000;
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                    padding-top: 15vh;
                    background: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(2px);
                }
                .filter-dropdown-card {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                    min-width: 220px;
                    max-width: 320px;
                }
                .filter-dropdown-header {
                    margin-bottom: 1rem;
                    border-bottom: 1px solid #f1f5f9;
                    padding-bottom: 0.75rem;
                }
                .filter-dropdown-header h4 {
                    font-size: 14px;
                    font-weight: 700;
                    color: #1e293b;
                    margin: 0;
                }
                .filter-options {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                    max-height: 300px;
                    overflow-y: auto;
                    padding-right: 4px;
                }
                .filter-options::-webkit-scrollbar {
                    width: 4px;
                }
                .filter-options::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 4px;
                }
                .filter-option {
                    padding: 10px 12px;
                    background: none;
                    border: none;
                    border-radius: 8px;
                    font-size: 13px;
                    color: #475569;
                    text-align: left;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .filter-option:hover {
                    background: #f1f5f9;
                    color: #1e293b;
                }
                .filter-option.active {
                    background: #fff7ed;
                    color: #f97316;
                    font-weight: 700;
                }

                /* Page Actions */
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
                    transition: all 0.2s;
                }
                .page-action-btn.primary {
                    background: linear-gradient(135deg, #f97316, #fbbf24);
                    color: white;
                }
                .page-action-btn.primary:hover {
                    opacity: 0.9;
                    transform: translateY(-1px);
                }
                .page-action-btn.secondary {
                    background: #f1f5f9;
                    color: #475569;
                }
                .page-action-btn.secondary:hover {
                    background: #e2e8f0;
                    color: #0f172a;
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
        </div>
    );
};

export default PagePeople;