import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Search,
    UserPlus,
    Edit2,
    Trash2,
    MoreVertical,
    UserCheck,
    UserX,
    Mail,
    Shield,
    CheckCircle2,
    AlertCircle,
    X,
    Filter,
    ShieldCheck,
    Clock,
    TrendingUp,
    ChevronDown,
    Download,
    Eye,
    Key,
    Zap,
    Target,
    BarChart3,
    Star,
    Copy,
    EyeOff,
    Link,
    Building2,
    Lock
} from 'lucide-react';

const PeopleManagement = () => {
    // --- Mock Data ---
    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'Alex Johnson',
            email: 'alex.j@jxg.com',
            role: 'Global Admin',
            status: 'Active',
            avatar: 'AJ',
            department: 'IT Security',
            company: 'Janashakthi Group',
            permissions: 8,
            lastActive: '2 mins ago',
            joinDate: '2023-05-15'
        },
        {
            id: 2,
            name: 'Sarah Wilson',
            email: 's.wilson@jxg.com',
            role: 'Content Manager',
            status: 'Active',
            avatar: 'SW',
            department: 'Marketing',
            company: 'Janashakthi Group',
            permissions: 6,
            lastActive: '1 hour ago',
            joinDate: '2023-08-22'
        },
        {
            id: 3,
            name: 'Michael Chen',
            email: 'm.chen@jxg.com',
            role: 'Editor',
            status: 'Inactive',
            avatar: 'MC',
            department: 'Content',
            company: 'Janashakthi Group',
            permissions: 4,
            lastActive: '2 days ago',
            joinDate: '2024-01-10'
        },
        {
            id: 4,
            name: 'Emma Davis',
            email: 'e.davis@jxg.com',
            role: 'Admin',
            status: 'Active',
            avatar: 'ED',
            department: 'Operations',
            company: 'Janashakthi Group',
            permissions: 7,
            lastActive: '5 mins ago',
            joinDate: '2023-11-30'
        },
        {
            id: 5,
            name: 'Robert Smith',
            email: 'r.smith@jxg.com',
            role: 'User',
            status: 'Inactive',
            avatar: 'RS',
            department: 'Sales',
            company: 'Janashakthi Group',
            permissions: 3,
            lastActive: '1 week ago',
            joinDate: '2024-02-14'
        },
    ]);

    // --- State ---
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [selectedUser, setSelectedUser] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [actionReason, setActionReason] = useState('');
    const [resetMethod, setResetMethod] = useState('email');
    const [showTempPassword, setShowTempPassword] = useState(false);
    const [generatedPassword, setGeneratedPassword] = useState('');
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [roleFilter, setRoleFilter] = useState('all');
    const [departmentFilter, setDepartmentFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'User',
        status: 'Active',
        department: '',
        company: 'Janashakthi Group',
        permissions: 3
    });

    // --- Derived State ---
    const filteredUsers = useMemo(() => {
        let filtered = users.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.department.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (activeTab === 'active') {
            filtered = filtered.filter(user => user.status === 'Active');
        } else if (activeTab === 'inactive') {
            filtered = filtered.filter(user => user.status === 'Inactive');
        } else if (activeTab === 'admins') {
            filtered = filtered.filter(user => user.role.includes('Admin'));
        }

        // Apply additional filters
        if (roleFilter !== 'all') {
            filtered = filtered.filter(user => user.role === roleFilter);
        }
        if (departmentFilter !== 'all') {
            filtered = filtered.filter(user => user.department === departmentFilter);
        }
        if (statusFilter !== 'all') {
            filtered = filtered.filter(user => user.status === statusFilter);
        }

        return filtered;
    }, [users, searchQuery, activeTab, roleFilter, departmentFilter, statusFilter]);

    // Get unique values for filters
    const uniqueRoles = useMemo(() => ['all', ...new Set(users.map(u => u.role))], [users]);
    const uniqueDepartments = useMemo(() => ['all', ...new Set(users.map(u => u.department))], [users]);
    const uniqueStatuses = useMemo(() => ['all', 'Active', 'Inactive'], []);

    const toggleMenu = (userId) => {
        setActiveMenuId(activeMenuId === userId ? null : userId);
    };



    // --- CRUD Handlers ---
    const handleAddUser = (e) => {
        e.preventDefault();
        const newUser = {
            ...formData,
            id: Date.now(),
            avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
            lastActive: 'Just now',
            joinDate: new Date().toISOString().split('T')[0]
        };
        setUsers([...users, newUser]);
        setIsAddModalOpen(false);
        setFormData({ name: '', email: '', role: 'User', status: 'Active', department: '', company: 'Janashakthi Group', permissions: 3 });
    };

    const handleEditUser = (e) => {
        e.preventDefault();
        setUsers(users.map(u => u.id === currentUser.id ? { ...u, ...formData } : u));
        setIsEditModalOpen(false);
        setCurrentUser(null);
    };

    const handleDeleteUser = (e) => {
        if (e) e.preventDefault();
        setUsers(users.filter(u => u.id !== currentUser.id));
        setIsDeleteModalOpen(false);
        setCurrentUser(null);
        setActionReason('');
    };

    const handleToggleStatus = (e) => {
        if (e) e.preventDefault();
        setUsers(users.map(u =>
            u.id === currentUser.id
                ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' }
                : u
        ));
        setIsStatusModalOpen(false);
        setCurrentUser(null);
        setActionReason('');
    };

    const handleResetPassword = () => {
        if (resetMethod === 'email') {
            alert(`Password reset link sent to ${currentUser.email}`);
        } else {
            alert(`Temporary password for ${currentUser.name} has been set to: ${generatedPassword}`);
        }
        setIsResetPasswordModalOpen(false);
        setCurrentUser(null);
        setGeneratedPassword('');
        setResetMethod('email');
    };

    const generatePass = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        let pass = "";
        for (let i = 0; i < 12; i++) {
            pass += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setGeneratedPassword(pass);
    };

    const openEditModal = (user) => {
        setCurrentUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            department: user.department,
            company: user.company || 'Janashakthi Group',
            permissions: user.permissions
        });
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (user) => {
        setCurrentUser(user);
        setActionReason('');
        setIsDeleteModalOpen(true);
    };

    const openResetPasswordModal = (user) => {
        setCurrentUser(user);
        setResetMethod('email');
        setGeneratedPassword('');
        setShowTempPassword(false);
        setIsResetPasswordModalOpen(true);
    };

    const openStatusModal = (user) => {
        setCurrentUser(user);
        setActionReason('');
        setIsStatusModalOpen(true);
    };

    const MemberInfoSummary = ({ user }) => {
        if (!user) return null;
        return (
            <div className="member-summary">
                <div className="summary-item">
                    <span className="summary-label">Name</span>
                    <span className="summary-value">{user.name}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Role</span>
                    <span className="summary-value">{user.role}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Department</span>
                    <span className="summary-value">{user.department}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Company</span>
                    <span className="summary-value">{user.company || 'Janashakthi Group'}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Joined Date</span>
                    <span className="summary-value">{user.joinDate}</span>
                </div>
            </div>
        );
    };

    const getStatusColor = (status) => {
        return status === 'Active' ? '#10b981' : '#f43f5e';
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

    return (
        <div className="analytics-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="analytics-content"
            >

                {/* Compact Toolbar */}
                <div className="compact-toolbar">
                    <div className="toolbar-info">
                        <div className="directory-badge">
                            <Users size={14} />
                            <span className="directory-title">User Directory</span>
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

                        <div className="control-buttons">
                            <button className="control-btn" title="Filter">
                                <Filter size={12} />
                                <span>Filter</span>
                            </button>

                            <button className="control-btn" title="Export">
                                <Download size={12} />
                                <span>Export</span>
                            </button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsAddModalOpen(true)}
                                className="add-btn-compact"
                            >
                                <UserPlus size={12} />
                                <span>Add User</span>
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* User Table Card */}
                <div className="user-table-card">
                    <div className="table-header">
                        <div className="table-header-left">
                            <h3 className="table-title">Team Members</h3>
                            <p className="table-subtitle">Manage organizational access permissions</p>
                        </div>
                        <div className="table-header-right">
                            <div className="date-display">
                                <Clock size={14} />
                                <span>Updated just now</span>
                            </div>
                        </div>
                    </div>

                    <div className="table-container">
                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            Role
                                            <select
                                                value={roleFilter}
                                                onChange={(e) => setRoleFilter(e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                                style={{ fontSize: '11px', padding: '2px 6px', border: '1px solid #e2e8f0', borderRadius: '4px', background: 'white', cursor: 'pointer' }}
                                            >
                                                {uniqueRoles.map(role => (
                                                    <option key={role} value={role}>{role === 'all' ? 'All' : role}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </th>
                                    <th>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            Department
                                            <select
                                                value={departmentFilter}
                                                onChange={(e) => setDepartmentFilter(e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                                style={{ fontSize: '11px', padding: '2px 6px', border: '1px solid #e2e8f0', borderRadius: '4px', background: 'white', cursor: 'pointer' }}
                                            >
                                                {uniqueDepartments.map(dept => (
                                                    <option key={dept} value={dept}>{dept === 'all' ? 'All' : dept}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </th>
                                    <th>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            Status
                                            <select
                                                value={statusFilter}
                                                onChange={(e) => setStatusFilter(e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                                style={{ fontSize: '11px', padding: '2px 6px', border: '1px solid #e2e8f0', borderRadius: '4px', background: 'white', cursor: 'pointer' }}
                                            >
                                                {uniqueStatuses.map(status => (
                                                    <option key={status} value={status}>{status === 'all' ? 'All' : status}</option>
                                                ))}
                                            </select>
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
                                        className={`user-row ${selectedUser === user.id ? 'selected' : ''}`}
                                        onClick={() => setSelectedUser(user.id)}
                                    >
                                        <td className="user-info">
                                            <div className="action-menu-container left-align">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleMenu(user.id);
                                                    }}
                                                    className="action-icon-btn"
                                                >
                                                    <MoreVertical size={16} />
                                                </button>
                                                {activeMenuId === user.id && (
                                                    <div className="action-dropdown-menu left-align">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); openEditModal(user); setActiveMenuId(null); }}
                                                            className="menu-item"
                                                        >
                                                            <Edit2 size={14} /> Edit Details
                                                        </button>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); openStatusModal(user); setActiveMenuId(null); }}
                                                            className="menu-item"
                                                        >
                                                            {user.status === 'Active' ? <UserX size={14} /> : <UserCheck size={14} />}
                                                            {user.status === 'Active' ? 'Suspend Account' : 'Activate Account'}
                                                        </button>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); openResetPasswordModal(user); setActiveMenuId(null); }}
                                                            className="menu-item"
                                                        >
                                                            <Key size={14} /> Reset Password
                                                        </button>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); openDeleteModal(user); setActiveMenuId(null); }}
                                                            className="menu-item delete"
                                                        >
                                                            <Trash2 size={14} /> Delete User
                                                        </button>
                                                    </div>
                                                )}
                                                {activeMenuId === user.id && (
                                                    <div className="menu-backdrop" onClick={(e) => { e.stopPropagation(); setActiveMenuId(null); }} />
                                                )}
                                            </div>
                                            <div className="user-avatar">
                                                <div
                                                    className="avatar-initial"
                                                    style={{ background: getRoleColor(user.role) }}
                                                >
                                                    {user.avatar}
                                                </div>
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
                                            <div
                                                className="role-badge"
                                                style={{
                                                    background: `${getRoleColor(user.role)}15`,
                                                    color: getRoleColor(user.role),
                                                    borderColor: `${getRoleColor(user.role)}30`
                                                }}
                                            >
                                                <Shield size={14} />
                                                {user.role}
                                            </div>
                                        </td>
                                        <td>
                                            <span className="department">{user.department}</span>
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
                            <h3>No members found</h3>
                            <p>Try adjusting your search terms</p>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Modals */}
            <AnimatePresence>
                {(isAddModalOpen || isEditModalOpen) && (
                    <div className="modal-overlay">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="modal-container"
                        >
                            <div className="modal-header">
                                <div className="modal-header-left">
                                    <div className="modal-icon">
                                        <Users size={20} />
                                    </div>
                                    <div>
                                        <h3 className="modal-title">
                                            {isAddModalOpen ? 'Add New Member' : 'Edit Member'}
                                        </h3>
                                        <p className="modal-subtitle">
                                            {isAddModalOpen ? 'Add a new team member to the organization' : 'Update member details and permissions'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsAddModalOpen(false);
                                        setIsEditModalOpen(false);
                                        setFormData({ name: '', email: '', role: 'User', status: 'Active', department: '', permissions: 3 });
                                    }}
                                    className="modal-close-btn"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={isAddModalOpen ? handleAddUser : handleEditUser} className="modal-form">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="e.g. John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="e.g. john@jxg.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Role</label>
                                        <select
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            className="form-select"
                                        >
                                            <option value="User">User</option>
                                            <option value="Editor">Editor</option>
                                            <option value="Content Manager">Content Manager</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Global Admin">Global Admin</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Status</label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            className="form-select"
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Department</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Marketing, IT"
                                            value={formData.department}
                                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Company</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Janashakthi Group"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Permissions Level</label>
                                        <div className="permissions-slider">
                                            <input
                                                type="range"
                                                min="1"
                                                max="10"
                                                value={formData.permissions}
                                                onChange={(e) => setFormData({ ...formData, permissions: parseInt(e.target.value) })}
                                                className="range-input"
                                            />
                                            <div className="permissions-value">{formData.permissions} / 10</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-actions">
                                    <button
                                        type="button"
                                        onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
                                        className="cancel-btn"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="submit-btn"
                                    >
                                        {isAddModalOpen ? 'Create Member' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}

                {isStatusModalOpen && (
                    <div className="modal-overlay">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="modal-container"
                        >
                            <div className="modal-header">
                                <div className="modal-header-left">
                                    <div className="modal-icon">
                                        {currentUser?.status === 'Active' ? <UserX size={20} /> : <UserCheck size={20} />}
                                    </div>
                                    <div>
                                        <h3 className="modal-title">
                                            {currentUser?.status === 'Active' ? 'Deactivate Member' : 'Activate Member'}
                                        </h3>
                                        <p className="modal-subtitle">Update account access status</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsStatusModalOpen(false)} className="modal-close-btn">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="modal-form">
                                <MemberInfoSummary user={currentUser} />

                                {currentUser?.status === 'Active' && (
                                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                        <label className="form-label">Reason for Deactivation</label>
                                        <textarea
                                            placeholder="Please provide a reason for deactivating this account..."
                                            value={actionReason}
                                            onChange={(e) => setActionReason(e.target.value)}
                                            className="form-input"
                                            rows={3}
                                            style={{ resize: 'none' }}
                                        />
                                    </div>
                                )}

                                <div className="modal-actions">
                                    <button onClick={() => setIsStatusModalOpen(false)} className="cancel-btn">
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleToggleStatus}
                                        className={currentUser?.status === 'Active' ? 'delete-btn' : 'submit-btn'}
                                        disabled={currentUser?.status === 'Active' && !actionReason.trim()}
                                    >
                                        {currentUser?.status === 'Active' ? 'Deactivate Account' : 'Activate Account'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {isDeleteModalOpen && (
                    <div className="modal-overlay">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="modal-container"
                        >
                            <div className="modal-header">
                                <div className="modal-header-left">
                                    <div className="modal-icon delete">
                                        <AlertCircle size={20} />
                                    </div>
                                    <div>
                                        <h3 className="modal-title">Remove Member</h3>
                                        <p className="modal-subtitle">This action cannot be undone</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsDeleteModalOpen(false)} className="modal-close-btn">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="modal-form">
                                <MemberInfoSummary user={currentUser} />

                                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                    <label className="form-label">Reason for Removal</label>
                                    <textarea
                                        placeholder="Please provide a reason for removing this member..."
                                        value={actionReason}
                                        onChange={(e) => setActionReason(e.target.value)}
                                        className="form-input"
                                        rows={3}
                                        style={{ resize: 'none' }}
                                    />
                                </div>

                                <div className="modal-actions">
                                    <button onClick={() => setIsDeleteModalOpen(false)} className="cancel-btn">
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDeleteUser}
                                        className="delete-btn"
                                        disabled={!actionReason.trim()}
                                    >
                                        Remove Member
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {isResetPasswordModalOpen && (
                    <div className="modal-overlay">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="modal-container"
                        >
                            <div className="modal-header">
                                <div className="modal-header-left">
                                    <div className="modal-icon">
                                        <Key size={20} />
                                    </div>
                                    <div>
                                        <h3 className="modal-title">Reset Password</h3>
                                        <p className="modal-subtitle">Securely reset credentials for this member</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsResetPasswordModalOpen(false)}
                                    className="modal-close-btn"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="modal-form">
                                <MemberInfoSummary user={currentUser} />

                                <div className="reset-methods">
                                    <label className="reset-method">
                                        <input
                                            type="radio"
                                            name="resetMethod"
                                            value="email"
                                            checked={resetMethod === 'email'}
                                            onChange={() => setResetMethod('email')}
                                        />
                                        <div className="method-content">
                                            <Mail size={16} />
                                            <span>Send password reset link via email</span>
                                        </div>
                                    </label>
                                    <label className="reset-method">
                                        <input
                                            type="radio"
                                            name="resetMethod"
                                            value="temp"
                                            checked={resetMethod === 'temp'}
                                            onChange={() => setResetMethod('temp')}
                                        />
                                        <div className="method-content">
                                            <Lock size={16} />
                                            <span>Generate temporary password</span>
                                        </div>
                                    </label>
                                </div>

                                {resetMethod === 'email' ? (
                                    <div className="reset-explanation">
                                        <Link size={16} />
                                        <span>A secure password reset link will be sent to the user's registered email.</span>
                                    </div>
                                ) : (
                                    <div className="temp-password-section">
                                        <div className="form-group">
                                            <div className="password-input-wrapper">
                                                <input
                                                    type={showTempPassword ? 'text' : 'password'}
                                                    value={generatedPassword}
                                                    readOnly
                                                    className="form-input password-input"
                                                    placeholder="Click generate to create password"
                                                />
                                                <div className="password-actions">
                                                    <button
                                                        onClick={() => setShowTempPassword(!showTempPassword)}
                                                        className="password-btn"
                                                        title={showTempPassword ? 'Hide' : 'Show'}
                                                    >
                                                        {showTempPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(generatedPassword);
                                                            alert('Password copied to clipboard');
                                                        }}
                                                        className="password-btn"
                                                        title="Copy"
                                                        disabled={!generatedPassword}
                                                    >
                                                        <Copy size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                onClick={generatePass}
                                                className="generate-btn"
                                            >
                                                <Zap size={14} />
                                                Generate Password
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="modal-actions" style={{ marginTop: '1.5rem' }}>
                                    <button
                                        onClick={() => setIsResetPasswordModalOpen(false)}
                                        className="cancel-btn"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleResetPassword}
                                        className="submit-btn"
                                        disabled={resetMethod === 'temp' && !generatedPassword}
                                    >
                                        Reset Password
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style jsx>{`
                /* Container */
                .analytics-container {
                    min-height: 100vh;
                    background: #f8fafc;
                }
                .analytics-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0.5rem 1rem;
                }

                /* Header */
                .header {
                    background: white;
                    border-radius: 20px;
                    padding: 1.5rem;
                    margin-bottom: 1.5rem;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                @media (min-width: 768px) {
                    .header {
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: flex-start;
                    }
                }
                .header-left {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .badge {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .badge-line {
                    width: 20px;
                    height: 3px;
                    background: linear-gradient(90deg, #f97316, #fbbf24);
                    border-radius: 2px;
                }
                .badge-text {
                    color: #f97316;
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .title {
                    font-size: 28px;
                    font-weight: 800;
                    color: #0f172a;
                    margin: 0;
                }
                .gradient {
                    background: linear-gradient(90deg, #f97316, #fbbf24);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                }
                .header-subtitle {
                    font-size: 14px;
                    color: #64748b;
                    margin: 0;
                }

                /* Compact Toolbar */
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
                    padding: 8px 12px;
                    flex: 1;
                    min-width: 200px;
                    transition: all 0.2s;
                }
                
                @media (min-width: 768px) {
                    .search-compact {
                        flex: 0 1 200px;
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
                    gap: 4px;
                    padding: 8px 12px;
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
                
                .add-btn-compact {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 14px;
                    background: linear-gradient(135deg, #f97316, #fbbf24);
                    border: none;
                    border-radius: 8px;
                    color: white;
                    font-size: 12px;
                    font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);
                    transition: all 0.2s;
                }
                
                .add-btn-compact:hover {
                    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
                    transform: translateY(-1px);
                }

                /* Metrics */
                .metrics {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }
                .metric {
                    background: white;
                    border-radius: 12px;
                    padding: 1.25rem;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
                }
                .metric-bg {
                    position: absolute;
                    top: -20px;
                    right: -20px;
                    width: 60px;
                    height: 60px;
                    background: rgba(249, 115, 22, 0.1);
                    border-radius: 50%;
                    filter: blur(10px);
                }
                .metric-content {
                    position: relative;
                    z-index: 1;
                }
                .metric-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }
                .metric-icon {
                    padding: 8px;
                    background: #fff7ed;
                    border-radius: 8px;
                    color: #f97316;
                }
                .metric-trend {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    padding: 4px 8px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 600;
                }
                .metric-trend.positive {
                    background: #d1fae5;
                    color: #065f46;
                }
                .metric-trend.negative {
                    background: #fee2e2;
                    color: #dc2626;
                }
                .metric-body {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .metric-label {
                    font-size: 11px;
                    font-weight: 600;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin: 0;
                }
                .metric-value {
                    font-size: 24px;
                    font-weight: 800;
                    color: #0f172a;
                    margin: 0;
                }
                .metric-progress {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 3px;
                    background: #f1f5f9;
                }
                .metric-progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #f97316, #fbbf24);
                }

                /* User Table Card */
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
                    font-size: 12px;
                    color: #64748b;
                    margin: 0;
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
                .user-row.selected {
                    background: #fff7ed;
                }

                .user-info {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                .user-avatar {
                    position: relative;
                }
                .avatar-initial {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 700;
                    font-size: 14px;
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

                .department {
                    font-weight: 600;
                    color: #475569;
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

                .permissions-info {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .permissions-count {
                    font-size: 16px;
                    font-weight: 700;
                    color: #0f172a;
                }
                .permissions-label {
                    font-size: 10px;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .last-active {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 12px;
                    color: #64748b;
                }

                .action-buttons {
                    display: flex;
                    gap: 4px;
                }
                .action-btn {
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f1f5f9;
                    border: none;
                    border-radius: 6px;
                    color: #64748b;
                    cursor: pointer;
                }
                .action-btn.status:hover {
                    background: #e2e8f0;
                }
                .action-btn.active {
                    color: #10b981;
                }
                .action-btn.inactive {
                    color: #f43f5e;
                }
                .action-btn.edit:hover {
                    background: #fef3c7;
                    color: #f97316;
                }
                .action-btn.delete:hover {
                    background: #fee2e2;
                    color: #dc2626;
                }

                /* Member Summary */
                .member-summary {
                    background: #f8fafc;
                    border-radius: 12px;
                    padding: 1.25rem;
                    margin-bottom: 1.5rem;
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.25rem;
                    border: 1px solid #e2e8f0;
                }
                .summary-item {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .summary-label {
                    font-size: 10px;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-weight: 700;
                }
                .summary-value {
                    font-size: 14px;
                    color: #1e293b;
                    font-weight: 700;
                }

                /* Reset Password Flow */
                .reset-methods {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    margin-bottom: 1.5rem;
                }
                .reset-method {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1.25rem;
                    border: 2px solid #f1f5f9;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .reset-method:hover {
                    background: #fff7ed;
                    border-color: #fbbf24;
                }
                .reset-method input[type="radio"] {
                    width: 20px;
                    height: 20px;
                    accent-color: #f97316;
                }
                .method-content {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-size: 14px;
                    font-weight: 700;
                    color: #334155;
                }

                .reset-explanation, .temp-password-section {
                    background: #fff7ed;
                    border: 1px dashed #fbbf24;
                    border-radius: 12px;
                    padding: 1.25rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }
                .reset-explanation {
                    flex-direction: row;
                    align-items: center;
                }
                .reset-explanation span {
                    font-size: 13px;
                    color: #9a3412;
                    line-height: 1.5;
                    font-weight: 600;
                }
                .reset-explanation svg {
                    color: #f97316;
                    flex-shrink: 0;
                }

                .password-input-wrapper {
                    position: relative;
                    width: 100%;
                }
                .password-input {
                    padding-right: 100px !important;
                    font-family: 'JetBrains Mono', monospace;
                    letter-spacing: 1.5px;
                    font-weight: 700;
                    background: white !important;
                    height: 50px;
                    font-size: 16px !important;
                }
                .password-actions {
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    display: flex;
                    gap: 6px;
                }
                .password-btn {
                    width: 36px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    color: #64748b;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .password-btn:hover {
                    background: #f1f5f9;
                    color: #f97316;
                    border-color: #fbbf24;
                }
                .password-btn:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }
                .generate-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 18px;
                    background: white;
                    border: 2px solid #fed7aa;
                    border-radius: 10px;
                    color: #f97316;
                    font-size: 13px;
                    font-weight: 800;
                    cursor: pointer;
                    width: fit-content;
                    transition: all 0.2s;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
                }
                .generate-btn:hover {
                    background: #f97316;
                    color: white;
                    border-color: #f97316;
                    transform: translateY(-1px);
                    box-shadow: 0 10px 15px -3px rgba(249, 115, 22, 0.2);
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

                /* Modal Styles */
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 50;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    background: rgba(15, 23, 42, 0.4);
                    backdrop-filter: blur(8px);
                }
                .modal-container {
                    background: white;
                    border-radius: 24px;
                    width: 100%;
                    max-width: 520px;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    border: 1px solid #f1f5f9;
                }
                .modal-header {
                    padding: 1.75rem;
                    border-bottom: 1px solid #f1f5f9;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .modal-header-left {
                    display: flex;
                    align-items: center;
                    gap: 1.25rem;
                }
                .modal-icon {
                    width: 48px;
                    height: 48px;
                    background: #fff7ed;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #f97316;
                    box-shadow: 0 4px 6px -1px rgba(249, 115, 22, 0.1);
                }
                .modal-icon.delete {
                    background: #fee2e2;
                    color: #ef4444;
                    box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.1);
                }
                .modal-title {
                    font-size: 20px;
                    font-weight: 800;
                    color: #0f172a;
                    margin: 0;
                    letter-spacing: -0.5px;
                }
                .modal-subtitle {
                    font-size: 13px;
                    color: #64748b;
                    margin: 4px 0 0;
                    font-weight: 500;
                }
                .modal-close-btn {
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f8fafc;
                    border: 1px solid #f1f5f9;
                    border-radius: 10px;
                    color: #94a3b8;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .modal-close-btn:hover {
                    background: #fee2e2;
                    color: #ef4444;
                    border-color: #fecaca;
                }
                .modal-form {
                    padding: 1.75rem;
                }
                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                }
                @media (min-width: 640px) {
                    .form-grid {
                        grid-template-columns: 1fr 1fr;
                    }
                    .form-grid .form-group:nth-child(5),
                    .form-grid .form-group:nth-child(6) {
                        grid-column: span 2;
                    }
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                .form-label {
                    font-size: 11px;
                    font-weight: 800;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .form-input, .form-select {
                    padding: 14px 16px;
                    background: #f8fafc;
                    border: 2px solid #f1f5f9;
                    border-radius: 12px;
                    font-size: 15px;
                    color: #0f172a;
                    outline: none;
                    transition: all 0.2s;
                    font-weight: 500;
                }
                .form-input:focus, .form-select:focus {
                    border-color: #f97316;
                    background: white;
                    box-shadow: 0 0 0 5px rgba(249, 115, 22, 0.1);
                }
                .permissions-slider {
                    display: flex;
                    align-items: center;
                    gap: 1.25rem;
                    background: #f8fafc;
                    padding: 16px;
                    border-radius: 14px;
                    border: 2px solid #f1f5f9;
                }
                .range-input {
                    flex: 1;
                    height: 8px;
                    border-radius: 4px;
                    background: #e2e8f0;
                    outline: none;
                    -webkit-appearance: none;
                }
                .range-input::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: #f97316;
                    cursor: pointer;
                    box-shadow: 0 4px 6px -1px rgba(249, 115, 22, 0.3);
                    border: 2px solid white;
                }
                .permissions-value {
                    font-size: 15px;
                    font-weight: 800;
                    color: #f97316;
                    min-width: 60px;
                }
                .modal-actions {
                    display: flex;
                    gap: 1rem;
                    padding-top: 2rem;
                    border-top: 1px solid #f1f5f9;
                }
                .cancel-btn {
                    flex: 1;
                    padding: 14px 20px;
                    background: #f8fafc;
                    border: 2px solid #f8fafc;
                    border-radius: 14px;
                    font-size: 15px;
                    font-weight: 700;
                    color: #64748b;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .cancel-btn:hover {
                    background: #f1f5f9;
                    color: #0f172a;
                    border-color: #e2e8f0;
                }
                .submit-btn {
                    flex: 1.2;
                    padding: 14px 20px;
                    background: linear-gradient(135deg, #f97316, #fbbf24);
                    border: none;
                    border-radius: 14px;
                    font-size: 15px;
                    font-weight: 700;
                    color: white;
                    cursor: pointer;
                    box-shadow: 0 10px 15px -3px rgba(249, 115, 22, 0.25);
                    transition: all 0.2s;
                }
                .submit-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 20px 25px -5px rgba(249, 115, 22, 0.3);
                }
                .delete-btn {
                    flex: 1.2;
                    padding: 14px 20px;
                    background: #ef4444;
                    border: none;
                    border-radius: 14px;
                    font-size: 15px;
                    font-weight: 700;
                    color: white;
                    cursor: pointer;
                    box-shadow: 0 10px 15px -3px rgba(239, 68, 68, 0.25);
                    transition: all 0.2s;
                }
                .delete-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 20px 25px -5px rgba(239, 68, 68, 0.3);
                }
                .delete-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    transform: none;
                    box-shadow: none;
                }

                /* Action Menu */
                .action-menu-container { position: relative; margin-right: 12px; }
                .action-icon-btn { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border: none; background: transparent; border-radius: 8px; color: #64748b; cursor: pointer; transition: all 0.2s; }
                .action-icon-btn:hover { background: #f1f5f9; color: #0f172a; }
                .action-dropdown-menu { position: absolute; top: 100%; background: white; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); padding: 0.5rem; z-index: 50; min-width: 180px; display: flex; flex-direction: column; gap: 2px; border: 1px solid #e2e8f0; }
                .action-dropdown-menu.left-align { left: 0; right: auto; margin-top: 4px; transform-origin: top left; }
                .menu-item { display: flex; align-items: center; gap: 8px; padding: 8px 12px; width: 100%; border: none; background: none; font-size: 13px; font-weight: 500; color: #475569; border-radius: 6px; cursor: pointer; text-align: left; transition: all 0.2s; }
                .menu-item:hover { background: #f8fafc; color: #0f172a; }
                .menu-item.delete { color: #ef4444; }
                .menu-item.delete:hover { background: #fef2f2; }
                .menu-backdrop { position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 40; }

                /* Dark Mode */
                .dark .action-icon-btn:hover { background: #334155; color: white; }
                .dark .action-dropdown-menu { background: #1e293b; border-color: #334155; }
                .dark .menu-item { color: #cbd5e1; }
                .dark .menu-item:hover { background: #334155; color: white; }

                /* Dark Mode */
                .dark .header,
                .dark .metric,
                .dark .user-table-card,
                .dark .modal-container { background: #1e293b; }
                .dark .modal-container { border-color: #334155; }
                .dark .title, .dark .control-title, .dark .metric-value, .dark .table-title, .dark .user-name, .dark .modal-title { color: white; }
                .dark .tabs { background: #334155; }
                .dark .tab.active { background: #475569; color: white; }
                .dark .modal-header, .dark .modal-actions, .dark .permissions-slider, .dark .modal-close-btn { border-color: #334155; color: #cbd5e1; }
                .dark .form-input, .dark .form-select { color: white; background: #0f172a; border-color: #334155; }
                .dark .metric-label, .dark .table-subtitle, .dark .header-subtitle, .dark .modal-subtitle, .dark .form-label { color: #94a3b8; }
                .dark .user-table th { background: #0f172a; color: #94a3b8; border-bottom-color: #334155; }
                .dark .user-table td { border-bottom-color: #334155; color: #cbd5e1; }
                .dark .user-row:hover { background: #1e293b; }
                .dark .user-row.selected { background: #334155; }
                .dark .user-email, .dark .last-active { color: #94a3b8; }
                .dark .permissions-count { color: white; }
                .dark .action-btn { background: #334155; color: #94a3b8; }
                .dark .empty-icon { background: #334155; }
                .dark .empty-state h3 { color: white; }
                .dark .modal-overlay { background: rgba(0, 0, 0, 0.7); }
                .dark .modal-close-btn { background: #334155; }
                .dark .range-input { background: #334155; }
                .dark .cancel-btn { background: #334155; border-color: #475569; color: #cbd5e1; }
                .dark .member-summary { background: #0f172a; border-color: #334155; }
                .dark .summary-label { color: #64748b; }
                .dark .summary-value { color: #f1f5f9; }
                .dark .reset-method { border-color: #334155; }
                .dark .reset-method:hover { background: #0f172a; border-color: #f97316; }
                .dark .method-content { color: #cbd5e1; }
                .dark .reset-explanation, .dark .temp-password-section { background: #1c1917; border-color: #44403c; }
                .dark .reset-explanation span { color: #fdba74; }
                .dark .password-input { background: #0f172a !important; border-color: #334155; }
                .dark .password-btn { background: #334155; border-color: #475569; color: #94a3b8; }
                .dark .generate-btn { background: #451a03; border-color: #78350f; color: #fbbf24; }
                .dark .modal-icon { background: #451a03; color: #fbbf24; }
                .dark .modal-icon.delete { background: #450a0a; color: #f87171; }
                
                /* Dark Mode for Compact Toolbar */
                .dark .compact-toolbar {
                    background: #1e293b;
                    border-color: #334155;
                }
                
                .dark .directory-badge {
                    background: #451a03;
                    border-color: #78350f;
                }
                
                .dark .directory-title {
                    color: white;
                }
                
                .dark .search-compact {
                    background: #0f172a;
                    border-color: #334155;
                }
                
                .dark .search-input-compact {
                    color: white;
                }
                
                .dark .control-btn {
                    background: #1e293b;
                    border-color: #334155;
                    color: #94a3b8;
                }
                
                .dark .control-btn:hover {
                    background: #334155;
                    color: white;
                }
            `}</style>
        </div>
    );
};

export default PeopleManagement;