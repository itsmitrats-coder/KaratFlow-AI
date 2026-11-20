import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useKaratFlow } from '../../context/KaratFlowContext';
import { 
  LayoutDashboard, 
  Coins, 
  PlusCircle, 
  Clock, 
  Scale, 
  Sparkles, 
  AlertOctagon, 
  CheckSquare, 
  Users, 
  History, 
  Settings,
  Shield,
  X,
  Lock
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const location = useLocation();
  const { jobs, disputes, settlements } = useKaratFlow();

  const activeDisputesCount = disputes.filter(d => d.status !== 'Resolved').length;
  const pendingSettlementsCount = settlements.filter(s => s.paymentStatus !== 'Disbursed').length;

  const navItems = [
    { name: 'Overview', path: '/', icon: LayoutDashboard },
    { name: 'Gold Inventory', path: '/inventory', icon: Coins },
    { name: 'Issue Gold', path: '/issue', icon: PlusCircle, highlight: true },
    { name: 'Job Tracking', path: '/jobs', icon: Clock, badge: '48' },
    { name: 'Reconciliation', path: '/reconciliation', icon: Scale, pulse: true },
    { name: 'AI Intelligence', path: '/ai-intelligence', icon: Sparkles, aiBadge: true },
    { name: 'Disputes', path: '/disputes', icon: AlertOctagon, alertBadge: activeDisputesCount > 0 ? activeDisputesCount : undefined },
    { name: 'Settlements', path: '/settlements', icon: CheckSquare, badge: pendingSettlementsCount > 0 ? pendingSettlementsCount : undefined },
    { name: 'Karigars', path: '/karigars', icon: Users, badge: '10' },
    { name: 'Audit Trail', path: '/audit', icon: History },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#181818] text-[#F5F1E8] border-r border-[#2C2C2C]">
      
      {/* Top Brand Header */}
      <div className="p-5 border-b border-[#2C2C2C] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#111111] border border-[#D6B875] flex items-center justify-center shadow-lg">
            <span className="font-serif font-bold text-base text-[#D6B875] tracking-tight">KF</span>
          </div>
          <div>
            <h1 className="font-serif font-bold text-lg text-white tracking-wider leading-none">
              KARAT FLOW
            </h1>
            <p className="text-[10px] text-[#D6B875] font-semibold tracking-wider uppercase mt-1">
              Gold Custody & Reconciliation
            </p>
          </div>
        </div>

        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-bold text-[#858585] uppercase tracking-wider px-3 mb-2">
          Operations Management
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-[#29372F] text-[#FAF8F5] border border-[#D6B875]/40 shadow-sm'
                  : item.highlight
                  ? 'text-[#D6B875] hover:bg-[#202020] hover:text-[#FAF8F5]'
                  : 'text-[#B0B0B0] hover:bg-[#202020] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon 
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive 
                      ? 'text-[#D6B875]' 
                      : item.highlight 
                      ? 'text-[#D6B875]' 
                      : 'text-[#858585] group-hover:text-[#D6B875]'
                  }`} 
                />
                <span className="truncate">{item.name}</span>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-1.5 shrink-0">
                {item.aiBadge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wider rounded bg-gradient-to-r from-[#D6B875] to-[#B8934A] text-[#111111]">
                    AGENTIC
                  </span>
                )}
                {item.alertBadge !== undefined && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-red-600/90 text-white animate-pulse">
                    {item.alertBadge}
                  </span>
                )}
                {item.badge && !item.alertBadge && (
                  <span className={`px-2 py-0.5 text-[10px] font-mono font-medium rounded-full ${
                    isActive ? 'bg-[#D6B875]/20 text-[#D6B875]' : 'bg-[#2A2A2A] text-gray-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </div>
            </NavLink>
          );
        })}
      </nav>

      {/* Vault Custody Summary Widget in Sidebar Footer */}
      <div className="p-3.5 m-3 rounded-xl bg-[#111111] border border-[#D6B875]/30 shadow-md">
        <div className="flex items-center justify-between text-xs mb-2">
          <div className="flex items-center gap-1.5 text-[#D6B875] font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span className="text-[11px] uppercase tracking-wide">Vault Custody</span>
          </div>
          <span className="text-[9px] bg-[#29372F] text-emerald-300 font-mono px-1.5 py-0.2 rounded font-semibold">
            Active
          </span>
        </div>

        <div className="space-y-1.5 text-[11px]">
          <div className="flex items-center justify-between text-gray-400">
            <span>Total Gold:</span>
            <span className="font-mono text-white font-semibold">2,450.750 g</span>
          </div>
          <div className="flex items-center justify-between text-gray-400">
            <span>Issued to Karigars:</span>
            <span className="font-mono text-[#D6B875] font-semibold">1,280.500 g</span>
          </div>
          <div className="flex items-center justify-between text-gray-400">
            <span>Safe Vault Balance:</span>
            <span className="font-mono text-emerald-400 font-semibold">1,170.250 g</span>
          </div>
        </div>

        <div className="w-full bg-[#2C2C2C] h-1.5 rounded-full mt-2.5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-[#D6B875] to-[#B8934A] h-full rounded-full" 
            style={{ width: `${(1280.5 / 2450.75) * 100}%` }}
            title="52.2% gold currently in artisan custody"
          ></div>
        </div>
        <div className="flex justify-between text-[9px] text-gray-400 mt-1 font-mono">
          <span>52.2% in workshop</span>
          <span>47.8% in safe</span>
        </div>
      </div>

      {/* Tech4Bharat Sub-footer */}
      <div className="px-5 py-3 border-t border-[#2C2C2C] text-[10px] text-gray-400 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-[#D6B875]" />
          <span>PS 2.2 Jeweltech</span>
        </div>
        <span className="font-mono text-[#D6B875]">v2.6 Prototype</span>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          ></div>
          <div className="relative w-72 max-w-[85vw] h-full z-10 animate-slideRight">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
