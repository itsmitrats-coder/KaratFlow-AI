import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKaratFlow } from '../../context/KaratFlowContext';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Sparkles, 
  Clock, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle2, 
  ExternalLink,
  Layers,
  Menu
} from 'lucide-react';

interface NavbarProps {
  onToggleMobileSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileSidebar }) => {
  const navigate = useNavigate();
  const { 
    goldRates, 
    jobs, 
    karigars, 
    disputes, 
    searchQuery, 
    setSearchQuery 
  } = useKaratFlow();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter search results
  const filteredJobs = searchQuery.trim()
    ? jobs.filter(j => 
        j.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.jewelleryType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.karigarName.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  const filteredKarigars = searchQuery.trim()
    ? karigars.filter(k => 
        k.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        k.speciality.toLowerCase().includes(searchQuery.toLowerCase()) ||
        k.workshop.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  const hasSearchResults = filteredJobs.length > 0 || filteredKarigars.length > 0;

  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#D6B875]/25 px-4 lg:px-8 py-3">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left: Mobile hamburger & Brand Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-lg text-[#202020] hover:bg-[#F5F1E8] transition-colors"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div 
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#111111] border border-[#D6B875] flex items-center justify-center shadow-md group-hover:border-[#E4CE92] transition-colors">
              <span className="font-serif font-bold text-sm text-[#D6B875] tracking-tight">KF</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-lg text-[#111111] tracking-wider uppercase leading-none">
                  KARAT FLOW
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-semibold bg-[#29372F] text-[#FAF8F5] rounded uppercase tracking-wider">
                  Tech4Bharat 2026
                </span>
              </div>
              <p className="text-[10px] text-[#858585] font-medium tracking-tight mt-0.5">
                Gold Operations, Perfected.
              </p>
            </div>
          </div>
        </div>

        {/* Center: Live Bullion Spot Rate Ticker */}
        <div className="hidden xl:flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/80 border border-[#D6B875]/30 shadow-xs text-xs">
          <div className="flex items-center gap-1.5 text-[#29372F] font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Bullion Spot:</span>
          </div>
          <div className="flex items-center gap-2 text-[#202020] font-mono font-medium">
            <span>24K <strong className="text-[#111111]">₹{goldRates['24K'].toLocaleString('en-IN')}/g</strong></span>
            <span className="text-[#D6B875]">•</span>
            <span>22K <strong className="text-[#111111]">₹{goldRates['22K'].toLocaleString('en-IN')}/g</strong></span>
            <span className="text-[#D6B875]">•</span>
            <span>18K <strong className="text-[#111111]">₹{goldRates['18K'].toLocaleString('en-IN')}/g</strong></span>
          </div>
          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-mono font-semibold flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />
            {goldRates.changePercent}
          </span>
        </div>

        {/* Right: Search, Date, Notifications, User Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Global Search Bar */}
          <div ref={searchRef} className="relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search jobs, karigars, tags..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                className="w-40 sm:w-60 md:w-72 pl-9 pr-3 py-1.5 text-xs bg-white/90 border border-[#D6B875]/30 rounded-lg text-[#202020] placeholder-[#858585] focus:outline-none focus:ring-1 focus:ring-[#D6B875] focus:border-[#D6B875] shadow-xs transition-all"
              />
              <Search className="w-3.5 h-3.5 text-[#858585] absolute left-3 top-2.5" />
            </div>

            {/* Search Dropdown Results */}
            {isSearchOpen && searchQuery.trim() && (
              <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-xl shadow-xl border border-[#D6B875]/30 p-2 z-50 animate-fadeIn">
                <div className="text-[11px] font-semibold text-[#858585] px-3 py-1 uppercase tracking-wider">
                  Search Results
                </div>

                {hasSearchResults ? (
                  <div className="space-y-1 mt-1">
                    {filteredJobs.length > 0 && (
                      <div>
                        <span className="text-[10px] font-bold text-[#D6B875] px-3 py-0.5 uppercase">
                          Jobs ({filteredJobs.length})
                        </span>
                        {filteredJobs.map(job => (
                          <div
                            key={job.id}
                            onClick={() => {
                              navigate('/jobs');
                              setIsSearchOpen(false);
                            }}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-[#FAF8F5] cursor-pointer text-xs"
                          >
                            <div>
                              <div className="font-semibold text-[#111111] flex items-center gap-1.5">
                                <span className="font-mono text-[#B8934A]">{job.id}</span>
                                <span>{job.jewelleryType}</span>
                              </div>
                              <div className="text-[11px] text-[#666666]">
                                Karigar: {job.karigarName} • {job.goldIssued.toFixed(3)}g ({job.purity})
                              </div>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 rounded font-medium bg-[#FAF5EA] text-[#88652D]">
                              {job.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {filteredKarigars.length > 0 && (
                      <div className="border-t border-gray-100 pt-1 mt-1">
                        <span className="text-[10px] font-bold text-[#D6B875] px-3 py-0.5 uppercase">
                          Karigars ({filteredKarigars.length})
                        </span>
                        {filteredKarigars.map(karigar => (
                          <div
                            key={karigar.id}
                            onClick={() => {
                              navigate('/karigars');
                              setIsSearchOpen(false);
                            }}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-[#FAF8F5] cursor-pointer text-xs"
                          >
                            <div>
                              <div className="font-semibold text-[#111111]">{karigar.name}</div>
                              <div className="text-[11px] text-[#666666]">{karigar.workshop}</div>
                            </div>
                            <span className="font-mono text-[11px] text-[#29372F] font-semibold">
                              {karigar.goldInCustody.toFixed(3)}g in custody
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-[#858585]">
                    No matching records found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Current Date Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F1E8] rounded-lg text-xs text-[#202020] font-medium border border-[#D6B875]/20">
            <Clock className="w-3.5 h-3.5 text-[#C5A253]" />
            <span>20 Nov 2026</span>
          </div>

          {/* Notifications Dropdown */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 rounded-lg bg-white border border-[#D6B875]/30 hover:bg-[#FAF8F5] text-[#202020] transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-[10px] font-bold text-white flex items-center justify-center border-2 border-white">
                3
              </span>
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-[#D6B875]/30 p-3 z-50 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <Bell className="w-4 h-4 text-[#C5A253]" />
                    <span className="text-xs font-bold text-[#111111] uppercase tracking-wide">
                      Operations Notifications
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 bg-red-50 text-red-700 rounded-full font-semibold">
                    3 Action Required
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div 
                    onClick={() => {
                      navigate('/reconciliation');
                      setIsNotificationsOpen(false);
                    }}
                    className="p-2.5 rounded-lg bg-red-50/60 border border-red-200 hover:bg-red-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-1.5 font-semibold text-red-800">
                      <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                      <span>Discrepancy Alert: Job KF-1024</span>
                    </div>
                    <p className="text-[11px] text-red-700 mt-1">
                      Unexplained variance of <strong>0.500 g</strong> detected. Ramesh Soni awaiting clarification.
                    </p>
                    <span className="text-[10px] text-red-500 font-mono mt-1 block">15 mins ago</span>
                  </div>

                  <div 
                    onClick={() => {
                      navigate('/jobs');
                      setIsNotificationsOpen(false);
                    }}
                    className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200 hover:bg-amber-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-1.5 font-semibold text-amber-800">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>2 Overdue Jobs Flagged</span>
                    </div>
                    <p className="text-[11px] text-amber-700 mt-1">
                      Jobs KF-1027 (Dinesh Patwa) and KF-1019 have crossed the agreed SLA timeline.
                    </p>
                    <span className="text-[10px] text-amber-500 font-mono mt-1 block">1 hour ago</span>
                  </div>

                  <div 
                    onClick={() => {
                      navigate('/settlements');
                      setIsNotificationsOpen(false);
                    }}
                    className="p-2.5 rounded-lg bg-[#FAF5EA] border border-[#D6B875]/40 hover:bg-[#F3E7CF]/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-1.5 font-semibold text-[#553E20]">
                      <CheckCircle2 className="w-4 h-4 text-[#AA853C] shrink-0" />
                      <span>Settlement Ready: SET-501</span>
                    </div>
                    <p className="text-[11px] text-[#6D5027] mt-1">
                      Babu Shilpi completed Job KF-1025 with 0.000g variance. Labour payout ₹13,276 ready.
                    </p>
                    <span className="text-[10px] text-[#88652D] font-mono mt-1 block">3 hours ago</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-gray-100 text-center">
                  <button 
                    onClick={() => {
                      navigate('/audit');
                      setIsNotificationsOpen(false);
                    }}
                    className="text-[11px] text-[#C5A253] hover:text-[#AA853C] font-semibold inline-flex items-center gap-1"
                  >
                    <span>View Complete Audit Timeline</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1.5 rounded-lg bg-white border border-[#D6B875]/30 hover:bg-[#FAF8F5] transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-[#111111] text-[#D6B875] border border-[#D6B875]/60 flex items-center justify-center font-bold text-xs font-serif">
                RV
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-bold text-[#111111] leading-tight">Rajesh Verma</div>
                <div className="text-[10px] text-[#858585] leading-tight">Verma & Sons</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#858585]" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-[#D6B875]/30 p-3 z-50 animate-fadeIn">
                <div className="flex items-center gap-3 p-2 bg-[#FAF8F5] rounded-lg border border-[#D6B875]/20 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#111111] text-[#D6B875] border border-[#D6B875] flex items-center justify-center font-bold text-sm font-serif">
                    RV
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#111111]">Rajesh Verma</h4>
                    <p className="text-[11px] text-[#666666]">Managing Partner & Bullion Custodian</p>
                    <span className="inline-block mt-0.5 text-[9px] bg-[#29372F] text-white px-1.5 py-0.2 rounded font-mono">
                      BIS: MH-BOM-916-2024
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <button 
                    onClick={() => {
                      navigate('/settings');
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#FAF8F5] text-[#202020] flex items-center justify-between"
                  >
                    <span>Manufacturer Profile & License</span>
                    <span className="text-[10px] text-[#858585]">View</span>
                  </button>
                  <button 
                    onClick={() => {
                      navigate('/inventory');
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#FAF8F5] text-[#202020] flex items-center justify-between"
                  >
                    <span>Safe Vault Vault Master</span>
                    <span className="text-[10px] text-[#B8934A] font-mono">1,170.25g</span>
                  </button>
                  <button 
                    onClick={() => {
                      navigate('/ai-intelligence');
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#FAF8F5] text-[#202020] flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A253]" />
                      <span>AI Agent Orchestration</span>
                    </span>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 rounded font-semibold">5 Active</span>
                  </button>
                </div>

                <div className="mt-2 pt-2 border-t border-gray-100 text-[10px] text-[#858585] text-center">
                  Tech4Bharat 2026 • Frontend Simulation Prototype
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
