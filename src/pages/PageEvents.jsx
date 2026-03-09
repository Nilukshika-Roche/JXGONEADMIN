import React, { useState } from 'react';
import {
    Calendar,
    Zap,
    Clock,
    ArrowLeft,
    LayoutDashboard,
    CheckCircle,
    Mail,
    Heart,
    User,
    Search,
    ChevronDown,
    Target,
    BarChart3,
    Download,
    TrendingUp,
    MessageSquare,
    Eye,
    Users
} from 'lucide-react';

const PageEvents = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const [currentTab, setCurrentTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const initialEvents = [
        // Going (3)
        {
            id: 1,
            date: "Nov 20, 2024",
            title: "Annual Tech Summit 2024",
            description: "Join us for the biggest tech conference of the year. Keynotes, workshops, and networking...",
            location: "Convention Center",
            attendees: 450,
            type: "going",
            daysRemaining: "7 days more",
            image: "https://images.unsplash.com/photo-1540575861501-7c0011e7398a?w=800&q=80"
        },
        {
            id: 2,
            date: "Nov 25, 2024",
            title: "Leadership Workshop",
            description: "A comprehensive workshop on modern leadership strategies and team management...",
            location: "Grand Hotel",
            attendees: 85,
            type: "going",
            daysRemaining: "12 days more",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"
        },
        {
            id: 3,
            date: "Nov 28, 2024",
            title: "Product Launch Gala",
            description: "Unveiling our latest product line. Exclusive access for partners and top clients...",
            location: "Skyline Lounge",
            attendees: 200,
            type: "going",
            daysRemaining: "15 days more",
            image: "https://images.unsplash.com/photo-1505373877791-51b5fbe90020?w=800&q=80"
        },

        // Invitations (3)
        {
            id: 4,
            date: "Dec 05, 2024",
            title: "AI & Future Tech",
            description: "Explore the future of Artificial Intelligence with industry experts...",
            location: "Tech Hub",
            attendees: 120,
            type: "invitations",
            daysRemaining: "22 days more",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80"
        },
        {
            id: 5,
            date: "Dec 10, 2024",
            title: "Marketing Strategy 2025",
            description: "Planning session for the upcoming year's marketing initiatives...",
            location: "Conference Room A",
            attendees: 40,
            type: "invitations",
            daysRemaining: "27 days more",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
        },
        {
            id: 6,
            date: "Dec 15, 2024",
            title: "Secure Coding Bootcamp",
            description: "Hands-on training session on secure coding practices for developers...",
            location: "Training Lab",
            attendees: 60,
            type: "invitations",
            daysRemaining: "32 days more",
            image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=800&q=80"
        },

        // Interested (2)
        {
            id: 7,
            date: "Jan 05, 2025",
            title: "Design Systems Meetup",
            description: "Connect with designers and discuss the evolution of design systems...",
            location: "Creative Space",
            attendees: 90,
            type: "interested",
            daysRemaining: "48 days more",
            image: "https://images.unsplash.com/photo-1558655146-d09347e0d7a8?w=800&q=80"
        },
        {
            id: 8,
            date: "Jan 12, 2025",
            title: "Startup Pitch Night",
            description: "Watch innovative startups pitch their ideas to investors...",
            location: "Innovation Hub",
            attendees: 150,
            type: "interested",
            daysRemaining: "55 days more",
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80"
        },

        // Hosting (1)
        {
            id: 9,
            date: "Jan 20, 2025",
            title: "Company Town Hall",
            description: "Quarterly all-hands meeting to discuss company progress and goals...",
            location: "Main Auditorium",
            attendees: 500,
            type: "hosting",
            daysRemaining: "63 days more",
            image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&q=80"
        },

        // Past (5) - using 'past' type
        {
            id: 10,
            date: "Oct 15, 2024",
            title: "Team Building Retreat",
            description: "A weekend getaway to foster team spirit and collaboration...",
            location: "Mountain Resort",
            attendees: 80,
            type: "past",
            daysRemaining: "Completed",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
        },
        {
            id: 11,
            date: "Oct 01, 2024",
            title: "Q3 Review Meeting",
            description: "Reviewing the performance and achievements of the third quarter...",
            location: "Boardroom",
            attendees: 25,
            type: "past",
            daysRemaining: "Completed",
            image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80"
        },
        {
            id: 12,
            date: "Sep 20, 2024",
            title: "Cybersecurity Awareness",
            description: "Seminar on the importance of cybersecurity in the digital age...",
            location: "Seminar Hall",
            attendees: 110,
            type: "past",
            daysRemaining: "Completed",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80"
        },
        {
            id: 13,
            date: "Sep 10, 2024",
            title: "Health & Wellness Day",
            description: "Activities and workshops promoting employee health and well-being...",
            location: "Office Campus",
            attendees: 200,
            type: "past",
            daysRemaining: "Completed",
            image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80"
        },
        {
            id: 14,
            date: "Aug 25, 2024",
            title: "Summer Social",
            description: "Casual gathering to celebrate the end of summer...",
            location: "Rooftop Terrace",
            attendees: 150,
            type: "past",
            daysRemaining: "Completed",
            image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80"
        }
    ];

    const [events, setEvents] = useState(initialEvents);
    const [editingEvent, setEditingEvent] = useState(null);
    const [formData, setFormData] = useState({});

    // Count for tabs (only reliable if we filter initialEvents or similar, here simply hardcoding as per request or deriving)
    // The user requested specific counts: "Going (3)", etc. We can dynamically count them.
    const getCount = (type) => initialEvents.filter(e => e.type === type).length;

    const handleSave = () => {
        setEvents(prev => prev.map(ev =>
            ev.id === formData.id ? { ...formData } : ev
        ));
        setEditingEvent(null);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const filteredEvents = events.filter(ev => {
        const matchesSearch = ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ev.description.toLowerCase().includes(searchQuery.toLowerCase());

        if (currentTab === 'all') return matchesSearch;
        return ev.type === currentTab && matchesSearch;
    });

    const styles = {
        dashboard: {
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 0.75rem 2rem 0.75rem",
            backgroundColor: "#f8fafc",
            minHeight: "100vh"
        },
        title: {
            fontSize: "32px",
            fontWeight: "700",
            color: "#1e293b",
            marginBottom: "8px",
            marginTop: "0"
        },
        mainContent: {
            display: "block"
        },
        // Tabs handled by CSS classes now
        filterContainer: {
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
            justifyContent: "space-between"
        },
        searchWrapper: {
            position: "relative",
            display: "flex",
            alignItems: "center"
        },
        searchInput: {
            padding: "10px 16px 10px 40px",
            borderRadius: "10px",
            border: "1px solid #e2e8f0",
            fontSize: "14px",
            color: "#1e293b",
            width: "280px",
            backgroundColor: "#f8fafc",
            outline: "none",
            transition: "all 0.2s"
        },
        createButton: {
            padding: "10px 20px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#f97316",
            color: "white",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.2s",
            boxShadow: "0 4px 6px -1px rgba(249, 115, 22, 0.2)"
        },
        contentCard: {
            background: "white",
            borderRadius: "16px",
            padding: "32px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e2e8f0",
            marginBottom: "32px",
            width: "100%",
            boxSizing: "border-box"
        },
        eventsList: {
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "24px"
        },
        eventCard: {
            background: "white",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
            border: "1px solid #e2e8f0",
            position: "relative",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: "240px",
            transition: "transform 0.2s, box-shadow 0.2s"
        },
        cardImage: {
            width: "160px",
            height: "200px",
            objectFit: "cover",
            borderRadius: "12px",
            margin: "0 20px",
            flexShrink: 0
        },
        cardBody: {
            padding: "16px 16px 16px 0",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            overflow: "hidden"
        },
        cardHeader: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "12px"
        },
        dateBadge: {
            background: "rgba(255, 247, 237, 0.8)",
            backdropFilter: "blur(4px)",
            color: "#c2410c",
            padding: "4px 10px",
            borderRadius: "30px",
            fontSize: "11px",
            fontWeight: "600",
            border: "1px solid rgba(251, 146, 60, 0.2)"
        },
        daysRemaining: {
            color: "#d97706",
            fontSize: "11px",
            fontWeight: "600"
        },
        eventTitle: {
            fontSize: "18px",
            fontWeight: "700",
            color: "#1e293b",
            marginBottom: "8px",
            marginTop: "0"
        },
        eventDescription: {
            color: "#64748b",
            lineHeight: "1.4",
            marginBottom: "10px",
            marginTop: "0",
            fontSize: "12px"
        },
        eventMeta: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "12px",
            marginBottom: "12px",
            fontSize: "11px",
            color: "#475569"
        },
        location: {
            display: "flex",
            alignItems: "center",
            gap: "6px"
        },
        attendees: {
            display: "flex",
            alignItems: "center",
            gap: "6px"
        },
        joinButton: {
            padding: "4px 16px",
            backgroundColor: "#f97316",
            color: "white",
            border: "none",
            borderRadius: "50px",
            fontSize: "11px",
            fontWeight: "600",
            cursor: "pointer",
            width: "fit-content",
            transition: "background-color 0.2s"
        },
        dropdownContainer: {
            position: "relative"
        },
        actionButton: {
            background: "none",
            border: "none",
            color: "#64748b",
            cursor: "pointer",
            padding: "4px",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background-color 0.2s"
        },
        dropdown: {
            position: "absolute",
            top: "100%",
            right: "0",
            background: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            padding: "6px",
            minWidth: "140px",
            zIndex: "10"
        },
        dropdownItem: {
            display: "block",
            width: "100%",
            textAlign: "left",
            padding: "8px 12px",
            background: "none",
            border: "none",
            fontSize: "14px",
            color: "#475569",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.2s"
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        },
        label: {
            fontSize: '14px',
            fontWeight: '600',
            color: '#334155'
        },
        input: {
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '14px',
            color: '#1e293b',
            outline: 'none',
            transition: 'border-color 0.2s',
            width: '100%',
            boxSizing: 'border-box'
        }
    };

    const renderEditView = () => (
        <div style={styles.mainContent}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <button
                    onClick={() => setEditingEvent(null)}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#334155',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0'
                    }}
                >
                    <ArrowLeft size={24} />
                </button>
                <h2 style={styles.title}>Edit Event</h2>
            </div>
            <div style={styles.contentCard}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={styles.formGroup}>
                        <label htmlFor="title" style={styles.label}>Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleFormChange}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="description" style={styles.label}>Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleFormChange}
                            style={{ ...styles.input, minHeight: '80px', resize: 'vertical' }}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="location" style={styles.label}>Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleFormChange}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="attendees" style={styles.label}>Attendees</label>
                        <input
                            type="number"
                            id="attendees"
                            name="attendees"
                            value={formData.attendees}
                            onChange={handleFormChange}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="date" style={styles.label}>Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleFormChange}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="image" style={styles.label}>Image URL</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleFormChange}
                            style={styles.input}
                        />
                    </div>
                    <button
                        onClick={handleSave}
                        style={{
                            ...styles.createButton,
                            marginTop: '20px',
                            alignSelf: 'flex-end'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#ea580c";
                            e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#f97316";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div style={styles.dashboard}>
            {editingEvent ? renderEditView() : (
                <div style={styles.mainContent}>
                    {/* Tabs */}
                    <div className="tabs-row">
                        <div className="tabs">
                            <button
                                className={`tab ${currentTab === 'all' ? 'active' : ''}`}
                                onClick={() => setCurrentTab('all')}
                            >
                                <LayoutDashboard size={14} />
                                All Events
                            </button>
                            <button
                                className={`tab ${currentTab === 'going' ? 'active' : ''}`}
                                onClick={() => setCurrentTab('going')}
                            >
                                <CheckCircle size={14} />
                                Going
                            </button>
                            <button
                                className={`tab ${currentTab === 'invitations' ? 'active' : ''}`}
                                onClick={() => setCurrentTab('invitations')}
                            >
                                <Mail size={14} />
                                Invitations
                            </button>
                            <button
                                className={`tab ${currentTab === 'interested' ? 'active' : ''}`}
                                onClick={() => setCurrentTab('interested')}
                            >
                                <Heart size={14} />
                                Interested
                            </button>
                            <button
                                className={`tab ${currentTab === 'hosting' ? 'active' : ''}`}
                                onClick={() => setCurrentTab('hosting')}
                            >
                                <User size={14} />
                                Hosting
                            </button>
                            <button
                                className={`tab ${currentTab === 'past' ? 'active' : ''}`}
                                onClick={() => setCurrentTab('past')}
                            >
                                <Clock size={14} />
                                Past
                            </button>
                        </div>
                    </div>


                    <div style={styles.contentCard}>
                        {/* Header & Controls */}
                        <div style={styles.filterContainer}>
                            <div style={styles.searchWrapper}>
                                <svg
                                    style={{ position: 'absolute', left: '14px', color: '#f97316' }}
                                    width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                                >
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search events..."
                                    style={styles.searchInput}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = "#f97316";
                                        e.target.style.backgroundColor = "white";
                                        e.target.style.boxShadow = "0 0 0 3px rgba(249, 115, 22, 0.1)";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "#e2e8f0";
                                        e.target.style.backgroundColor = "#f8fafc";
                                        e.target.style.boxShadow = "none";
                                    }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button className="date-btn">
                                    <Calendar size={16} />
                                    <span>Dec 01 - 24, 2024</span>
                                    <ChevronDown size={12} />
                                </button>
                                <button
                                    style={styles.createButton}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = "#ea580c";
                                        e.currentTarget.style.transform = "translateY(-1px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = "#f97316";
                                        e.currentTarget.style.transform = "translateY(0)";
                                    }}
                                >
                                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                    Create Event
                                </button>
                            </div>
                        </div>

                        {/* Events Grid */}
                        <div style={styles.eventsList}>
                            {filteredEvents.map((event) => (
                                <div
                                    key={event.id}
                                    style={styles.eventCard}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-4px)";
                                        e.currentTarget.style.boxShadow = "0 12px 20px -5px rgba(0, 0, 0, 0.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.06)";
                                    }}
                                >
                                    <img src={event.image} alt={event.title} style={styles.cardImage} />
                                    <div style={styles.cardBody}>
                                        <div style={styles.cardHeader}>
                                            <div style={styles.dateBadge}>{event.date}</div>
                                            <div style={styles.dropdownContainer}>
                                                <button
                                                    style={styles.actionButton}
                                                    onClick={() => setActiveMenu(activeMenu === event.id ? null : event.id)}
                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f1f5f9"}
                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                                >
                                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                    </svg>
                                                </button>
                                                {activeMenu === event.id && (
                                                    <div style={styles.dropdown}>
                                                        <button
                                                            style={styles.dropdownItem}
                                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#fff7ed"}
                                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                                            onClick={() => {
                                                                setEditingEvent(event);
                                                                setFormData(event);
                                                                setActiveMenu(null);
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            style={styles.dropdownItem}
                                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#fff7ed"}
                                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                                            onClick={() => setActiveMenu(null)}
                                                        >
                                                            Delete
                                                        </button>
                                                        <button
                                                            style={styles.dropdownItem}
                                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#fff7ed"}
                                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                                            onClick={() => setActiveMenu(null)}
                                                        >
                                                            View More
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <h3 style={styles.eventTitle}>{event.title}</h3>
                                        <p style={styles.eventDescription}>{event.description}</p>
                                        <div style={styles.eventMeta}>
                                            <span style={styles.location}>📍 {event.location}</span>
                                            <span style={styles.attendees}>👤 {event.attendees} going</span>
                                            <div style={styles.daysRemaining}>{event.daysRemaining}</div>
                                        </div>
                                        <button
                                            style={styles.joinButton}
                                            onMouseEnter={(e) => e.target.style.backgroundColor = "#ea580c"}
                                            onMouseLeave={(e) => e.target.style.backgroundColor = "#f97316"}
                                        >
                                            Join Event
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <style jsx>{`
                /* Tabs Row */
                .tabs-row {
                    position: sticky;
                    top: -12px;
                    z-index: 50;
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(8px);
                    margin: -12px -1.5rem 1.5rem -1.5rem;
                    padding: 4px 24px;
                    border-bottom: 1px solid #fed7aa; /* Orange tint border */
                    display: flex;
                    align-items: center;
                    box-shadow: 0 4px 6px -1px rgba(249, 115, 22, 0.05); /* Orange shadow */
                }

                /* Tabs */
                .tabs {
                    display: flex;
                    gap: 16px;
                    background: transparent;
                    padding: 0;
                    border-radius: 0;
                }
                .tab {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 12px;
                    font-size: 14px;
                    font-weight: 600;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    color: #64748b;
                    position: relative;
                    transition: all 0.3s ease;
                    border-radius: 8px;
                }
                .tab:hover {
                    color: #ea580c;
                    background: rgba(255, 255, 255, 0.5);
                }
                .tab.active {
                    color: #c2410c; /* Stronger orange */
                    background: white;
                    box-shadow: 0 2px 4px rgba(249, 115, 22, 0.1);
                }
                .count {
                    font-size: 11px;
                    opacity: 0.8;
                }

                /* Modern Date Button */
                .date-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 12px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 12px;
                    color: #475569;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
};

export default PageEvents;