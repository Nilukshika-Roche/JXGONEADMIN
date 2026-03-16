import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CompanyManagement.css';
import {
    Shield,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Edit3,
    CheckCircle2,
    Lock,
    Zap,
    User,
    Clock,
    Award,
    Activity,
    LogOut,
    Sparkles,
    Settings,
    ChevronDown,
    ArrowLeft,
    X
} from 'lucide-react';

const AdminProfile = ({ setActiveTab: onNavigate }) => {
    const [adminData, setAdminData] = useState({
        name: 'John Anderson',
        role: 'Senior Administrator',
        email: 'john.anderson@jxg.com',
        phone: '+94 77 123 4567',
        location: 'Colombo, Sri Lanka',
        joinDate: 'March 15, 2023',
        avatar: 'https://i.pravatar.cc/150?u=john',
        bio: 'Dedicated Senior Administrator with over 8 years of experience in managing high-scale enterprise systems. Passionate about streamlining internal operations and ensuring top-tier security protocols. Currently leading the digital transformation initiatives at Janashakthi Group.',
        permissions: [
            { id: 1, name: 'Full Access', description: 'Complete control over system modules', icon: <Shield size={18} /> },
            { id: 2, name: 'User Management', description: 'Create, edit & delete accounts', icon: <User size={18} /> },
            { id: 3, name: 'Security Config', description: 'Modify system-wide protocols', icon: <Lock size={18} /> },
            { id: 4, name: 'Audit Access', description: 'View system-wide activity logs', icon: <Clock size={18} /> }
        ],
        recentActivity: [
            { id: 1, action: 'Updated security policy', time: '2 hours ago', type: 'security' },
            { id: 2, action: 'Approved 5 user requests', time: '5 hours ago', type: 'user' },
            { id: 3, action: 'Modified Marketplace filters', time: 'Yesterday', type: 'system' }
        ]
    });

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editForm, setEditForm] = useState({ ...adminData });

    const handleSaveProfile = () => {
        setAdminData({ ...editForm });
        setIsEditModalOpen(false);
    };

    return (

        <div className="p-6 max-w-[1400px] mx-auto font-sans text-slate-800">

            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center lg:min-h-[103px] mb-8 gap-6">
                {/* Left: Breadcrumbs & Title */}
                <div>
                    <div className="text-sm text-slate-500 font-medium mb-1 tracking-wide">
                        <span
                            className="hover:text-orange-500 cursor-pointer transition-colors"
                            onClick={() => onNavigate?.('dashboard')}
                        >
                            Admin
                        </span> &gt; Admin Profile
                    </div>
                    <h1 className="text-3xl font-handwriting font-bold text-slate-800">
                        Admin Profile
                    </h1>
                </div>
            </div>


            <div className="sa-group-wrapper min-h-screen py-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="sa-container max-w-[1300px] mx-auto px-6"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                        {/* 🔷 Left Column: Profile, Bio & Details */}
                        <div className="space-y-12">
                            {/* Profile Header Card */}
                            <div className="flex flex-col items-center md:items-start gap-8 py-4">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="relative"
                                >
                                    <img
                                        src={adminData.avatar}
                                        alt={adminData.name}
                                        className="w-40 h-40 rounded-[3rem] border-8 border-white shadow-xl object-cover"
                                    />
                                    <div className="absolute bottom-2 right-2 w-10 h-10 bg-green-500 border-4 border-white rounded-full shadow-lg" />
                                </motion.div>

                                <div className="space-y-6 w-full text-center md:text-left">
                                    <div className="space-y-1">
                                        <h2 className="text-4xl font-normal text-slate-900 leading-tight">{adminData.name}</h2>
                                        <p className="text-lg text-slate-500 font-normal">
                                            {adminData.role} • Joined {adminData.joinDate}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                        <button
                                            onClick={() => { setEditForm({ ...adminData }); setIsEditModalOpen(true); }}
                                            className="px-6 py-3 bg-orange-gradient text-white rounded-2xl font-medium text-sm transition-all hover:shadow-lg hover:shadow-orange-200 active:scale-95 flex items-center gap-2"
                                        >
                                            <Edit3 size={16} /> Edit Profile
                                        </button>
                                        <button className="px-6 py-3 bg-white text-slate-600 border border-slate-200 rounded-2xl font-medium text-sm transition-all hover:bg-slate-50 active:scale-95 flex items-center gap-2">
                                            <Mail size={16} /> Contact Support
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Bio Section */}
                            <section className="space-y-8 pt-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xs font-medium text-slate-400 theme-heading uppercase tracking-widest flex items-center gap-3">
                                        <User size={18} className="text-orange-500" />
                                        Admin Overview
                                    </h3>
                                    <button
                                        onClick={() => { setEditForm({ ...adminData }); setIsEditModalOpen(true); }}
                                        className="p-2 text-slate-400 hover:text-orange-500 transition-colors"
                                    >
                                        <Edit3 size={14} />
                                    </button>
                                </div>
                                <div className="space-y-8">
                                    <p className="text-slate-600 text-lg leading-relaxed font-normal italic border-l-2 border-orange-200 pl-8 py-2">
                                        "{adminData.bio}"
                                    </p>

                                    <div className="grid gap-10 pt-4">
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center shadow-sm">
                                                <Mail size={22} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Email Address</p>
                                                <p className="text-slate-800 font-normal text-lg">{adminData.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shadow-sm">
                                                <Phone size={22} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Direct Line</p>
                                                <p className="text-slate-800 font-normal text-lg">{adminData.phone}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center shadow-sm">
                                                <MapPin size={22} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Work Location</p>
                                                <p className="text-slate-800 font-normal text-lg">{adminData.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/*<button onClick={() => { }} className="px-6 py-3 bg-white text-red-500 border border-red-100 rounded-2xl font-medium text-sm transition-all hover:bg-red-50 active:scale-95 flex items-center gap-2 mt-8">
                                <LogOut size={16} /> Sign Out
                            </button>  previous. sign out button*/}
                        </div>

                        {/* 🔷 Right Column: Privileges & Activity */}
                        <div className="space-y-20">
                            {/* Privileges Section */}
                            <section className="space-y-10">
                                <div className="flex justify-between items-end">
                                    <div className="space-y-2">
                                        <h3 className="text-xs font-medium text-slate-400 uppercase tracking-widest flex items-center gap-3">
                                            <Shield size={18} className="text-orange-500" />
                                            Admin Privileges
                                        </h3>
                                    </div>
                                    <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-orange-600 hover:bg-orange-50 transition-colors">
                                        <Settings size={20} />
                                    </button>
                                </div>

                                <div className="grid gap-6">
                                    {adminData.permissions.map((perm) => (
                                        <div
                                            key={perm.id}
                                            className="p-8 rounded-[2.5rem] bg-white border border-slate-100 hover:border-orange-200 transition-all flex gap-8 items-center group shadow-sm"
                                        >
                                            <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-orange-500 transition-colors">
                                                {perm.icon}
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="text-base font-semibold text-slate-800">{perm.name}</h4>
                                                <p className="text-sm text-slate-500 font-normal leading-relaxed">{perm.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Activity Section */}
                            <section className="space-y-10">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xs font-medium text-slate-400 uppercase tracking-widest flex items-center gap-3">
                                        <Activity size={18} className="text-orange-500" />
                                        Admin Activity
                                    </h3>
                                    <button className="text-[10px] font-medium text-orange-600 hover:underline uppercase tracking-widest">Download History</button>
                                </div>

                                <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-sm">
                                    <div className="divide-y divide-slate-50">
                                        {adminData.recentActivity.map((act) => (
                                            <div key={act.id} className="p-10 flex items-center gap-8 hover:bg-slate-50/50 transition-colors">
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${act.type === 'security' ? 'bg-red-50 text-red-500' :
                                                    act.type === 'user' ? 'bg-blue-50 text-blue-500' :
                                                        'bg-orange-50 text-orange-500'
                                                    }`}>
                                                    <Activity size={22} />
                                                </div>
                                                <div className="flex-1 space-y-1.5">
                                                    <p className="text-base font-normal text-slate-800">{act.action}</p>
                                                    <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium uppercase tracking-widest">
                                                        <Clock size={12} /> {act.time}
                                                        <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                                        <span className={
                                                            act.type === 'security' ? 'text-red-400' :
                                                                act.type === 'user' ? 'text-blue-400' :
                                                                    'text-orange-400'
                                                        }>{act.type}</span>
                                                    </div>
                                                </div>
                                                <ChevronDown className="-rotate-90 text-slate-300" size={18} />
                                            </div>
                                        ))}
                                    </div>
                                    <button className="w-full py-8 text-xs font-bold text-slate-400 hover:text-orange-600 hover:bg-slate-50 transition-all border-t border-slate-50 uppercase tracking-widest">
                                        View Full Logs
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Edit Profile Modal */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.3 }}
                            className="modal-container"
                            style={{ maxWidth: '650px' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <div className="modal-header-left">
                                    <div className="modal-icon">
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <h2 className="modal-title">Edit Profile</h2>
                                        <p className="modal-subtitle">Update your personal information and bio</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsEditModalOpen(false)} className="modal-close-btn">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="modal-form">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">Full Name</label>
                                        <input
                                            type="text"
                                            value={editForm.name}
                                            onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Professional Role</label>
                                        <input
                                            type="text"
                                            value={editForm.role}
                                            onChange={e => setEditForm({ ...editForm, role: e.target.value })}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                        <label className="form-label">Short Biography</label>
                                        <textarea
                                            value={editForm.bio}
                                            onChange={e => setEditForm({ ...editForm, bio: e.target.value })}
                                            rows={4}
                                            className="form-input"
                                            style={{ minHeight: '120px', resize: 'none' }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Work Email</label>
                                        <input
                                            type="email"
                                            value={editForm.email}
                                            onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Contact Number</label>
                                        <input
                                            type="text"
                                            value={editForm.phone}
                                            onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                        <label className="form-label">Office Location</label>
                                        <input
                                            type="text"
                                            value={editForm.location}
                                            onChange={e => setEditForm({ ...editForm, location: e.target.value })}
                                            className="form-input"
                                        />
                                    </div>
                                </div>

                                <div className="modal-actions">
                                    <button
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="cancel-btn"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveProfile}
                                        className="submit-btn"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminProfile;
