import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKaratFlow } from '../../context/KaratFlowContext';
import { Purity } from '../../types';
import { GoldQRCode } from '../common/GoldQRCode';
import { 
  PlusCircle, 
  RefreshCw, 
  ShieldCheck, 
  Scale, 
  Calendar, 
  FileText, 
  UserCheck, 
  AlertCircle, 
  Printer, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Info,
  X
} from 'lucide-react';

export const IssueGoldView: React.FC = () => {
  const navigate = useNavigate();
  const { karigars, issueGold, goldRates, showToast } = useKaratFlow();

  // Auto-generate initial Job ID
  const [jobId, setJobId] = useState(() => `KF-${1034 + Math.floor(Math.random() * 50)}`);
  const [selectedKarigarId, setSelectedKarigarId] = useState(karigars[0]?.id || 'KRG-01');
  const [jewelleryType, setJewelleryType] = useState('Antique 22K Temple Choker Necklace');
  const [customJewelleryType, setCustomJewelleryType] = useState('');
  const [goldWeight, setGoldWeight] = useState('100.000');
  const [purity, setPurity] = useState<Purity>('22K');
  const [description, setDescription] = useState('Handcrafted antique finish with 0.8% allowable filigree loss. Lakshmi centerpiece with twin peacock motifs.');
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState('27 Nov 2026');
  const [agreedWastagePercent, setAgreedWastagePercent] = useState('0.80');
  const [labourRatePerGram, setLabourRatePerGram] = useState('180');
  const [notes, setNotes] = useState('Ingot handed over in tamper-evident security envelope with tamper seal. Dual-weighed on Mettler Toledo micro-balance.');

  // Confirmation modal state
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const selectedKarigar = karigars.find(k => k.id === selectedKarigarId) || karigars[0];

  // Weight calculations
  const weightNum = parseFloat(goldWeight) || 0;
  const wastageNum = parseFloat(agreedWastagePercent) || 0;
  const allowableLossGrams = Number(((weightNum * wastageNum) / 100).toFixed(3));
  const estimatedMinReturn = Number((weightNum - allowableLossGrams).toFixed(3));
  const estimatedLabourTotal = Math.round(weightNum * (parseFloat(labourRatePerGram) || 160));
  const goldValueEstimate = Math.round(weightNum * goldRates[purity]);

  const finalJewelleryType = jewelleryType === 'Custom' ? customJewelleryType : jewelleryType;

  const handleRegenerateJobId = () => {
    setJobId(`KF-${1034 + Math.floor(Math.random() * 80)}`);
  };

  const handleValidateAndOpenConfirm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedKarigar) {
      showToast('Validation Error', 'Please select a valid artisan karigar.', 'error');
      return;
    }

    if (weightNum <= 0) {
      showToast('Validation Error', 'Gold weight must be greater than 0 grams.', 'error');
      return;
    }

    if (wastageNum > 3.0) {
      showToast('Wastage Alert', 'Agreed wastage cannot exceed manufacturer threshold (max 3.0%).', 'warning');
      return;
    }

    if (selectedKarigar.goldInCustody + weightNum > selectedKarigar.custodyLimit) {
      showToast(
        'Custody Quota Warning', 
        `Issuing ${weightNum}g will exceed ${selectedKarigar.name}'s custody limit (${selectedKarigar.custodyLimit}g). AI Agent recommends extra verification.`,
        'warning'
      );
    }

    setIsConfirmModalOpen(true);
  };

  const handleFinalSubmit = () => {
    const createdId = issueGold({
      karigarId: selectedKarigarId,
      jewelleryType: finalJewelleryType || 'Handcrafted Jewellery',
      goldWeight: weightNum,
      purity,
      description,
      expectedDeliveryDate,
      agreedWastagePercent: wastageNum,
      notes,
      labourRatePerGram: parseFloat(labourRatePerGram) || 160
    });

    setIsConfirmModalOpen(false);
    navigate(`/jobs`);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="border-b border-[#D6B875]/20 pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#111111]">
            Issue Gold Under Digital Custody
          </h1>
          <span className="text-[10px] bg-[#D6B875] text-[#111111] px-2 py-0.5 rounded font-mono font-bold uppercase">
            Contract Generator
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#666666] mt-0.5">
          Generate an immutable cryptographic custody slip with pre-agreed craft wastage allowances.
        </p>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Interactive Form */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-[#D6B875]/30 shadow-xs">
          <form onSubmit={handleValidateAndOpenConfirm} className="space-y-5">
            
            {/* Row 1: Karigar Selection & Auto Job ID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Select Karigar */}
              <div>
                <label className="block text-xs font-bold text-[#202020] uppercase tracking-wide mb-1.5 flex items-center justify-between">
                  <span>Select Artisan / Karigar *</span>
                  <span className="text-[10px] text-[#C5A253] font-mono lowercase">
                    {selectedKarigar?.custodyLimit - selectedKarigar?.goldInCustody > 0 
                      ? `${(selectedKarigar?.custodyLimit - selectedKarigar?.goldInCustody).toFixed(1)}g limit remaining` 
                      : 'quota full'}
                  </span>
                </label>
                <select
                  value={selectedKarigarId}
                  onChange={(e) => setSelectedKarigarId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#D6B875]/40 text-xs font-medium text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#D6B875]"
                >
                  {karigars.map((k) => (
                    <option key={k.id} value={k.id}>
                      {k.name} ({k.speciality}) — Custody: {k.goldInCustody.toFixed(1)}g / {k.custodyLimit}g
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-[#666666] mt-1 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-[#29372F]" />
                  <span>Workshop: {selectedKarigar.workshop}</span>
                </div>
              </div>

              {/* Job ID Generator */}
              <div>
                <label className="block text-xs font-bold text-[#202020] uppercase tracking-wide mb-1.5">
                  Job Custody ID (Auto-Generated)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={jobId}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono font-bold text-[#111111] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleRegenerateJobId}
                    title="Regenerate Job ID"
                    className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#D6B875]/40 hover:bg-[#FAF5EA] text-[#88652D] transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-[10px] text-[#858585] mt-1 font-mono">
                  Tamper-proof SHA-256 seal will be linked to this ID.
                </div>
              </div>

            </div>

            {/* Row 2: Jewellery Type & Presets */}
            <div>
              <label className="block text-xs font-bold text-[#202020] uppercase tracking-wide mb-1.5">
                Jewellery Design Category *
              </label>
              <select
                value={jewelleryType}
                onChange={(e) => setJewelleryType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#D6B875]/40 text-xs font-medium text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#D6B875]"
              >
                <option value="Antique 22K Temple Choker Necklace">Antique 22K Temple Choker Necklace (Die + Filigree)</option>
                <option value="Calcutta Handcrafted Filigree Jhumkas">Calcutta Handcrafted Filigree Jhumkas (Wirework)</option>
                <option value="22K Solid Cuban Link Chain (24 inch)">22K Solid Cuban Link Chain (Plain Gold)</option>
                <option value="Royal Kundan Jadau Choker with Pearls">Royal Kundan Jadau Choker (Gem Setting)</option>
                <option value="Traditional Kerala Kasu Mala Long Necklace">Traditional Kerala Kasu Mala (Casting + Coins)</option>
                <option value="18K Diamond Solitaire Eternity Bangles">18K Diamond Solitaire Eternity Bangles</option>
                <option value="Jaipuri Meenakari Bridal Kada (Pair)">Jaipuri Meenakari Bridal Kada (Enamelling)</option>
                <option value="Custom">Custom Jewellery Design (Enter Below)</option>
              </select>

              {jewelleryType === 'Custom' && (
                <input
                  type="text"
                  placeholder="Enter custom jewellery description (e.g. 22K Kolhapuri Saaj)"
                  value={customJewelleryType}
                  onChange={(e) => setCustomJewelleryType(e.target.value)}
                  required
                  className="mt-2 w-full px-3.5 py-2 text-xs bg-white border border-[#D6B875]/40 rounded-xl focus:outline-none"
                />
              )}
            </div>

            {/* Row 3: Weight, Purity & Presets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Gold Weight */}
              <div>
                <label className="block text-xs font-bold text-[#202020] uppercase tracking-wide mb-1.5">
                  Gold Weight to Issue (Grams) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.001"
                    min="0.1"
                    required
                    value={goldWeight}
                    onChange={(e) => setGoldWeight(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#D6B875]/40 text-sm font-mono font-bold text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#D6B875]"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs font-semibold text-[#858585]">grams</span>
                </div>
                
                {/* Weight Presets */}
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="text-[10px] text-[#858585]">Presets:</span>
                  {['25.000', '50.000', '100.000', '150.000'].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setGoldWeight(val)}
                      className={`text-[10px] px-2 py-0.5 rounded font-mono transition-colors ${
                        goldWeight === val 
                          ? 'bg-[#111111] text-[#D6B875] font-bold' 
                          : 'bg-[#F5F1E8] text-[#444444] hover:bg-gray-200'
                      }`}
                    >
                      {val}g
                    </button>
                  ))}
                </div>
              </div>

              {/* Purity Hallmark */}
              <div>
                <label className="block text-xs font-bold text-[#202020] uppercase tracking-wide mb-1.5">
                  Gold Purity Standard *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '24K', title: '24K (999)', sub: 'Bullion Ingot' },
                    { id: '22K', title: '22K (916)', sub: 'Hallmarked Standard' },
                    { id: '18K', title: '18K (750)', sub: 'Diamond Alloy' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPurity(p.id as Purity)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        purity === p.id
                          ? 'bg-[#29372F] text-white border-[#D6B875] shadow-xs'
                          : 'bg-[#FAF8F5] border-gray-200 text-[#444444] hover:border-[#D6B875]/40'
                      }`}
                    >
                      <div className="font-mono font-bold text-xs">{p.title}</div>
                      <div className="text-[9px] opacity-75 mt-0.5 truncate">{p.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Row 4: Wastage Allowance & Expected Delivery */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Wastage % */}
              <div>
                <label className="block text-xs font-bold text-[#202020] uppercase tracking-wide mb-1.5 flex items-center justify-between">
                  <span>Agreed Wastage Allowance (%) *</span>
                  <span className="text-[10px] text-[#29372F] font-mono font-semibold">
                    = {allowableLossGrams.toFixed(3)}g max loss
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    max="3.0"
                    required
                    value={agreedWastagePercent}
                    onChange={(e) => setAgreedWastagePercent(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#D6B875]/40 text-xs font-mono font-bold text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#D6B875]"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs font-semibold text-[#858585]">%</span>
                </div>
                <div className="text-[10px] text-[#858585] mt-1">
                  Chains: ~0.5% | Filigree: ~1.2% | Jadau: ~1.5% | Casting: ~0.8%
                </div>
              </div>

              {/* Delivery Date */}
              <div>
                <label className="block text-xs font-bold text-[#202020] uppercase tracking-wide mb-1.5">
                  Expected Return Date *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={expectedDeliveryDate}
                    onChange={(e) => setExpectedDeliveryDate(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#D6B875]/40 text-xs text-[#111111] focus:outline-none"
                  />
                  <Calendar className="w-4 h-4 text-[#858585] absolute left-3 top-3" />
                </div>
                <div className="text-[10px] text-[#858585] mt-1 font-mono">
                  SLA tracking bot alerts 48 hours prior to deadline.
                </div>
              </div>

            </div>

            {/* Row 5: Agreed Labour Rate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#202020] uppercase tracking-wide mb-1.5">
                  Agreed Labour Rate (₹ per gram)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={labourRatePerGram}
                    onChange={(e) => setLabourRatePerGram(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#D6B875]/40 text-xs font-mono font-bold text-[#111111] focus:outline-none"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs font-semibold text-[#858585]">₹ / g</span>
                </div>
                <span className="text-[10px] text-[#666666] mt-1 block">
                  Est. Labour Payout: ₹{estimatedLabourTotal.toLocaleString('en-IN')} (upon reconciliation)
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#202020] uppercase tracking-wide mb-1.5">
                  Custody Acknowledgement Mode
                </label>
                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-gray-200 text-xs text-[#333333] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#29372F]" />
                    <span className="font-semibold">Artisan QR Scan + SMS OTP</span>
                  </div>
                  <span className="text-[9px] bg-[#29372F] text-white px-2 py-0.5 rounded font-mono font-bold">
                    ENABLED
                  </span>
                </div>
              </div>
            </div>

            {/* Job Description & Craft Specifications */}
            <div>
              <label className="block text-xs font-bold text-[#202020] uppercase tracking-wide mb-1.5">
                Craft Specifications & Instructions
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#D6B875]/40 text-xs text-[#202020] focus:outline-none focus:ring-1 focus:ring-[#D6B875]"
              ></textarea>
            </div>

            {/* Form Action Button */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate('/jobs')}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#666666] hover:bg-[#FAF8F5] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D6B875] to-[#B8934A] text-[#111111] font-bold text-xs flex items-center gap-2 shadow-md hover:from-[#E4CE92] hover:to-[#C5A253] transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Review & Issue Gold Custody</span>
              </button>
            </div>

          </form>
        </div>

        {/* Right 1 Col: Live Cryptographic Digital Job Card & QR Preview */}
        <div className="space-y-4">
          
          {/* Digital Job Card Box */}
          <div className="p-5 rounded-2xl bg-white border border-[#D6B875]/35 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-serif font-bold text-sm text-[#111111] tracking-wide">
                  Digital Job Slip Preview
                </span>
              </div>
              <span className="font-mono text-xs font-bold text-[#B8934A]">
                {jobId}
              </span>
            </div>

            {/* Cryptographic QR code */}
            <div className="my-4 flex justify-center">
              <GoldQRCode 
                value={`KARATFLOW:${jobId}:${selectedKarigarId}:${weightNum.toFixed(3)}g:${purity}`}
                size={160}
                label="KARAT FLOW QR SEAL"
                sublabel="Ready for Artisan Scan"
              />
            </div>

            {/* Summary Breakdown */}
            <div className="space-y-2 text-xs bg-[#FAF8F5] p-3 rounded-xl border border-[#D6B875]/20">
              <div className="flex justify-between">
                <span className="text-[#666666]">Artisan:</span>
                <span className="font-semibold text-[#111111]">{selectedKarigar.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">Jewellery Item:</span>
                <span className="font-semibold text-[#111111] truncate max-w-[160px] text-right">
                  {finalJewelleryType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">Issued Gold:</span>
                <span className="font-mono font-bold text-[#111111]">
                  {weightNum.toFixed(3)}g ({purity})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">Agreed Wastage Cap:</span>
                <span className="font-mono text-amber-700 font-semibold">
                  {allowableLossGrams.toFixed(3)}g ({wastageNum}%)
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-1.5">
                <span className="text-[#202020] font-bold">Min Accounted Target:</span>
                <span className="font-mono font-bold text-[#29372F]">
                  {estimatedMinReturn.toFixed(3)}g
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-[#858585]">
                <span>Est. Metal Value:</span>
                <span className="font-mono">₹{goldValueEstimate.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Security Guarantee Notice */}
            <div className="mt-4 flex items-start gap-2 p-2.5 rounded-lg bg-emerald-50 text-[11px] text-emerald-900 border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                Both parties receive timestamped SMS confirmation upon physical handover.
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-[#D6B875]/50 shadow-2xl relative">
            <button
              onClick={() => setIsConfirmModalOpen(false)}
              className="absolute top-4 right-4 text-[#858585] hover:text-[#111111]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pb-4 border-b border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#111111] text-[#D6B875] border border-[#D6B875] flex items-center justify-center mx-auto mb-2 shadow-md">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#111111]">
                Confirm Digital Gold Custody Transfer
              </h3>
              <p className="text-xs text-[#666666] mt-0.5">
                Review verified details before dispatching gold ingot into karigar custody.
              </p>
            </div>

            <div className="my-4 space-y-2.5 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-[#FAF8F5] p-3 rounded-xl border border-[#D6B875]/25">
                <div>
                  <span className="text-[10px] text-[#858585] uppercase">Job ID</span>
                  <div className="font-mono font-bold text-[#111111]">{jobId}</div>
                </div>
                <div>
                  <span className="text-[10px] text-[#858585] uppercase">Karigar</span>
                  <div className="font-bold text-[#111111]">{selectedKarigar.name}</div>
                </div>
                <div>
                  <span className="text-[10px] text-[#858585] uppercase">Gold Weight</span>
                  <div className="font-mono font-bold text-[#B8934A] text-sm">
                    {weightNum.toFixed(3)}g ({purity})
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-[#858585] uppercase">Allowable Wastage</span>
                  <div className="font-mono font-bold text-[#111111]">
                    {allowableLossGrams.toFixed(3)}g ({wastageNum}%)
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-[#444444]">
                <span className="font-semibold text-[#111111] block mb-0.5">Craft Specification:</span>
                {description}
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#666666] px-1">
                <span>Expected Return: <strong>{expectedDeliveryDate}</strong></span>
                <span>Agreed Labour: <strong>₹{labourRatePerGram}/g</strong></span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsConfirmModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#666666] hover:bg-[#FAF8F5]"
              >
                Back to Edit
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-5 py-2.5 rounded-xl bg-[#111111] hover:bg-[#202020] text-[#D6B875] text-xs font-bold flex items-center gap-2 shadow-lg"
              >
                <CheckCircle2 className="w-4 h-4 text-[#D6B875]" />
                <span>Sign & Confirm Custody Handover</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
