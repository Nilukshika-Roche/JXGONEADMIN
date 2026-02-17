import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield,
    Search,
    Plus,
    MoreVertical,
    Eye,
    Edit2,
    Trash2,
    UserPlus,
    ShieldCheck,
    Mail,
    Phone,
    Calendar,
    Filter,
    ChevronLeft,
    ChevronRight,
    Building2,
    Lock,
    Key
} from 'lucide-react';
import './AdminManagement.css';

const AdminManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [activeMenuId, setActiveMenuId] = useState(null);

    const admins = [
        { id: 'ADM-001', name: 'John Anderson', email: 'john.a@jxg.com', role: 'Super Admin', bu: 'Group', status: 'Active', joined: '2023-01-10', avatar: 'JA' },
        { id: 'ADM-002', name: 'Sarah Jenkins', email: 'sarah.j@jxg.com', role: 'Group Admin', bu: 'Insurance', status: 'Active', joined: '2023-05-15', avatar: 'SJ' },
        { id: 'ADM-003', name: 'Michael Kwok', email: 'michael.k@jxg.com', role: 'Support Admin', bu: 'Finance', status: 'Inactive', joined: '2023-08-20', avatar: 'MK' },
        { id: 'ADM-004', name: 'Lakshani Rodrigo', email: 'lakshani.r@jxg.com', role: 'Group Admin', bu: 'Holdings', status: 'Active', joined: '2023-11-05', avatar: 'LR' },
        { id: 'ADM-005', name: 'Naveen Perera', email: 'naveen.p@jxg.com', role: 'Support Admin', bu: 'Capital', status: 'Pending', joined: '2024-01-12', avatar: 'NP' },
    ];

    const roles = ['all', 'Super Admin', 'Group Admin', 'Support Admin'];

    const filteredAdmins = admins.filter(admin => {
        const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            admin.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            admin.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || admin.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const toggleMenu = (e, id) => {
        e.stopPropagation();
        setActiveMenuId(activeMenuId === id ? null : id);
    };

    return (
        <div className="am-wrapper">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="am-content-card"
                style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}
            >
                {/* Admin Management Content Removed */}
                <p>No content to display.</p>
            </motion.div>
        </div>
    );
};

export default AdminManagement;
