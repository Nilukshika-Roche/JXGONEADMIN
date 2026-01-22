import React, { useState } from 'react';
import { Calendar, Zap, Clock, ArrowLeft } from 'lucide-react';

const VolunteerDashboard = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const [currentTab, setCurrentTab] = useState('upcoming');
    const [searchQuery, setSearchQuery] = useState('');

    const initialInitiatives = [
        {
            id: 1,
            date: "Nov 20, 2024",
            title: "Community Food Bank Drive",
            description: "Join us in collecting and distributing food to families in need. organizing food donations...",
            location: "City Community Center",
            volunteers: 45,
            type: "upcoming",
            daysRemaining: "7 days more",
            image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 2,
            date: "Nov 25, 2024",
            title: "Tree Planting Initiative",
            description: "Help us plant 500 trees to restore local park ecosystem. All materials provided...",
            location: "Local Park",
            volunteers: 32,
            type: "upcoming",
            daysRemaining: "12 days more",
            image: "https://images.unsplash.com/photo-1542601906990-24d4c16419d0?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 3,
            date: "Dec 05, 2024",
            title: "Beach Cleanup Drive",
            description: "Keep our coastlines clean and protect marine life. Equipment will be provided...",
            location: "Coastal Beach",
            volunteers: 28,
            type: "ongoing",
            daysRemaining: "22 days more",
            image: "https://images.unsplash.com/photo-1618477461853-586eff3f9c57?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 4,
            date: "Dec 12, 2024",
            title: "Elderly Home Visit",
            description: "Spend a day bringing joy and support to local seniors. Group activities planned...",
            location: "Sunshine Home",
            volunteers: 15,
            type: "past",
            daysRemaining: "Completed",
            image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 5,
            date: "Dec 18, 2024",
            title: "Animal Shelter",
            description: "Assist in caring for rescued animals at the local shelter. Daily chores...",
            location: "Paws Rescue",
            volunteers: 12,
            type: "ongoing",
            daysRemaining: "15 days more",
            image: "https://images.unsplash.com/photo-1535268665811-929968372265?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 6,
            date: "Dec 24, 2024",
            title: "Toy Donation",
            description: "Help organize and distribute toys to children for the holidays. Gift wrapping...",
            location: "Youth Center",
            volunteers: 50,
            type: "past",
            daysRemaining: "Completed",
            image: "https://images.unsplash.com/photo-1512403754473-27835f7b9984?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 7,
            date: "Jan 05, 2025",
            title: "Education for All",
            description: "Volunteer to teach basic literacy and numeracy skills to underprivileged children...",
            location: "Learning Center",
            volunteers: 25,
            type: "upcoming",
            daysRemaining: "28 days more",
            image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 8,
            date: "Jan 12, 2025",
            title: "Health Camp 2025",
            description: "Free medical checkups and basic healthcare services for the community...",
            location: "Village Ground",
            volunteers: 60,
            type: "upcoming",
            daysRemaining: "35 days more",
            image: "https://images.unsplash.com/photo-1576091160550-217358c7db81?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 9,
            date: "Jan 18, 2025",
            title: "Tech Literacy Workshop",
            description: "Help seniors navigate the digital world with our weekly tech workshops...",
            location: "Public Library",
            volunteers: 18,
            type: "upcoming",
            daysRemaining: "41 days more",
            image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 10,
            date: "Jan 25, 2025",
            title: "Eco-Awareness Seminar",
            description: "Expert-led seminar on sustainable living and reducing plastic waste...",
            location: "Green Hall",
            volunteers: 40,
            type: "upcoming",
            daysRemaining: "48 days more",
            image: "https://images.unsplash.com/photo-1516937941348-c09e55483fcc?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 11,
            date: "Feb 02, 2025",
            title: "Local Library Revive",
            description: "Help us restock and organize the local community library. Book sorting and shelf cleaning...",
            location: "North Wing Library",
            volunteers: 12,
            type: "upcoming",
            daysRemaining: "56 days more",
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 12,
            date: "Feb 10, 2025",
            title: "Wildlife Habitat Fix",
            description: "Restoring natural habitats for local wildlife. Building birdhouses and nesting sites...",
            location: "Eco Reserve",
            volunteers: 35,
            type: "upcoming",
            daysRemaining: "64 days more",
            image: "https://images.unsplash.com/photo-1534943441045-b4b5d27b8559?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 13,
            date: "Feb 15, 2025",
            title: "Coral Reef Restoration",
            description: "Join our divers in planting new coral fragments to restore the vibrant marine ecosystem...",
            location: "Blue Lagoon",
            volunteers: 18,
            type: "upcoming",
            daysRemaining: "70 days more",
            image: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 14,
            date: "Feb 22, 2025",
            title: "Urban Garden Project",
            description: "Transforming city rooftops into green spaces. Learn urban farming techniques...",
            location: "Skyline Tower",
            volunteers: 42,
            type: "upcoming",
            daysRemaining: "77 days more",
            image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=800&auto=format&fit=crop"
        }
    ];

    const [initiatives, setInitiatives] = useState(initialInitiatives);
    const [editingInitiative, setEditingInitiative] = useState(null);
    const [formData, setFormData] = useState({});

    const getCount = (type) => initiatives.filter(init => init.type === type).length;

    const handleSave = () => {
        setInitiatives(prev => prev.map(init =>
            init.id === formData.id ? { ...formData } : init
        ));
        setEditingInitiative(null);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const filteredInitiatives = initiatives.filter(init =>
        init.type === currentTab &&
        (init.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            init.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const filterOptions = [
        { label: "Category", value: "All Categories" },
        { label: "Company", value: "All Teams" },
        { label: "Popularity", value: "All" },
        { label: "Mode", value: "All Modes" }
    ];

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
        subtitle: {
            fontSize: "16px",
            color: "#64748b",
            margin: "0"
        },
        mainContent: {
            display: "block"
        },
        initiativesSection: {
            width: "100%"
        },
        topBar: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
            width: "100%"
        },
        tabsRow: {
            position: "sticky",
            top: "-12px",
            zIndex: 50,
            background: "white",
            margin: "-12px -1.5rem 1.5rem -1.5rem",
            padding: "0.4rem 2rem",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
        },
        tabs: {
            display: "flex",
            gap: "24px"
        },
        tab: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            background: "none",
            border: "none",
            fontSize: "13px",
            fontWeight: "600",
            color: "#64748b",
            cursor: "pointer",
            transition: "all 0.2s",
            borderRadius: "8px",
            borderBottom: "2px solid transparent",
            position: "relative"
        },
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
        activeTab: {
            color: "#f97316",
            background: "#fff7ed",
            fontWeight: "600",
            borderBottom: "2px solid #f97316"
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
        initiativesList: {
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "24px"
        },
        initiativeCard: {
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
        initiativeTitle: {
            fontSize: "18px",
            fontWeight: "700",
            color: "#1e293b",
            marginBottom: "8px",
            marginTop: "0"
        },
        initiativeDescription: {
            color: "#64748b",
            lineHeight: "1.4",
            marginBottom: "10px",
            marginTop: "0",
            fontSize: "12px"
        },
        initiativeMeta: {
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
        volunteers: {
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
                    onClick={() => setEditingInitiative(null)}
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
                <h2 style={styles.title}>Edit Initiative</h2>
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
                        <label htmlFor="volunteers" style={styles.label}>Volunteers Needed</label>
                        <input
                            type="number"
                            id="volunteers"
                            name="volunteers"
                            value={formData.volunteers}
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
            {editingInitiative ? renderEditView() : (
                <div style={styles.mainContent}>
                    <div className="tabs-row">
                        <div className="tabs">
                            <button
                                className={`tab ${currentTab === 'upcoming' ? 'active' : ''}`}
                                onClick={() => setCurrentTab('upcoming')}
                            >
                                <Calendar size={16} />
                                Upcoming
                            </button>
                            <button
                                className={`tab ${currentTab === 'ongoing' ? 'active' : ''}`}
                                onClick={() => setCurrentTab('ongoing')}
                            >
                                <Zap size={16} />
                                Ongoing
                            </button>
                            <button
                                className={`tab ${currentTab === 'past' ? 'active' : ''}`}
                                onClick={() => setCurrentTab('past')}
                            >
                                <Clock size={16} />
                                Past
                            </button>
                        </div>
                    </div>


                    <div style={styles.contentCard}>
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
                                    placeholder="Search initiatives..."
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
                                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <path d="M16 2v4M8 2v4M3 10h18" />
                                    </svg>
                                    <span>This Month</span>
                                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
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
                                    Create Initiative
                                </button>
                            </div>
                        </div>

                        <div style={styles.initiativesList}>
                            {filteredInitiatives.map((initiative) => (
                                <div
                                    key={initiative.id}
                                    style={styles.initiativeCard}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-4px)";
                                        e.currentTarget.style.boxShadow = "0 12px 20px -5px rgba(0, 0, 0, 0.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.06)";
                                    }}
                                >
                                    <img src={initiative.image} alt={initiative.title} style={styles.cardImage} />
                                    <div style={styles.cardBody}>
                                        <div style={styles.cardHeader}>
                                            <div style={styles.dateBadge}>{initiative.date}</div>
                                            <div style={styles.dropdownContainer}>
                                                <button
                                                    style={styles.actionButton}
                                                    onClick={() => setActiveMenu(activeMenu === initiative.id ? null : initiative.id)}
                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f1f5f9"}
                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                                >
                                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                    </svg>
                                                </button>
                                                {activeMenu === initiative.id && (
                                                    <div style={styles.dropdown}>
                                                        <button
                                                            style={styles.dropdownItem}
                                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#fff7ed"}
                                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                                            onClick={() => {
                                                                setEditingInitiative(initiative);
                                                                setFormData(initiative);
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
                                        <h3 style={styles.initiativeTitle}>{initiative.title}</h3>
                                        <p style={styles.initiativeDescription}>{initiative.description}</p>
                                        <div style={styles.initiativeMeta}>
                                            <span style={styles.location}>📍 {initiative.location}</span>
                                            <span style={styles.volunteers}>👤 {initiative.volunteers} volunteers</span>
                                            <div style={styles.daysRemaining}>{initiative.daysRemaining}</div>
                                        </div>
                                        <button
                                            style={styles.joinButton}
                                            onMouseEnter={(e) => e.target.style.backgroundColor = "#ea580c"}
                                            onMouseLeave={(e) => e.target.style.backgroundColor = "#f97316"}
                                        >
                                            Join the project
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

                /* Modern Date Button */
                .date-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 100px;
                    font-size: 13px;
                    font-weight: 600;
                    color: #475569;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
                }
                .date-btn:hover {
                    border-color: #f97316;
                    color: #f97316;
                    background: #fff7ed;
                    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.1);
                }
                .date-btn svg:first-child {
                    color: #f97316;
                }
            `}</style>
        </div>
    );
};

export default VolunteerDashboard;