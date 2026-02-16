import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';

import Shell from './components/layout/Shell';

// Pages
import Dashboard from './pages/Dashboard';
import PageView from './pages/PageView';
import Analytics from './pages/Analytics';
import ContentManagement from './pages/ContentManagement';
import PeopleManagement from './pages/PeopleManagement';
import CSR from './pages/CSR';
import Feed from './pages/Feed';
import Activity from './pages/Activity';
import EditPage from './pages/EditPage';
import AppSettings from './pages/AppSettings';
import DeadRecord from './pages/DeadRecord';
import Events from './pages/Events';
import Games from './pages/Games';
import PageEvents from './pages/PageEvents';
import PagePeople from './pages/PagePeople';
import PageCSR from './pages/PageCSR';
import MediaHubPage from './pages/MediaHubPage.jsx';
import Marketplace from './pages/Marketplace';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [prevTab, setPrevTab] = useState('dashboard');

  const [companyData, setCompanyData] = useState({
    name: 'Janashakthi Group',
    location: 'Colombo, Sri Lanka',
    description: 'Leading the future of insurance and financial services with innovation and integrity. Transforming lives through sustainable business practices and community engagement.',
    tagline: 'Stronger Together Stronger Than Ever',
    website: 'www.janashakthi.com',
    phone: '+94 11 234 5678',
    industry: 'Insurance & Financial Services',
    companySize: '1,001-5,000 employees',
    founded: '1994',
    headquarters: 'Colombo, Sri Lanka',
    linkedinUrl: 'janashakthi-group',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1600&q=80',
    overview: 'Janashakthi Group is a prominent financial services conglomerate in Sri Lanka, with a strong presence in the insurance, finance, and investment sectors. Established in 1994, the group has grown into a diversified entity that focuses on delivering innovative solutions and superior service to its customers.',
    products: [
      { id: 1, name: 'Life Insurance' },
      { id: 2, name: 'General Insurance' },
      { id: 3, name: 'Vehicle Leasing' }
    ],
    services: [
      { id: 1, name: 'Financial Planning' },
      { id: 2, name: 'Investment Advisory' },
      { id: 3, name: 'Risk Management' }
    ],
    awards: [
      { id: 1, title: 'Best Insurance Company', date: '2024', description: 'Awarded for excellence in customer service and claim settlement.' },
      { id: 2, title: 'Sustainability Leader', date: '2023', description: 'Recognized for eco-friendly initiatives and community support.' }
    ]
  });

  const handleTabChange = (tab) => {
    setPrevTab(activeTab);
    setActiveTab(tab);
  };

  const renderContent = (tab) => {
    switch (tab) {
      case 'dashboard': return <Dashboard setActiveTab={handleTabChange} />;
      case 'page-view': return <PageView setActiveTab={handleTabChange} companyData={companyData} />;
      case 'analytics': return <Analytics />;
      case 'content': return <ContentManagement setActiveTab={handleTabChange} />;
      case 'people': return <PeopleManagement setActiveTab={handleTabChange} />;
      case 'csr': return <CSR setActiveTab={handleTabChange} />;
      case 'feed': return <Feed />;
      case 'activity': return <Activity />;
      case 'app-settings': return <AppSettings />;
      case 'events': return <Events setActiveTab={handleTabChange} />;
      case 'games': return <Games />;
      case 'page-events': return <PageEvents />;
      case 'page-people': return <PagePeople />;
      case 'page-csr': return <PageCSR />;
      case 'marketplace': return <Marketplace setActiveTab={handleTabChange} />;
      case 'page-content': return <MediaHubPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <Shell activeTab={activeTab === 'edit' ? prevTab : activeTab} setActiveTab={handleTabChange}>
      <div className="pb-10">
        {renderContent(activeTab === 'edit' ? prevTab : activeTab)}
      </div>
      {activeTab === 'edit' && (
        <EditPage
          companyData={companyData}
          setCompanyData={setCompanyData}
          onClose={() => setActiveTab(prevTab)}
        />
      )}
    </Shell>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
