import React from 'react';

const Footer = () => {
    return (
        <footer className="mt-auto py-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            <p>&copy; 2025 Janashakthi Group. All Rights Reserved.</p>
            <div className="flex items-center gap-6">
                <span className="text-orange-600/50">Version 3.1.0-Release</span>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
