import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        setPreviewItem(editFormData);
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
            date: new Date(Date.now() - Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            reason: ['Inappropriate content', 'Spam / Misleading', 'Policy violation', 'Copyright infringement'][Math.floor(Math.random() * 4)],
            description: 'User reported this content for violating community standards.'
        };

        setReportedModalData({
            isOpen: true,
            item: item,
            details: mockDetails
        });
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
                    <div className="text-xs text-slate-500 font-medium mb-1 tracking-wide">
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
                <div className="metrics ml-auto">
                    {/* Published Today Card */}
                    <motion.div
                        whileHover={{ y: -4 }}
                        onClick={() => setLocalActiveTab(activeTab === 'published_today' ? 'all' : 'published_today')}
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

                    {/* Pending Reviews Card */}
                    <motion.div
                        whileHover={{ y: -4 }}
                        onClick={() => setLocalActiveTab(activeTab === 'pending' ? 'all' : 'pending')}
                        className={`metric amber ${activeTab === 'pending' ? 'active' : ''}`}
                    >
                        <div className="metric-bg"></div>
                        <div className="metric-content">
                            <div className="metric-header">
                                <div className="metric-icon">
                                    <Clock size={16} />
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

                    {/* Reported Content Card */}
                    <motion.div
                        whileHover={{ y: -4 }}
                        onClick={() => setLocalActiveTab(activeTab === 'reported' ? 'all' : 'reported')}
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
                                    <span>+2%</span>
                                </div>
                            </div>
                            <div className="metric-body">
                                <p className="metric-label">Reported Content</p>
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

                {/* Check PeopleManagement.jsx for reference of table-header */}

                <div className="table-container">
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th style={{ width: '40%' }}>
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
                                                <span className="font-bold text-slate-800 text-sm">{item.title}</span>
                                                <span className="text-xs text-slate-500">Published on {item.date}</span>
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
                                        <span
                                            onClick={(e) => {
                                                if (item.status === 'Reported') {
                                                    e.stopPropagation();
                                                    handleReportedClick(item);
                                                }
                                            }}
                                            className={`inline-flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-full ${item.status === 'Reported' ? 'text-red-600 bg-red-50 cursor-pointer hover:bg-red-100' :
                                                item.status === 'Pending' ? 'text-amber-600 bg-amber-50' :
                                                    item.status === 'Published' ? 'text-emerald-600 bg-emerald-50' :
                                                        'text-slate-600 bg-slate-100'
                                                }`}>
                                            {item.status}
                                            {item.status === 'Reported' && <ChevronRight size={14} />}
                                        </span>
                                    </td>
                                    <td onClick={(e) => { e.stopPropagation(); handleNoteClick(item); }} className="cursor-pointer hover:bg-slate-100 transition-colors group relative">
                                        <div className="text-sm text-slate-500 truncate max-w-[150px]" title={item.notes}>
                                            {item.notes}
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
                <div className="flex justify-between items-center p-4 border-t border-slate-200 bg-slate-50 text-sm font-medium text-slate-600">
                    <div>
                        Showing {filteredContent.length > 0 ? 1 : 0} to {filteredContent.length} of {contents.length} results
                    </div>
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

            {/* Content Preview Modal */}
            <AnimatePresence>
                {previewItem && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setPreviewItem(null)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.3 }}
                            className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
                            onClick={() => setPreviewItem(null)}
                        >
                            <div
                                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Modal Header */}
                                <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-start z-10">
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-800 mb-1">
                                            {previewItem.title}
                                        </h2>
                                        <p className="text-sm text-slate-500">Content Preview</p>
                                    </div>
                                    <button
                                        onClick={() => setPreviewItem(null)}
                                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Modal Content */}
                                <div className="p-6 space-y-6">
                                    {/* Title - Editable in edit mode */}
                                    {isEditMode && (
                                        <div>
                                            <label className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-2 block">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                value={editFormData?.title || ''}
                                                onChange={(e) => handleFormChange('title', e.target.value)}
                                                className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-slate-800 focus:outline-none text-lg font-bold"
                                            />
                                        </div>
                                    )}

                                    {/* Thumbnail Preview */}
                                    <div className="w-full h-64 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl border border-slate-300 flex items-center justify-center">
                                        <div className="text-center">
                                            {previewItem.type === 'Reel' && <Video size={48} className="mx-auto mb-2 text-slate-400" />}
                                            {previewItem.type === 'Post' && <FileText size={48} className="mx-auto mb-2 text-slate-400" />}
                                            {previewItem.type === 'Story' && <ImageIcon size={48} className="mx-auto mb-2 text-slate-400" />}
                                            {previewItem.type === 'Article' && <FileText size={48} className="mx-auto mb-2 text-slate-400" />}
                                            <p className="text-sm text-slate-500">{previewItem.type} Preview</p>
                                        </div>
                                    </div>

                                    {/* Content Details Grid */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-50 p-4 rounded-lg">
                                            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-1">Author</p>
                                            <p className="text-sm font-bold text-slate-800">{previewItem.author}</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-lg">
                                            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-1">Type</p>
                                            <p className="text-sm font-bold text-slate-800">{previewItem.type}</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-lg">
                                            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-1">Status</p>
                                            {isEditMode ? (
                                                <select
                                                    value={editFormData?.status || ''}
                                                    onChange={(e) => handleFormChange('status', e.target.value)}
                                                    className="w-full px-3 py-1.5 border-2 border-slate-200 rounded-lg focus:border-slate-800 focus:outline-none text-xs font-bold"
                                                >
                                                    <option value="Published">Published</option>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Reported">Reported</option>
                                                    <option value="Draft">Draft</option>
                                                </select>
                                            ) : (
                                                <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${previewItem.status === 'Reported' ? 'text-red-600 bg-red-100' :
                                                    previewItem.status === 'Pending' ? 'text-amber-600 bg-amber-100' :
                                                        previewItem.status === 'Published' ? 'text-emerald-600 bg-emerald-100' :
                                                            'text-slate-600 bg-slate-200'
                                                    }`}>
                                                    {previewItem.status}
                                                </span>
                                            )}
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-lg">
                                            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-1">Date</p>
                                            <p className="text-sm font-bold text-slate-800">{previewItem.date}</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-lg">
                                            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-1">Views</p>
                                            <p className="text-sm font-bold text-slate-800">{previewItem.views}</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-lg">
                                            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-1">Engagement</p>
                                            <p className="text-sm font-bold text-slate-800">{previewItem.engagement}</p>
                                        </div>
                                    </div>

                                    {/* Notes Section - Editable in edit mode */}
                                    <div className={`border p-4 rounded-lg ${isEditMode ? 'bg-white border-slate-200' : 'bg-amber-50 border-amber-200'}`}>
                                        <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${isEditMode ? 'text-slate-500' : 'text-amber-800'}`}>
                                            Notes
                                        </p>
                                        {isEditMode ? (
                                            <textarea
                                                value={editFormData?.notes || ''}
                                                onChange={(e) => handleFormChange('notes', e.target.value)}
                                                rows={3}
                                                className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:border-slate-800 focus:outline-none text-sm resize-none"
                                                placeholder="Add notes about this content..."
                                            />
                                        ) : (
                                            <p className="text-sm text-amber-900">{previewItem.notes}</p>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 pt-4">
                                        {isEditMode ? (
                                            <>
                                                <button
                                                    onClick={handleSaveEdit}
                                                    className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <CheckCircle2 size={16} />
                                                    Save Changes
                                                </button>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="px-4 py-2.5 border-2 border-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={handleStartEdit}
                                                    className="flex-1 px-4 py-2.5 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <Edit2 size={16} />
                                                    Edit Content
                                                </button>
                                                <button
                                                    onClick={() => handleApprove(previewItem)}
                                                    className="px-4 py-2.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <Check size={16} />
                                                    Approve
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
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


            <AnimatePresence>
                {reportedModalData.isOpen && reportedModalData.details && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setReportedModalData({ isOpen: false, item: null, details: null })}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                            onClick={() => setReportedModalData({ isOpen: false, item: null, details: null })}
                        >
                            <div
                                className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden"
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-red-50">
                                    <h3 className="font-bold text-red-800 flex items-center gap-2">
                                        <AlertCircle size={18} />
                                        Report Details
                                    </h3>
                                    <button
                                        onClick={() => setReportedModalData({ isOpen: false, item: null, details: null })}
                                        className="text-red-400 hover:text-red-700 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                                <div className="p-5 space-y-4">
                                    <div>
                                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-1">Reported By</p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                                {reportedModalData.details.reportedBy.charAt(0)}
                                            </div>
                                            <p className="text-sm font-medium text-slate-800">{reportedModalData.details.reportedBy}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-1">Date Reported</p>
                                        <p className="text-sm font-medium text-slate-800">{reportedModalData.details.date}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-1">Reason</p>
                                        <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">
                                            {reportedModalData.details.reason}
                                        </span>
                                    </div>

                                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                        <p className="text-xs text-slate-500 mb-1">Description</p>
                                        <p className="text-sm text-slate-700 italic">"{reportedModalData.details.description}"</p>
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            onClick={() => setReportedModalData({ isOpen: false, item: null, details: null })}
                                            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-sm transition-colors"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <style>{`
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

                /* User Table Card Styles copied from PeopleManagement.jsx */
                .user-table-card {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                    overflow: hidden;
                    margin-top: 1.5rem;
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

                /* Table Search Bar - Matching Shell.jsx search bar */
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
            `}</style>
        </div>
    );
};

export default ContentManagement;
