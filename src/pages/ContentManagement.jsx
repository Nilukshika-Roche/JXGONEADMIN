import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SuperAdminDashboard.css';
import {
    Search,
    Filter,
    Download,
    Plus,
    MoreVertical,
    Edit2,
    Trash2,
    Eye,
    CheckCircle2,
    Clock,
    AlertCircle,
    FileText,
    Video,
    Image as ImageIcon,
    TrendingUp,
    ChevronDown,
    ChevronRight,
    EyeOff,
    UserX,
    Check,
    X,
    FileSearch
} from 'lucide-react';

const ContentManagement = ({ setActiveTab: onNavigate }) => {
    // --- Mock Data ---
    const [contents, setContents] = useState([
        {
            id: 1,
            title: 'Summer Campaign Launch',
            author: 'Sarah Wilson',
            type: 'Post',
            status: 'Published',
            notes: 'Key campaign of Q1',
            date: new Date().toISOString(),
            views: '1.2k',
            engagement: 'High'
        },
        {
            id: 2,
            title: 'CEO Interview Reel',
            author: 'Michael Chen',
            type: 'Reel',
            status: 'Pending',
            notes: 'Needs audio level check',
            date: '2024-03-20',
            views: '-',
            engagement: '-'
        },
        {
            id: 3,
            title: 'Inappropriate Comment Thread',
            author: 'User123',
            type: 'Story',
            status: 'Reported',
            notes: 'Violates community guidelines',
            date: '2024-03-18',
            views: '500',
            engagement: 'Low'
        },
        {
            id: 4,
            title: 'Q2 Roadmap Update',
            author: 'Alex Johnson',
            type: 'Article',
            status: 'Draft',
            notes: 'Waiting for final approval',
            date: '2024-03-21',
            views: '-',
            engagement: '-'
        },
        {
            id: 5,
            title: 'Team Building Event',
            author: 'Emma Davis',
            type: 'Post',
            status: 'Published',
            notes: 'Photos from Friday',
            date: new Date().toISOString(),
            views: '850',
            engagement: 'Medium'
        }
    ]);

    // --- State ---
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setLocalActiveTab] = useState('all');
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [previewItem, setPreviewItem] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editFormData, setEditFormData] = useState(null);
    const [noteModalData, setNoteModalData] = useState({ isOpen: false, itemId: null, note: '' });
    const [reportedModalData, setReportedModalData] = useState({ isOpen: false, item: null, details: null });
    const [openFilter, setOpenFilter] = useState(null);
    const [tableFilters, setTableFilters] = useState({
        author: 'All',
        type: 'All',
        status: 'All'
    });
    const toggleFilter = (filterName) => {
        setOpenFilter(openFilter === filterName ? null : filterName);
    };

    const handleFilterSelect = (type, value) => {
        setTableFilters(prev => ({ ...prev, [type]: value }));
        setOpenFilter(null);
    };

    const uniqueAuthors = ['All', ...new Set(contents.map(c => c.author))];
    const uniqueTypes = ['All', ...new Set(contents.map(c => c.type))];
    const uniqueStatuses = ['All', ...new Set(contents.map(c => c.status))];
    const uniqueNotes = ['All', ...new Set(contents.map(c => c.notes))];

    const isWithin24Hours = (dateStr) => {
        const postedDate = new Date(dateStr);
        const now = new Date();
        return (now - postedDate) <= 24 * 60 * 60 * 1000 && (now - postedDate) >= 0;
    };

    const filteredContent = useMemo(() => {
        let filtered = contents.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item.notes || '').toLowerCase().includes(searchQuery.toLowerCase());

            const matchesAuthor = tableFilters.author === 'All' || item.author === tableFilters.author;
            const matchesType = tableFilters.type === 'All' || item.type === tableFilters.type;
            const matchesStatus = tableFilters.status === 'All' || item.status === tableFilters.status;

            return matchesSearch && matchesAuthor && matchesType && matchesStatus;
        });

        if (activeTab === 'published_today') {
            filtered = filtered.filter(item => item.status === 'Published' && isWithin24Hours(item.date));
        } else if (activeTab === 'pending') {
            filtered = filtered.filter(item => item.status === 'Pending');
        } else if (activeTab === 'reported') {
            filtered = filtered.filter(item => item.status === 'Reported');
        }

        return filtered;
    }, [contents, searchQuery, activeTab, tableFilters]);

    const summaryStats = useMemo(() => {
        return {
            published_today: contents.filter(c => c.status === 'Published' && isWithin24Hours(c.date)).length,
            pending: contents.filter(c => c.status === 'Pending').length,
            reported: contents.filter(c => c.status === 'Reported').length
        };
    }, [contents]);

    const stats = [
        {
            label: 'Published Today',
            value: summaryStats.published_today,
            icon: CheckCircle2,
            bg: 'rgba(16, 185, 129, 0.1)',
            color: '#10b981',
            trend: '+12%',
            tab: 'published_today'
        },
        {
            label: 'Pending Reviews',
            value: summaryStats.pending,
            icon: Clock,
            bg: 'rgba(245, 158, 11, 0.1)',
            color: '#f59e0b',
            trend: '+5%',
            tab: 'pending'
        },
        {
            label: 'Reported',
            value: summaryStats.reported,
            icon: AlertCircle,
            bg: 'rgba(239, 68, 68, 0.1)',
            color: '#ef4444',
            trend: '+0.5%',
            tab: 'reported'
        }
    ];

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
    const handleViewContent = (item) => {
        setPreviewItem(item);
        setEditFormData(item);
        setIsEditMode(false);
        setActiveMenuId(null);
    };

    const handleEditContent = (item) => {
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
        // Update the content in the main contents array
        setContents(prevContents =>
            prevContents.map(item =>
                item.id === editFormData.id ? { ...editFormData } : item
            )
        );
        setPreviewItem(null);
        setIsEditMode(false);
    };

    const handleFormChange = (field, value) => {
        setEditFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleHideUnpublish = (item) => {
        if (window.confirm(`Are you sure you want to hide "${item.title}" from feeds?`)) {
            // Update content status to Draft (hidden from feeds)
            setContents(prevContents =>
                prevContents.map(content =>
                    content.id === item.id ? { ...content, status: 'Draft' } : content
                )
            );
            setActiveMenuId(null);
            alert(`Content "${item.title}" has been hidden from feeds.`);
        }
    };

    const handleRemoveContent = (item) => {
        if (window.confirm(`⚠️ WARNING: Are you sure you want to permanently delete "${item.title}"? This action cannot be undone.`)) {
            // Remove content from the array
            setContents(prevContents =>
                prevContents.filter(content => content.id !== item.id)
            );
            // Close preview modal if it's open
            if (previewItem?.id === item.id) {
                setPreviewItem(null);
            }
            setActiveMenuId(null);
            alert(`Content "${item.title}" has been permanently deleted.`);
        }
    };

    const handleWarnUser = (item) => {
        const reason = prompt(`Enter warning reason for ${item.author} regarding "${item.title}":`);
        if (reason && reason.trim()) {
            // In a real app, this would send a warning notification to the user
            console.log(`Warning sent to ${item.author}:`, reason);
            alert(`Warning message sent to ${item.author} regarding their content "${item.title}".`);
            setActiveMenuId(null);
        } else if (reason !== null) {
            alert('Warning reason cannot be empty.');
        }
    };

    const handleApprove = (item) => {
        if (window.confirm(`Approve and publish "${item.title}"?`)) {
            // Update content status to Published
            setContents(prevContents =>
                prevContents.map(content =>
                    content.id === item.id ? { ...content, status: 'Published' } : content
                )
            );
            // Update preview if it's open
            if (previewItem?.id === item.id) {
                setPreviewItem({ ...item, status: 'Published' });
                setEditFormData({ ...item, status: 'Published' });
            }
            setActiveMenuId(null);
            alert(`Content "${item.title}" has been approved and published.`);
        }
    };

    const handleNoteClick = (item) => {
        setNoteModalData({ isOpen: true, itemId: item.id, note: item.notes || '' });
    };

    const handleSaveNote = () => {
        setContents(prev => prev.map(item =>
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
            reason: ['Inappropriate content', 'Spam / Misleading', 'Policy violation', 'Copyright infringement'][Math.floor(Math.random() * 4)],
            description: 'User reported this content for violating community standards.'
        };

        setReportedModalData({
            isOpen: true,
            item: item,
            details: mockDetails
        });
    };

    const getStatusColor = (status) => {
        const s = status?.toLowerCase();
        switch (s) {
            case 'published': return '#10b981';
            case 'pending': return '#f97316';
            case 'reported': return '#f43f5e';
            case 'draft': return '#64748b';
            default: return '#94a3b8';
        }
    };

    // Generate more content entries
    const generateMoreContent = () => {
        const contentTypes = ['Post', 'Reel', 'Story', 'Article'];
        const statuses = ['Published', 'Pending', 'Reported', 'Draft'];
        const authors = ['John Smith', 'Emily Johnson', 'Michael Brown', 'Sarah Davis', 'David Wilson', 'Lisa Anderson', 'James Taylor', 'Maria Garcia'];
        const titles = [
            'New Product Launch',
            'Behind the Scenes',
            'Customer Success Story',
            'Industry Update',
            'Team Announcement',
            'Company Milestone',
            'Event Highlights',
            'Tutorial Series',
            'Partnership News',
            'Monthly Newsletter'
        ];
        const engagementLevels = ['High', 'Medium', 'Low', '-'];

        const newContent = [];
        const currentMaxId = Math.max(...contents.map(c => c.id));

        // Generate 5 new content items
        for (let i = 1; i <= 5; i++) {
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            const isPublished = randomStatus === 'Published';

            newContent.push({
                id: currentMaxId + i,
                title: titles[Math.floor(Math.random() * titles.length)] + ' ' + (currentMaxId + i),
                author: authors[Math.floor(Math.random() * authors.length)],
                type: contentTypes[Math.floor(Math.random() * contentTypes.length)],
                status: randomStatus,
                notes: randomStatus === 'Reported' ? 'Flagged for review' :
                    randomStatus === 'Pending' ? 'Awaiting approval' :
                        randomStatus === 'Draft' ? 'Work in progress' : 'All good',
                date: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                views: isPublished ? `${Math.floor(Math.random() * 5000) + 100}` : '-',
                engagement: isPublished ? engagementLevels[Math.floor(Math.random() * 3)] : '-'
            });
        }

        setContents(prevContents => [...prevContents, ...newContent]);
    };

    return (
        <div className="p-6 max-w-[1400px] mx-auto font-sans text-slate-800">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">

                {/* Left: Breadcrumbs & Title */}
                <div>
                    <div className="text-sm text-slate-500 font-medium tracking-wide">
                        <span
                            className="hover:text-orange-500 cursor-pointer transition-colors"
                            onClick={() => onNavigate?.('dashboard')}
                        >
                            Admin
                        </span> &gt; Content Management
                    </div>
                    <h1 className="text-3xl font-handwriting font-bold text-slate-800">
                        Content Management
                    </h1>
                </div>

                {/* Right: Summary Cards */}
                <div className="management-stats-flex ml-auto">
                    {stats.map((s, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05, y: -2 }}
                            onClick={() => setLocalActiveTab(activeTab === s.tab ? 'all' : s.tab)}
                            className={`card-premium-mini management-card-fixed ${activeTab === s.tab ? 'active' : ''}`}
                        >
                            <div className="kpi-icon-row">
                                <div className="kpi-icon-bg" style={{ backgroundColor: s.bg, color: s.color }}>
                                    <s.icon size={14} />
                                </div>
                                <div className="kpi-trend-pill-mini" style={{ color: s.color }}>
                                    {s.trend}
                                </div>
                            </div>
                            <div className="kpi-info-wrap">
                                <div className="kpi-label-xsmall">{s.label}</div>
                                <div className="kpi-value-small">{s.value}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Table Section */}
            <div className="user-table-card">
                <div className="table-container">
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th style={{ width: '30%' }}>
                                    <div className="table-filter-header" style={{ cursor: 'default' }}>
                                        Content
                                        <div className="table-search-container">
                                            <Search size={16} className="table-search-icon" />
                                            <input
                                                type="text"
                                                placeholder="Search content..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="table-search-input"
                                            />
                                        </div>
                                    </div>
                                </th>
                                <th>
                                    <div className="table-filter-header" onClick={() => toggleFilter('author')}>
                                        <span>Author</span>
                                        <ChevronDown size={14} className={openFilter === 'author' ? 'rotate' : ''} />
                                    </div>
                                </th>
                                <th>
                                    <div className="table-filter-header" onClick={() => toggleFilter('type')}>
                                        <span>Type</span>
                                        <ChevronDown size={14} className={openFilter === 'type' ? 'rotate' : ''} />
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
                            {filteredContent.map((item) => (
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
                                                            onClick={() => handleViewContent(item)}
                                                        >
                                                            <Eye size={16} />
                                                            <span>View Content</span>
                                                        </button>
                                                        <button
                                                            className="kebab-menu-item"
                                                            onClick={() => handleEditContent(item)}
                                                        >
                                                            <Edit2 size={16} />
                                                            <span>Edit Content</span>
                                                        </button>
                                                        <button
                                                            className="kebab-menu-item"
                                                            onClick={() => handleHideUnpublish(item)}
                                                        >
                                                            <EyeOff size={16} />
                                                            <span>Hide/Unpublish</span>
                                                        </button>
                                                        <div className="kebab-menu-divider"></div>
                                                        <button
                                                            className="kebab-menu-item text-red-600 hover:bg-red-50"
                                                            onClick={() => handleRemoveContent(item)}
                                                        >
                                                            <Trash2 size={16} />
                                                            <span>Remove Content</span>
                                                        </button>
                                                        <button
                                                            className="kebab-menu-item text-amber-600 hover:bg-amber-50"
                                                            onClick={() => handleWarnUser(item)}
                                                        >
                                                            <UserX size={16} />
                                                            <span>Warn User</span>
                                                        </button>
                                                        <div className="kebab-menu-divider"></div>
                                                        <button
                                                            className="kebab-menu-item text-emerald-600 hover:bg-emerald-50"
                                                            onClick={() => handleApprove(item)}
                                                        >
                                                            <Check size={16} />
                                                            <span>Approve</span>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Thumbnail Placeholder */}
                                            <div className="w-12 h-12 rounded-lg bg-slate-200 border border-slate-300 flex-shrink-0"></div>

                                            {/* Title & Date */}
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-800 text-sm">{item.title}</span>
                                                <span className="text-xs text-slate-400">Published on {item.date}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-sm font-medium text-slate-600">{item.author}</div>
                                    </td>
                                    <td>
                                        <div className="text-sm font-medium text-slate-600">{item.type}</div>
                                    </td>
                                    <td>
                                        <div
                                            className="status-badge"
                                            style={{
                                                background: `${getStatusColor(item.status)}15`,
                                                color: getStatusColor(item.status)
                                            }}
                                            onClick={(e) => {
                                                if (item.status === 'Reported') {
                                                    e.stopPropagation();
                                                    handleReportedClick(item);
                                                }
                                            }}
                                        >
                                            <div
                                                className="status-dot"
                                                style={{ backgroundColor: getStatusColor(item.status) }}
                                            />
                                            {item.status}
                                            {item.status === 'Reported' && <ChevronRight size={14} style={{ marginLeft: '2px' }} />}
                                        </div>
                                    </td>
                                    <td onClick={(e) => { e.stopPropagation(); handleNoteClick(item); }} className="cursor-pointer hover:bg-slate-100 transition-colors group relative">
                                        <div className="text-sm font-medium text-slate-600 truncate max-w-[150px]" title={item.notes}>
                                            {item.notes || <span className="text-sm font-medium text-slate-400 italic">No notes / reasons...</span>}
                                            <Edit2 size={12} className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-slate-400" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredContent.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <FileSearch size={32} />
                        </div>
                        <h3>No content found</h3>
                        <p>Try adjusting your search terms</p>
                    </div>
                )}

                {/* Footer matching PeopleManagement logic (though PM doesn't strictly have a footer in CSS, adding one with similar style) */}
                <div className="showing">
                    <div>Showing {filteredContent.length} results</div>
                    <button
                        onClick={generateMoreContent}
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
                                {(openFilter === 'author' ? uniqueAuthors :
                                    openFilter === 'type' ? uniqueTypes :
                                        openFilter === 'status' ? uniqueStatuses :
                                            uniqueNotes).map((val) => (
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

            {/* Content Preview/Edit Modal */}
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
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <h3 className="modal-title">
                                            {isEditMode ? 'Edit Content Details' : previewItem.title}
                                        </h3>
                                        <p className="modal-subtitle">
                                            {isEditMode ? 'Update content information and settings' : 'Content Information Preview'}
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
                            {/* Edit Mode */}
                            {isEditMode ? (
                                <div className="modal-form">
                                    <div className="form-grid">
                                        <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                            <label className="form-label">Content Title</label>
                                            <input
                                                required
                                                type="text"
                                                value={editFormData?.title || ''}
                                                onChange={(e) => handleFormChange('title', e.target.value)}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Author</label>
                                            <input
                                                type="text"
                                                value={editFormData?.author || ''}
                                                onChange={(e) => handleFormChange('author', e.target.value)}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Type</label>
                                            <select
                                                value={editFormData?.type || ''}
                                                onChange={(e) => handleFormChange('type', e.target.value)}
                                                className="form-select"
                                            >
                                                <option value="Reel">Reel</option>
                                                <option value="Post">Post</option>
                                                <option value="Story">Story</option>
                                                <option value="Article">Article</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Status</label>
                                            <select
                                                value={editFormData?.status || ''}
                                                onChange={(e) => handleFormChange('status', e.target.value)}
                                                className="form-select"
                                            >
                                                <option value="Published">Published</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Reported">Reported</option>
                                                <option value="Draft">Draft</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Date</label>
                                            <input
                                                type="text"
                                                value={editFormData?.date || ''}
                                                onChange={(e) => handleFormChange('date', e.target.value)}
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
                                                placeholder="Add notes about this content..."
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
                                            className="submit-btn flex items-center justify-center gap-2"
                                        >
                                            <Check size={18} />
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="modal-body"> {/* Preview Mode */}
                                    {/* Thumbnail Preview */}
                                    <div className="content-thumbnail">
                                        <div className="text-center">
                                            {previewItem.type === 'Reel' && <Video size={40} className="mx-auto mb-2 text-slate-400" />}
                                            {previewItem.type === 'Post' && <FileText size={40} className="mx-auto mb-2 text-slate-400" />}
                                            {previewItem.type === 'Story' && <ImageIcon size={40} className="mx-auto mb-2 text-slate-400" />}
                                            {previewItem.type === 'Article' && <FileText size={40} className="mx-auto mb-2 text-slate-400" />}
                                            <p className="text-sm text-slate-500 font-semibold">{previewItem.type} Preview</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-50 p-4 rounded-lg">
                                            <p className="adequate-spacing form-label mb-1">Author</p>
                                            <p className="adequate-spacing text-sm font-bold text-slate-800">{previewItem.author}</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-lg">
                                            <p className="adequate-spacing form-label mb-1">Type</p>
                                            <p className="adequate-spacing text-sm font-bold text-slate-800">{previewItem.type}</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-lg">
                                            <p className="adequate-spacing form-label mb-1">Status</p>
                                            <div
                                                className="status-badge"
                                                style={{
                                                    background: `${getStatusColor(previewItem.status)}15`,
                                                    color: getStatusColor(previewItem.status)
                                                }}
                                            >
                                                <div
                                                    className="status-dot"
                                                    style={{ backgroundColor: getStatusColor(previewItem.status) }}
                                                />
                                                {previewItem.status}
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-lg">
                                            <p className="adequate-spacing form-label mb-1">Date Published</p>
                                            <p className="adequate-spacing text-sm font-bold text-slate-800">{previewItem.date}</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-lg">
                                            <p className="adequate-spacing form-label mb-1">Views</p>
                                            <p className="adequate-spacing text-sm font-bold text-slate-800">{previewItem.views}</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-lg">
                                            <p className="adequate-spacing form-label mb-1">Engagement</p>
                                            <p className="adequate-spacing text-sm font-bold text-slate-800">{previewItem.engagement}</p>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                        <p className="adequate-spacing form-label mb-1">Internal Notes</p>
                                        <p className="adequate-spacing text-sm font-bold text-slate-800">{previewItem.notes}</p>
                                    </div>

                                    <div className="modal-actions">
                                        <button
                                            type="button"
                                            onClick={handleStartEdit}
                                            className="cancel-btn flex items-center justify-center gap-2"
                                        >
                                            <Edit2 size={16} />
                                            Edit Content
                                        </button>
                                        <button
                                            type='button'
                                            onClick={() => handleApprove(previewItem)}
                                            className="submit-btn flex items-center justify-center gap-2"
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
                    <div className="modal-overlay" onClick={() => setNoteModalData({ isOpen: false, itemId: null, note: '' })}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="modal-container max-w-md"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <div className="modal-header-left">
                                    <div className="modal-icon">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <h3 className="modal-title">Edit Note</h3>
                                        <p className="modal-subtitle">Update internal comments for this content</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setNoteModalData({ isOpen: false, itemId: null, note: '' })}
                                    className="modal-close-btn"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="modal-form">
                                <div className="form-group">
                                    <label className="form-label">Note Content</label>
                                    <textarea
                                        value={noteModalData.note}
                                        onChange={(e) => setNoteModalData(prev => ({ ...prev, note: e.target.value }))}
                                        className="form-textarea h-32"
                                        placeholder="Enter note here..."
                                        autoFocus
                                    />
                                </div>
                                <div className="modal-actions">
                                    <button
                                        onClick={() => setNoteModalData({ isOpen: false, itemId: null, note: '' })}
                                        className="cancel-btn"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveNote}
                                        className="submit-btn flex items-center justify-center gap-2"
                                    >
                                        <Check size={16} />
                                        Save Note
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
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
                                    <span className="px-2 py-1 text-red-700 text-xs font-bold rounded">{reportedModalData.details.reason}</span>
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

                /* User Table Card Styles */
                .user-table-card {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                    overflow: hidden;
                    margin-top: .75rem;
                    border: 1px solid #e2e8f0;
                }
                .table-header {
                    padding: 1.5rem;
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
                    color: #1e293b;
                    font-size: 14px;
                    font-weight: 700;
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

                .content-thumbnail {
                    width: 100%;
                    height: 300px;
                    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1rem;
                }
                    /*w-full h-40 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl border border-slate-300 flex items-center justify-center mb-2*/

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

                .adequate-spacing { margin: 10px; }
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
                    border-color: #64748b;
                    background: white;
                    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
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
                    flex: 1;
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
            `}</style>
        </div>
    );
};

export default ContentManagement;
