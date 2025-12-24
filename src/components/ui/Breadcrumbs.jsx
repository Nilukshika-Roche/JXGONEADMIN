import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = ({ activeTab }) => {
    const formatLabel = (id) => {
        return id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <nav className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6">
            <div className="flex items-center gap-2 hover:text-orange-500 transition-colors cursor-pointer">
                <Home size={14} />
                <span>Main</span>
            </div>
            <ChevronRight size={12} className="text-slate-300" />
            <span className="text-orange-600 dark:text-orange-400">{formatLabel(activeTab)}</span>
        </nav>
    );
};

export default Breadcrumbs;
