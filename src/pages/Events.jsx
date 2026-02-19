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
    X,
    TrendingUp,
    FileText,
    Calendar1,
    CalendarSearch
} from 'lucide-react';

const Events = ({ setActiveTab: onNavigate }) => {
    // --- Mock Data ---
    const [events, setEvents] = useState([
        {
            id: 1,
            title: 'Annual Company Gala',
            createdBy: 'Sarah Johnson',
            publishedOn: '2026-01-15',
            department: 'HR Department',
            requirement: 'Formal venue with catering',
            status: 'ongoing',
            date: '2026-02-15',
            time: '18:00',
            attendees: 150,
            capacity: 200,
            notes: 'Formal attire required'
        },
        {
            id: 2,
            title: 'Team Building Workshop',
            createdBy: 'Michael Chen',
            publishedOn: new Date().toISOString(),
            department: 'Operations',
            requirement: 'Team activities and materials',
            status: 'Published',
            date: new Date().toISOString(),
            time: '14:00',
            attendees: 25,
            capacity: 30,
            notes: 'Published today'
        },
        {
            id: 3,
            title: 'Product Launch Event',
            createdBy: 'Emily Davis',
            publishedOn: '2026-01-20',
            department: 'Marketing',
            requirement: 'AV equipment and stage setup',
            status: 'pending',
            date: '2026-03-01',
            time: '10:00',
            attendees: 0,
            capacity: 300,
            notes: 'Press invited'
        },
        {
            id: 4,
            title: 'Quarterly Review Meeting',
            createdBy: 'David Wilson',
            publishedOn: '2026-01-18',
            department: 'Management',
            requirement: 'Presentation equipment',
            status: 'Reported',
            date: '2026-02-20',
            time: '09:00',
            attendees: 0,
            capacity: 500,
            notes: 'Flagged for inappropriate content'
        },
        {
            id: 5,
            title: 'Training Session',
            createdBy: 'Lisa Anderson',
            publishedOn: new Date().toISOString(),
            department: 'IT',
            requirement: 'Virtual meeting platform',
            status: 'Published',
            date: new Date().toISOString(),
            time: '15:00',
            attendees: 45,
            capacity: 50,
            notes: 'Published today - Online via Zoom'
        }
    ]);

    // --- State ---
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [previewItem, setPreviewItem] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editFormData, setEditFormData] = useState(null);
    const [noteModalData, setNoteModalData] = useState({ isOpen: false, itemId: null, note: '' });
    const [reportedModalData, setReportedModalData] = useState({ isOpen: false, item: null, details: null });
    const [openFilter, setOpenFilter] = useState(null);
    const [tableFilters, setTableFilters] = useState({
        department: 'All',
        requirement: 'All',
        status: 'All',
        date: '',
        notes: 'All'
    });

    const toggleFilter = (filterName) => {
        setOpenFilter(openFilter === filterName ? null : filterName);
    };

    const handleFilterSelect = (type, value) => {
        setTableFilters(prev => ({ ...prev, [type]: value }));
        setOpenFilter(null);
    };

    const uniqueDepartments = ['All', ...new Set(events.map(e => e.department))];
    const uniqueRequirements = ['All', ...new Set(events.map(e => e.requirement))];
    const uniqueStatuses = ['All', ...new Set(events.map(e => e.status))];
    const uniqueDates = ['All', ...new Set(events.map(e => e.date))];
    const uniqueNotes = ['All', ...new Set(events.map(e => e.notes))];

    const isWithin24Hours = (dateStr) => {
        const postedDate = new Date(dateStr);
        const now = new Date();
        return (now - postedDate) <= 24 * 60 * 60 * 1000 && (now - postedDate) >= 0;
    };

    // --- Derived State ---
    const filteredEvents = useMemo(() => {
        let filtered = events.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.requirement.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item.notes || '').toLowerCase().includes(searchQuery.toLowerCase());

            const matchesDepartment = tableFilters.department === 'All' || item.department === tableFilters.department;
            const matchesRequirement = tableFilters.requirement === 'All' || item.requirement === tableFilters.requirement;
            const matchesStatus = tableFilters.status === 'All' || item.status === tableFilters.status;
            const matchesDate = !tableFilters.date || item.date === tableFilters.date;
            const matchesNotes = tableFilters.notes === 'All' || item.notes === tableFilters.notes;

            return matchesSearch && matchesDepartment && matchesRequirement && matchesStatus && matchesDate && matchesNotes;
        });

        if (activeTab === 'published_today') {
            filtered = filtered.filter(item => item.status === 'Published' && isWithin24Hours(item.publishedOn));
        } else if (activeTab === 'ongoing') {
            filtered = filtered.filter(item => item.status === 'ongoing');
        } else if (activeTab === 'pending') {
            filtered = filtered.filter(item => item.status === 'pending');
        } else if (activeTab === 'reported') {
            filtered = filtered.filter(item => item.status === 'Reported');
        }

        return filtered;
    }, [events, searchQuery, activeTab, tableFilters]);

    const summaryStats = useMemo(() => {
        return {
            published_today: events.filter(e => e.status === 'Published' && isWithin24Hours(e.publishedOn)).length,
            ongoing: events.filter(e => e.status === 'ongoing').length,
            pending: events.filter(e => e.status === 'pending').length,
            reported: events.filter(e => e.status === 'Reported').length
        };
    }, [events]);

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
    const handleViewEvent = (item) => {
        setPreviewItem(item);
        setEditFormData(item);
        setIsEditMode(false);
        setActiveMenuId(null);
    };

    const handleEditEvent = (item) => {
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
        setEvents(prevEvents =>
            prevEvents.map(item =>
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

    const handleCancelEvent = (item) => {
        if (window.confirm(`Are you sure you want to cancel "${item.title}"?`)) {
            setEvents(prevEvents =>
                prevEvents.map(event =>
                    event.id === item.id ? { ...event, status: 'Cancelled' } : event
                )
            );
            setActiveMenuId(null);
            alert(`Event "${item.title}" has been cancelled.`);
        }
    };

    const handleDeleteEvent = (item) => {
        if (window.confirm(`âš ï¸ WARNING: Are you sure you want to permanently delete "${item.title}"? This action cannot be undone.`)) {
            setEvents(prevEvents =>
                prevEvents.filter(event => event.id !== item.id)
            );
            if (previewItem?.id === item.id) {
                setPreviewItem(null);
            }
            setActiveMenuId(null);
            alert(`Event "${item.title}" has been permanently deleted.`);
        }
    };

    const handleConfirmEvent = (item) => {
        if (window.confirm(`Confirm event "${item.title}"?`)) {
            setEvents(prevEvents =>
                prevEvents.map(event =>
                    event.id === item.id ? { ...event, status: 'ongoing' } : event
                )
            );
            if (previewItem?.id === item.id) {
                setPreviewItem({ ...item, status: 'ongoing' });
                setEditFormData({ ...item, status: 'ongoing' });
            }
            setActiveMenuId(null);
            alert(`Event "${item.title}" has been confirmed.`);
        }
    };

    const handleAnalytics = (item) => {
        console.log('View analytics for:', item);
        alert(`Analytics view for "${item.title}" - This feature will show event statistics and metrics.`);
        setActiveMenuId(null);
    };

    const handleNoteClick = (item) => {
        setNoteModalData({ isOpen: true, itemId: item.id, note: item.notes || '' });
    };

    const handleSaveNote = () => {
        setEvents(prev => prev.map(item =>
            item.id === noteModalData.itemId ? { ...item, notes: noteModalData.note } : item
        ));
        setNoteModalData({ isOpen: false, itemId: null, note: '' });
    };

    const handleReportedClick = (item) => {
        if (item.status !== 'Reported') return;

        // Mock data generation
        const mockDetails = {
            reportedBy: ['John Doe', 'Jane Smith', 'Admin User', 'Anonymous'][Math.floor(Math.random() * 4)],
            reportedDate: new Date(Date.now() - Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            reason: ['Inappropriate event', 'Spam / Misleading', 'Policy violation', 'Security concern'][Math.floor(Math.random() * 4)],
            description: 'This event has been flagged and needs administrative review.'
        };

        setReportedModalData({
            isOpen: true,
            item: item,
            details: mockDetails
        });
    };

    // Generate more events
    const generateMoreEvents = () => {
        const eventTitles = [
            'Leadership Summit',
            'Networking Mixer',
            'Innovation Forum',
            'Client Appreciation Day',
            'Workshop Series',
            'Town Hall Meeting',
            'Award Ceremony',
            'Community Outreach',
            'Industry Conference',
            'Charity Fundraiser'
        ];
        const departments = ['HR', 'Marketing', 'Sales', 'IT', 'Operations', 'Management', 'Finance'];
        const creators = ['Sarah Johnson', 'Michael Chen', 'Emily Davis', 'David Wilson', 'Lisa Anderson', 'James Taylor', 'Maria Garcia'];
        const requirements = [
            'AV equipment and stage setup',
            'Virtual meeting platform',
            'Catering and venue',
            'Team activities and materials',
            'Presentation equipment',
            'Conference facilities'
        ];
        const statuses = ['Published', 'ongoing', 'pending', 'Reported'];

        const newEvents = [];
        const currentMaxId = Math.max(...events.map(e => e.id));

        for (let i = 1; i <= 5; i++) {
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            const capacity = Math.floor(Math.random() * 400) + 50;
            const daysAgo = Math.floor(Math.random() * 30);

            newEvents.push({
                id: currentMaxId + i,
                title: eventTitles[Math.floor(Math.random() * eventTitles.length)] + ' ' + (currentMaxId + i),
                createdBy: creators[Math.floor(Math.random() * creators.length)],
                publishedOn: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                department: departments[Math.floor(Math.random() * departments.length)],
                requirement: requirements[Math.floor(Math.random() * requirements.length)],
                status: randomStatus,
                date: new Date(Date.now() + Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                time: `${Math.floor(Math.random() * 12) + 8}:00`,
                attendees: randomStatus === 'ongoing' ? Math.floor(Math.random() * capacity) : 0,
                capacity: capacity,
                notes: randomStatus === 'Reported' ? 'Flagged for review' :
                    randomStatus === 'Published' ? 'Published today' :
                        randomStatus === 'ongoing' ? 'Active event - Open for registration' : 'Awaiting confirmation'
            });
        }

        setEvents(prevEvents => [...prevEvents, ...newEvents]);
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
                        </span> &gt; Events Management
                    </div>
                    <h1 className="text-3xl font-handwriting font-bold text-slate-800">
                        Events Management
                    </h1>
                </div>

                {/* Right: Summary Cards */}
                <div className="metrics ml-auto">
                    {/* Published Today Card */}
                    <motion.div
                        whileHover={{ y: -4 }}
                        onClick={() => setActiveTab(activeTab === 'published_today' ? 'all' : 'published_today')}
                        className={`metric emerald ${activeTab === 'published_today' ? 'active' : ''}`}
                    >
                        <div className="metric-bg"></div>
                        <div className="metric-content">
                            <div className="metric-header">
                                <div className="metric-icon">
                                    <CheckCircle2 size={16} />
                                </div>
                                <div className="metric-trend">
                                    <TrendingUp size={12} />
                                    <span>+12%</span>
                                </div>
                            </div>
                            <div className="metric-body">
                                <p className="metric-label">Published Today</p>
                                <h3 className="metric-value">{summaryStats.published_today}</h3>
                            </div>
                        </div>
                        <div className="metric-progress">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "70%" }}
                                className="metric-progress-fill"
                            />
                        </div>
                    </motion.div>

                    {/* Ongoing Events Card */}
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
                                <p className="metric-label">Ongoing Events</p>
                                <h3 className="metric-value">{summaryStats.ongoing}</h3>
                            </div>
                        </div>
                        <div className="metric-progress">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "55%" }}
                                className="metric-progress-fill"
                            />
                        </div>
                    </motion.div>

                    {/* Pending Reviews Card */}
                    <motion.div
                        whileHover={{ y: -4 }}
                        onClick={() => setActiveTab(activeTab === 'pending' ? 'all' : 'pending')}
                        className={`metric amber ${activeTab === 'pending' ? 'active' : ''}`}
                    >
                        <div className="metric-bg"></div>
                        <div className="metric-content">
                            <div className="metric-header">
                                <div className="metric-icon">
                                    <AlertCircle size={16} />
                                </div>
                                <div className="metric-trend">
                                    <TrendingUp size={12} />
                                    <span>+5%</span>
                                </div>
                            </div>
                            <div className="metric-body">
                                <p className="metric-label">Pending Reviews</p>
                                <h3 className="metric-value">{summaryStats.pending}</h3>
                            </div>
                        </div>
                        <div className="metric-progress">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "45%" }}
                                className="metric-progress-fill"
                            />
                        </div>
                    </motion.div>

                    {/* Reported Events Card */}
                    <motion.div
                        whileHover={{ y: -4 }}
                        onClick={() => setActiveTab(activeTab === 'reported' ? 'all' : 'reported')}
                        className={`metric red ${activeTab === 'reported' ? 'active' : ''}`}
                    >
                        <div className="metric-bg"></div>
                        <div className="metric-content">
                            <div className="metric-header">
                                <div className="metric-icon">
                                    <X size={16} />
                                </div>
                                <div className="metric-trend">
                                    <TrendingUp size={12} />
                                    <span>+2%</span>
                                </div>
                            </div>
                            <div className="metric-body">
                                <p className="metric-label">Reported Events</p>
                                <h3 className="metric-value">{summaryStats.reported}</h3>
                            </div>
                        </div>
                        <div className="metric-progress">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "15%" }}
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
                                        Event
                                        <div className="table-search-container">
                                            <Search size={16} className="table-search-icon" />
                                            <input
                                                type="text"
                                                placeholder="Search events..."
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
                                    <div className="table-filter-header" onClick={() => toggleFilter('requirement')}>
                                        <span>Requirement</span>
                                        <ChevronDown size={14} className={openFilter === 'requirement' ? 'rotate' : ''} />
                                    </div>
                                </th>
                                <th>
                                    <div className="table-filter-header" onClick={() => toggleFilter('date')}>
                                        <span>Date</span>
                                        <ChevronDown size={14} className={openFilter === 'date' ? 'rotate' : ''} />
                                    </div>
                                </th>
                                <th>
                                    <div className="table-filter-header" onClick={() => toggleFilter('status')}>
                                        <span>Status</span>
                                        <ChevronDown size={14} className={openFilter === 'status' ? 'rotate' : ''} />
                                    </div>
                                </th>
                                <th>
                                    <div className="table-filter-header" onClick={() => toggleFilter('notes')}>
                                        <span>Notes</span>
                                        <ChevronDown size={14} className={openFilter === 'notes' ? 'rotate' : ''} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEvents.map((item) => (
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
                                                            onClick={() => handleViewEvent(item)}
                                                        >
                                                            <Eye size={16} />
                                                            <span>More Details</span>
                                                        </button>
                                                        <button
                                                            className="kebab-menu-item text-red-600 hover:bg-red-50"
                                                            onClick={() => handleDeleteEvent(item)}
                                                        >
                                                            <Trash2 size={16} />
                                                            <span>Delete</span>
                                                        </button>
                                                        <div className="kebab-menu-divider"></div>
                                                        <button
                                                            className="kebab-menu-item text-blue-600 hover:bg-blue-50"
                                                            onClick={() => handleAnalytics(item)}
                                                        >
                                                            <BarChart size={16} />
                                                            <span>Analytics</span>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Event Icon */}
                                            <div className="w-12 h-12 rounded-lg bg-blue-100 border border-blue-200 flex-shrink-0 flex items-center justify-center">
                                                <Calendar size={24} className="text-blue-600" />
                                            </div>

                                            {/* Event Details */}
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
                                        <div className="text-sm font-medium text-slate-600">{item.requirement}</div>
                                    </td>
                                    <td>
                                        <div className="text-sm font-medium text-slate-600">
                                            <div>{item.date}</div>
                                            <div className="text-xs text-slate-500">{item.time}</div>
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
                                                item.status === 'Published' ? 'text-emerald-600 bg-emerald-50' :
                                                    item.status === 'ongoing' ? 'text-blue-600 bg-blue-50' :
                                                        item.status === 'pending' ? 'text-amber-600 bg-amber-50' :
                                                            'text-slate-600 bg-slate-100'
                                                }`}>
                                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                            {item.status === 'Reported' && <ChevronRight size={14} />}
                                        </span>
                                    </td>
                                    <td onClick={(e) => { e.stopPropagation(); handleNoteClick(item); }} className="cursor-pointer hover:bg-slate-100 transition-colors group relative">
                                        <div className="text-xs text-slate-500 italic pr-6" title={item.notes}>
                                            {item.notes}
                                        </div>
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Edit2 size={12} className="text-slate-400" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredEvents.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <CalendarSearch size={32} />
                        </div>
                        <h3>No Events found</h3>
                        <p>Try adjusting your search terms</p>
                    </div>
                )}

                {/* Footer */}
                <div className="showing">
                    <div>
                        Showing {filteredEvents.length > 0 ? 1 : 0} to {filteredEvents.length} of {events.length} results
                    </div>
                    <button
                        onClick={generateMoreEvents}
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
                                {openFilter === 'date' ? (
                                    <div className="p-2">
                                        <input
                                            type="date"
                                            className="form-input w-full"
                                            value={tableFilters.date}
                                            onChange={(e) => setTableFilters(prev => ({ ...prev, date: e.target.value }))}
                                        />
                                        {tableFilters.date && (
                                            <button
                                                className="mt-2 text-xs text-orange-600 font-bold hover:underline"
                                                onClick={() => setTableFilters(prev => ({ ...prev, date: '' }))}
                                            >
                                                Clear Date
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    (openFilter === 'department' ? uniqueDepartments :
                                        openFilter === 'requirement' ? uniqueRequirements :
                                            openFilter === 'status' ? uniqueStatuses :
                                                uniqueNotes).map((val) => (
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



            {/* Event Preview/Edit Modal */}
            <AnimatePresence>
                {previewItem && (
                    <div className="modal-overlay" onClick={() => setPreviewItem(null)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.3 }}
                            className="modal-container"
                            style={{ maxWidth: '600px' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="modal-header">
                                <div className="modal-header-left">
                                    <div className="modal-icon">
                                        <Calendar size={20} />
                                    </div>
                                    <div>
                                        <h3 className="modal-title">
                                            {isEditMode ? 'Edit Event Details' : previewItem.title}
                                        </h3>
                                        <p className="modal-subtitle">
                                            {isEditMode ? 'Update event information and settings' : 'Event Information Preview'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => { setPreviewItem(null); setIsEditMode(false); }}
                                    className="modal-close-btn"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Content */}
                            {isEditMode ? (
                                <div className="modal-form">
                                    <div className="form-grid">
                                        <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                            <label className="form-label">Event Title</label>
                                            <input
                                                required
                                                type="text"
                                                value={editFormData?.title || ''}
                                                onChange={(e) => handleFormChange('title', e.target.value)}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Department</label>
                                            <input
                                                type="text"
                                                value={editFormData?.department || ''}
                                                onChange={(e) => handleFormChange('department', e.target.value)}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Requirement</label>
                                            <input
                                                type="text"
                                                value={editFormData?.requirement || ''}
                                                onChange={(e) => handleFormChange('requirement', e.target.value)}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Status</label>
                                            <select
                                                value={editFormData?.status || ''}
                                                onChange={(e) => handleFormChange('status', e.target.value)}
                                                className="form-select"
                                            >
                                                <option value="Published">Published</option>
                                                <option value="ongoing">Ongoing</option>
                                                <option value="pending">Pending</option>
                                                <option value="Reported">Reported</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Date</label>
                                            <input
                                                type="text"
                                                value={editFormData?.date || ''}
                                                onChange={(e) => handleFormChange('date', e.target.value)}
                                                className="form-input"
                                                placeholder="e.g. 15 Oct, 2024"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Attendees</label>
                                            <input
                                                type="number"
                                                value={editFormData?.attendees || ''}
                                                onChange={(e) => handleFormChange('attendees', e.target.value)}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Capacity</label>
                                            <input
                                                type="number"
                                                value={editFormData?.capacity || ''}
                                                onChange={(e) => handleFormChange('capacity', e.target.value)}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                            <label className="form-label">Notes</label>
                                            <textarea
                                                rows={3}
                                                value={editFormData?.notes || ''}
                                                onChange={(e) => handleFormChange('notes', e.target.value)}
                                                className="form-textarea"
                                                placeholder="Add notes about this event..."
                                            />
                                        </div>
                                    </div>

                                    <div className="modal-actions">
                                        <button
                                            type="button"
                                            onClick={handleCancelEdit}
                                            className="cancel-btn"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleSaveEdit}
                                            className="submit-btn"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="modal-body">
                                    {/* Event Icon Preview */}
                                    <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl border border-blue-300 flex items-center justify-center mb-2">
                                        <div className="text-center">
                                            <Calendar size={48} className="mx-auto mb-2 text-blue-600" />
                                            <p className="text-sm text-blue-700 font-semibold">{previewItem.status} Event</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-50 p-4 rounded-lg">
                                            <p className="form-label mb-1">Department</p>
                                            <p className="text-sm font-bold text-slate-800">{previewItem.department}</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-lg">
                                            <p className="form-label mb-1">Requirement</p>
                                            <p className="text-sm font-bold text-slate-800">{previewItem.requirement}</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-lg">
                                            <p className="form-label mb-1">Status</p>
                                            <span className={`status-badge ${previewItem.status.toLowerCase()}`}>
                                                {previewItem.status.charAt(0).toUpperCase() + previewItem.status.slice(1)}
                                            </span>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-lg">
                                            <p className="form-label mb-1">Date & Time</p>
                                            <p className="text-sm font-bold text-slate-800">{previewItem.date} at {previewItem.time}</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-lg">
                                            <p className="form-label mb-1">Capacity</p>
                                            <p className="text-sm font-bold text-slate-800">{previewItem.attendees} / {previewItem.capacity} People</p>
                                        </div>
                                    </div>

                                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                                        <p className="form-label mb-1 text-amber-800">Notes</p>
                                        <p className="text-sm text-amber-900 leading-relaxed">{previewItem.notes}</p>
                                    </div>

                                    <div className="modal-actions">
                                        <button
                                            onClick={handleStartEdit}
                                            className="cancel-btn flex items-center justify-center gap-2"
                                            style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
                                        >
                                            <Edit2 size={16} />
                                            Edit Event
                                        </button>
                                        <button
                                            onClick={() => handleConfirmEvent(previewItem)}
                                            className="submit-btn flex items-center justify-center gap-2"
                                            style={{ background: '#059669' }}
                                        >
                                            <CheckCircle2 size={16} />
                                            Approve
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Note Edit Modal */}
            <AnimatePresence>
                {noteModalData.isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setNoteModalData({ isOpen: false, itemId: null, note: '' })}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                            onClick={() => setNoteModalData({ isOpen: false, itemId: null, note: '' })}
                        >
                            <div
                                className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                    <h3 className="text-lg font-bold text-slate-800">Edit Note</h3>
                                    <button
                                        onClick={() => setNoteModalData({ isOpen: false, itemId: null, note: '' })}
                                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                                <div className="p-6">
                                    <textarea
                                        value={noteModalData.note}
                                        onChange={(e) => setNoteModalData(prev => ({ ...prev, note: e.target.value }))}
                                        rows={4}
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none text-slate-700 font-medium"
                                        placeholder="Add a note..."
                                        autoFocus
                                    />
                                </div>
                                <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex gap-3">
                                    <button
                                        onClick={() => setNoteModalData({ isOpen: false, itemId: null, note: '' })}
                                        className="flex-1 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-sm transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveNote}
                                        className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-lg shadow-blue-200"
                                    >
                                        Save Note
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>


            {/* Reported Content Modal */}
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
                            <div className="modal-header">
                                <div className="modal-header-left">
                                    <div className="report-icon text-red-600">
                                        <AlertCircle size={20} />
                                    </div>
                                    <div>
                                        <h3 className="report-title text-red-800">Report Details</h3>
                                        <p className="modal-subtitle">Security flagging information</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setReportedModalData({ isOpen: false, item: null, details: null })}
                                    className="report-close-btn text-red-400"
                                >
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

                                <button
                                    onClick={() => setReportedModalData({ isOpen: false, item: null, details: null })}
                                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style>{`
                .metrics {
                    display: grid;
                    grid-template-columns: repeat(4, minmax(140px, 1fr));
                    gap: 0.5rem;
                    width: 100%;
                    max-width: 720px;
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
                .metric.emerald {background: #f0fdf4; border-color: #bbf7d0; }
                .metric.emerald.active {border-color: #10b981; }
                .metric.amber {background: #fffbeb; border-color: #fde68a; }
                .metric.amber.active {border-color: #f59e0b; }
                .metric.red {background: #fef2f2; border-color: #fecaca; }
                .metric.red.active {border-color: #ef4444; }

                /* Blue Variant for Events */
                .metric.blue {background: #eff6ff; border-color: #bfdbfe; }
                .metric.blue.active {border-color: #3b82f6; }

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
                .metric.emerald .metric-bg {background: rgba(16, 185, 129, 0.2); }
                .metric.amber .metric-bg {background: rgba(245, 158, 11, 0.2); }
                .metric.red .metric-bg {background: rgba(239, 68, 68, 0.2); }
                .metric.blue .metric-bg {background: rgba(59, 130, 246, 0.2); }

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
                .metric.emerald .metric-icon {background: #dcfce7; color: #059669; }
                .metric.amber .metric-icon {background: #fef3c7; color: #d97706; }
                .metric.red .metric-icon {background: #fee2e2; color: #dc2626; }
                .metric.blue .metric-icon {background: #dbeafe; color: #2563eb; }

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
                .metric.emerald .metric-trend {background: #d1fae5; color: #065f46; }
                .metric.amber .metric-trend {background: #ffedd5; color: #9a3412; }
                .metric.red .metric-trend {background: #fee2e2; color: #991b1b; }
                .metric.blue .metric-trend {background: #dbeafe; color: #1e40af; }

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
                .metric.emerald .metric-progress-fill {background: #10b981; }
                .metric.amber .metric-progress-fill {background: #f59e0b; }
                .metric.red .metric-progress-fill {background: #ef4444; }
                .metric.blue .metric-progress-fill {background: #3b82f6; }

                /* User Table Card Styles */
                .user-table-card {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                    overflow: hidden;
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

                /* Modal Styles */
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(4px);
                    z-index: 10001; /* High z-index to appear on top */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                }
                .modal-container {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                    overflow: hidden;
                    max-width: 500px;
                    width: 100%;
                }
                .modal-header {
                    padding: 1.25rem 1.5rem;
                    border-bottom: 1px solid #e2e8f0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
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
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                    background: white;
                }
                .modal-subtitle {
                    font-size: 13px;
                    color: #64748b;
                    font-weight: 500;
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
                    background: none;
                    border: none;
                }
                .report-close-btn:hover {
                    background: rgba(239, 68, 68, 0.1);
                }
                .report-table {
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                    overflow: visible;
                    margin-top: 1.5rem;
                }
                .table-header {
                    padding: 1.5rem;
                    border-radius: 12px 12px 0 0;
                    border-bottom: 1px solid #e2e8f0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: #fffaf5;
                }
                .table-header-left {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    flex: 1;
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

                .metrics {
                    display: grid;
                    grid-template-columns: repeat(4, minmax(140px, 1fr));
                    gap: 0.5rem;
                    width: 100%;
                    max-width: 720px;
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
                .metric.emerald {background: #f0fdf4; border-color: #bbf7d0; }
                .metric.emerald.active {border-color: #10b981; }
                .metric.amber {background: #fffbeb; border-color: #fde68a; }
                .metric.amber.active {border-color: #f59e0b; }
                .metric.red {background: #fef2f2; border-color: #fecaca; }
                .metric.red.active {border-color: #ef4444; }

                /* Blue Variant for Events */
                .metric.blue {background: #eff6ff; border-color: #bfdbfe; }
                .metric.blue.active {border-color: #3b82f6; }

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
                .metric.emerald .metric-bg {background: rgba(16, 185, 129, 0.2); }
                .metric.amber .metric-bg {background: rgba(245, 158, 11, 0.2); }
                .metric.red .metric-bg {background: rgba(239, 68, 68, 0.2); }
                .metric.blue .metric-bg {background: rgba(59, 130, 246, 0.2); }

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
                .metric.emerald .metric-icon {background: #dcfce7; color: #059669; }
                .metric.amber .metric-icon {background: #fef3c7; color: #d97706; }
                .metric.red .metric-icon {background: #fee2e2; color: #dc2626; }
                .metric.blue .metric-icon {background: #dbeafe; color: #2563eb; }

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
                .metric.emerald .metric-trend {background: #d1fae5; color: #065f46; }
                .metric.amber .metric-trend {background: #ffedd5; color: #9a3412; }
                .metric.red .metric-trend {background: #fee2e2; color: #991b1b; }
                .metric.blue .metric-trend {background: #dbeafe; color: #1e40af; }

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
                .metric.emerald .metric-progress-fill {background: #10b981; }
                .metric.amber .metric-progress-fill {background: #f59e0b; }
                .metric.red .metric-progress-fill {background: #ef4444; }
                .metric.blue .metric-progress-fill {background: #3b82f6; }

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

                /* Modal Styles - Unified with PeopleManagement */
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
                .status-badge.published { color: #059669; background: #ecfdf5; }
                .status-badge.ongoing { color: #2563eb; background: #eff6ff; }
                .status-badge.pending { color: #d97706; background: #fffbeb; }
                .status-badge.reported { color: #dc2626; background: #fef2f2; }
            `}</style>
        </div>
    );
};

export default Events;
