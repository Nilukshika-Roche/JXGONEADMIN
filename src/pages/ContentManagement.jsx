import React from 'react';

const ContentManagement = () => {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <h1 className="text-2xl font-black text-slate-800 uppercase italic">
                this is <span className="text-orange-600">content management page</span>
            </h1>
        </div>
    );
};

// Helper Icons (Simple local components to avoid missing imports)
const ClockIcon = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);
const AlertCircleIcon = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
);

export default ContentManagement;
