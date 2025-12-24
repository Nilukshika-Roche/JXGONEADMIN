import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Breadcrumbs from './components/ui/Breadcrumbs';
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

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard setActiveTab={setActiveTab} />;
      case 'page-view': return <PageView />;
      case 'analytics': return <Analytics />;
      case 'content': return <ContentManagement />;
      case 'people': return <PeopleManagement />;
      case 'csr': return <CSR />;
      case 'feed': return <Feed />;
      case 'activity': return <Activity />;
      case 'edit': return <EditPage />;
      case 'app-settings': return <AppSettings />;
      case 'events': return <Events />;
      case 'games': return <Games />;
      case 'page-events': return <PageEvents />;
      case 'page-people': return <PagePeople />;
      case 'page-csr': return <PageCSR />;
      default: return <Dashboard />;
    }
  };

  return (
    <Shell activeTab={activeTab} setActiveTab={setActiveTab}>
      <Breadcrumbs activeTab={activeTab} />
      <div className="pb-10">
        {renderContent()}
      </div>
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
