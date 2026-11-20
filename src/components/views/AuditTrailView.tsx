import React, { useState } from 'react';
import { useKaratFlow } from '../../context/KaratFlowContext';
import { 
  History, 
  Search, 
  Filter, 
  ShieldCheck, 
  Lock, 
  Cpu, 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  Coins, 
  Download,
  Terminal,
  FileText
} from 'lucide-react';

export const AuditTrailView: React.FC = () => {
  const { auditLogs, showToast } = useKaratFlow();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredLogs = auditLogs.filter(log => {
    const matchSearch = 
      log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.jobId && log.jobId.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchCategory = categoryFilter === 'All' || log.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI Audit': return <Cpu className="w-4 h-4 text-[#D6B875]" />;
      case 'Weight Verification': return <Scale className="w-4 h-4 text-[#29372F]" />;
      case 'Dispute': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'Settlement': return <Coins className="w-4 h-4 text-emerald-600" />;
      case 'Inventory': return <Lock className="w-4 h-4 text-blue-600" />;
      default: return <ShieldCheck className="w-4 h-4 text-[#C5A253]" />;
    }
  };

  const handleExportAudit = () => {
    showToast('Audit Trail Exported', 'Downloaded complete cryptographically signed audit log (JSON/PDF).', 'info');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D6B875]/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#111111]">
              Immutable Custody Audit Trail
            </h1>
            <span className="text-[10px] bg-[#111111] text-[#D6B875] px-2 py-0.5 rounded font-mono font-bold">
              Append-Only Ledger
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#666666] mt-0.5">
            Chronological, tamper-evident record of all gold custody transfers, dual-scale readings, and mutual sign-offs.
          </p>
        </div>

        <button
          onClick={handleExportAudit}
          className="px-4 py-2 rounded-xl bg-white border border-[#D6B875]/30 hover:bg-[#FAF8F5] text-xs font-semibold text-[#202020] flex items-center gap-1.5 shadow-xs w-max"
        >
          <Download className="w-3.5 h-3.5 text-[#29372F]" />
          <span>Export Audit Log</span>
        </button>
      </div>

      {/* Architecture Notice (Prompt Requirement: "Make it visually clear that this is a simulated append-only audit history, not a production blockchain.") */}
      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#D6B875]/30 text-xs text-[#555555] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Terminal className="w-4 h-4 text-[#B8934A] shrink-0" />
          <span>
            <strong>Prototype Architecture Notice:</strong> This audit trail simulates an enterprise append-only cryptographically hashed ledger (SHA-256 state anchors) for frontend demonstration purposes.
          </span>
        </div>
        <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded font-mono font-bold shrink-0">
          State Integrity: 100%
        </span>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-[#D6B875]/25 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
          {['All', 'Custody', 'Weight Verification', 'AI Audit', 'Dispute', 'Settlement', 'Inventory'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-colors whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-[#111111] text-[#D6B875]'
                  : 'bg-[#FAF8F5] text-[#666666] hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#858585] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search audit trail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1 text-xs bg-[#FAF8F5] border border-[#D6B875]/30 rounded-lg text-[#202020] focus:outline-none"
          />
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="p-6 rounded-2xl bg-white border border-[#D6B875]/25 shadow-xs">
        <div className="relative pl-6 sm:pl-8 border-l-2 border-[#D6B875]/40 space-y-8">
          {filteredLogs.map((entry) => (
            <div key={entry.id} className="relative group">
              
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-8 h-8 rounded-full bg-white border-2 border-[#D6B875] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                {getCategoryIcon(entry.category)}
              </div>

              {/* Event Content Box */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-gray-200 hover:border-[#D6B875]/50 transition-colors shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#111111]">{entry.action}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FAF5EA] text-[#6D5027] border border-[#D6B875]/30">
                      {entry.category}
                    </span>
                    {entry.jobId && (
                      <span className="font-mono text-[11px] font-bold text-[#B8934A]">
                        {entry.jobId}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#858585]">
                    <span>{entry.timestamp}</span>
                    <span className="text-[#D6B875]">•</span>
                    <span className="bg-gray-100 px-1.5 py-0.2 rounded text-[10px]">{entry.hash}</span>
                  </div>
                </div>

                <p className="text-xs text-[#444444] leading-relaxed mb-2">
                  {entry.details}
                </p>

                <div className="text-[11px] text-[#666666] flex items-center justify-between pt-2 border-t border-gray-200/60 font-mono">
                  <span>Actor / Entity: <strong className="text-[#111111]">{entry.actor}</strong></span>
                  <span className="text-[10px] text-[#858585]">ID: {entry.id}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
