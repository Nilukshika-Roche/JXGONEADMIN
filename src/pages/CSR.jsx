import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Clock,
    MoreVertical,
    Edit2,
    Trash2,
    Eye,
    CheckCircle2,
    AlertCircle,
    Calendar,
    MapPin,
    Users,
    ChevronDown,
    ChevronRight,
    EyeOff,
    UserX,
    Check,
    BarChart,
    Leaf,
    PauseCircle,
    PlayCircle,
    X,
    Briefcase,
    TrendingUp,
    FileText,
    Heart
} from 'lucide-react';

const CSR = ({ setActiveTab: onNavigate }) => {
    // --- Mock Data ---
    const [projects, setProjects] = useState([
        {
            id: 1,
            title: 'Beach Cleanup Drive',
            createdBy: 'Sarah Johnson',
            publishedOn: '2026-01-15',
            department: 'HR Department',
            openTo: 'All Employees',
            initiativeDate: '2026-02-15',
            status: 'Ongoing',
            participants: 45,
            notes: 'Joint initiative with local community'
        },
        {
            id: 2,
            title: 'Tech Education Workshop',
            createdBy: 'Michael Chen',
            publishedOn: new Date().toISOString().split('T')[0],
            department: 'IT',
            openTo: 'Technical Staff',
            initiativeDate: '2026-03-10',
            status: 'Upcoming',
            participants: 12,
            notes: 'Teaching basic coding to students'
        },
        {
            id: 3,
            title: 'Blood Donation Camp',
            createdBy: 'Emily Davis',
            publishedOn: '2026-01-20',
            department: 'Operations',
            openTo: 'All Employees',
            initiativeDate: '2026-02-28',
            status: 'Ongoing',
            participants: 80,
            notes: 'In partnership with Red Cross'
        },
        {
            id: 4,
            title: 'Sustainability Audit',
            createdBy: 'David Wilson',
            publishedOn: '2026-01-18',
            department: 'Management',
            openTo: 'Managers Only',
            initiativeDate: '2026-04-01',
            status: 'Reported',
            participants: 5,
            notes: 'Budget concerns raised'
        },
        {
            id: 5,
            title: 'Tree Planting Day',
            createdBy: 'Lisa Anderson',
            publishedOn: new Date().toISOString().split('T')[0],
            department: 'Marketing',
            openTo: 'Volunteers',
            initiativeDate: '2026-03-21',
            status: 'Upcoming',
            participants: 150,
            notes: 'Aiming for 500 trees'
        }
    ]);

    // --- State ---
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [previewItem, setPreviewItem] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editFormData, setEditFormData] = useState(null);
    const [showParticipantsModal, setShowParticipantsModal] = useState(false);
    const [selectedProjectForParticipants, setSelectedProjectForParticipants] = useState(null);
    const [reportedModalData, setReportedModalData] = useState({ isOpen: false, item: null, details: null });
    const [openFilter, setOpenFilter] = useState(null);
    const [tableFilters, setTableFilters] = useState({
        department: 'All',
        openTo: 'All',
        status: 'All',
        initiativeDate: '',
        participants: { min: '', max: '' }
    });

    const toggleFilter = (filterName) => {
        setOpenFilter(openFilter === filterName ? null : filterName);
    };

    const handleFilterSelect = (type, value) => {
        setTableFilters(prev => ({ ...prev, [type]: value }));
        setOpenFilter(null);
    };

    const uniqueDepartments = ['All', ...new Set(projects.map(p => p.department))];
    const uniqueOpenTos = ['All', ...new Set(projects.map(p => p.openTo))];
    const uniqueStatuses = ['All', ...new Set(projects.map(p => p.status))];
    const uniqueInitiativeDates = ['All', ...new Set(projects.map(p => p.initiativeDate))];
    const uniqueParticipantsCounts = ['All', ...new Set(projects.map(p => p.participants))];

    // Mock Participants Data Generator
    const generateParticipants = (count) => {
        const names = ['Sarah Wilson', 'Michael Chen', 'Emma Davis', 'James Wilson', 'Lisa Anderson', 'David Miller', 'Jennifer Taylor', 'Robert Martinez'];
        const roles = ['Team Lead', 'Volunteer', 'Coordinator', 'Member', 'Organizer'];
        const departments = ['Marketing', 'HR', 'Engineering', 'Sales', 'Finance'];

        return Array.from({ length: Math.min(count, 8) }, (_, i) => ({
            id: i + 1,
            name: names[i % names.length],
            role: roles[i % roles.length],
            department: departments[i % departments.length],
            joinedAt: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            avatar: names[i % names.length].charAt(0)
        }));
    };

    // --- Derived State ---
    const filteredProjects = useMemo(() => {
        let filtered = projects.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.openTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.notes.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesDepartment = tableFilters.department === 'All' || item.department === tableFilters.department;
            const matchesOpenTo = tableFilters.openTo === 'All' || item.openTo === tableFilters.openTo;
            const matchesStatus = tableFilters.status === 'All' || item.status === tableFilters.status;
            const matchesInitiativeDate = !tableFilters.initiativeDate || item.initiativeDate === tableFilters.initiativeDate;

            const participantCount = parseInt(item.participants);
            const minPart = tableFilters.participants.min === '' ? -Infinity : parseInt(tableFilters.participants.min);
            const maxPart = tableFilters.participants.max === '' ? Infinity : parseInt(tableFilters.participants.max);
            const matchesParticipants = participantCount >= minPart && participantCount <= maxPart;

            return matchesSearch && matchesDepartment && matchesOpenTo && matchesStatus && matchesInitiativeDate && matchesParticipants;
        });

        if (activeTab === 'ongoing') {
            filtered = filtered.filter(item => item.status === 'Ongoing');
        } else if (activeTab === 'upcoming') {
            filtered = filtered.filter(item => item.status === 'Upcoming');
        } else if (activeTab === 'reported') {
            filtered = filtered.filter(item => item.status === 'Reported');
        }

        return filtered;
    }, [projects, searchQuery, activeTab, tableFilters]);

    const summaryStats = useMemo(() => {
        return {
            ongoing: projects.filter(e => e.status === 'Ongoing').length,
            upcoming: projects.filter(e => e.status === 'Upcoming').length,
            reported: projects.filter(e => e.status === 'Reported').length
        };
    }, [projects]);

    const toggleMenu = (id) => {
        setActiveMenuId(activeMenuId === id ? null : id);
    };

    // Close menu when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (activeMenuId && !event.target.closest('.kebab-menu-container')) {
                setActiveMenuId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeMenuId]);

    // Menu action handlers
    const handleViewParticipants = (item) => {
        const count = parseInt(item.participants) || 0;
        const participants = generateParticipants(count);
        setSelectedProjectForParticipants({ ...item, participantList: participants });
        setShowParticipantsModal(true);
        setActiveMenuId(null);
    };

    const handleViewInitiative = (item) => {
        setPreviewItem(item);
        setEditFormData(item);
        setIsEditMode(false);
        setActiveMenuId(null);
    };

    const handleEditInitiative = (item) => {
        setPreviewItem(item);
        setEditFormData(item);
        setIsEditMode(true);
        setActiveMenuId(null);
    };

    const handleStartEdit = () => {
        setIsEditMode(true);
    };

    const handleCancelEdit = () => {
        setEditFormData(previewItem);
        setIsEditMode(false);
    };

    const handleSaveEdit = () => {
        setProjects(prevProjects =>
            prevProjects.map(item =>
                item.id === editFormData.id ? { ...editFormData } : item
            )
        );
        setPreviewItem(editFormData);
        setIsEditMode(false);
    };

    const handleFormChange = (field, value) => {
        setEditFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleDeleteProject = (item) => {
        if (window.confirm(`⚠️ WARNING: Are you sure you want to permanently delete "${item.title}"? This action cannot be undone.`)) {
            setProjects(prevProjects =>
                prevProjects.filter(project => project.id !== item.id)
            );
            if (previewItem?.id === item.id) {
                setPreviewItem(null);
            }
            setActiveMenuId(null);
            alert(`Project "${item.title}" has been permanently deleted.`);
        }
    };

    const handlePauseCloseInitiative = (item) => {
        const action = item.status === 'Ongoing' ? 'Pause' : 'Close';
        const newStatus = item.status === 'Ongoing' ? 'Reported' : 'Reported'; // Simplification: Using 'Reported' as a placeholder for closed/paused state or we could add 'Paused' status
        // More robust logic:
        // If Ongoing -> Pause (maybe change status to 'Reported' or custom 'Paused')
        // If Reported/Upcoming -> Close? 
        // For this requirement, let's toggle between Ongoing and Reported (acts as paused) or just alert for now.

        // Let's implement a simple toggle for demonstration or a confirmation.
        // If user wants to "Pause/Close", let's assume they want to stop it.

        if (window.confirm(`Are you sure you want to pause/close "${item.title}"?`)) {
            setProjects(prevProjects =>
                prevProjects.map(project =>
                    project.id === item.id ? { ...project, status: 'Reported' } : project
                )
            );
            setActiveMenuId(null);
            alert(`Initiative "${item.title}" has been paused/closed.`);
        }
    };

    const handleApproveInitiative = (item) => {
        setProjects(prevProjects =>
            prevProjects.map(project =>
                project.id === item.id ? { ...project, status: 'Ongoing' } : project
            )
        );
        setActiveMenuId(null);
        alert(`Initiative "${item.title}" has been approved and set to Ongoing.`);
    };

    const handleReportedClick = (item) => {
        if (item.status !== 'Reported') return;

        // Mock data generation
        const mockDetails = {
            reportedBy: ['John Doe', 'Jane Smith', 'Admin User', 'Anonymous'][Math.floor(Math.random() * 4)],
            reportedDate: new Date(Date.now() - Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            reason: ['Inappropriate content', 'Spam / Misleading', 'Policy violation', 'Budget concerns'][Math.floor(Math.random() * 4)],
            description: 'User reported this project due to concerns about resources and compliance.'
        };

        setReportedModalData({
            isOpen: true,
            item: item,
            details: mockDetails
        });
    };

    // Generate more projects
    const generateMoreProjects = () => {
        const projectTitles = [
            'Community Health Check',
            'Sponsor a Student',
            'Park Renovation',
            'Food Bank Support',
            'Digital Literacy Drive',
            'Youth Mentorship',
            'Clean Energy Initiative',
            'Elderly Care Visit',
            'Recycling Campaign',
            'Skill Development Workshop'
        ];
        const departments = ['HR', 'Marketing', 'Sales', 'IT', 'Operations', 'Management', 'Finance'];
        const creators = ['Sarah Johnson', 'Michael Chen', 'Emily Davis', 'David Wilson', 'Lisa Anderson', 'James Taylor', 'Maria Garcia'];
        const openToOptions = [
            'All Employees',
            'Managers Only',
            'Volunteers',
            'Technical Staff',
            'Senior Leadership',
            'Department Specific'
        ];
        const statuses = ['Ongoing', 'Upcoming', 'Reported'];

        const newProjects = [];
        const currentMaxId = Math.max(...projects.map(p => p.id));

        for (let i = 1; i <= 5; i++) {
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            const daysAgo = Math.floor(Math.random() * 30);
            const daysFuture = Math.floor(Math.random() * 60) + 1;

            newProjects.push({
                id: currentMaxId + i,
                title: projectTitles[Math.floor(Math.random() * projectTitles.length)] + ' ' + (currentMaxId + i),
                createdBy: creators[Math.floor(Math.random() * creators.length)],
                publishedOn: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                department: departments[Math.floor(Math.random() * departments.length)],
                openTo: openToOptions[Math.floor(Math.random() * openToOptions.length)],
                initiativeDate: new Date(Date.now() + daysFuture * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                status: randomStatus,
                participants: Math.floor(Math.random() * 200) + 10,
                notes: randomStatus === 'Reported' ? 'Flagged for review' :
                    randomStatus === 'Ongoing' ? 'Project in progress' :
                        'Planning phase'
            });
        }

        setProjects(prevProjects => [...prevProjects, ...newProjects]);
    };

    return (
        <div className="p-6 max-w-[1400px] mx-auto font-sans text-slate-800">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">

                {/* Left: Breadcrumbs & Title */}
                <div>
                    <div className="text-xs text-slate-500 font-medium mb-1 tracking-wide">
                        <span
                            className="hover:text-orange-500 cursor-pointer transition-colors"
                            onClick={() => onNavigate?.('dashboard')}
                        >
                            Admin
                        </span> &gt; CSR Management
                    </div>
                    <h1 className="text-3xl font-handwriting font-bold text-slate-800">
                        CSR Projects
                    </h1>
                </div>

                {/* Right: Summary Cards */}
                {/* Right: Summary Cards */}
                <div className="metrics ml-auto">
                    {/* Ongoing Initiatives Card - Blue */}
                    <motion.div
                        whileHover={{ y: -4 }}
                        onClick={() => setActiveTab(activeTab === 'ongoing' ? 'all' : 'ongoing')}
                        className={`metric blue ${activeTab === 'ongoing' ? 'active' : ''}`}
                    >
                        <div className="metric-bg"></div>
                        <div className="metric-content">
                            <div className="metric-header">
                                <div className="metric-icon">
                                    <Clock size={16} />
                                </div>
                                <div className="metric-trend">
                                    <TrendingUp size={12} />
                                    <span>+8%</span>
                                </div>
                            </div>
                            <div className="metric-body">
                                <p className="metric-label">Ongoing Initiatives</p>
                                <h3 className="metric-value">{summaryStats.ongoing}</h3>
                            </div>
                        </div>
                        <div className="metric-progress">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "65%" }}
                                className="metric-progress-fill"
                            />
                        </div>
                    </motion.div>

                    {/* Upcoming Initiatives Card - Amber */}
                    <motion.div
                        whileHover={{ y: -4 }}
                        onClick={() => setActiveTab(activeTab === 'upcoming' ? 'all' : 'upcoming')}
                        className={`metric amber ${activeTab === 'upcoming' ? 'active' : ''}`}
                    >
                        <div className="metric-bg"></div>
                        <div className="metric-content">
                            <div className="metric-header">
                                <div className="metric-icon">
                                    <Calendar size={16} />
                                </div>
                                <div className="metric-trend">
                                    <TrendingUp size={12} />
                                    <span>+15%</span>
                                </div>
                            </div>
                            <div className="metric-body">
                                <p className="metric-label">Upcoming Initiatives</p>
                                <h3 className="metric-value">{summaryStats.upcoming}</h3>
                            </div>
                        </div>
                        <div className="metric-progress">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "40%" }}
                                className="metric-progress-fill"
                            />
                        </div>
                    </motion.div>

                    {/* Reported Card - Red */}
                    <motion.div
                        whileHover={{ y: -4 }}
                        onClick={() => setActiveTab(activeTab === 'reported' ? 'all' : 'reported')}
                        className={`metric red ${activeTab === 'reported' ? 'active' : ''}`}
                    >
                        <div className="metric-bg"></div>
                        <div className="metric-content">
                            <div className="metric-header">
                                <div className="metric-icon">
                                    <AlertCircle size={16} />
                                </div>
                                <div className="metric-trend">
                                    <TrendingUp size={12} />
                                    <span>+0%</span>
                                </div>
                            </div>
                            <div className="metric-body">
                                <p className="metric-label">Reported</p>
                                <h3 className="metric-value">{summaryStats.reported}</h3>
                            </div>
                        </div>
                        <div className="metric-progress">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "10%" }}
                                className="metric-progress-fill"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Table Section */}
            <div className="user-table-card">



                <div className="table-container">
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th style={{ width: '40%' }}>
                                    <div className="table-filter-header" style={{ cursor: 'default' }}>
                                        Initiative
                                        <div className="table-search-container">
                                            <Search size={16} className="table-search-icon" />
                                            <input
                                                type="text"
                                                placeholder="Search initiatives..."
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
                                    <div className="table-filter-header" onClick={() => toggleFilter('openTo')}>
                                        <span>Open To</span>
                                        <ChevronDown size={14} className={openFilter === 'openTo' ? 'rotate' : ''} />
                                    </div>
                                </th>
                                <th onClick={() => toggleFilter('initiativeDate')}>
                                    <div className="table-filter-header">
                                        <span>Initiative Date</span>
                                        <ChevronDown size={14} className={openFilter === 'initiativeDate' ? 'rotate' : ''} />
                                    </div>
                                </th>
                                <th onClick={() => toggleFilter('status')}>
                                    <div className="table-filter-header">
                                        <span>Status</span>
                                        <ChevronDown size={14} className={openFilter === 'status' ? 'rotate' : ''} />
                                    </div>
                                </th>
                                <th onClick={() => toggleFilter('participants')}>
                                    <div className="table-filter-header">
                                        <span>Participants</span>
                                        <ChevronDown size={14} className={openFilter === 'participants' ? 'rotate' : ''} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProjects.map((item) => (
                                <tr key={item.id} className="user-row hover:bg-slate-50">
                                    <td>
                                        <div className="flex items-center gap-4">
                                            {/* Menu Dots with Popup */}
                                            <div className="kebab-menu-container relative">
                                                <button
                                                    className="p-1 text-slate-400 hover:text-slate-800 transition-colors"
                                                    onClick={(e) => { e.stopPropagation(); toggleMenu(item.id); }}
                                                >
                                                    <MoreVertical size={20} />
                                                </button>

                                                {/* Dropdown Menu Popup */}
                                                {activeMenuId === item.id && (
                                                    <div className="kebab-menu-popup">
                                                        <button
                                                            className="kebab-menu-item"
                                                            onClick={() => handleViewInitiative(item)}
                                                        >
                                                            <Eye size={16} />
                                                            <span>View Initiative</span>
                                                        </button>
                                                        <button
                                                            className="kebab-menu-item"
                                                            onClick={() => handleEditInitiative(item)}
                                                        >
                                                            <Edit2 size={16} />
                                                            <span>Edit Initiative</span>
                                                        </button>
                                                        <div className="kebab-menu-divider"></div>
                                                        <button
                                                            className="kebab-menu-item text-amber-600 hover:bg-amber-50"
                                                            onClick={() => handlePauseCloseInitiative(item)}
                                                        >
                                                            <PauseCircle size={16} />
                                                            <span>Pause/Close Initiative</span>
                                                        </button>
                                                        <button
                                                            className="kebab-menu-item text-emerald-600 hover:bg-emerald-50"
                                                            onClick={() => handleApproveInitiative(item)}
                                                        >
                                                            <CheckCircle2 size={16} />
                                                            <span>Approve Initiative</span>
                                                        </button>
                                                        <div className="kebab-menu-divider"></div>
                                                        <button
                                                            className="kebab-menu-item text-red-600 hover:bg-red-50"
                                                            onClick={() => handleDeleteProject(item)}
                                                        >
                                                            <Trash2 size={16} />
                                                            <span>Delete Initiative</span>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Icon */}
                                            <div className="w-12 h-12 rounded-lg bg-emerald-100 border border-emerald-200 flex-shrink-0 flex items-center justify-center">
                                                <Leaf size={24} className="text-emerald-600" />
                                            </div>

                                            {/* Project Details */}
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-800 text-sm">{item.title}</span>
                                                <span className="text-xs text-slate-500">Created by {item.createdBy}</span>
                                                <span className="text-xs text-slate-400">Published on {item.publishedOn}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-sm font-medium text-slate-600">{item.department}</div>
                                    </td>
                                    <td>
                                        <div className="text-sm font-medium text-slate-600">{item.openTo}</div>
                                    </td>
                                    <td>
                                        <div className="text-sm font-medium text-slate-600">
                                            {item.initiativeDate}
                                        </div>
                                    </td>
                                    <td>
                                        <span
                                            onClick={(e) => {
                                                if (item.status === 'Reported') {
                                                    e.stopPropagation();
                                                    handleReportedClick(item);
                                                }
                                            }}
                                            className={`inline-flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-full ${item.status === 'Reported' ? 'text-red-600 bg-red-50 cursor-pointer hover:bg-red-100' :
                                                item.status === 'Ongoing' ? 'text-blue-600 bg-blue-50' :
                                                    item.status === 'Upcoming' ? 'text-amber-600 bg-amber-50' :
                                                        'text-slate-600 bg-slate-100'
                                                }`}>
                                            {item.status}
                                            {item.status === 'Reported' && <ChevronRight size={14} />}
                                        </span>
                                    </td>
                                    <td>
                                        <div
                                            className="flex items-center gap-1 text-sm text-slate-600 font-medium cursor-pointer hover:text-blue-600 transition-colors group"
                                            onClick={(e) => { e.stopPropagation(); handleViewParticipants(item); }}
                                        >
                                            <Users size={14} className="text-slate-400 group-hover:text-blue-600" />
                                            <span className="group-hover:underline">{item.participants} Participants</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredProjects.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <Heart size={32} />
                        </div>
                        <h3>No Projects found</h3>
                        <p>Try adjusting your search terms</p>
                    </div>
                )}

                {/* Footer */}
                <div className="showing">
                    <div>
                        Showing {filteredProjects.length > 0 ? 1 : 0} to {filteredProjects.length} of {projects.length} results
                    </div>
                    <button
                        onClick={generateMoreProjects}
                        className="show-more-btn"
                    >
                        <ChevronDown size={16} />
                        <span>Show More</span>
                    </button>
                </div>
            </div>

            {/* Participants Modal */}
            <AnimatePresence>
                {showParticipantsModal && selectedProjectForParticipants && (
                    <div className="modal-overlay" onClick={() => setShowParticipantsModal(false)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="modal-container max-w-lg"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="modal-header">
                                <div className="modal-header-left">
                                    <div className="modal-icon">
                                        <Users size={20} />
                                    </div>
                                    <div>
                                        <h3 className="modal-title">Participants</h3>
                                        <p className="modal-subtitle">
                                            {selectedProjectForParticipants.title} • {selectedProjectForParticipants.participantList.length} Members
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowParticipantsModal(false)}
                                    className="modal-close-btn"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="modal-body overflow-y-auto max-h-[60vh]">
                                <div className="space-y-2">
                                    {selectedProjectForParticipants.participantList.length > 0 ? (
                                        selectedProjectForParticipants.participantList.map((user, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-100 transition-all">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                                                    {user.avatar}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="text-sm font-bold text-slate-700">{user.name}</h4>
                                                        <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full border border-slate-200">
                                                            {user.role}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="text-xs text-slate-500 flex items-center gap-1">
                                                            <Briefcase size={10} /> {user.department}
                                                        </span>
                                                        <span className="text-[10px] text-slate-300">•</span>
                                                        <span className="text-xs text-slate-400">Joined {user.joinedAt}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-10 text-slate-400">
                                            <Users size={48} className="mx-auto mb-3 opacity-20" />
                                            <p>No participants yet</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="modal-form bg-slate-50/50 border-t border-slate-100">
                                <button
                                    onClick={() => setShowParticipantsModal(false)}
                                    className="submit-btn w-full"
                                >
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
                                {openFilter === 'initiativeDate' ? (
                                    <div className="p-2">
                                        <input
                                            type="date"
                                            className="form-input w-full"
                                            value={tableFilters.initiativeDate}
                                            onChange={(e) => setTableFilters(prev => ({ ...prev, initiativeDate: e.target.value }))}
                                        />
                                        {tableFilters.initiativeDate && (
                                            <button
                                                className="mt-2 text-xs text-orange-600 font-bold hover:underline"
                                                onClick={() => setTableFilters(prev => ({ ...prev, initiativeDate: '' }))}
                                            >
                                                Clear Date
                                            </button>
                                        )}
                                    </div>
                                ) : openFilter === 'participants' ? (
                                    <div className="p-4 space-y-4">
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <label className="text-[10px] font-bold text-slate-500 uppercase">Min</label>
                                                <input
                                                    type="number"
                                                    className="form-input w-full"
                                                    placeholder="0"
                                                    value={tableFilters.participants.min}
                                                    onChange={(e) => setTableFilters(prev => ({
                                                        ...prev,
                                                        participants: { ...prev.participants, min: e.target.value }
                                                    }))}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label className="text-[10px] font-bold text-slate-500 uppercase">Max</label>
                                                <input
                                                    type="number"
                                                    className="form-input w-full"
                                                    placeholder="Max"
                                                    value={tableFilters.participants.max}
                                                    onChange={(e) => setTableFilters(prev => ({
                                                        ...prev,
                                                        participants: { ...prev.participants, max: e.target.value }
                                                    }))}
                                                />
                                            </div>
                                        </div>
                                        <div className="pt-2">
                                            <input
                                                type="range"
                                                className="range-input w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                                min="0"
                                                max="500"
                                                step="1"
                                                value={tableFilters.participants.max || 500}
                                                onChange={(e) => setTableFilters(prev => ({
                                                    ...prev,
                                                    participants: { ...prev.participants, max: e.target.value }
                                                }))}
                                            />
                                        </div>
                                        <button
                                            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs transition-colors"
                                            onClick={() => setTableFilters(prev => ({ ...prev, participants: { min: '', max: '' } }))}
                                        >
                                            Reset Range
                                        </button>
                                    </div>
                                ) : (
                                    (openFilter === 'department' ? uniqueDepartments :
                                        openFilter === 'openTo' ? uniqueOpenTos :
                                            uniqueStatuses).map((val) => (
                                                <button
                                                    key={val}
                                                    className={`filter-option ${tableFilters[openFilter] === val ? 'active' : ''}`}
                                                    onClick={() => handleFilterSelect(openFilter, val)}
                                                >
                                                    {val}
                                                </button>
                                            ))
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Preview Modal */}
            <AnimatePresence>
                {previewItem && (
                    <div className="modal-overlay" onClick={() => setPreviewItem(null)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="modal-container max-w-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="modal-header">
                                <div className="modal-header-left">
                                    <div className="modal-icon">
                                        <Leaf size={20} className="text-emerald-600" />
                                    </div>
                                    <div>
                                        <h3 className="modal-title">{previewItem.title}</h3>
                                        <p className="modal-subtitle">Project Details</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setPreviewItem(null)}
                                    className="modal-close-btn"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="modal-form">
                                {isEditMode ? (
                                    <div className="space-y-6">
                                        <div className="form-group">
                                            <label className="form-label">Project Title</label>
                                            <input
                                                type="text"
                                                value={editFormData?.title || ''}
                                                onChange={(e) => handleFormChange('title', e.target.value)}
                                                className="form-input text-lg font-bold"
                                            />
                                        </div>

                                        <div className="form-grid">
                                            <div className="form-group">
                                                <label className="form-label">Department</label>
                                                <input
                                                    type="text"
                                                    value={editFormData?.department || ''}
                                                    disabled
                                                    className="form-input opacity-70"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Status</label>
                                                <select
                                                    value={editFormData?.status || ''}
                                                    onChange={(e) => handleFormChange('status', e.target.value)}
                                                    className="form-select"
                                                >
                                                    <option value="Ongoing">Ongoing</option>
                                                    <option value="Upcoming">Upcoming</option>
                                                    <option value="Reported">Reported</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Notes</label>
                                            <textarea
                                                value={editFormData?.notes || ''}
                                                onChange={(e) => handleFormChange('notes', e.target.value)}
                                                className="form-textarea"
                                                placeholder="Add notes about this project..."
                                            />
                                        </div>

                                        <div className="modal-actions">
                                            <button onClick={handleCancelEdit} className="cancel-btn">Cancel</button>
                                            <button onClick={handleSaveEdit} className="submit-btn flex items-center justify-center gap-2">
                                                <Check size={18} />
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {/* Icon Preview */}
                                        <div className="w-full h-48 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl border border-emerald-300 flex items-center justify-center">
                                            <div className="text-center">
                                                <Leaf size={64} className="mx-auto mb-2 text-emerald-600" />
                                                <p className="text-sm text-emerald-700 font-semibold">{previewItem.openTo} Initiative</p>
                                            </div>
                                        </div>

                                        <div className="form-grid">
                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                <p className="form-label mb-1">Department</p>
                                                <p className="text-sm font-bold text-slate-800">{previewItem.department}</p>
                                            </div>
                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                <p className="form-label mb-1">Open To</p>
                                                <p className="text-sm font-bold text-slate-800">{previewItem.openTo}</p>
                                            </div>
                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                <p className="form-label mb-1">Status</p>
                                                <span className={`status-badge ${previewItem.status.toLowerCase()}`}>
                                                    {previewItem.status}
                                                </span>
                                            </div>
                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                <p className="form-label mb-1">Initiative Date</p>
                                                <p className="text-sm font-bold text-slate-800">{previewItem.initiativeDate}</p>
                                            </div>
                                        </div>

                                        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                                            <p className="text-xs font-bold text-emerald-800 uppercase tracking-wide mb-2">Notes</p>
                                            <p className="text-sm text-emerald-900 leading-relaxed">{previewItem.notes}</p>
                                        </div>

                                        <div className="modal-actions">
                                            <button
                                                onClick={handleStartEdit}
                                                className="submit-btn flex items-center justify-center gap-2"
                                            >
                                                <Edit2 size={16} />
                                                Edit Project
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProject(previewItem)}
                                                className="cancel-btn text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center justify-center gap-2"
                                            >
                                                <Trash2 size={16} />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>


            <AnimatePresence>
                {reportedModalData.isOpen && reportedModalData.details && (
                    <div className="reported-overlay" onClick={() => setReportedModalData({ isOpen: false, item: null, details: null })}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="reported-container max-w-sm"
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

            <style>{`
                /* Copied Styles from ContentManagement.jsx */
                .metrics {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(140px, 1fr));
                    gap: 0.5rem;
                    width: 100%;
                    max-width: 540px;
                }
                .metric {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 10px;
                    padding: 0.75rem;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.03);
                    transition: all 0.3s ease;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    min-height: 90px;
                }
                .metric:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.08);
                }
                .metric.active {
                    border-width: 2px;
                }
                
                /* Color Variants */
                .metric.emerald { background: #f0fdf4; border-color: #bbf7d0; }
                .metric.emerald.active { border-color: #10b981; }
                .metric.amber { background: #fffbeb; border-color: #fde68a; }
                .metric.amber.active { border-color: #f59e0b; }
                .metric.red { background: #fef2f2; border-color: #fecaca; }
                .metric.red.active { border-color: #ef4444; }

                /* Blue Variant for CSR */
                .metric.blue { background: #eff6ff; border-color: #bfdbfe; }
                .metric.blue.active { border-color: #3b82f6; }

                .metric-bg {
                    position: absolute;
                    top: -20px;
                    right: -20px;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    filter: blur(10px);
                    opacity: 0.5;
                }
                .metric.emerald .metric-bg { background: rgba(16, 185, 129, 0.2); }
                .metric.amber .metric-bg { background: rgba(245, 158, 11, 0.2); }
                .metric.red .metric-bg { background: rgba(239, 68, 68, 0.2); }
                .metric.blue .metric-bg { background: rgba(59, 130, 246, 0.2); }

                .metric-content {
                    position: relative;
                    z-index: 1;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .metric-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 4px;
                }
                .metric-icon {
                    padding: 6px;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .metric.emerald .metric-icon { background: #dcfce7; color: #059669; }
                .metric.amber .metric-icon { background: #fef3c7; color: #d97706; }
                .metric.red .metric-icon { background: #fee2e2; color: #dc2626; }
                .metric.blue .metric-icon { background: #dbeafe; color: #2563eb; }

                .metric-icon svg {
                    width: 16px;
                    height: 16px;
                }
                .metric-trend {
                    display: flex;
                    align-items: center;
                    gap: 3px;
                    padding: 2px 6px;
                    border-radius: 20px;
                    font-size: 10px;
                    font-weight: 700;
                }
                .metric.emerald .metric-trend { background: #d1fae5; color: #065f46; }
                .metric.amber .metric-trend { background: #ffedd5; color: #9a3412; }
                .metric.red .metric-trend { background: #fee2e2; color: #991b1b; }
                .metric.blue .metric-trend { background: #dbeafe; color: #1e40af; }

                .metric-body {
                    display: flex;
                    flex-direction: column;
                    gap: 0px;
                }
                .metric-label {
                    font-size: 10px;
                    font-weight: 600;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin: 0;
                }
                .metric-value {
                    font-size: 20px;
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
                    background: rgba(0,0,0,0.05);
                }
                .metric-progress-fill {
                    height: 100%;
                    transition: width 1s ease-out;
                }
                .metric.emerald .metric-progress-fill { background: #10b981; }
                .metric.amber .metric-progress-fill { background: #f59e0b; }
                .metric.red .metric-progress-fill { background: #ef4444; }
                .metric.blue .metric-progress-fill { background: #3b82f6; }

                /* User Table Card Styles */
                .user-table-card {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                    overflow: hidden; /* Ensure menus aren't clipped */
                    margin-top: 1.5rem;
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
                    vertical-align: middle;
                }
                .user-row {
                    transition: background-color 0.2s;
                }
                .user-row:hover {
                    background: #fffaf5;
                }

                /* Kebab Menu Popup Styles */
                .kebab-menu-container {
                    position: relative;
                }
                .kebab-menu-popup {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    margin-top: 4px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05);
                    z-index: 1000;
                    min-width: 180px;
                    overflow: hidden;
                    animation: menuSlideIn 0.15s ease-out;
                }
                @keyframes menuSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-8px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .kebab-menu-item {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px 14px;
                    background: white;
                    border: none;
                    text-align: left;
                    font-size: 13px;
                    font-weight: 500;
                    color: #334155;
                    cursor: pointer;
                    transition: all 0.15s ease;
                }
                .kebab-menu-item:hover {
                    background: #f8fafc;
                }
                .kebab-menu-item svg {
                    flex-shrink: 0;
                }
                .kebab-menu-divider {
                    height: 1px;
                    background: #e2e8f0;
                    margin: 4px 0;
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

                /* Standardized Modal Styles */
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 23, 42, 0.4);
                    backdrop-filter: blur(8px);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
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
                .modal-title { font-size: 20px; font-weight: 800; color: #0f172a; }
                .modal-subtitle { font-size: 13px; color: #64748b; font-weight: 500; }
                
                .modal-close-btn {
                    padding: 8px;
                    color: #94a3b8;
                    cursor: pointer;
                    border-radius: 8px;
                    transition: all 0.2s;
                    background: none;
                    border: none;
                }
                .modal-close-btn:hover { background: #f1f5f9; color: #475569; }

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

                .modal-body {
                    padding: 1.5rem 1.75rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }

                /* Form Styles for Edit Mode */
                .modal-form { padding: 1.75rem; }
                .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; margin-bottom: 1.5rem; }
                .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
                .form-label { font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
                .form-input, .form-select, .form-textarea {
                    padding: 12px 16px;
                    border: 2px solid #f1f5f9;
                    border-radius: 12px;
                    font-size: 14px;
                    color: #0f172a;
                    background: #f8fafc;
                    transition: all 0.2s;
                    font-weight: 500;
                }
                .form-input:focus, .form-select:focus, .form-textarea:focus {
                    outline: none;
                    border-color: #f97316;
                    background: white;
                    box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1);
                }
                .form-textarea { resize: none; min-height: 100px; }

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

                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 4px 12px;
                    border-radius: 9999px;
                    font-size: 12px;
                    font-weight: 700;
                }
                .status-badge.ongoing { color: #2563eb; background: #eff6ff; }
                .status-badge.upcoming { color: #d97706; background: #fffbeb; }
                .status-badge.reported { color: #dc2626; background: #fef2f2; }

                /* Preserving Reported Modal (LEGACY) */
                .reported-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(4px);
                    z-index: 9998;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                }
                .reported-container {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                    overflow: hidden;
                    max-width: 500px;
                    width: 100%;
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
                    background: none;
                    border: none;
                }
                .report-close-btn:hover { background: rgba(239, 68, 68, 0.1); }

            `}</style>
        </div >
    );
};

export default CSR;
