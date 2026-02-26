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
    ShoppingBag,
    Tag,
    DollarSign,
    ChevronDown,
    ChevronRight,
    EyeOff,
    UserX,
    Check,
    X,
    TrendingUp,
    FileText,
    PackageSearch
} from 'lucide-react';

const Marketplace = ({ setActiveTab: onNavigate }) => {
    // --- Mock Data ---
    const [items, setItems] = useState([
        {
            id: 1,
            title: 'iPhone 15 Pro Max',
            seller: 'Sarah Wilson',
            category: 'Electronics',
            type: 'Product',
            price: '$1199',
            status: 'Active',
            notes: 'Brand new, sealed box',
            date: new Date().toISOString(),
            views: '1.2k',
            inquiries: '15'
        },
        {
            id: 2,
            title: 'Herman Miller Chair',
            seller: 'Michael Chen',
            category: 'Furniture',
            type: 'Service',
            price: '$850',
            status: 'Pending',
            notes: 'Verify authenticity',
            date: '2024-03-20',
            views: '-',
            inquiries: '-'
        },
        {
            id: 3,
            title: 'MacBook Pro M3',
            seller: 'User123',
            category: 'Electronics',
            type: 'Product',
            price: '$1800',
            status: 'Reported',
            notes: 'Suspected scam listing',
            date: '2024-03-18',
            views: '500',
            inquiries: '2'
        },
        {
            id: 4,
            title: 'Vintage Camera Lens',
            seller: 'Alex Johnson',
            category: 'Photography',
            type: 'Service',
            price: '$300',
            status: 'Draft',
            notes: 'Waiting for seller update',
            date: '2024-03-21',
            views: '-',
            inquiries: '-'
        },
        {
            id: 5,
            title: 'Mountain Bike',
            seller: 'Emma Davis',
            category: 'Sports',
            type: 'Service',
            price: '$450',
            status: 'Active',
            notes: 'Good condition',
            date: new Date().toISOString(),
            views: '850',
            inquiries: '8'
        }
    ]);

    // --- State ---
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [itemTypeFilter, setItemTypeFilter] = useState('product');
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [previewItem, setPreviewItem] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editFormData, setEditFormData] = useState(null);
    const [noteModalData, setNoteModalData] = useState({ isOpen: false, itemId: null, note: '' });
    const [reportedModalData, setReportedModalData] = useState({ isOpen: false, item: null, details: null });
    const [openFilter, setOpenFilter] = useState(null);
    const [tableFilters, setTableFilters] = useState({
        seller: 'All',
        category: 'All',
        status: 'All',
        price: { min: '', max: '' },
        notes: 'All'
    });

    const toggleFilter = (filterName) => {
        setOpenFilter(openFilter === filterName ? null : filterName);
    };

    const handleFilterSelect = (type, value) => {
        setTableFilters(prev => ({ ...prev, [type]: value }));
        setOpenFilter(null);
    };

    const uniqueSellers = ['All', ...new Set(items.map(i => i.seller))];
    const uniqueCategories = ['All', ...new Set(items.map(i => i.category))];
    const uniqueStatuses = ['All', ...new Set(items.map(i => i.status))];
    const uniquePrices = ['All', ...new Set(items.map(i => i.price))];
    const uniqueNotes = ['All', ...new Set(items.map(i => i.notes))];

    const isWithin24Hours = (dateStr) => {
        const postedDate = new Date(dateStr);
        const now = new Date();
        return (now - postedDate) <= 24 * 60 * 60 * 1000 && (now - postedDate) >= 0;
    };

    // --- Derived State ---
    const filteredItems = useMemo(() => {
        let filtered = items.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.notes.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesSeller = tableFilters.seller === 'All' || item.seller === tableFilters.seller;
            const matchesCategory = tableFilters.category === 'All' || item.category === tableFilters.category;
            const matchesStatus = tableFilters.status === 'All' || item.status === tableFilters.status;

            const itemPrice = parseFloat(item.price.toString().replace(/[^0-9.]/g, ''));
            const minPrice = tableFilters.price.min === '' ? -Infinity : parseFloat(tableFilters.price.min);
            const maxPrice = tableFilters.price.max === '' ? Infinity : parseFloat(tableFilters.price.max);
            const matchesPrice = itemPrice >= minPrice && itemPrice <= maxPrice;

            const matchesNotes = tableFilters.notes === 'All' || item.notes === tableFilters.notes;

            return matchesSearch && matchesSeller && matchesCategory && matchesStatus && matchesPrice && matchesNotes;
        });

        if (activeTab === 'new_today') {
            filtered = filtered.filter(item => isWithin24Hours(item.date));
        } else if (activeTab === 'pending') {
            filtered = filtered.filter(item => item.status === 'Pending');
        } else if (activeTab === 'reported') {
            filtered = filtered.filter(item => item.status === 'Reported');
        }

        filtered = filtered.filter(item => item.type.toLowerCase() === itemTypeFilter.toLowerCase());

        return filtered;
    }, [items, searchQuery, activeTab, itemTypeFilter, tableFilters]);

    const summaryStats = useMemo(() => {
        return {
            new_today: items.filter(c => isWithin24Hours(c.date)).length,
            pending: items.filter(c => c.status === 'Pending').length,
            reported: items.filter(c => c.status === 'Reported').length
        };
    }, [items]);

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
    const handleViewItem = (item) => {
        setPreviewItem(item);
        setEditFormData(item);
        setIsEditMode(false);
        setActiveMenuId(null);
    };

    const handleEditItem = (item) => {
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
        setItems(prevItems =>
            prevItems.map(item =>
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
        if (window.confirm(`Are you sure you want to hide "${item.title}" from marketplace?`)) {
            setItems(prevItems =>
                prevItems.map(i =>
                    i.id === item.id ? { ...i, status: 'Draft' } : i
                )
            );
            setActiveMenuId(null);
            alert(`Item "${item.title}" has been hidden.`);
        }
    };

    const handleRemoveItem = (item) => {
        if (window.confirm(`⚠️ WARNING: Are you sure you want to permanently delete "${item.title}"? This action cannot be undone.`)) {
            setItems(prevItems =>
                prevItems.filter(i => i.id !== item.id)
            );
            if (previewItem?.id === item.id) {
                setPreviewItem(null);
            }
            setActiveMenuId(null);
            alert(`Item "${item.title}" has been permanently deleted.`);
        }
    };

    const handleWarnUser = (item) => {
        const reason = prompt(`Enter warning reason for ${item.seller} regarding "${item.title}":`);
        if (reason && reason.trim()) {
            console.log(`Warning sent to ${item.seller}:`, reason);
            alert(`Warning message sent to ${item.seller} regarding item "${item.title}".`);
            setActiveMenuId(null);
        }
    };

    const handleApprove = (item) => {
        if (window.confirm(`Approve listing "${item.title}"?`)) {
            setItems(prevItems =>
                prevItems.map(i =>
                    i.id === item.id ? { ...i, status: 'Active' } : i
                )
            );
            if (previewItem?.id === item.id) {
                setPreviewItem({ ...item, status: 'Active' });
                setEditFormData({ ...item, status: 'Active' });
            }
            setActiveMenuId(null);
            alert(`Item "${item.title}" has been approved.`);
        }
    };

    const handleNoteClick = (item) => {
        setNoteModalData({ isOpen: true, itemId: item.id, note: item.notes || '' });
    };

    const handleSaveNote = () => {
        setItems(prev => prev.map(item =>
            item.id === noteModalData.itemId ? { ...item, notes: noteModalData.note } : item
        ));
        setNoteModalData({ isOpen: false, itemId: null, note: '' });
    };

    const handleReportedClick = (item) => {
        if (item.status !== 'Reported') return;

        const mockDetails = {
            reportedBy: ['John Doe', 'Jane Smith', 'Admin User', 'Anonymous'][Math.floor(Math.random() * 4)],
            reportedDate: new Date(Date.now() - Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            reason: ['Scam / Fraud', 'Prohibited Item', 'Misleading Description', 'Counterfeit'][Math.floor(Math.random() * 4)],
            description: 'User reported this item for violating marketplace policies.'
        };

        setReportedModalData({
            isOpen: true,
            item: item,
            details: mockDetails
        });
    };

    const generateMoreItems = () => {
        const categories = ['Electronics', 'Furniture', 'Clothing', 'Vehicles', 'Sports', 'Books', 'Other'];
        const statuses = ['Active', 'Pending', 'Reported', 'Draft'];
        const sellers = ['John Smith', 'Emily Johnson', 'Michael Brown', 'Sarah Davis', 'David Wilson'];
        const titles = ['Gaming Console', 'Office Desk', 'Designer Bag', 'Used Laptop', 'Bicycle', 'Sofa Set', 'Digital Camera'];

        const newItems = [];
        const currentMaxId = Math.max(...items.map(i => i.id));

        for (let i = 1; i <= 5; i++) {
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            const isActive = randomStatus === 'Active';

            newItems.push({
                id: currentMaxId + i,
                title: titles[Math.floor(Math.random() * titles.length)] + ' ' + (currentMaxId + i),
                seller: sellers[Math.floor(Math.random() * sellers.length)],
                category: categories[Math.floor(Math.random() * categories.length)],
                type: Math.random() > 0.5 ? 'Service' : 'Product',
                price: '$' + (Math.floor(Math.random() * 900) + 50),
                status: randomStatus,
                notes: randomStatus === 'Reported' ? 'Flagged for review' : '',
                date: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                views: isActive ? `${Math.floor(Math.random() * 1000) + 50}` : '-',
                inquiries: isActive ? `${Math.floor(Math.random() * 20)}` : '-'
            });
        }

        setItems(prevItems => [...prevItems, ...newItems]);
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
                        </span> &gt; Marketplace
                    </div>
                    <h1 className="text-3xl font-handwriting font-bold text-slate-800">
                        Marketplace Management
                    </h1>
                </div>

                {/* Right: Summary Cards */}
                {/* Right: Summary Cards */}
                <div className="metrics ml-auto">
                    {/* New Today Card */}
                    <motion.div
                        whileHover={{ y: -4 }}
                        onClick={() => setActiveTab(activeTab === 'new_today' ? 'all' : 'new_today')}
                        className={`metric emerald ${activeTab === 'new_today' ? 'active' : ''}`}
                    >
                        <div className="metric-bg"></div>
                        <div className="metric-content">
                            <div className="metric-header">
                                <div className="metric-icon">
                                    <ShoppingBag size={16} />
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
                        onClick={() => setActiveTab(activeTab === 'pending' ? 'all' : 'pending')}
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

                    {/* Reported Items Card */}
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
                                    <span>+2%</span>
                                </div>
                            </div>
                            <div className="metric-body">
                                <p className="metric-label">Reported Items</p>
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
                <div className="table-header">
                    <div className="table-header-left">
                        <div className="filter-toggle-bar">
                            <button
                                onClick={() => setItemTypeFilter('product')}
                                className={`filter-btn ${itemTypeFilter === 'product' ? 'active' : ''}`}
                            >
                                Products
                            </button>
                            <button
                                onClick={() => setItemTypeFilter('service')}
                                className={`filter-btn ${itemTypeFilter === 'service' ? 'active' : ''}`}
                            >
                                Services
                            </button>
                        </div>
                    </div>
                </div>

                <div className="table-container">
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th style={{ width: '40%' }}>
                                    <div className="table-filter-header" style={{ cursor: 'default' }}>
                                        Listing
                                        <div className="table-search-container">
                                            <Search size={16} className="table-search-icon" />
                                            <input
                                                type="text"
                                                placeholder="Search listings..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="table-search-input"
                                            />
                                        </div>
                                    </div>
                                </th>
                                <th>
                                    <div className="table-filter-header" onClick={() => toggleFilter('seller')}>
                                        <span>Seller</span>
                                        <ChevronDown size={14} className={openFilter === 'seller' ? 'rotate' : ''} />
                                    </div>
                                </th>
                                <th>
                                    <div className="table-filter-header" onClick={() => toggleFilter('category')}>
                                        <span>Category</span>
                                        <ChevronDown size={14} className={openFilter === 'category' ? 'rotate' : ''} />
                                    </div>
                                </th>
                                <th onClick={() => toggleFilter('price')}>
                                    <div className="table-filter-header">
                                        <span>Price</span>
                                        <ChevronDown size={14} className={openFilter === 'price' ? 'rotate' : ''} />
                                    </div>
                                </th>
                                <th onClick={() => toggleFilter('status')}>
                                    <div className="table-filter-header">
                                        <span>Status</span>
                                        <ChevronDown size={14} className={openFilter === 'status' ? 'rotate' : ''} />
                                    </div>
                                </th>
                                <th onClick={() => toggleFilter('notes')}>
                                    <div className="table-filter-header">
                                        <span>Notes</span>
                                        <ChevronDown size={14} className={openFilter === 'notes' ? 'rotate' : ''} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map((item) => (
                                <tr key={item.id} className="user-row hover:bg-slate-50">
                                    <td>
                                        <div className="flex items-center gap-4">
                                            {/* Menu Dots */}
                                            <div className="kebab-menu-container relative">
                                                <button
                                                    className="p-1 text-slate-400 hover:text-slate-800 transition-colors"
                                                    onClick={(e) => { e.stopPropagation(); toggleMenu(item.id); }}
                                                >
                                                    <MoreVertical size={20} />
                                                </button>

                                                {activeMenuId === item.id && (
                                                    <div className="kebab-menu-popup">
                                                        <button className="kebab-menu-item" onClick={() => handleViewItem(item)}>
                                                            <Eye size={16} /> <span>View Details</span>
                                                        </button>
                                                        <button className="kebab-menu-item" onClick={() => handleEditItem(item)}>
                                                            <Edit2 size={16} /> <span>Edit Listing</span>
                                                        </button>
                                                        <button className="kebab-menu-item" onClick={() => handleHideUnpublish(item)}>
                                                            <EyeOff size={16} /> <span>Hide/Unpublish</span>
                                                        </button>
                                                        <div className="kebab-menu-divider"></div>
                                                        <button className="kebab-menu-item text-red-600 hover:bg-red-50" onClick={() => handleRemoveItem(item)}>
                                                            <Trash2 size={16} /> <span>Remove Listing</span>
                                                        </button>
                                                        <button className="kebab-menu-item text-amber-600 hover:bg-amber-50" onClick={() => handleWarnUser(item)}>
                                                            <UserX size={16} /> <span>Warn Seller</span>
                                                        </button>
                                                        <div className="kebab-menu-divider"></div>
                                                        <button className="kebab-menu-item text-emerald-600 hover:bg-emerald-50" onClick={() => handleApprove(item)}>
                                                            <Check size={16} /> <span>Approve</span>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Thumbnail Placeholder */}
                                            <div className="w-12 h-12 rounded-lg bg-orange-100 border border-orange-200 flex-shrink-0 flex items-center justify-center text-orange-400">
                                                <ShoppingBag size={20} />
                                            </div>

                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-800 text-sm">{item.title}</span>
                                                <span className="text-xs text-slate-500">Posted on {item.date}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td><div className="text-sm font-medium text-slate-600">{item.seller}</div></td>
                                    <td><div className="text-sm font-medium text-slate-600">{item.category}</div></td>
                                    <td><div className="text-sm font-bold text-slate-800">{item.price}</div></td>
                                    <td>
                                        <span onClick={(e) => {
                                            if (item.status === 'Reported') {
                                                e.stopPropagation();
                                                handleReportedClick(item);
                                            }
                                        }}
                                            className={`inline-flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-full ${item.status === 'Reported' ? 'text-red-600 cursor-pointer' :
                                                item.status === 'Pending' ? 'text-amber-600' :
                                                    item.status === 'Active' ? 'text-emerald-600' :
                                                        'text-slate-600'
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

                {filteredItems.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <PackageSearch size={32} />
                        </div>
                        <h3>No Products/Services found</h3>
                        <p>Try adjusting your search terms</p>
                    </div>
                )}

                <div className="showing">
                    <div>Showing {filteredItems.length} results</div>
                    <button
                        onClick={generateMoreItems}
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
                                {openFilter === 'price' ? (
                                    <div className="p-4 space-y-4">
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <label className="text-[10px] font-bold text-slate-500 uppercase">Min</label>
                                                <input
                                                    type="number"
                                                    className="form-input w-full"
                                                    placeholder="0"
                                                    value={tableFilters.price.min}
                                                    onChange={(e) => setTableFilters(prev => ({
                                                        ...prev,
                                                        price: { ...prev.price, min: e.target.value }
                                                    }))}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label className="text-[10px] font-bold text-slate-500 uppercase">Max</label>
                                                <input
                                                    type="number"
                                                    className="form-input w-full"
                                                    placeholder="Max"
                                                    value={tableFilters.price.max}
                                                    onChange={(e) => setTableFilters(prev => ({
                                                        ...prev,
                                                        price: { ...prev.price, max: e.target.value }
                                                    }))}
                                                />
                                            </div>
                                        </div>
                                        <div className="pt-2">
                                            <input
                                                type="range"
                                                className="range-input w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                                min="0"
                                                max="100000"
                                                step="100"
                                                value={tableFilters.price.max || 100000}
                                                onChange={(e) => setTableFilters(prev => ({
                                                    ...prev,
                                                    price: { ...prev.price, max: e.target.value }
                                                }))}
                                            />
                                        </div>
                                        <button
                                            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs transition-colors"
                                            onClick={() => setTableFilters(prev => ({ ...prev, price: { min: '', max: '' } }))}
                                        >
                                            Reset Range
                                        </button>
                                    </div>
                                ) : (
                                    (openFilter === 'seller' ? uniqueSellers :
                                        openFilter === 'category' ? uniqueCategories :
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

            {/* Mock Item Preview Modal */}
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
                                        <ShoppingBag size={20} className="text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="modal-title">{previewItem.title}</h3>
                                        <p className="modal-subtitle">Listing Details</p>
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
                                            <label className="form-label">Item Title</label>
                                            <input
                                                type="text"
                                                value={editFormData?.title || ''}
                                                onChange={(e) => handleFormChange('title', e.target.value)}
                                                className="form-input text-lg font-bold"
                                            />
                                        </div>

                                        <div className="form-grid">
                                            <div className="form-group">
                                                <label className="form-label">Price</label>
                                                <input
                                                    type="text"
                                                    value={editFormData?.price || ''}
                                                    onChange={(e) => handleFormChange('price', e.target.value)}
                                                    className="form-input font-bold text-orange-600"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Status</label>
                                                <select
                                                    value={editFormData?.status || ''}
                                                    onChange={(e) => handleFormChange('status', e.target.value)}
                                                    className="form-select"
                                                >
                                                    <option value="Active">Active</option>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Reported">Reported</option>
                                                    <option value="Draft">Draft</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Description / Notes</label>
                                            <textarea
                                                value={editFormData?.notes || ''}
                                                onChange={(e) => handleFormChange('notes', e.target.value)}
                                                className="form-textarea"
                                                placeholder="Add details about this listing..."
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
                                        {/* Image Preview */}
                                        <div className="market-preview">
                                            <div className="text-center">
                                                <ShoppingBag size={64} className="mx-auto mb-2 text-orange-600" />
                                                <p className="text-sm text-orange-700 font-semibold">{previewItem.category} Category</p>
                                            </div>
                                        </div>

                                        <div className="form-grid">
                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                <p className="form-label mb-1 adequate-spacing">Seller</p>
                                                <p className="text-sm font-bold text-slate-800 adequate-spacing">{previewItem.seller}</p>
                                            </div>
                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                <p className="form-label mb-1 adequate-spacing">Price</p>
                                                <p className="text-sm font-bold text-orange-600 adequate-spacing">{previewItem.price}</p>
                                            </div>
                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                <p className="form-label mb-1 adequate-spacing">Status</p>
                                                <span className={`status-badge ${previewItem.status.toLowerCase()}`}>
                                                    {previewItem.status}
                                                </span>
                                            </div>
                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                <p className="form-label mb-1 adequate-spacing">Posted Date</p>
                                                <p className="text-sm font-bold text-slate-800 adequate-spacing">{previewItem.date}</p>
                                            </div>
                                        </div>

                                        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                                            <p className="text-xs font-bold text-orange-800 uppercase tracking-wide mb-2 adequate-spacing">Listing Notes</p>
                                            <p className="text-sm text-orange-900 leading-relaxed adequate-spacing">{previewItem.notes}</p>
                                        </div>

                                        <div className="modal-actions">
                                            <button
                                                onClick={handleStartEdit}
                                                className="submit-btn flex items-center justify-center gap-2"
                                            >
                                                <Edit2 size={16} />
                                                Edit Listing
                                            </button>
                                            <button
                                                onClick={() => handleApprove(previewItem)}
                                                className="cancel-btn text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 flex items-center justify-center gap-2"
                                            >
                                                <CheckCircle2 size={16} />
                                                Approve
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
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
                                        <FileText size={20} className="text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="modal-title">Edit Note</h3>
                                        <p className="modal-subtitle">Update item notes</p>
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

            {/* Reported Modal */}
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

                /* User Table Card Styles */
                .user-table-card {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                    overflow: hidden; /* Ensure menus aren't clipped */
                    margin-top: 1.5rem;
                    
                }
                .table-header {
                    padding: .5rem;
                    border-radius: 12px 12px 0 0;
                    border-bottom: 1px solid #e2e8f0;
                    background: #fffaf5;
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
                .user-row {
                    transition: background-color 0.2s;
                }
                .user-row:hover {
                    background: #fffaf5;
                }
                
                .kebab-menu-container { position: relative; }
                .kebab-menu-popup {
                    position: absolute;
                    top: 100%; left: 0;
                    margin-top: 4px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    z-index: 1000;
                    min-width: 180px;
                    overflow: hidden;
                    animation: menuSlideIn 0.15s ease-out;
                }
                @keyframes menuSlideIn {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
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
                    color: #334155;
                    cursor: pointer;
                    transition: all 0.15s ease;
                }
                .kebab-menu-item:hover { background: #f8fafc; }
                .kebab-menu-divider { height: 1px; background: #e2e8f0; margin: 4px 0; }

                /* Filter Toggle Bar */
                .filter-toggle-bar {
                    display: flex;
                    background: #f1f5f9;
                    padding: 4px;
                    border-radius: 10px;
                    gap: 4px;
                }
                .filter-btn {
                    padding: 6px 16px;
                    border-radius: 8px;
                    font-size: 13px;
                    font-weight: 600;
                    color: #64748b;
                    transition: all 0.2s;
                    border: none;
                    background: transparent;
                    cursor: pointer;
                }
                .filter-btn:hover {
                    color: #1e293b;
                }
                .filter-btn.active {
                    background: white;
                    color: #1e293b;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
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

                .market-preview {
                    width: 100%;
                    height: 300px;
                    background: linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%);
                    border-radius: 12px;
                    border: 1px solid #fde68a;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    margin-bottom: 1.5rem;
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
                .status-badge.active { color: #059669; background: #ecfdf5; }
                .status-badge.sold { color: #64748b; background: #f1f5f9; }
                .status-badge.reported { color: #dc2626; background: #fef2f2; }
                .status-badge.pending { color: #d97706; background: #fffbeb; }
                .status-badge.draft { color: #475569; background: #f8fafc; }

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
}

export default Marketplace;
