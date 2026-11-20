import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKaratFlow } from '../../context/KaratFlowContext';
import { Dispute } from '../../types';
import { 
  AlertOctagon, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle2, 
  FileText, 
  Upload, 
  MessageSquare, 
  Scale, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowRight,
  Clock,
  Send,
  X
} from 'lucide-react';

export const DisputesView: React.FC = () => {
  const navigate = useNavigate();
  const { disputes, resolveDispute, showToast } = useKaratFlow();

  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(disputes[0] || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Evidence upload simulation
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedEvidence, setUploadedEvidence] = useState<string[]>([]);
  const [resolutionNotes, setResolutionNotes] = useState('Bench swept recovery and filter wash recovered 0.460g fine gold dust. Remaining 0.040g approved as allowable micro-dispersion.');

  const filteredDisputes = disputes.filter(d => {
    const matchSearch = 
      d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.jobId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.karigarName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.jewelleryType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All' || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleSimulateEvidenceUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadedEvidence(prev => [...prev, `Workshop_Filter_Recovery_Slip_${Date.now().toString().slice(-4)}.pdf`]);
      showToast('Evidence Uploaded', 'Simulated file verified and added to cryptographic dispute vault.', 'success');
    }, 1000);
  };

  const handleResolve = (disputeId: string) => {
    resolveDispute(disputeId, resolutionNotes);
    showToast(
      'Dispute Amicably Resolved',
      `Dispute ${disputeId} closed with mutual party sign-off. Job reconciled.`,
      'success'
    );
    if (selectedDispute && selectedDispute.id === disputeId) {
      setSelectedDispute({
        ...selectedDispute,
        status: 'Resolved'
      });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D6B875]/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#111111]">
              Dispute Mediation & Discrepancies
            </h1>
            <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded font-mono font-bold">
              Non-Adversarial Protocol
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#666666] mt-0.5">
            Objective, data-backed gold variance investigation protecting both manufacturer and artisan reputations.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Policy: No presumption of guilt. Forensic evidence first.</span>
        </div>
      </div>

      {/* Main Grid: Left List (1 col) and Right Detail View (2 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 1 Col: Disputes List */}
        <div className="space-y-3">
          
          {/* Search & Filter */}
          <div className="p-3 bg-white rounded-xl border border-[#D6B875]/30 shadow-xs space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#858585] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search disputes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1 text-xs bg-[#FAF8F5] border border-[#D6B875]/30 rounded-lg text-[#202020] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto text-xs">
              {['All', 'Under Clarification', 'Evidence Review', 'Resolved'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors whitespace-nowrap ${
                    statusFilter === st 
                      ? 'bg-[#111111] text-[#D6B875]' 
                      : 'bg-[#FAF8F5] text-[#666666] hover:bg-gray-100'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Dispute Cards */}
          <div className="space-y-2.5">
            {filteredDisputes.map((dispute) => {
              const isSelected = selectedDispute?.id === dispute.id;

              return (
                <div
                  key={dispute.id}
                  onClick={() => setSelectedDispute(dispute)}
                  className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-[#B8934A] shadow-md ring-1 ring-[#D6B875]'
                      : 'bg-white/80 border-[#D6B875]/25 hover:bg-white hover:border-[#D6B875]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono font-bold text-[#111111]">{dispute.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      dispute.status === 'Resolved'
                        ? 'bg-emerald-50 text-emerald-800'
                        : dispute.priority === 'High'
                        ? 'bg-red-100 text-red-800 animate-pulse'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {dispute.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-[#202020] truncate">{dispute.jewelleryType}</h4>
                  <div className="text-[11px] text-[#666666] mt-0.5">
                    Karigar: <span className="font-medium text-[#111111]">{dispute.karigarName}</span>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100 font-mono text-[11px]">
                    <span className="text-[#858585]">Job: {dispute.jobId}</span>
                    <span className="font-bold text-red-600">
                      Variance: {dispute.discrepancyAmount.toFixed(3)}g
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right 2 Cols: Detailed Dispute Investigation File */}
        {selectedDispute ? (
          <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-[#D6B875]/35 shadow-md space-y-5">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-lg text-[#111111]">{selectedDispute.id}</span>
                  <span className="text-xs bg-[#FAF5EA] text-[#6D5027] px-2 py-0.5 rounded font-mono font-semibold">
                    Job ID: {selectedDispute.jobId}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-red-100 text-red-800">
                    Priority: {selectedDispute.priority}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-xl text-[#111111] mt-1">
                  {selectedDispute.jewelleryType}
                </h3>
                <span className="text-xs text-[#666666]">
                  Raised on {selectedDispute.dateRaised} • Karigar: <strong>{selectedDispute.karigarName}</strong>
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-[#858585] uppercase block">Unaccounted Metal Gap</span>
                <span className="text-2xl font-mono font-bold text-red-600">
                  {selectedDispute.discrepancyAmount.toFixed(3)} g
                </span>
              </div>
            </div>

            {/* Mass Balance Breakdown Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF8F5] p-3.5 rounded-xl border border-[#D6B875]/25 text-xs">
              <div>
                <span className="text-[10px] text-[#858585] uppercase">Issued Gold</span>
                <div className="font-mono font-bold text-[#111111]">
                  {selectedDispute.goldIssued.toFixed(3)} g
                </div>
              </div>
              <div>
                <span className="text-[10px] text-[#858585] uppercase">Finished Inward</span>
                <div className="font-mono font-bold text-[#29372F]">
                  {(selectedDispute.goldIssued - selectedDispute.discrepancyAmount - 1.7).toFixed(3)} g
                </div>
              </div>
              <div>
                <span className="text-[10px] text-[#858585] uppercase">Recovered Scrap</span>
                <div className="font-mono font-bold text-[#B8934A]">
                  1.000 g
                </div>
              </div>
              <div>
                <span className="text-[10px] text-[#858585] uppercase">Contract Wastage</span>
                <div className="font-mono font-bold text-amber-700">
                  0.700 g
                </div>
              </div>
            </div>

            {/* Bilateral Statements (Both Parties' Explanation) */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-base text-[#111111]">
                Bilateral Operational Statements
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Manufacturer Observation */}
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2 font-bold text-[#111111]">
                    <span className="w-2 h-2 rounded-full bg-[#111111]"></span>
                    <span>Manufacturer's Weighing Note</span>
                  </div>
                  <p className="text-[#555555] leading-relaxed">
                    "{selectedDispute.manufacturerObservation}"
                  </p>
                </div>

                {/* Karigar Explanation */}
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#D6B875]/30">
                  <div className="flex items-center gap-2 mb-2 font-bold text-[#6D5027]">
                    <span className="w-2 h-2 rounded-full bg-[#B8934A]"></span>
                    <span>Artisan Statement ({selectedDispute.karigarName})</span>
                  </div>
                  <p className="text-[#555555] leading-relaxed">
                    "{selectedDispute.karigarStatement}"
                  </p>
                </div>
              </div>
            </div>

            {/* AI-Generated Neutral Summary */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#FAF5EA] to-[#FDFBF7] border border-[#D6B875]/40 text-xs text-[#553E20]">
              <div className="flex items-center gap-2 mb-1.5 font-bold uppercase tracking-wide text-[#6D5027]">
                <ShieldCheck className="w-4 h-4 text-[#B8934A]" />
                <span>AI Neutral Mediation Summary</span>
              </div>
              <p className="leading-relaxed">
                {selectedDispute.aiNeutralSummary}
              </p>
            </div>

            {/* Recommended Forensic Steps Checklist */}
            <div>
              <h4 className="font-serif font-bold text-sm text-[#111111] mb-2">
                Recommended Verification Steps
              </h4>
              <ul className="space-y-1.5 text-xs text-[#444444]">
                {selectedDispute.recommendedSteps.map((step, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#29372F] shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Evidence & Scale Printout Vault */}
            <div className="border-t border-gray-100 pt-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-serif font-bold text-sm text-[#111111]">
                  Verified Scale Documents & Supporting Evidence
                </h4>
                <button
                  type="button"
                  onClick={handleSimulateEvidenceUpload}
                  disabled={isUploading}
                  className="px-3 py-1 rounded-lg bg-[#FAF8F5] border border-[#D6B875]/40 hover:bg-[#FAF5EA] text-[11px] font-semibold text-[#6D5027] flex items-center gap-1 transition-colors"
                >
                  <Upload className="w-3 h-3" />
                  <span>{isUploading ? 'Uploading...' : 'Upload Evidence File'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedDispute.evidenceList.map((evd) => (
                  <div 
                    key={evd.id}
                    className="p-2.5 rounded-lg bg-[#FAF8F5] border border-gray-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="w-4 h-4 text-[#B8934A] shrink-0" />
                      <div className="truncate">
                        <div className="font-medium text-[#111111] truncate">{evd.name}</div>
                        <div className="text-[10px] text-[#858585]">{evd.type} • {evd.size}</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#29372F] font-semibold shrink-0">Verified</span>
                  </div>
                ))}

                {uploadedEvidence.map((name, i) => (
                  <div 
                    key={i}
                    className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div className="font-medium text-emerald-900 truncate">{name}</div>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-semibold shrink-0">New</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resolution Actions */}
            {selectedDispute.status !== 'Resolved' ? (
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <label className="block text-xs font-semibold text-[#202020]">
                  Mutual Resolution Terms & Gold Sign-Off
                </label>
                <textarea
                  rows={2}
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D6B875]/40 rounded-xl focus:outline-none"
                ></textarea>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      showToast('Clarification Sent', `Sent WhatsApp reminder to ${selectedDispute.karigarName}.`, 'info');
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#666666] hover:bg-[#FAF8F5]"
                  >
                    Request Secondary Weighing
                  </button>
                  <button
                    type="button"
                    onClick={() => handleResolve(selectedDispute.id)}
                    className="px-5 py-2 rounded-xl bg-[#29372F] hover:bg-[#1E2822] text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#D6B875]" />
                    <span>Approve Mutual Resolution & Reconcile</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span className="font-semibold">This dispute was amicably resolved with mutual consent.</span>
                </div>
                <button
                  onClick={() => navigate('/settlements')}
                  className="font-bold underline text-emerald-800"
                >
                  View Settlement &rarr;
                </button>
              </div>
            )}

          </div>
        ) : (
          <div className="lg:col-span-2 p-12 text-center bg-white rounded-2xl border border-gray-200 text-gray-400">
            Select a dispute from the left to view the complete forensic dossier.
          </div>
        )}

      </div>

    </div>
  );
};
