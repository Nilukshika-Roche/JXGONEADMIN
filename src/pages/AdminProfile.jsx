import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
    LogOut
} from 'lucide-react';

const AdminProfile = ({ setActiveTab: onNavigate }) => {
    const [adminData] = useState({
        name: 'John Anderson',
        role: 'Senior Administrator',
        email: 'john.anderson@jxg.com',
        phone: '+94 77 123 4567',
        location: 'Colombo, Sri Lanka',
        joinDate: 'March 15, 2023',
        avatar: 'https://i.pravatar.cc/150?u=john',
        bio: 'Dedicated Senior Administrator with over 8 years of experience in managing high-scale enterprise systems. Passionate about streamlining internal operations and ensuring top-tier security protocols. Currently leading the digital transformation initiatives at Janashakthi Group.',
        permissions: [
            { id: 1, name: 'Full Access', description: 'Complete control over all system modules', icon: <Shield size={18} /> },
            { id: 2, name: 'User Management', description: 'Ability to create, edit and delete user accounts', icon: <User size={18} /> },
            { id: 3, name: 'Role Configuration', description: 'Modify and assign permissions to roles', icon: <Lock size={18} /> },
            { id: 4, name: 'System Settings', description: 'Configure global application parameters', icon: <Zap size={18} /> },
            { id: 5, name: 'Audit Logs', description: 'View and export system activity records', icon: <Clock size={18} /> }
        ],
        recentActivity: [
            { id: 1, action: 'Updated security policy', time: '2 hours ago', type: 'security' },
            { id: 2, action: 'Approved 5 new user requests', time: '5 hours ago', type: 'user' },
            { id: 3, action: 'Modified Marketplace global filters', time: 'Yesterday', type: 'system' },
            { id: 4, action: 'Published quarterly CSR report', time: '2 days ago', type: 'content' }
        ]
    });

    return (
        <div className="p-6 max-w-[1400px] mx-auto font-sans text-slate-800">
            {/* Header Section, matched content mgmt header padding */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center lg:min-h-[103px] mb-8 gap-6">
                {/* Left: Breadcrumbs & Title */}
                <div>
                    <div className="text-xs text-slate-500 font-medium mb-1 tracking-wide">
                        <span
                            className="hover:text-orange-500 cursor-pointer transition-colors"
                            onClick={() => onNavigate?.('dashboard')}
                        >
                            Admin
                        </span> &gt; Profile
                    </div>
                    <h1 className="text-3xl font-handwriting font-bold text-slate-800">
                        Admin Profile
                    </h1>
                </div>
            </div>
            {/* Navigation Header previously used
            <div className="mb-8">
                <div className="text-xs text-slate-500 font-medium mb-1 tracking-wide">
                    <span
                        className="hover:text-orange-500 cursor-pointer transition-colors"
                        onClick={() => onNavigate?.('dashboard')}
                    >
                        Admin
                    </span> &gt; Profile
                </div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                    Admin Profile
                </h1>
            </div>*/}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Profile Card & Quick Info */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Profile Summary */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.01 }}
                        className="card-glass overflow-hidden relative group"
                    >
                        <div className="h-32 bg-orange-gradient -mx-6 -mt-6 mb-0 relative">
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
                        </div>
                        <div className="px-2 pb-4 -mt-16 text-center relative z-10">
                            <div className="relative inline-block">
                                <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full scale-150"></div>
                                <img
                                    src={adminData.avatar}
                                    alt={adminData.name}
                                    className="w-28 h-28 rounded-3xl border-4 border-white shadow-premium mx-auto object-cover relative z-10 box-content"
                                />
                                <div className="absolute bottom-2 right-2 w-7 h-7 bg-green-500 border-4 border-white rounded-full z-20 shadow-sm" />
                            </div>
                            <h2 className="mt-5 text-2xl font-black text-slate-900 tracking-tight">{adminData.name}</h2>
                            <p className="text-xs font-black text-orange-600 uppercase tracking-[0.2em] mt-1">{adminData.role}</p>

                            <div className="mt-8 flex justify-center gap-3">
                                <button className="btn-primary px-6">
                                    <Edit3 size={16} /> Edit Profile
                                </button>
                                <button className="p-3 bg-slate-50 text-slate-500 rounded-2xl hover:bg-orange-50 hover:text-orange-600 border border-slate-100 transition-all">
                                    <LogOut size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
                            <div className="flex items-center gap-4 text-sm text-slate-600 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                                    <Mail size={16} />
                                </div>
                                <span className="font-semibold">{adminData.email}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-600 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                                    <Phone size={16} />
                                </div>
                                <span className="font-semibold">{adminData.phone}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-600 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                                    <MapPin size={16} />
                                </div>
                                <span className="font-semibold">{adminData.location}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-600 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                                    <Calendar size={16} />
                                </div>
                                <span className="font-semibold">Joined {adminData.joinDate}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Stats/Badges */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5 }}
                        transition={{ delay: 0.1 }}
                        className="card-glass"
                    >
                        <div className="panel-header-cool mb-6">
                            <div className="ph-left">
                                <h3 className="flex items-center gap-2">
                                    <Award size={18} className="text-orange-500" />
                                    Security Status
                                </h3>
                                <p>Platform clearance & verification level</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-[1.25rem] border border-slate-100">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Clearance</span>
                                <span className="text-xs font-black text-white bg-slate-900 px-3 py-1 rounded-full shadow-lg">LEVEL 4</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-orange-50/50 rounded-[1.25rem] border border-orange-100/50">
                                <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Verification</span>
                                <span className="flex items-center gap-1.5 text-xs font-black text-orange-600">
                                    <CheckCircle2 size={16} /> VERIFIED
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Bio, Permissions & Activity */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Bio Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.005 }}
                        className="card-glass"
                    >
                        <div className="panel-header-cool mb-6">
                            <div className="ph-left">
                                <h3 className="flex items-center gap-2">
                                    <User size={20} className="text-orange-500" />
                                    Professional Bio
                                </h3>
                                <p>A brief overview of your background and expertise</p>
                            </div>
                        </div>
                        <p className="text-slate-600 leading-relaxed font-medium text-lg italic">
                            "{adminData.bio}"
                        </p>
                    </motion.div>

                    {/* Permissions Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.005 }}
                        transition={{ delay: 0.1 }}
                        className="card-glass"
                    >
                        <div className="panel-header-cool mb-8">
                            <div className="ph-left">
                                <h3 className="flex items-center gap-2">
                                    <Shield size={20} className="text-orange-500" />
                                    Access & Authorization
                                </h3>
                                <p>Categorized list of your administrative privileges</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {adminData.permissions.map((perm) => (
                                <div key={perm.id} className="p-5 rounded-[1.5rem] border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-premium transition-all group cursor-default">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white shadow-soft flex items-center justify-center text-slate-400 group-hover:text-orange-500 group-hover:scale-110 transition-all duration-300">
                                            {React.cloneElement(perm.icon, { size: 20 })}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-slate-900 mb-1 group-hover:text-orange-600 transition-colors uppercase tracking-tight">{perm.name}</h4>
                                            <p className="text-[11px] text-slate-500 leading-[1.6] font-medium">{perm.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Recent Activity */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.005 }}
                        transition={{ delay: 0.2 }}
                        className="card-glass"
                    >
                        <div className="panel-header-cool mb-8">
                            <div className="ph-left">
                                <h3 className="flex items-center gap-2">
                                    <Activity size={20} className="text-orange-500" />
                                    Recent Audit Trail
                                </h3>
                                <p>Chronological log of your recent system interactions</p>
                            </div>
                            <div className="ph-right">
                                <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-orange-500 transition-colors">View All Logs</button>
                            </div>
                        </div>
                        <div className="space-y-8 relative px-2">
                            {/* Central timeline line */}
                            <div className="absolute left-6 top-2 bottom-4 w-1 bg-slate-100 rounded-full" />

                            {adminData.recentActivity.map((act, idx) => (
                                <div key={act.id} className="flex gap-6 relative group">
                                    <div className={`w-8 h-8 rounded-2xl flex-shrink-0 z-10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${act.type === 'security' ? 'bg-red-50 text-red-500 border border-red-100 shadow-lg shadow-red-100' :
                                            act.type === 'user' ? 'bg-blue-50 text-blue-500 border border-blue-100 shadow-lg shadow-blue-100' :
                                                act.type === 'system' ? 'bg-orange-50 text-orange-500 border border-orange-100 shadow-lg shadow-orange-100' :
                                                    'bg-slate-50 text-slate-500 border border-slate-100'
                                        }`}>
                                        <div className="w-2 h-2 rounded-full bg-current" />
                                    </div>

                                    <div className="flex-1 pb-2 border-b border-slate-50 group-last:border-none">
                                        <div className="flex justify-between items-start mb-1">
                                            <p className="text-sm font-black text-slate-800 tracking-tight">{act.action}</p>
                                            <span className="text-[9px] font-black text-white bg-slate-900/5 px-2 py-0.5 rounded-full text-slate-500 uppercase tracking-tighter">{act.type}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={12} className="text-slate-400" />
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{act.time}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            <style jsx>{`
                .card-glass {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 32px;
                    padding: 1.5rem;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.02);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .card-glass:hover {
                    box-shadow: 0 20px 40px rgba(249, 115, 22, 0.05);
                    border-color: #fed7aa;
                }
                .panel-header-cool {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                }
                .ph-left h3 {
                    font-size: 1.25rem;
                    font-weight: 800;
                    color: #0f172a;
                    margin: 0;
                    letter-spacing: -0.02em;
                }
                .ph-left p {
                    font-size: 0.75rem;
                    color: #64748b;
                    margin: 4px 0 0;
                    font-weight: 500;
                }
                .btn-primary {
                    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
                    color: white;
                    border: none;
                    font-weight: 700;
                    font-size: 0.875rem;
                    border-radius: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    height: 44px;
                    transition: all 0.3s;
                    box-shadow: 0 10px 15px -3px rgba(249, 115, 22, 0.2);
                }
                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 20px 25px -5px rgba(249, 115, 22, 0.3);
                }
                .shadow-premium {
                    box-shadow: 0 20px 25px -5px rgba(249, 115, 22, 0.1), 0 10px 10px -5px rgba(249, 115, 22, 0.04);
                }
                .shadow-soft {
                    box-shadow: 0 4px 20px -2px rgba(249, 115, 22, 0.08), 0 2px 10px -2px rgba(0, 0, 0, 0.04);
                }
                .bg-orange-gradient {
                    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
                }
            `}</style>
        </div>
    );
};

export default AdminProfile;
