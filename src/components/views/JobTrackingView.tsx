import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useKaratFlow } from '../../context/KaratFlowContext';
import { Job, JobStatus, ProductionStage } from '../../types';
import { GoldQRCode } from '../common/GoldQRCode';
import { 
  Search, 
  Filter, 
  Eye, 
  Scale, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  Calendar, 
  User, 
  ShieldCheck, 
  ArrowRight,
  Layers,
  Sparkles,
  ExternalLink,
  X
} from 'lucide-react';

export const JobTrackingView: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter') || 'All';

  const { jobs, karigars, updateJobStage, updateJobStatus, showToast } = useKaratFlow();

  const [activeFilter, setActiveFilter] = useState<string>(initialFilter);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Status Filter options
  const filterOptions = [
    { label: 'All Jobs', value: 'All', count: jobs.length },
    { label: 'Issued', value: 'Issued', count: jobs.filter(j => j.status === 'Issued').length },
    { label: 'In Progress', value: 'In Progress', count: jobs.filter(j => j.status === 'In Progress').length },
    { label: 'Ready for Return', value: 'Ready for Return', count: jobs.filter(j => j.status === 'Ready for Return').length },
    { label: 'Completed', value: 'Completed', count: jobs.filter(j => j.status === 'Completed').length },
    { label: 'Overdue', value: 'Overdue', count: jobs.filter(j => j.status === 'Overdue').length },
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesFilter = activeFilter === 'All' || job.status === activeFilter;
    const matchesSearch = 
      job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.karigarName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.jewelleryType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1 w-max">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Completed</span>
          </span>
        );
      case 'In Progress':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#FAF5EA] text-[#6D5027] border border-[#D6B875]/40 flex items-center gap-1 w-max">
            <Clock className="w-3 h-3 text-[#B8934A]" />
            <span>In Progress</span>
          </span>
        );
      case 'Ready for Return':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1 w-max">
            <Scale className="w-3 h-3 text-blue-600" />
            <span>Ready for Return</span>
          </span>
        );
      case 'Overdue':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1 w-max">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            <span>Overdue SLA</span>
          </span>
        );
      case 'Disputed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-red-50 text-red-700 border border-red-200 flex items-center gap-1 w-max animate-pulse">
            <AlertTriangle className="w-3 h-3 text-red-600" />
            <span>Disputed</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-700 w-max">
            Issued
          </span>
        );
    }
  };

  const stagesList: ProductionStage[] = [
    'Custody Dispatched',
    'Melting & Ingot Cast',
    'Wire Drawing & Die Cut',
    'Hand Filigree Craft',
    'Gemstone & Jadau Setting',
    'Buffing & Polish',
    'Final Weight Audit & Hallmarking'
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D6B875]/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#111111]">
              Jewellery Job Tracking
            </h1>
            <span className="text-xs bg-[#29372F] text-[#FAF8F5] px-2 py-0.5 rounded font-mono font-semibold">
              {jobs.length} Active Jobs
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#666666] mt-0.5">
            Monitor real-time bench progression, craft milestones, and custody SLA status.
          </p>
        </div>

        <button
          onClick={() => navigate('/issue')}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D6B875] to-[#B8934A] text-[#111111] font-bold text-xs flex items-center gap-1.5 shadow-md hover:from-[#E4CE92] hover:to-[#C5A253] transition-all cursor-pointer w-max"
        >
          <span>Issue New Gold Job</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-[#D6B875]/25 shadow-xs">
        
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {filterOptions.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeFilter === f.value
                  ? 'bg-[#111111] text-[#D6B875] shadow-xs'
                  : 'bg-[#FAF8F5] text-[#666666] hover:bg-[#F5F1E8] hover:text-[#111111]'
              }`}
            >
              <span>{f.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                activeFilter === f.value ? 'bg-[#D6B875]/20 text-[#D6B875]' : 'bg-gray-200 text-gray-700'
              }`}>
                {f.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#858585] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by Job ID, Karigar, or Type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#D6B875]/30 rounded-lg text-[#202020] placeholder-[#858585] focus:outline-none focus:ring-1 focus:ring-[#D6B875]"
          />
        </div>

      </div>

      {/* Jobs Table */}
      <div className="p-5 rounded-2xl bg-white border border-[#D6B875]/25 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#F0EBE1] text-[#858585] uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Job ID</th>
                <th className="py-3 px-3">Karigar / Workshop</th>
                <th className="py-3 px-3">Jewellery Design</th>
                <th className="py-3 px-3 text-right">Gold Issued</th>
                <th className="py-3 px-3">Issue Date</th>
                <th className="py-3 px-3">Expected Return</th>
                <th className="py-3 px-3">Current Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F1E8]">
              {filteredJobs.map((job) => {
                const isOverdue = job.status === 'Overdue';

                return (
                  <tr 
                    key={job.id} 
                    className="hover:bg-[#FAF8F5] transition-colors cursor-pointer group"
                    onClick={() => setSelectedJob(job)}
                  >
                    <td className="py-3.5 px-3">
                      <span className="font-mono font-bold text-[#111111] group-hover:text-[#B8934A] transition-colors">
                        {job.id}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="font-semibold text-[#111111]">{job.karigarName}</div>
                      <div className="text-[10px] text-[#858585]">Verified Artisan</div>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="font-medium text-[#202020] max-w-xs truncate">
                        {job.jewelleryType}
                      </div>
                      <div className="text-[10px] text-[#858585] truncate max-w-xs">
                        Stage: {job.currentStage}
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <span className="font-mono font-bold text-sm text-[#111111]">
                        {job.goldIssued.toFixed(3)}g
                      </span>
                      <span className="text-[10px] text-[#858585] font-mono ml-1">({job.purity})</span>
                    </td>
                    <td className="py-3.5 px-3 text-[#666666] font-mono text-[11px]">
                      {job.issueDate}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className={`font-mono text-[11px] ${isOverdue ? 'text-red-600 font-bold' : 'text-[#202020]'}`}>
                        {job.expectedDeliveryDate}
                      </div>
                      {isOverdue && (
                        <span className="text-[9px] text-red-600 font-semibold block uppercase">
                          Delayed (+3d)
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3">
                      {getStatusBadge(job.status)}
                    </td>
                    <td className="py-3.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedJob(job)}
                          className="p-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#FAF5EA] text-[#88652D] transition-colors"
                          title="View Full Job Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => navigate(`/reconciliation?jobId=${job.id}`)}
                          className="px-2.5 py-1 rounded-lg bg-[#111111] hover:bg-[#202020] text-[#D6B875] text-[11px] font-semibold flex items-center gap-1 transition-colors"
                          title="Reconcile This Job"
                        >
                          <Scale className="w-3 h-3" />
                          <span>Reconcile</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Job Modal / Drawer */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 border border-[#D6B875]/40 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 text-[#858585] hover:text-[#111111]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-bold text-[#B8934A]">
                    {selectedJob.id}
                  </span>
                  {getStatusBadge(selectedJob.status)}
                </div>
                <h3 className="font-serif font-bold text-xl text-[#111111] mt-1">
                  {selectedJob.jewelleryType}
                </h3>
                <p className="text-xs text-[#666666]">
                  Assigned Artisan: <strong>{selectedJob.karigarName}</strong>
                </p>
              </div>
            </div>

            {/* Top Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF8F5] p-3.5 rounded-xl border border-[#D6B875]/25 text-xs mb-5">
              <div>
                <span className="text-[10px] text-[#858585] uppercase">Issued Gold</span>
                <div className="font-mono font-bold text-sm text-[#111111]">
                  {selectedJob.goldIssued.toFixed(3)}g
                </div>
                <span className="text-[10px] text-[#858585]">Purity: {selectedJob.purity}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#858585] uppercase">Wastage Cap</span>
                <div className="font-mono font-bold text-sm text-amber-700">
                  {selectedJob.allowedLossGrams.toFixed(3)}g
                </div>
                <span className="text-[10px] text-[#858585]">({selectedJob.agreedWastagePercent}%)</span>
              </div>
              <div>
                <span className="text-[10px] text-[#858585] uppercase">Issue Date</span>
                <div className="font-semibold text-[#111111]">{selectedJob.issueDate}</div>
              </div>
              <div>
                <span className="text-[10px] text-[#858585] uppercase">Expected Return</span>
                <div className="font-semibold text-[#111111]">{selectedJob.expectedDeliveryDate}</div>
              </div>
            </div>

            {/* Production Status Interactive Timeline */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-xs uppercase tracking-wide text-[#202020]">
                  Production Stage Progression
                </h4>
                <span className="text-[11px] font-mono text-[#B8934A] font-bold">
                  {selectedJob.stageProgress}% Completed
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-3">
                <div 
                  className="bg-gradient-to-r from-[#D6B875] to-[#29372F] h-full rounded-full transition-all duration-500"
                  style={{ width: `${selectedJob.stageProgress}%` }}
                ></div>
              </div>

              {/* Stages List */}
              <div className="space-y-1.5 bg-[#FAF8F5] p-3 rounded-xl border border-gray-200 text-xs">
                {stagesList.map((stg, idx) => {
                  const isCurrent = selectedJob.currentStage === stg;
                  const isPassed = stagesList.indexOf(selectedJob.currentStage) >= idx;

                  return (
                    <div 
                      key={stg} 
                      className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                        isCurrent 
                          ? 'bg-[#111111] text-[#D6B875]' 
                          : isPassed 
                          ? 'text-[#29372F] font-medium' 
                          : 'text-gray-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isPassed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B875]" />
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-full border border-gray-300"></span>
                        )}
                        <span>{stg}</span>
                      </div>

                      {/* Interactive Stage Simulation Button */}
                      {!isPassed && (
                        <button
                          type="button"
                          onClick={() => {
                            updateJobStage(selectedJob.id, stg, Math.min(100, (idx + 1) * 15));
                            setSelectedJob({
                              ...selectedJob,
                              currentStage: stg,
                              stageProgress: Math.min(100, (idx + 1) * 15)
                            });
                          }}
                          className="text-[10px] px-2 py-0.5 rounded bg-white text-[#111111] border border-gray-300 hover:bg-gray-100 font-semibold"
                        >
                          Mark Reached
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reconciliation Data if already tested */}
            {selectedJob.unexplainedVariance !== undefined && (
              <div className="p-3.5 rounded-xl bg-red-50/70 border border-red-200 text-xs mb-5">
                <div className="flex items-center justify-between font-bold text-red-800 mb-1">
                  <span>Reconciliation Mass-Balance Result</span>
                  <span className="font-mono text-sm">
                    Variance: {selectedJob.unexplainedVariance.toFixed(3)}g
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[11px] text-[#666666] mt-2">
                  <div>Finished: <strong>{selectedJob.finishedWeight}g</strong></div>
                  <div>Scrap: <strong>{selectedJob.recoveredScrap}g</strong></div>
                  <div>Approved Loss: <strong>{selectedJob.approvedLoss}g</strong></div>
                </div>
              </div>
            )}

            {/* QR Code and Cryptographic Seal */}
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-200 mb-5">
              <div className="shrink-0">
                <GoldQRCode value={selectedJob.qrHash} size={70} label="" sublabel="" />
              </div>
              <div className="text-xs">
                <div className="font-mono font-bold text-[#111111]">
                  Tamper Proof Hash: {selectedJob.qrHash}
                </div>
                <p className="text-[11px] text-[#666666] mt-0.5">
                  Artisan OTP confirmed upon dispatch. Bench swept recovery scheduled.
                </p>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#666666] hover:bg-[#FAF8F5]"
              >
                Close Drawer
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigate(`/reconciliation?jobId=${selectedJob.id}`);
                    setSelectedJob(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#111111] hover:bg-[#202020] text-[#D6B875] text-xs font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Scale className="w-3.5 h-3.5 text-[#D6B875]" />
                  <span>Open Reconciliation Centre</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
