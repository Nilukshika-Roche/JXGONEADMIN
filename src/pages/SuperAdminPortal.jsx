import React, { useState } from 'react';
import {
    Users,
    Home,
    Search,
    Bell,
    Settings,
    LogOut,
    ChevronDown,
    Shield,
    Building2,
    FileText,
    Edit3,
    Calendar,
    Heart,
    Gamepad2,
    Layout,
    BarChart,
    Activity as ActivityIcon,
    TrendingUp,
    ShoppingBag
} from 'lucide-react';

// Import Admin/SuperAdmin Specific pages if they are not already integrated
import AdminManagement from './AdminManagement';
import CompanyManagement from './CompanyManagement';
import SuperAdminDashboard from './SuperAdminDashboard';
import Dashboard from './Dashboard';
import PageView from './PageView';
import Analytics from './Analytics';
import ContentManagement from './ContentManagement';
import PeopleManagement from './PeopleManagement';
import CSR from './CSR';
import Events from './Events';
import Games from './Games';
import PageEvents from './PageEvents';
import PagePeople from './PagePeople';
import PageCSR from './PageCSR';
import MediaHubPage from './MediaHubPage.jsx';
import Activity from './Activity';
import CompanyProfile from './CompanyProfile';
import EditPage from './EditPage'; // Import EditPage (LinkedInPageEditor)
import Marketplace from './Marketplace';
import './CompanyProfile.css';

const styles = {
    app: {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        fontFamily: "'Inter', sans-serif",
    },
    sidebar: {
        width: '280px',
        backgroundColor: 'white',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 100,
        transition: 'transform 0.3s ease'
    },
    main: {
        flex: 1,
        marginLeft: '280px',
        transition: 'margin-left 0.3s ease',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        position: 'sticky',
        top: 0,
        backgroundColor: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '10px 24px',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    content: {
        padding: '12px',
        flex: 1
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '24px',
        borderBottom: '1px solid #f1f5f9'
    },
    logoIcon: {
        width: '40px',
        height: '40px',
        background: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoText: {
        fontSize: '20px',
        fontWeight: 900,
        color: '#1e293b'
    },
    logoSubtext: {
        fontSize: '10px',
        color: '#64748b',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginTop: '4px'
    },
    nav: {
        padding: '16px',
        flex: 1,
        overflowY: 'auto'
    },
    navItem: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: 600,
        border: 'none',
        cursor: 'pointer',
        marginBottom: '4px',
        textAlign: 'left',
        transition: 'all 0.2s ease',
        position: 'relative'
    },
    navItemActive: {
        backgroundColor: '#ffedd5',
        color: '#ea580c',
    },
    navItemInactive: {
        backgroundColor: 'transparent',
        color: '#475569'
    },
    submenu: {
        marginLeft: '12px',
        paddingLeft: '24px',
        borderLeft: '2px solid #fed7aa',
        marginBottom: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
    },
    submenuItem: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '8px 12px',
        borderRadius: '8px',
        fontSize: '13px',
        fontWeight: 500,
        color: '#64748b',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.2s ease'
    },
    submenuItemActive: {
        color: '#ea580c',
        backgroundColor: '#fff7ed',
        fontWeight: 700
    },
    profile: {
        padding: '16px',
        borderTop: '1px solid #f1f5f9'
    },
    profileCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease'
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '12px',
        border: '2px solid #fed7aa'
    },
    searchContainer: {
        position: 'relative'
    },
    searchInput: {
        width: '320px',
        padding: '10px 16px 10px 40px',
        backgroundColor: '#f1f5f9',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: 500,
        color: '#1e293b'
    },
    searchIcon: {
        position: 'absolute',
        left: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#94a3b8'
    }
};

const SuperAdminPortal = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState('sa-dashboard');
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
    const [pageMenuOpen, setPageMenuOpen] = useState(false);

    const companies = [
        { id: 'CMP-001', name: 'Janashakthi Insurance', industry: 'Insurance', region: 'Colombo', users: '5.2k', plan: 'Enterprise', status: 'Active', date: '2024-01-10', logo: 'JI' },
        { id: 'CMP-002', name: 'JXG Finance', industry: 'Finance', region: 'Kandy', users: '3.1k', plan: 'Premium', status: 'Active', date: '2024-01-15', logo: 'JF' },
        { id: 'CMP-003', name: 'Lanka Holdings', industry: 'Conglomerate', region: 'Galle', users: '2.4k', plan: 'Enterprise', status: 'Suspended', date: '2023-11-20', logo: 'LH' },
        { id: 'CMP-004', name: 'First Capital', industry: 'Investment', region: 'Colombo', users: '1.7k', plan: 'Standard', status: 'Active', date: '2023-12-05', logo: 'FC' },
    ];

    // Navigation configuration
    const superAdminNav = [
        { id: 'sa-dashboard', icon: <TrendingUp size={20} />, label: 'Super Admin Dashboard' },
        { id: 'admin-mgt', icon: <Shield size={20} />, label: 'Admin Management' },
        { id: 'company-mgt', icon: <Building2 size={20} />, label: 'Company Management' },
    ];

    const companyAdminNav = [
        { id: 'dashboard', icon: <Home size={20} />, label: 'Dashboard' },
        {
            id: 'page-management',
            icon: <FileText size={20} />,
            label: 'Page Management',
            hasSubmenu: true
        },
        { id: 'people', icon: <Users size={20} />, label: 'User Management' },
        { id: 'content', icon: <Edit3 size={20} />, label: 'Content Management' },
        { id: 'events', icon: <Calendar size={20} />, label: 'Events' },
        { id: 'csr', icon: <Heart size={20} />, label: 'CSR' },
        { id: 'games', icon: <Gamepad2 size={20} />, label: 'Games' },
        { id: 'marketplace', icon: <ShoppingBag size={20} />, label: 'Marketplace' },
    ];

    const subPages = [
        { id: 'page-view', label: 'Page View', icon: <Layout size={16} /> },
        { id: 'analytics', label: 'Analytics', icon: <BarChart size={16} /> },
        { id: 'page-content', label: 'Page Content', icon: <Edit3 size={16} /> },
        { id: 'page-people', label: 'Team', icon: <Users size={16} /> },
        { id: 'page-events', label: 'Events', icon: <Calendar size={16} /> },
        { id: 'page-csr', label: 'CSR', icon: <Heart size={16} /> },
        { id: 'activity', label: 'Activity', icon: <ActivityIcon size={16} /> },
        { id: 'edit-page', label: 'Edit Page', icon: <FileText size={16} /> },
    ];


    const renderContent = () => {
        // Shared fallback for company-specific pages
        const entityTabs = [
            'dashboard', 'people', 'content', 'events', 'csr', 'games',
            'page-view', 'analytics', 'page-people', 'page-events', 'page-csr', 'page-content', 'activity'
        ];


        switch (activeTab) {
            case 'sa-dashboard': return <SuperAdminDashboard />;
            case 'admin-mgt': return <AdminManagement />;
            case 'company-mgt': return <CompanyManagement onSelectCompany={handleCompanySelect} />;
            case 'profile': return <AdminProfile setActiveTab={setActiveTab} />;
            case 'dashboard': return <Dashboard company={selectedCompany} />;
            case 'page-view': return <PageView companyData={selectedCompany || {}} setActiveTab={(tab) => {
                if (tab === 'edit') setActiveTab('edit-page');
                else setActiveTab(tab);
            }} />;
            case 'analytics': return <Analytics company={selectedCompany} />;
            case 'content': return <ContentManagement company={selectedCompany} />;
            case 'people': return <PeopleManagement company={selectedCompany} />;
            case 'csr': return <CSR company={selectedCompany} />;
            case 'events': return <Events company={selectedCompany} />;
            case 'games': return <Games company={selectedCompany} />;
            case 'marketplace': return <Marketplace company={selectedCompany} />;
            case 'page-events': return <PageEvents company={selectedCompany} />;
            case 'page-people': return <PagePeople company={selectedCompany} setActiveTab={setActiveTab} />;
            case 'page-csr': return <PageCSR company={selectedCompany} />;
            case 'page-content': return <MediaHubPage company={selectedCompany} />;
            case 'activity': return <Activity company={selectedCompany} />;
            case 'edit-page': return <EditPage companyData={selectedCompany || {}} setCompanyData={(data) => console.log('Updated Company Data:', data)} onClose={() => setActiveTab('dashboard')} />;
            case 'company-profile': return (
                <CompanyProfile
                    company={selectedCompany}
                    onBack={() => setActiveTab('sa-dashboard')}
                    onManage={() => setActiveTab('dashboard')}
                />
            );
            default: return <AdminManagement />;
        }
    };

    const handleNavClick = (id, hasSubmenu) => {
        if (hasSubmenu) {
            setPageMenuOpen(!pageMenuOpen);
        } else {
            setActiveTab(id);
            setPageMenuOpen(false);
        }
    };

    const handleCompanySelect = (company) => {
        setSelectedCompany(company);
        setIsCompanyDropdownOpen(false);
        setActiveTab('company-profile');
    };

    const clearSelection = () => {
        setSelectedCompany(null);
        setActiveTab('sa-dashboard');
    };

    return (
        <div style={styles.app}>
            {/* Super Admin Specialized Sidebar */}
            <div style={styles.sidebar}>
                <div style={styles.logo}>
                    <div style={styles.logoIcon}>
                        <TrendingUp style={{ color: 'white' }} size={24} />
                    </div>
                    <div>
                        <h1 style={styles.logoText}>
                            JXG<span style={{ color: '#f97316' }}>ONE</span>
                        </h1>
                        <p style={styles.logoSubtext}>Super Admin Portal</p>
                    </div>
                </div>


                <nav style={styles.nav}>
                    {/* Primary Super Admin Navigation */}
                    {superAdminNav.map((item) => (
                        <React.Fragment key={item.id}>
                            <button
                                onClick={() => handleNavClick(item.id, item.hasSubmenu)}
                                style={{
                                    ...styles.navItem,
                                    ...(activeTab === item.id ? styles.navItemActive : styles.navItemInactive)
                                }}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </button>

                            {/* Quick Selection Feature - Always here, tucked under Company Management */}
                            {item.id === 'company-mgt' && (
                                <div style={{ margin: '8px 16px 16px 16px' }}>
                                    <div style={{ position: 'relative' }}>
                                        <button
                                            onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
                                            style={{
                                                width: '100%',
                                                padding: '10px 12px',
                                                background: selectedCompany ? '#fff7ed' : '#f8fafc',
                                                border: selectedCompany ? '1px solid #fed7aa' : '1px solid #e2e8f0',
                                                borderRadius: '10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                {selectedCompany ? <Shield size={14} color="#f97316" /> : <Search size={14} color="#94a3b8" />}
                                                <span style={{ fontSize: '13px', fontWeight: 600, color: selectedCompany ? '#f97316' : '#64748b' }}>
                                                    {selectedCompany ? selectedCompany.name : 'Select Company'}
                                                </span>
                                            </div>
                                            <ChevronDown size={14} color="#94a3b8" />
                                        </button>

                                        {isCompanyDropdownOpen && (
                                            <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, background: 'white', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 110 }}>
                                                {companies.map(c => (
                                                    <button
                                                        key={c.id}
                                                        onClick={() => handleCompanySelect(c)}
                                                        style={{
                                                            width: '100%',
                                                            padding: '10px 12px',
                                                            textAlign: 'left',
                                                            border: 'none',
                                                            background: 'white',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '8px',
                                                            borderRadius: '8px',
                                                            transition: 'background 0.2s'
                                                        }}
                                                        onMouseEnter={(e) => e.target.style.background = '#fff7ed'}
                                                        onMouseLeave={(e) => e.target.style.background = 'white'}
                                                    >
                                                        <div style={{ width: '20px', height: '20px', background: '#e2e8f0', borderRadius: '4px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.logo}</div>
                                                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>{c.name}</span>
                                                    </button>
                                                ))}
                                                {selectedCompany && (
                                                    <button onClick={clearSelection} style={{ width: '100%', padding: '10px 12px', textAlign: 'left', border: 'none', background: '#fef2f2', cursor: 'pointer', color: '#ef4444', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}>Clear Selection</button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}

                    {/* Secondary Company Admin Navigation - Permanently Visible */}
                    <div style={{ margin: '16px 16px 8px', fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Entity Management
                    </div>
                    {companyAdminNav.map((item) => (
                        <React.Fragment key={item.id}>
                            <button
                                onClick={() => handleNavClick(item.id, item.hasSubmenu)}
                                style={{
                                    ...styles.navItem,
                                    ...(activeTab === item.id || (item.hasSubmenu && subPages.some(p => p.id === activeTab))
                                        ? styles.navItemActive
                                        : styles.navItemInactive)
                                }}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                                {item.hasSubmenu && <ChevronDown size={16} style={{ marginLeft: 'auto', transform: pageMenuOpen ? 'rotate(180deg)' : 'none' }} />}
                            </button>

                            {item.hasSubmenu && pageMenuOpen && (
                                <div style={styles.submenu}>
                                    {subPages.map((sub) => (
                                        <button
                                            key={sub.id}
                                            onClick={() => setActiveTab(sub.id)}
                                            style={{
                                                ...styles.submenuItem,
                                                ...(activeTab === sub.id ? styles.submenuItemActive : {})
                                            }}
                                        >
                                            {sub.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </nav>

                <div style={styles.profile}>
                    <div
                        style={{
                            ...styles.profileCard,
                            backgroundColor: activeTab === 'profile' ? '#f8fafc' : 'transparent'
                        }}
                        onClick={() => setActiveTab('profile')}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = activeTab === 'profile' ? '#f8fafc' : 'transparent'}
                    >
                        <img src="https://i.pravatar.cc/150?u=super" alt="Super Admin" style={styles.avatar} />
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '14px', fontWeight: 700 }}>Super User</p>
                            <p style={{ fontSize: '12px', color: '#64748b' }}>Master Access</p>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onLogout();
                            }}
                            style={{ padding: '8px', border: 'none', background: 'transparent', cursor: 'pointer' }}
                        >
                            <LogOut size={18} color="#ef4444" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div style={styles.main}>
                <header style={styles.header}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={styles.searchContainer}>
                            <Search size={18} style={styles.searchIcon} />
                            <input type="text" placeholder="Search system-wide..." style={styles.searchInput} />
                        </div>
                        <button style={{ padding: '10px', border: 'none', background: 'transparent', cursor: 'pointer', position: 'relative' }}>
                            <Bell size={20} color="#64748b" />
                            <span style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }}></span>
                        </button>
                    </div>
                </header>

                <main style={styles.content}>
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default SuperAdminPortal;
