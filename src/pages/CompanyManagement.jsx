import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2,
    Search,
    Plus,
    MoreVertical,
    Eye,
    Edit2,
    Trash2,
    XCircle,
    CheckCircle2,
    Filter,
    ChevronLeft,
    ChevronRight,
    Users,
    Globe,
    ExternalLink,
    Shield,
    Download,
    Zap,
    X
} from 'lucide-react';
import './CompanyManagement.css';

const CompanyManagement = ({ onSelectCompany }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [industryFilter, setIndustryFilter] = useState('all');
    const [regionFilter, setRegionFilter] = useState('all');
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [registrationData, setRegistrationData] = useState({
        name: '',
        industry: 'Insurance',
        region: 'Colombo',
        plan: 'Standard'
    });

    const [companies, setCompanies] = useState([
        { id: 'CMP-001', name: 'Janashakthi Insurance', industry: 'Insurance', region: 'Colombo', users: '5.2k', plan: 'Enterprise', status: 'Active', date: '2024-01-10', logo: 'JI' },
        { id: 'CMP-002', name: 'JXG Finance', industry: 'Finance', region: 'Kandy', users: '3.1k', plan: 'Premium', status: 'Active', date: '2024-01-15', logo: 'JF' },
        { id: 'CMP-003', name: 'Lanka Holdings', industry: 'Conglomerate', region: 'Galle', users: '2.4k', plan: 'Enterprise', status: 'Suspended', date: '2023-11-20', logo: 'LH' },
        { id: 'CMP-004', name: 'First Capital', industry: 'Investment', region: 'Colombo', users: '1.7k', plan: 'Standard', status: 'Active', date: '2023-12-05', logo: 'FC' },
        { id: 'CMP-005', name: 'Global Logistics', industry: 'Logistics', region: 'Negombo', users: '940', plan: 'Premium', status: 'Pending', date: '2024-02-01', logo: 'GL' },
    ]);

    const industries = ['all', ...new Set(companies.map(c => c.industry))];
    const regions = ['all', ...new Set(companies.map(c => c.region))];

    const filteredCompanies = companies.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesIndustry = industryFilter === 'all' || c.industry === industryFilter;
        const matchesRegion = regionFilter === 'all' || c.region === regionFilter;
        return matchesSearch && matchesIndustry && matchesRegion;
    });

    const toggleSelection = (id) => {
        setSelectedCompanies(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedCompanies.length === companies.length) {
            setSelectedCompanies([]);
        } else {
            setSelectedCompanies(companies.map(c => c.id));
        }
    };

    const toggleMenu = (e, id) => {
        e.stopPropagation();
        setActiveMenuId(activeMenuId === id ? null : id);
    };

    const handleRegisterCompany = (e) => {
        e.preventDefault();
        const newCompany = {
            id: `CMP-0${companies.length + 1}`,
            ...registrationData,
            users: '0',
            status: 'Active',
            date: new Date().toISOString().split('T')[0],
            logo: registrationData.name.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2)
        };
        setCompanies([newCompany, ...companies]);
        setIsAddModalOpen(false);
        setRegistrationData({ name: '', industry: 'Insurance', region: 'Colombo', plan: 'Standard' });
    };

    return (
        <div className="cm-wrapper">


            {/* Main Content Area */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="cm-content-card"
            >
                {/* Compact Toolbar */}
                <div className="compact-toolbar">
                    <div className="toolbar-info">
                        <div className="directory-badge">
                            <Building2 size={14} />
                            <span className="directory-title">Company Directory</span>
                            <span className="member-count">24 Companies</span>
                        </div>
                    </div>

                    <div className="toolbar-controls">
                        <div className="search-compact">
                            <Search size={12} />
                            <input
                                type="text"
                                placeholder="Search companies..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input-compact"
                            />
                        </div>

                        <div className="control-buttons">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="add-btn-compact"
                                onClick={() => setIsAddModalOpen(true)}
                            >
                                <Plus size={12} />
                                <span>Register New Company</span>
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="cm-table-container">
                    <table className="cm-table">
                        <thead>
                            <tr>
                                <th style={{ width: '60px' }}></th>
                                <th>Entity Details</th>
                                <th>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        Industry
                                        <select
                                            value={industryFilter}
                                            onChange={(e) => setIndustryFilter(e.target.value)}
                                            style={{ fontSize: '10px', padding: '2px 4px', border: '1px solid #e2e8f0', borderRadius: '4px', background: 'white', cursor: 'pointer' }}
                                        >
                                            {industries.map(ind => (
                                                <option key={ind} value={ind}>{ind === 'all' ? 'All' : ind}</option>
                                            ))}
                                        </select>
                                    </div>
                                </th>
                                <th>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        Regional Hub
                                        <select
                                            value={regionFilter}
                                            onChange={(e) => setRegionFilter(e.target.value)}
                                            style={{ fontSize: '10px', padding: '2px 4px', border: '1px solid #e2e8f0', borderRadius: '4px', background: 'white', cursor: 'pointer' }}
                                        >
                                            {regions.map(reg => (
                                                <option key={reg} value={reg}>{reg === 'all' ? 'All' : reg}</option>
                                            ))}
                                        </select>
                                    </div>
                                </th>
                                <th>Active Users</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCompanies.map((company, idx) => (
                                <motion.tr
                                    key={company.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className={selectedCompanies.includes(company.id) ? 'selected' : ''}
                                >
                                    <td>
                                        <div className="actions-cell">
                                            <div style={{ position: 'relative' }}>
                                                <button
                                                    className={`action-icon-btn ${activeMenuId === company.id ? 'active' : ''}`}
                                                    onClick={(e) => toggleMenu(e, company.id)}
                                                >
                                                    <MoreVertical size={16} />
                                                </button>

                                                <AnimatePresence>
                                                    {activeMenuId === company.id && (
                                                        <>
                                                            <motion.div
                                                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                                                className="action-dropdown-menu left-align"
                                                            >
                                                                <div className="menu-item">
                                                                    <Eye size={14} /> View Details
                                                                </div>
                                                                {onSelectCompany && (
                                                                    <div className="menu-item" onClick={() => {
                                                                        onSelectCompany(company);
                                                                        setActiveMenuId(null);
                                                                    }}>
                                                                        <Zap size={14} style={{ color: '#f97316' }} /> Manage Admin
                                                                    </div>
                                                                )}
                                                                <div className="menu-item">
                                                                    <Edit2 size={14} /> Edit Details
                                                                </div>
                                                                <div className="menu-item">
                                                                    <Download size={14} /> Download Report
                                                                </div>
                                                                <div className="menu-item">
                                                                    <ExternalLink size={14} /> View Analytics
                                                                </div>
                                                                <div className="menu-item delete">
                                                                    <Trash2 size={14} /> Delete Entity
                                                                </div>
                                                            </motion.div>
                                                            <div
                                                                style={{ position: 'fixed', inset: 0, zIndex: 90 }}
                                                                onClick={() => setActiveMenuId(null)}
                                                            />
                                                        </>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="company-logo-cell">
                                            <div className="logo-placeholder">{company.logo}</div>
                                            <div>
                                                <span className="company-name-text">{company.name}</span>
                                                <span className="company-id-sub">{company.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span style={{ fontWeight: 600, color: '#475569' }}>{company.industry}</span>
                                    </td>
                                    <td>
                                        <div className="region-cell" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                                            <Globe size={12} color="#94a3b8" />
                                            {company.region}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span className="users-cell">{company.users}</span>
                                            <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 700 }}>Active</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`status-pill ${company.status.toLowerCase()}`}>
                                            <div className={company.status === 'Active' ? 'status-dot-active' : 'status-dot-suspended'} />
                                            {company.status}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="cm-pagination">
                    <div className="page-summary">Showing 1-5 of 24 registered entities</div>
                    <div className="page-controls">
                        <button className="page-btn"><ChevronLeft size={16} /></button>
                        <button className="page-btn active">1</button>
                        <button className="page-btn">2</button>
                        <button className="page-btn">3</button>
                        <span style={{ fontSize: '14px', color: '#94a3b8' }}>...</span>
                        <button className="page-btn">5</button>
                        <button className="page-btn"><ChevronRight size={16} /></button>
                    </div>
                </div>
            </motion.div>

            {/* Registration Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
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
                                        <Building2 size={20} />
                                    </div>
                                    <div>
                                        <h3 className="modal-title">Register New Company</h3>
                                        <p className="modal-subtitle">Add a new entity to the JXG Group directory</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="modal-close-btn"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleRegisterCompany} className="modal-form">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">Company Name</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="e.g. Janashakthi Insurance"
                                            value={registrationData.name}
                                            onChange={(e) => setRegistrationData({ ...registrationData, name: e.target.value })}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Industry</label>
                                        <select
                                            value={registrationData.industry}
                                            onChange={(e) => setRegistrationData({ ...registrationData, industry: e.target.value })}
                                            className="form-select"
                                        >
                                            <option value="Insurance">Insurance</option>
                                            <option value="Finance">Finance</option>
                                            <option value="Conglomerate">Conglomerate</option>
                                            <option value="Investment">Investment</option>
                                            <option value="Logistics">Logistics</option>
                                            <option value="Technology">Technology</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Regional Hub</label>
                                        <select
                                            value={registrationData.region}
                                            onChange={(e) => setRegistrationData({ ...registrationData, region: e.target.value })}
                                            className="form-select"
                                        >
                                            <option value="Colombo">Colombo</option>
                                            <option value="Kandy">Kandy</option>
                                            <option value="Galle">Galle</option>
                                            <option value="Negombo">Negombo</option>
                                            <option value="Jaffna">Jaffna</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Service Plan</label>
                                        <select
                                            value={registrationData.plan}
                                            onChange={(e) => setRegistrationData({ ...registrationData, plan: e.target.value })}
                                            className="form-select"
                                        >
                                            <option value="Standard">Standard</option>
                                            <option value="Premium">Premium</option>
                                            <option value="Enterprise">Enterprise</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="modal-actions">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="cancel-btn"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="submit-btn"
                                    >
                                        Register Entity
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CompanyManagement;
