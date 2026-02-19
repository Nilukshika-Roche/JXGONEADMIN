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
    Lock,
    ChevronRight,
    UserSearch
} from 'lucide-react';

const PeopleManagement = ({ setActiveTab: onNavigate }) => {
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
            joinDate: '2023-05-15',
            reasons: 'Superuser access'
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
            joinDate: '2023-08-22',
            reasons: ''
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
            joinDate: '2024-01-10',
            reasons: 'Account inactive for 30 days'
        },
        {
            id: 4,
            name: 'Emma Davis',
            email: 'e.davis@jxg.com',
            role: 'Admin',
            status: 'Reported',
            avatar: 'ED',
            department: 'Operations',
            company: 'Janashakthi Group',
            permissions: 7,
            lastActive: '5 mins ago',
            joinDate: '2023-11-30',
            reasons: 'Suspicious login activity reported',
            reportedDate: '2026-02-10'
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
            joinDate: '2024-02-14',
            reasons: ''
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
        permissions: 3,
        reasons: ''
    });

    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [selectedUserIds, setSelectedUserIds] = useState(new Set());

    const [reportedModalData, setReportedModalData] = useState({ isOpen: false, item: null, details: null });

    const [reasonModalData, setReasonModalData] = useState({ isOpen: false, userId: null, reason: '' });
    const [openFilter, setOpenFilter] = useState(null);
    const [tableFilters, setTableFilters] = useState({
        department: 'All',
        role: 'All',
        status: 'All',
        reasons: 'All'
    });

    const toggleFilter = (filterName) => {
        setOpenFilter(openFilter === filterName ? null : filterName);
    };

    const handleFilterSelect = (type, value) => {
        setTableFilters(prev => ({ ...prev, [type]: value }));
        setOpenFilter(null);
    };

    const uniqueDepartments = ['All', ...new Set(users.map(u => u.department))];
    const uniqueRoles = ['All', ...new Set(users.map(u => u.role))];
    const uniqueStatuses = ['All', ...new Set(users.map(u => u.status))];
    const uniqueReasons = ['All', ...new Set(users.map(u => u.reasons || 'None'))];

    // --- Derived State ---
    const filteredUsers = useMemo(() => {
        let filtered = users.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (user.department && user.department.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesDepartment = tableFilters.department === 'All' || user.department === tableFilters.department;
            const matchesRole = tableFilters.role === 'All' || user.role === tableFilters.role;
            const matchesStatus = tableFilters.status === 'All' || user.status === tableFilters.status;
            const matchesReasons = tableFilters.reasons === 'All' || (user.reasons || 'None') === tableFilters.reasons;

            return matchesSearch && matchesDepartment && matchesRole && matchesStatus && matchesReasons;
        });

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
    }, [users, searchQuery, activeTab, roleFilter, departmentFilter, statusFilter, tableFilters]);



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

    const handleReportedClick = (user) => {
        if (user.status !== 'Reported') return;

        const mockDetails = {
            reportedBy: ['Sarah Wilson', 'System Monitor', 'Admin User', 'Anonymous'][Math.floor(Math.random() * 4)],
            reportedDate: new Date(Date.now() - Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            reason: ['Unauthorized Access Attempt', 'Suspicious Activity', 'Policy Violation', 'Multiple Failed Logins'][Math.floor(Math.random() * 4)],
            description: 'This user account has been flagged for multiple suspicious activities and needs administrative review.'
        };

        setReportedModalData({
            isOpen: true,
            item: user,
            details: mockDetails
        });
    };

    const handleReasonClick = (user) => {
        setReasonModalData({ isOpen: true, userId: user.id, reason: user.reasons || '' });
    };

    const handleSaveReason = () => {
        setUsers(prev => prev.map(user =>
            user.id === reasonModalData.userId ? { ...user, reasons: reasonModalData.reason } : user
        ));
        setReasonModalData({ isOpen: false, userId: null, reason: '' });
    };

    const generateMorePeople = () => {
        const roles = ['User', 'Editor', 'Content Manager', 'Admin', 'Global Admin'];
        const statuses = ['Active', 'Inactive', 'Reported'];
        const departments = ['IT Security', 'Marketing', 'Content', 'Operations', 'Sales', 'HR', 'Finance'];
        const companies = ['Janashakthi Group', 'First Capital', 'Janashakthi Life', 'Janashakthi Insurance'];
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
                avatar: name.split(' ').map(n => n[0]).join('').toUpperCase(),
                department: departments[Math.floor(Math.random() * departments.length)],
                company: companies[Math.floor(Math.random() * companies.length)],
                permissions: Math.floor(Math.random() * 8) + 1,
                lastActive: 'Just now',
                joinDate: new Date().toISOString().split('T')[0],
                reasons: status === 'Reported' ? 'Suspicious activity detected' : '',
                reportedDate: status === 'Reported' ? new Date(Date.now() - Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined
            });
        }
        setUsers([...users, ...newPeople]);
    };

    const toggleUserSelection = (userId) => {
        setSelectedUserIds(prev => {
            const next = new Set(prev);
            if (next.has(userId)) {
                next.delete(userId);
            } else {
                next.add(userId);
            }
            return next;
        });
    };

    const toggleSelectAll = () => {
        if (selectedUserIds.size === filteredUsers.length) {
            setSelectedUserIds(new Set());
        } else {
            setSelectedUserIds(new Set(filteredUsers.map(u => u.id)));
        }
    };

    const handleExportDetails = () => {
        const selectedUsers = users.filter(u => selectedUserIds.has(u.id));
        console.log('Exporting details for:', selectedUsers);
        alert(`Exporting details for ${selectedUsers.length} users. Check console for details.`);
        setIsExportModalOpen(false);
        setSelectedUserIds(new Set());
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
        if (status === 'Reported') return '#f43f5e';
        return status === 'Active' ? '#10b981' : '#64748b';
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
        <div className="p-6 max-w-[1400px] mx-auto font-sans text-slate-800">
            {/* Header Section, nmatched content mgmt header padding */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center lg:min-h-[103px] mb-8 gap-6">
                {/* Left: Breadcrumbs & Title */}
                <div>
                    <div className="text-xs text-slate-500 font-medium mb-1 tracking-wide">
                        <span
                            className="hover:text-orange-500 cursor-pointer transition-colors"
                            onClick={() => onNavigate?.('dashboard')}
                        >
                            Admin
                        </span> &gt; User Management
                    </div>
                    <h1 className="text-3xl font-handwriting font-bold text-slate-800">
                        User Directory
                    </h1>
                </div>

                {/* Export & add user Actions */}
                <div className="page-actions">
                    <button
                        className="page-action-btn primary"
                        onClick={() => setIsExportModalOpen(true)}
                    >
                        <Download size={16} />
                        <span>Export</span>
                    </button>
                    <button
                        className="page-action-btn secondary"
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        <UserPlus size={16} />
                        <span>Add User</span>
                    </button>
                </div>
                {/*How the export and add user buttons were before
                <div className="flex gap-3 ml-auto">
                    <button className="flex items-center gap-2 px-4 py-[10px] bg-[#f1f5f9] text-[#475569] rounded-lg font-semibold text-[13px] hover:bg-[#e2e8f0] transition-all border-none">
                        <Download size={16} />
                        <span>Export</span>
                    </button>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-[10px] bg-gradient-to-br from-orange-500 to-amber-400 text-white rounded-lg font-semibold text-[13px] hover:opacity-90 transition-all border-none shadow-sm"
                    >
                        <UserPlus size={16} />
                        <span>Add User</span>
                    </button>
                </div>*/}
            </div>

            {/* Table Section */}
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
                                <th onClick={() => toggleFilter('reasons')}>
                                    <div className="table-filter-header">
                                        <span>Reasons</span>
                                        <ChevronDown size={14} className={openFilter === 'reasons' ? 'rotate' : ''} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="user-row hover:bg-slate-50">
                                    <td>
                                        <div className="flex items-center gap-4">
                                            <div className="kebab-menu-container relative">
                                                <button
                                                    className="p-1 text-slate-400 hover:text-slate-800 transition-colors"
                                                    onClick={(e) => { e.stopPropagation(); toggleMenu(user.id); }}
                                                >
                                                    <MoreVertical size={20} />
                                                </button>

                                                {activeMenuId === user.id && (
                                                    <div className="kebab-menu-popup">
                                                        <button className="kebab-menu-item" onClick={(e) => { e.stopPropagation(); openEditModal(user); setActiveMenuId(null); }}>
                                                            <Edit2 size={16} /> <span>Edit Details</span>
                                                        </button>
                                                        <button className="kebab-menu-item" onClick={(e) => { e.stopPropagation(); openStatusModal(user); setActiveMenuId(null); }}>
                                                            {user.status === 'Active' ? <UserX size={16} /> : <UserCheck size={16} />}
                                                            <span>{user.status === 'Active' ? 'Suspend Account' : 'Activate Account'}</span>
                                                        </button>
                                                        <button className="kebab-menu-item" onClick={(e) => { e.stopPropagation(); openResetPasswordModal(user); setActiveMenuId(null); }}>
                                                            <Key size={16} /> <span>Reset Password</span>
                                                        </button>
                                                        <div className="kebab-menu-divider"></div>
                                                        <button className="kebab-menu-item text-red-600 hover:bg-red-50" onClick={(e) => { e.stopPropagation(); openDeleteModal(user); setActiveMenuId(null); }}>
                                                            <Trash2 size={16} /> <span>Delete User</span>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                                                style={{ background: getRoleColor(user.role) }}
                                            >
                                                {user.avatar}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-800 text-sm">{user.name}</span>
                                                <span className="text-xs text-slate-500">{user.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td><div className="text-sm font-medium text-slate-600">{user.department}</div></td>
                                    <td>
                                        <span className="px-2 py-1 rounded-lg text-xs font-bold" style={{ backgroundColor: `${getRoleColor(user.role)}15`, color: getRoleColor(user.role) }}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        <div
                                            onClick={(e) => {
                                                if (user.status === 'Reported') {
                                                    e.stopPropagation();
                                                    handleReportedClick(user);
                                                }
                                            }}
                                            className={`flex items-center gap-1.5 ${user.status === 'Reported' ? 'cursor-pointer hover:bg-red-50 px-2 py-1 rounded-full w-fit' : ''}`}
                                        >
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getStatusColor(user.status) }} />
                                            <span className="text-sm font-bold" style={{ color: getStatusColor(user.status) }}>{user.status}</span>
                                            {user.status === 'Reported' && <ChevronRight size={14} className="text-red-500" />}
                                        </div>
                                    </td>
                                    <td onClick={(e) => { e.stopPropagation(); handleReasonClick(user); }} className="cursor-pointer hover:bg-slate-100 transition-colors group relative">
                                        <div className="text-sm text-slate-500 truncate max-w-[150px]" title={user.reasons}>
                                            {user.reasons || <span className="text-slate-300 italic">No reasons...</span>}
                                            <Edit2 size={12} className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-slate-400" />
                                        </div>
                                    </td>

                                </tr>
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
                    <div>
                        Showing {filteredUsers.length > 0 ? 1 : 0} to {filteredUsers.length} of {users.length} results
                    </div>

                    {/* Show More Button */}
                    <button

                        onClick={generateMorePeople}
                        className="show-more-btn"
                    >
                        <ChevronDown size={16} />
                        <span>Show More</span>
                    </button>
                </div>
            </div>


            {/* Modals */}
            <AnimatePresence>
                {(isAddModalOpen || isEditModalOpen) && (
                    <div className="modal-overlay" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="modal-container"
                            onClick={(e) => e.stopPropagation()}
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
                                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
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
                    <div className="modal-overlay" onClick={() => setIsStatusModalOpen(false)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="modal-container"
                            onClick={(e) => e.stopPropagation()}
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
                    <div className="modal-overlay" onClick={() => setIsDeleteModalOpen(false)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="modal-container"
                            onClick={(e) => e.stopPropagation()}
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
                    <div className="modal-overlay" onClick={() => setIsResetPasswordModalOpen(false)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="modal-container"
                            onClick={(e) => e.stopPropagation()}
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
                                    <label className={`reset-method ${resetMethod === 'email' ? 'active' : ''}`}>
                                        <input
                                            type="radio"
                                            name="resetMethod"
                                            value="email"
                                            checked={resetMethod === 'email'}
                                            onChange={() => setResetMethod('email')}
                                            style={{ display: 'none' }}
                                        />
                                        <div className="method-content">
                                            <Mail size={16} />
                                            <span>Send password reset link via email</span>
                                        </div>
                                    </label>
                                    <label className={`reset-method ${resetMethod === 'temp' ? 'active' : ''}`}>
                                        <input
                                            type="radio"
                                            name="resetMethod"
                                            value="temp"
                                            checked={resetMethod === 'temp'}
                                            onChange={() => setResetMethod('temp')}
                                            style={{ display: 'none' }}
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
                                                    type={showTempPassword ? "text" : "password"}
                                                    value={generatedPassword}
                                                    readOnly
                                                    className="form-input"
                                                />
                                                <button
                                                    onClick={() => setShowTempPassword(!showTempPassword)}
                                                    className="password-toggle"
                                                >
                                                    {showTempPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                            <button onClick={generatePass} className="generate-btn">
                                                <Zap size={16} />
                                                <span>Generate Secure Password</span>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="modal-actions">
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
                                        {resetMethod === 'email' ? 'Send Reset Link' : 'Set New Password'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Reported Details Modal */}
                <AnimatePresence>
                    {reportedModalData.isOpen && reportedModalData.details && (
                        <div className="modal-overlay" onClick={() => setReportedModalData({ isOpen: false, item: null, details: null })}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="modal-container max-w-sm"
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="modal-header bg-red-50">
                                    <div className="modal-header-left">
                                        <div className="report-icon text-red-600">
                                            <AlertCircle size={20} />
                                        </div>
                                        <div>
                                            <h3 className="report-title text-red-800">Report Details</h3>
                                            <p className="modal-subtitle">Security flagging information</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setReportedModalData({ isOpen: false, item: null, details: null })} className="report-close-btn text-red-400">
                                        <X size={20} />
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="flex gap-40">
                                        <div>
                                            <p className="text-xs text-slate-500 font-semibold uppercase">Reported By</p>
                                            <p className="text-sm font-medium">{reportedModalData.details.reportedBy}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-semibold uppercase">Reported Date</p>
                                            <p className="text-sm font-medium">{reportedModalData.details.reportedDate}</p>
                                        </div>
                                    </div>
                                    <div>
                                    <p className="text-xs text-slate-500 font-semibold uppercase">Reason</p>
                                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">{reportedModalData.details.reason}</span>
                                </div>
                                <div>
                                    <p className="text-sm italic text-slate-600">"{reportedModalData.details.description}"</p>
                                </div>
                                    <button onClick={() => setReportedModalData({ isOpen: false, item: null, details: null })} className="w-full py-2 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold transition-colors">
                                        Close
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

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
                                            openFilter === 'status' ? uniqueStatuses :
                                                uniqueReasons).map((val) => (
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

                {/* Reason Edit Modal */}
                <AnimatePresence>
                    {reasonModalData.isOpen && (
                        <div className="modal-overlay" onClick={() => setReasonModalData({ isOpen: false, userId: null, reason: '' })}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="modal-container max-w-md"
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="modal-header bg-slate-50/50">
                                    <div className="modal-header-left">
                                        <div className="modal-icon">
                                            <Edit2 size={18} />
                                        </div>
                                        <h3 className="modal-title">Edit Reasons / Notes</h3>
                                    </div>
                                    <button onClick={() => setReasonModalData({ isOpen: false, userId: null, reason: '' })} className="modal-close-btn">
                                        <X size={20} />
                                    </button>
                                </div>
                                <div className="p-6">
                                    <textarea
                                        value={reasonModalData.reason}
                                        onChange={(e) => setReasonModalData(prev => ({ ...prev, reason: e.target.value }))}
                                        rows={4}
                                        className="form-input h-32 w-full resize-none"
                                        placeholder="Add reason for being reported or user notes..."
                                        autoFocus
                                    />
                                    <div className="flex justify-end gap-3 mt-6">
                                        <button onClick={() => setReasonModalData({ isOpen: false, userId: null, reason: '' })} className="cancel-btn">
                                            Cancel
                                        </button>
                                        <button onClick={handleSaveReason} className="submit-btn px-8">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </AnimatePresence>

            {/* Export Modal */}
            <AnimatePresence>
                {isExportModalOpen && (
                    <div className="modal-backdrop" onClick={() => setIsExportModalOpen(false)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="linkedin-editor modal-content export-modal-wide"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <header className="editor-header">
                                <div className="header-top">
                                    <div className="edit-label">Export User Data</div>
                                    <div className="header-right">
                                        <div className="header-info">{selectedUserIds.size} users selected</div>
                                        <div className="header-buttons">
                                            <button
                                                className="btn-secondary"
                                                onClick={toggleSelectAll}
                                            >
                                                {selectedUserIds.size === filteredUsers.length ? 'Deselect All' : 'Select All'}
                                            </button>
                                            <button className="btn-secondary" onClick={() => setIsExportModalOpen(false)}>Close</button>
                                        </div>
                                    </div>
                                </div>
                            </header>

                            <div className="editor-main">
                                <div className="editor-content no-padding">
                                    <div className="export-table-container">
                                        <table className="export-data-table">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: '40px' }}></th>
                                                    <th>User</th>
                                                    <th>Department</th>
                                                    <th>Role</th>
                                                    <th>Status</th>
                                                    <th>Reasons</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredUsers.map(user => (
                                                    <tr
                                                        key={user.id}
                                                        className={selectedUserIds.has(user.id) ? 'selected' : ''}
                                                        onClick={() => toggleUserSelection(user.id)}
                                                    >
                                                        <td>
                                                            <div className={`custom-checkbox ${selectedUserIds.has(user.id) ? 'checked' : ''}`}>
                                                                {selectedUserIds.has(user.id) && <CheckCircle2 size={14} />}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="export-user-cell">
                                                                <span className="user-name">{user.name}</span>
                                                                <span className="user-email">{user.email}</span>
                                                            </div>
                                                        </td>
                                                        <td>{user.department}</td>
                                                        <td>{user.role}</td>
                                                        <td>{user.status}</td>
                                                        <td className="truncate-cell">{user.reasons || '-'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="modal-footer">
                                <button
                                    className="btn-primary large"
                                    onClick={handleExportDetails}
                                    disabled={selectedUserIds.size === 0}
                                >
                                    <Download size={18} />
                                    <span>Export Details</span>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style>{`
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
                .user-table { width: 100%; border-collapse: collapse; }
                .user-table th {
                    padding: 1rem 1.5rem;
                    background: #f8fafc;
                    color: #64748b;
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    text-align: left;
                    border-bottom: 1px solid #e2e8f0;
                }
                .user-table td {
                    padding: 1rem 1.5rem;
                    border-bottom: 1px solid #f1f5f9;
                    font-size: 13px;
                    color: #334155;
                    vertical-align: middle;
                }
                .user-row { transition: all 0.2s; }
                .user-row:hover { background: #fffaf5; }

                .kebab-menu-container { position: relative; }
                .kebab-menu-popup {
                    position: absolute;
                    top: 100%;
                    margin-top: 4px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                    z-index: 1000;
                    min-width: 200px;
                    overflow: hidden;
                    animation: menuSlideIn 0.2s ease-out;
                    padding: 4px;
                }
                @keyframes menuSlideIn {
                    from { opacity: 0; transform: translateY(-10px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .kebab-menu-item {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px 12px;
                    background: white;
                    border: none;
                    text-align: left;
                    font-size: 13px;
                    font-weight: 600;
                    color: #475569;
                    cursor: pointer;
                    transition: all 0.2s;
                    border-radius: 8px;
                }
                .kebab-menu-item:hover { background: #f8fafc; color: #0f172a; }
                .kebab-menu-divider { height: 1px; background: #f1f5f9; margin: 4px; }
                
                /* Modal Styles */
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 23, 42, 0.4);
                    backdrop-filter: blur(8px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    padding: 1.5rem;
                }
                .modal-container {
                    background: white;
                    border-radius: 20px;
                    width: 100%;
                    max-width: 520px;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                }
                .modal-header {
                    padding: 1.5rem 1.75rem;
                    border-bottom: 1px solid #f1f5f9;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    position: sticky;
                    top: 0;
                    background: white;
                    z-index: 10;
                }
                .modal-header-left {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                .modal-body {
                    
                    padding: 1.5rem 1.75rem;
                    gap: .5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .modal-icon {
                    width: 44px;
                    height: 44px;
                    background: #f8fafc;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #475569;
                    border: 1px solid #f1f5f9;
                }

                .report-icon {
                    width: 44px;
                    height: 44px;
                    background: #fef2f2;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #ef4444;
                    border: 1px solid #fee2e2;
                }
                .report-title {
                    font-size: 20px;
                    font-weight: 800;
                    color: #ef4444;
                }
                .report-close-btn {
                    padding: 8px;
                    color: #d55a5aff;
                    cursor: pointer;
                    border-radius: 8px;
                    transition: all 0.2s;
                }

                .modal-icon.delete { background: #fef2f2; color: #ef4444; border-color: #fee2e2; }
                .modal-title { font-size: 20px; font-weight: 800; color: #0f172a; }
                .modal-subtitle { font-size: 13px; color: #64748b; font-weight: 500; }
                
                .modal-close-btn {
                    padding: 8px;
                    color: #94a3b8;
                    cursor: pointer;
                    border-radius: 8px;
                    transition: all 0.2s;
                }
                .modal-close-btn:hover { background: #f1f5f9; color: #475569; }

                .modal-form { padding: 1.75rem; }
                .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; margin-bottom: 1.5rem; }
                .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
                .form-label { font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
                .form-input, .form-select {
                    padding: 12px 16px;
                    border: 2px solid #f1f5f9;
                    border-radius: 12px;
                    font-size: 14px;
                    color: #0f172a;
                    background: #f8fafc;
                    transition: all 0.2s;
                    font-weight: 500;
                }
                .form-input:focus, .form-select:focus {
                    outline: none;
                    border-color: #f97316;
                    background: white;
                    box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1);
                }

                .permissions-slider {
                    display: flex;
                    align-items: center;
                    gap: 1.25rem;
                    background: #f8fafc;
                    padding: 14px 16px;
                    border-radius: 12px;
                    border: 2px solid #f1f5f9;
                }
                .range-input { flex: 1; accent-color: #f97316; }
                .permissions-value { font-size: 14px; font-weight: 800; color: #f97316; min-width: 60px; }

                .modal-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1rem; }
                .cancel-btn {
                    flex: 1;
                    padding: 12px;
                    font-size: 14px; font-weight: 700;
                    color: #475569;
                    background: #f1f5f9;
                    border: none;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .cancel-btn:hover { background: #e2e8f0; color: #0f172a; }
                
                .submit-btn {
                    flex: 1.2;
                    padding: 12px;
                    font-size: 14px; font-weight: 700;
                    color: white;
                    background: #1e293b;
                    border: none;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.2s;
                    box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.2);
                }
                .submit-btn:hover { transform: translateY(-1px); box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.3); }
                .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

                .delete-btn {
                    flex: 1.2;
                    padding: 12px;
                    font-size: 14px; font-weight: 700;
                    color: white;
                    background: #ef4444;
                    border: none;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .delete-btn:hover { background: #dc2626; transform: translateY(-1px); }
                .delete-btn:disabled { opacity: 0.5; cursor: not-allowed; }

                .member-summary {
                    background: #f8fafc;
                    border-radius: 16px;
                    padding: 1.25rem;
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                    border: 2px solid #f1f5f9;
                }
                .summary-item { display: flex; flex-direction: column; gap: 4px; }
                .summary-label { font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
                .summary-value { font-size: 14px; font-weight: 700; color: #1e293b; }

                .reset-methods { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem; }
                .reset-method {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    border-radius: 12px;
                    border: 2px solid #f1f5f9;
                    cursor: pointer;
                    transition: all 0.2s;
                    background: #f8fafc;
                }
                .reset-method:hover { border-color: #e2e8f0; }
                .reset-method.active { border-color: #f97316; background: #fff7ed; }
                .method-content { display: flex; align-items: center; gap: 0.75rem; font-size: 14px; font-weight: 600; color: #475569; }
                .reset-method.active .method-content { color: #f97316; }

                .reset-explanation {
                    padding: 1rem;
                    background: #f0f9ff;
                    border-radius: 12px;
                    color: #0369a1;
                    font-size: 13px;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 1.5rem;
                }

                .temp-password-section {
                    background: #f8fafc;
                    padding: 1.25rem;
                    border-radius: 16px;
                    border: 2px solid #f1f5f9;
                }
                .password-input-wrapper { display: flex; gap: 0.5rem; margin-bottom: 1rem; position: relative; }
                .password-input { flex: 1; font-family: monospace; letter-spacing: 1px; font-weight: 700; }
                .password-actions { display: flex; gap: 0.5rem; }
                .password-btn {
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: white;
                    border: 2px solid #f1f5f9;
                    border-radius: 10px;
                    color: #64748b;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .password-btn:hover { background: #f1f5f9; color: #1e293b; }
                
                .generate-btn {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    padding: 10px;
                    background: white;
                    border: 2px solid #fed7aa;
                    border-radius: 10px;
                    color: #f97316;
                    font-size: 13px;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .generate-btn:hover { background: #f97316; color: white; border-color: #f97316; }

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
                    font-size: 13px;
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
                }
                .show-more-btn:hover {
                    background: #f1f5f9;
                }
                .show-more-btn svg {
                    transition: transform 0.2s;
                }
                .show-more-btn:hover svg {
                    transform: translateY(-2px);
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

                /* Export Modal Specifics */
                .export-modal-wide {
                    max-width: 1000px;
                    width: 95%;
                    display: flex;
                    flex-direction: column;
                }
                .no-padding { padding: 0 !important; }
                .export-table-container {
                    max-height: 50vh;
                    overflow-y: auto;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    margin: 20px;
                }
                .export-data-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 13px;
                }
                .export-data-table th {
                    position: sticky;
                    top: 0;
                    background: #f8fafc;
                    padding: 12px 16px;
                    text-align: left;
                    font-weight: 700;
                    color: #64748b;
                    text-transform: uppercase;
                    font-size: 11px;
                    border-bottom: 1px solid #e2e8f0;
                    z-index: 1;
                }
                .export-data-table td {
                    padding: 12px 16px;
                    border-bottom: 1px solid #f1f5f9;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .export-data-table tr:hover td {
                    background: #f8fafc;
                }
                .export-data-table tr.selected td {
                    background: #fff7ed;
                }
                .export-user-cell {
                    display: flex;
                    flex-direction: column;
                }
                .export-user-cell .user-name {
                    font-weight: 700;
                    color: #0f172a;
                }
                .export-user-cell .user-email {
                    font-size: 11px;
                    color: #64748b;
                }
                .truncate-cell {
                    max-width: 200px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                
                /* Custom Checkbox */
                .custom-checkbox {
                    width: 20px;
                    height: 20px;
                    border: 2px solid #cbd5e1;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    transition: all 0.2s;
                    background: white;
                }
                .custom-checkbox.checked {
                    background: #f97316;
                    border-color: #f97316;
                }

                .modal-footer {
                    padding: 16px 24px;
                    border-top: 1px solid #e2e8f0;
                    background: white;
                    display: flex;
                    justify-content: flex-end;
                    border-radius: 0 0 12px 12px;
                }
                
                .btn-primary.large {
                    padding: 12px 24px;
                    font-size: 15px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    border-radius: 8px;
                }

                /* Reuse/Adapt EditPage.jsx styles */
                .modal-backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(15, 23, 42, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    backdrop-filter: blur(8px);
                }

                .modal-content {
                    background-color: #f8f9fa;
                    border-radius: 12px;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                }

                .editor-header {
                    background-color: #fff;
                    border-bottom: 1px solid #e0e0e0;
                }

                .header-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 16px 24px;
                }

                .edit-label {
                    font-size: 20px;
                    font-weight: 600;
                    color: #000;
                }

                .header-right {
                    display: flex;
                    align-items: center;
                    gap: 24px;
                }

                .header-info {
                    color: #64748b;
                    font-size: 14px;
                    font-weight: 500;
                }

                .header-buttons {
                    display: flex;
                    gap: 8px;
                }

                .btn-primary {
                    background-color: #0a66c2;
                    color: white;
                    padding: 8px 16px;
                    border-radius: 4px;
                    font-size: 14px;
                    font-weight: 600;
                    border: none;
                    cursor: pointer;
                    transition: background 0.2s;
                }

                .btn-primary:hover {
                    background-color: #004182;
                }

                .btn-secondary {
                    background-color: transparent;
                    color: #64748b;
                    border: 1px solid #cbd5e1;
                    padding: 8px 16px;
                    border-radius: 4px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .btn-secondary:hover {
                    background-color: #f1f5f9;
                    border-color: #94a3b8;
                }

                .editor-main {
                    padding: 0;
                }

                .editor-content {
                    background-color: #fff;
                    margin: 20px;
                    border-radius: 8px;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                }

            `}</style>
        </div>
    );
};

export default PeopleManagement;