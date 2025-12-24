import React, { useState } from 'react';
import {
    Users,
    Eye,
    MousePointer2,
    TrendingUp,
    ArrowUpRight,
    Clock,
    ChevronRight,
    MoreVertical,
    Search,
    CheckCircle2,
    AlertCircle,
    Settings,
    Edit3,
    Bell,
    Menu,
    Home,
    BarChart3,
    UserPlus,
    FileText,
    Shield,
    LogOut,
    Download,
    Filter,
    Calendar,
    Heart,
    Gamepad2,
    ChevronDown,
    Activity as ActivityIcon,
    Layout,
    BarChart
} from 'lucide-react';

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
        padding: '16px 24px',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    content: {
        padding: '24px',
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
        borderRadius: '12px'
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
    },
    btnPrimary: {
        background: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
        color: 'white',
        fontWeight: 600,
        padding: '10px 20px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px'
    }
};

const Shell = ({ children, activeTab, setActiveTab }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [pageMenuOpen, setPageMenuOpen] = useState(false);

    const navItems = [
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
    ];

    const subPages = [
        { id: 'page-view', label: 'Page View', icon: <Layout size={16} /> },
        { id: 'analytics', label: 'Analytics', icon: <BarChart size={16} /> },
        { id: 'content', label: 'Content Management', icon: <Edit3 size={16} /> },
        { id: 'page-people', label: 'People Management', icon: <Users size={16} /> },
        { id: 'page-events', label: 'Events', icon: <Calendar size={16} /> },
        { id: 'page-csr', label: 'CSR', icon: <Heart size={16} /> },
        { id: 'feed', label: 'Feed', icon: <ActivityIcon size={16} /> },
        { id: 'activity', label: 'Activity', icon: <ActivityIcon size={16} /> },
        { id: 'edit', label: 'Edit Page', icon: <Edit3 size={16} /> },
    ];

    const handleNavClick = (id, hasSubmenu) => {
        if (hasSubmenu) {
            setPageMenuOpen(!pageMenuOpen);
        } else {
            setActiveTab(id);
            setPageMenuOpen(false);
        }
    };

    return (
        <div style={styles.app}>
            {/* Sidebar */}
            <div style={{
                ...styles.sidebar,
                transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)'
            }}>
                <div style={styles.logo}>
                    <div style={styles.logoIcon}>
                        <TrendingUp style={{ color: 'white' }} size={24} />
                    </div>
                    <div>
                        <h1 style={styles.logoText}>
                            JXG<span style={{ color: '#f97316' }}>ONE</span>
                        </h1>
                        <p style={styles.logoSubtext}>Control Center</p>
                    </div>
                </div>

                <nav style={styles.nav}>
                    {navItems.map((item) => (
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
                                {item.hasSubmenu && (
                                    <ChevronDown
                                        size={16}
                                        style={{
                                            marginLeft: 'auto',
                                            transform: pageMenuOpen ? 'rotate(180deg)' : 'rotate(0)',
                                            transition: 'transform 0.3s ease'
                                        }}
                                    />
                                )}
                                {!item.hasSubmenu && activeTab === item.id && (
                                    <div style={{ marginLeft: 'auto', width: '8px', height: '8px', backgroundColor: '#f97316', borderRadius: '50%' }} />
                                )}
                            </button>

                            {/* Submenu with "Pop-up" feel */}
                            {item.hasSubmenu && pageMenuOpen && (
                                <div style={styles.submenu}>
                                    {subPages.map((subPage) => (
                                        <button
                                            key={subPage.id}
                                            onClick={() => setActiveTab(subPage.id)}
                                            style={{
                                                ...styles.submenuItem,
                                                ...(activeTab === subPage.id ? styles.submenuItemActive : {})
                                            }}
                                        >
                                            <span style={{ marginRight: '8px', opacity: 0.7 }}>{subPage.icon}</span>
                                            {subPage.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </nav>

                <div style={styles.profile}>
                    <div style={styles.profileCard}>
                        <img
                            src="https://i.pravatar.cc/150?u=john"
                            alt="Profile"
                            style={styles.avatar}
                        />
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>
                                John Anderson
                            </p>
                            <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
                                Admin
                            </p>
                        </div>
                        <button style={{
                            padding: '8px',
                            color: '#64748b',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '8px'
                        }}>
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div style={{
                ...styles.main,
                marginLeft: sidebarOpen ? '280px' : '0'
            }}>
                <header style={styles.header}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            style={{
                                padding: '8px',
                                backgroundColor: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                borderRadius: '12px'
                            }}
                        >
                            <Menu size={24} color="#475569" />
                        </button>

                        <div style={styles.searchContainer}>
                            <Search size={18} style={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Search dashboard..."
                                style={styles.searchInput}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button style={{
                            padding: '10px',
                            color: '#475569',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '12px',
                            position: 'relative'
                        }}>
                            <Bell size={20} />
                            <span style={{
                                position: 'absolute',
                                top: '-4px',
                                right: '-4px',
                                width: '20px',
                                height: '20px',
                                backgroundColor: '#ef4444',
                                color: 'white',
                                fontSize: '12px',
                                fontWeight: 700,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                3
                            </span>
                        </button>

                        <button style={{
                            padding: '10px',
                            color: '#475569',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '12px'
                        }}>
                            <Settings size={20} />
                        </button>

                        <div style={{ width: '1px', height: '24px', backgroundColor: '#e2e8f0', margin: '0 8px' }} />

                        <button style={styles.btnPrimary}>
                            <Download size={18} />
                            Export Data
                        </button>
                    </div>
                </header>

                <main style={styles.content}>
                    {children}
                </main>

                <footer style={{
                    marginTop: 'auto',
                    padding: '24px',
                    borderTop: '1px solid #e2e8f0',
                    backgroundColor: 'white'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <p style={{ fontSize: '14px', color: '#64748b' }}>
                            © 2024 JXG-ONE Control Center. All rights reserved.
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <button style={{ fontSize: '14px', color: '#64748b', border: 'none', background: 'none', cursor: 'pointer' }}>Privacy Policy</button>
                            <button style={{ fontSize: '14px', color: '#64748b', border: 'none', background: 'none', cursor: 'pointer' }}>Terms of Service</button>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Global Style Injector */}
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
                
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }
                
                body {
                    margin: 0;
                    font-family: 'Inter', sans-serif;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }

                button:hover {
                    opacity: 0.8;
                }

                @media (max-width: 1024px) {
                    /* Handle tablet/mobile viewports if needed */
                }
                `}
            </style>
        </div>
    );
};

export default Shell;
