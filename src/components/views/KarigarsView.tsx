import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKaratFlow } from '../../context/KaratFlowContext';
import { Karigar } from '../../types';
import { 
  Users, 
  Search, 
  Phone, 
  MapPin, 
  Coins, 
  CheckCircle2, 
  Clock, 
  Scale, 
  ArrowRight, 
  Award, 
  ShieldCheck, 
  Plus,
  Eye,
  X
} from 'lucide-react';

export const KarigarsView: React.FC = () => {
  const navigate = useNavigate();
  const { karigars, jobs, transactions } = useKaratFlow();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKarigar, setSelectedKarigar] = useState<Karigar | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const filteredKarigars = karigars.filter(k => 
    k.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    k.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
    k.workshop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    k.artisanId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Active jobs for selected karigar
  const karigarJobs = selectedKarigar 
    ? jobs.filter(j => j.karigarId === selectedKarigar.id)
    : [];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D6B875]/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#111111]">
              Master Karigars & Artisan Registry
            </h1>
            <span className="text-[10px] bg-[#29372F] text-[#FAF8F5] px-2 py-0.5 rounded font-mono font-semibold">
              10 Verified Artisans
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#666666] mt-0.5">
            Artisan custody quotas, craft specialisations, and objective historical mass-balance records.
          </p>
        </div>

        <button
          onClick={() => navigate('/issue')}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D6B875] to-[#B8934A] text-[#111111] font-bold text-xs flex items-center gap-1.5 shadow-md hover:from-[#E4CE92] hover:to-[#C5A253] transition-all cursor-pointer w-max"
        >
          <span>Issue Gold to Karigar</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Search & Layout Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-[#D6B875]/25 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-[#858585] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search karigars by name, speciality, workshop city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#D6B875]/30 rounded-lg text-[#202020] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              viewMode === 'cards' 
                ? 'bg-[#111111] text-[#D6B875]' 
                : 'bg-[#FAF8F5] text-[#666666] hover:bg-gray-100'
            }`}
          >
            Profile Cards
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              viewMode === 'table' 
                ? 'bg-[#111111] text-[#D6B875]' 
                : 'bg-[#FAF8F5] text-[#666666] hover:bg-gray-100'
            }`}
          >
            Registry Table
          </button>
        </div>
      </div>

      {/* Cards View */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredKarigars.map((karigar) => {
            const quotaUsage = (karigar.goldInCustody / karigar.custodyLimit) * 100;

            return (
              <div
                key={karigar.id}
                onClick={() => setSelectedKarigar(karigar)}
                className="p-5 rounded-2xl bg-white border border-[#D6B875]/30 hover:border-[#D6B875] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Top Row: Avatar & Rating */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#111111] text-[#D6B875] border border-[#D6B875]/50 flex items-center justify-center font-serif font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
                        {karigar.initials}
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-base text-[#111111] group-hover:text-[#B8934A] transition-colors">
                          {karigar.name}
                        </h3>
                        <span className="text-[10px] text-[#858585] font-mono block">
                          {karigar.artisanId}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      <span>★ {karigar.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Speciality Badge */}
                  <div className="mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#FAF5EA] text-[#6D5027] font-semibold text-[11px] inline-block border border-[#D6B875]/25">
                      {karigar.speciality}
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#666666] mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#858585] shrink-0" />
                      <span className="truncate">{karigar.workshop}</span>
                    </div>
                  </div>

                  {/* Quota Usage Bar */}
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-gray-100 text-xs mb-3 space-y-1.5">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-[#666666]">Gold In Custody:</span>
                      <span className="font-mono font-bold text-[#111111]">
                        {karigar.goldInCustody.toFixed(3)}g / {karigar.custodyLimit}g
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          quotaUsage > 80 ? 'bg-amber-500' : 'bg-[#D6B875]'
                        }`}
                        style={{ width: `${Math.min(100, quotaUsage)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row Stats */}
                <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-[#858585] block">Active Jobs</span>
                    <span className="font-mono font-bold text-[#111111]">{karigar.activeJobs}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#858585] block">Lifetime Reconciled</span>
                    <span className="font-mono font-bold text-[#29372F]">{karigar.reconciledGold.toFixed(0)}g</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#858585] block">Historical Accuracy</span>
                    <span className="font-mono font-bold text-emerald-700">{karigar.accuracyRate}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Registry Table */
        <div className="p-5 rounded-2xl bg-white border border-[#D6B875]/25 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#F0EBE1] text-[#858585] uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Karigar</th>
                  <th className="py-3 px-3">Workshop & City</th>
                  <th className="py-3 px-3">Craft Specialisation</th>
                  <th className="py-3 px-3 text-right">Gold in Custody</th>
                  <th className="py-3 px-3 text-center">Active Jobs</th>
                  <th className="py-3 px-3 text-center">Completed</th>
                  <th className="py-3 px-3 text-right">Accuracy Rate</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F1E8]">
                {filteredKarigars.map((k) => (
                  <tr 
                    key={k.id}
                    onClick={() => setSelectedKarigar(k)}
                    className="hover:bg-[#FAF8F5] cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-[#111111]">{k.name}</div>
                      <div className="text-[10px] font-mono text-[#858585]">{k.artisanId}</div>
                    </td>
                    <td className="py-3.5 px-3 text-[#555555]">
                      <div>{k.workshop}</div>
                      <div className="text-[10px] text-[#858585] font-mono">{k.phone}</div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-[#FAF5EA] text-[#6D5027] font-medium text-[11px]">
                        {k.speciality}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-[#111111]">
                      {k.goldInCustody.toFixed(3)}g
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono font-semibold">
                      {k.activeJobs}
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono text-emerald-700 font-semibold">
                      {k.completedJobs}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-emerald-800">
                      {k.accuracyRate}%
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedKarigar(k);
                        }}
                        className="p-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#FAF5EA] text-[#88652D]"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detailed Karigar Modal */}
      {selectedKarigar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 border border-[#D6B875]/40 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedKarigar(null)}
              className="absolute top-4 right-4 text-[#858585] hover:text-[#111111]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Header */}
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-[#111111] text-[#D6B875] border border-[#D6B875] flex items-center justify-center font-serif font-bold text-xl shadow-md">
                {selectedKarigar.initials}
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-[#111111]">
                  {selectedKarigar.name}
                </h3>
                <p className="text-xs text-[#666666]">
                  {selectedKarigar.speciality} • Registered Artisan ID: <strong className="font-mono">{selectedKarigar.artisanId}</strong>
                </p>
                <div className="flex items-center gap-3 text-[11px] text-[#858585] mt-1 font-mono">
                  <span>Phone: {selectedKarigar.phone}</span>
                  <span>Rating: ★ {selectedKarigar.rating.toFixed(1)} / 5.0</span>
                </div>
              </div>
            </div>

            {/* Custody Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 bg-[#FAF8F5] p-3.5 rounded-xl border border-[#D6B875]/25 text-xs mb-4">
              <div>
                <span className="text-[10px] text-[#858585] uppercase">Current Custody</span>
                <div className="font-mono font-bold text-base text-[#111111]">
                  {selectedKarigar.goldInCustody.toFixed(3)}g
                </div>
                <span className="text-[10px] text-[#858585]">Limit: {selectedKarigar.custodyLimit}g</span>
              </div>
              <div>
                <span className="text-[10px] text-[#858585] uppercase">Lifetime Reconciled</span>
                <div className="font-mono font-bold text-base text-[#29372F]">
                  {selectedKarigar.reconciledGold.toFixed(3)}g
                </div>
                <span className="text-[10px] text-[#858585]">{selectedKarigar.completedJobs} completed jobs</span>
              </div>
              <div>
                <span className="text-[10px] text-[#858585] uppercase">Accuracy Rate</span>
                <div className="font-mono font-bold text-base text-emerald-700">
                  {selectedKarigar.accuracyRate}%
                </div>
                <span className="text-[10px] text-[#858585]">Mass-balance score</span>
              </div>
            </div>

            {/* Active Jobs for this Karigar */}
            <div className="space-y-2 mb-4">
              <h4 className="font-serif font-bold text-sm text-[#111111]">
                Active Manufacturing Jobs ({karigarJobs.length})
              </h4>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {karigarJobs.map((j) => (
                  <div 
                    key={j.id}
                    onClick={() => {
                      navigate(`/jobs`);
                      setSelectedKarigar(null);
                    }}
                    className="p-2.5 rounded-xl bg-gray-50 hover:bg-[#FAF5EA] border border-gray-200 text-xs flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-[#111111] flex items-center gap-1.5">
                        <span className="font-mono text-[#B8934A]">{j.id}</span>
                        <span>{j.jewelleryType}</span>
                      </div>
                      <div className="text-[10px] text-[#858585]">
                        Due: {j.expectedDeliveryDate} • Stage: {j.currentStage}
                      </div>
                    </div>
                    <span className="font-mono font-bold text-[#111111]">
                      {j.goldIssued.toFixed(3)}g
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setSelectedKarigar(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#666666] hover:bg-[#FAF8F5]"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  navigate('/issue');
                  setSelectedKarigar(null);
                }}
                className="px-5 py-2 rounded-xl bg-[#111111] hover:bg-[#202020] text-[#D6B875] text-xs font-bold transition-colors shadow-md"
              >
                Issue Gold to {selectedKarigar.name}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
