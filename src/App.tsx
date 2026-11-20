import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { KaratFlowProvider } from './context/KaratFlowContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { ToastContainer } from './components/common/ToastContainer';

// View Screens
import { OverviewView } from './components/views/OverviewView';
import { GoldInventoryView } from './components/views/GoldInventoryView';
import { IssueGoldView } from './components/views/IssueGoldView';
import { JobTrackingView } from './components/views/JobTrackingView';
import { ReconciliationView } from './components/views/ReconciliationView';
import { AIIntelligenceView } from './components/views/AIIntelligenceView';
import { DisputesView } from './components/views/DisputesView';
import { SettlementsView } from './components/views/SettlementsView';
import { KarigarsView } from './components/views/KarigarsView';
import { AuditTrailView } from './components/views/AuditTrailView';
import { SettingsView } from './components/views/SettingsView';

function AppContent() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#FAF8F5] text-[#1E1E1E]">
      {/* Persistent Sidebar */}
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen} 
        onCloseMobile={() => setIsMobileSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Routes>
            <Route path="/" element={<OverviewView />} />
            <Route path="/inventory" element={<GoldInventoryView />} />
            <Route path="/issue" element={<IssueGoldView />} />
            <Route path="/jobs" element={<JobTrackingView />} />
            <Route path="/reconciliation" element={<ReconciliationView />} />
            <Route path="/ai-intelligence" element={<AIIntelligenceView />} />
            <Route path="/disputes" element={<DisputesView />} />
            <Route path="/settlements" element={<SettlementsView />} />
            <Route path="/karigars" element={<KarigarsView />} />
            <Route path="/audit" element={<AuditTrailView />} />
            <Route path="/settings" element={<SettingsView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Luxury Toast Notification System */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <KaratFlowProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </KaratFlowProvider>
  );
}
