import React, { useState } from 'react';
import { useKaratFlow } from '../../context/KaratFlowContext';
import { 
  Settings, 
  Building2, 
  Sliders, 
  Scale, 
  Bell, 
  ShieldCheck, 
  RotateCcw, 
  CheckCircle2,
  Lock,
  Cpu
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { showToast } = useKaratFlow();

  const [companyName, setCompanyName] = useState('Verma & Sons Jewellers Pvt. Ltd.');
  const [bisLicense, setBisLicense] = useState('MH-BOM-916-2024');
  const [custodianName, setCustodianName] = useState('Rajesh Verma');
  const [workshopAddress, setWorkshopAddress] = useState('42, Zaveri Bazaar, Kalbadevi, Mumbai 400002');

  // Wastage thresholds
  const [chainWastage, setChainWastage] = useState('0.50');
  const [filigreeWastage, setFiligreeWastage] = useState('1.20');
  const [jadauWastage, setJadauWastage] = useState('1.50');
  const [castingWastage, setCastingWastage] = useState('0.80');

  // Calibration tolerance
  const [scaleTolerance, setScaleTolerance] = useState('0.020');

  // Agent triggers
  const [autoFlagDispute, setAutoFlagDispute] = useState(true);
  const [smsArtisanReminders, setSmsArtisanReminders] = useState(true);
  const [requireDualScale, setRequireDualScale] = useState(true);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Settings Updated', 'Operational parameters and craft wastage thresholds saved.', 'success');
  };

  const handleResetDemoData = () => {
    localStorage.clear();
    showToast('Demo State Cleared', 'Application reloaded with clean initial hackathon data.', 'info');
    setTimeout(() => {
      window.location.reload();
    }, 600);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D6B875]/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#111111]">
              Platform & Custody Settings
            </h1>
            <span className="text-[10px] bg-[#111111] text-[#D6B875] px-2 py-0.5 rounded font-mono font-bold">
              Operations Config
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#666666] mt-0.5">
            Configure manufacturer BIS hallmarking credentials, craft wastage allowances, and AI trigger thresholds.
          </p>
        </div>

        <button
          onClick={handleResetDemoData}
          className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold flex items-center gap-1.5 border border-red-200 transition-colors w-max"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        
        {/* Section 1: Manufacturer Profile */}
        <div className="p-6 rounded-2xl bg-white border border-[#D6B875]/30 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Building2 className="w-5 h-5 text-[#B8934A]" />
            <h3 className="font-serif font-bold text-lg text-[#111111]">
              Manufacturer Business Profile & Regulatory Hallmarking
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#202020] mb-1">
                Jewellery Manufacturing Firm Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D6B875]/40 rounded-xl text-xs text-[#111111] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#202020] mb-1">
                BIS Hallmarking License Number
              </label>
              <input
                type="text"
                value={bisLicense}
                onChange={(e) => setBisLicense(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D6B875]/40 rounded-xl text-xs font-mono font-bold text-[#111111] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#202020] mb-1">
                Master Bullion Custodian & Signatory
              </label>
              <input
                type="text"
                value={custodianName}
                onChange={(e) => setCustodianName(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D6B875]/40 rounded-xl text-xs text-[#111111] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#202020] mb-1">
                Primary Workshop / Vault Facility Address
              </label>
              <input
                type="text"
                value={workshopAddress}
                onChange={(e) => setWorkshopAddress(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D6B875]/40 rounded-xl text-xs text-[#111111] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Craft Wastage Allowance Policy Defaults */}
        <div className="p-6 rounded-2xl bg-white border border-[#D6B875]/30 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Sliders className="w-5 h-5 text-[#29372F]" />
            <div>
              <h3 className="font-serif font-bold text-lg text-[#111111]">
                Category-Wise Allowable Craft Wastage Caps (%)
              </h3>
              <p className="text-xs text-[#666666]">
                Automatic loss limits applied when issuing new manufacturing contracts
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-gray-200">
              <label className="block font-semibold text-[#202020] mb-1">Plain Chains & Solid Links</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.05"
                  value={chainWastage}
                  onChange={(e) => setChainWastage(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg font-mono font-bold text-[#111111]"
                />
                <span className="absolute right-3 top-2 text-[#858585]">%</span>
              </div>
              <span className="text-[10px] text-[#858585] mt-1 block">Default: 0.50%</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-gray-200">
              <label className="block font-semibold text-[#202020] mb-1">Hand Filigree & Wirework</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.05"
                  value={filigreeWastage}
                  onChange={(e) => setFiligreeWastage(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg font-mono font-bold text-[#111111]"
                />
                <span className="absolute right-3 top-2 text-[#858585]">%</span>
              </div>
              <span className="text-[10px] text-[#858585] mt-1 block">Default: 1.20%</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-gray-200">
              <label className="block font-semibold text-[#202020] mb-1">Kundan Jadau Foil Craft</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.05"
                  value={jadauWastage}
                  onChange={(e) => setJadauWastage(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg font-mono font-bold text-[#111111]"
                />
                <span className="absolute right-3 top-2 text-[#858585]">%</span>
              </div>
              <span className="text-[10px] text-[#858585] mt-1 block">Default: 1.50%</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-gray-200">
              <label className="block font-semibold text-[#202020] mb-1">Vacuum Investment Casting</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.05"
                  value={castingWastage}
                  onChange={(e) => setCastingWastage(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg font-mono font-bold text-[#111111]"
                />
                <span className="absolute right-3 top-2 text-[#858585]">%</span>
              </div>
              <span className="text-[10px] text-[#858585] mt-1 block">Default: 0.80%</span>
            </div>
          </div>
        </div>

        {/* Section 3: AI Automation & Scale Verification Toggles */}
        <div className="p-6 rounded-2xl bg-white border border-[#D6B875]/30 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Cpu className="w-5 h-5 text-[#C5A253]" />
            <h3 className="font-serif font-bold text-lg text-[#111111]">
              Autonomous Operations & Verification Rules
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF8F5] border border-gray-200 cursor-pointer hover:bg-[#FAF5EA] transition-colors">
              <div>
                <span className="font-bold text-[#111111] block">
                  Automatic AI Discrepancy Escalation
                </span>
                <span className="text-[11px] text-[#666666]">
                  Trigger non-adversarial dispute ticket whenever unexplained variance exceeds ±0.200 g.
                </span>
              </div>
              <input
                type="checkbox"
                checked={autoFlagDispute}
                onChange={(e) => setAutoFlagDispute(e.target.checked)}
                className="w-4 h-4 accent-[#B8934A]"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF8F5] border border-gray-200 cursor-pointer hover:bg-[#FAF5EA] transition-colors">
              <div>
                <span className="font-bold text-[#111111] block">
                  Artisan SLA SMS & WhatsApp Reminders
                </span>
                <span className="text-[11px] text-[#666666]">
                  Dispatch automated reminder to karigars 48 hours before expected return date.
                </span>
              </div>
              <input
                type="checkbox"
                checked={smsArtisanReminders}
                onChange={(e) => setSmsArtisanReminders(e.target.checked)}
                className="w-4 h-4 accent-[#B8934A]"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF8F5] border border-gray-200 cursor-pointer hover:bg-[#FAF5EA] transition-colors">
              <div>
                <span className="font-bold text-[#111111] block">
                  Mandate Dual-Scale Micro Tare Verification
                </span>
                <span className="text-[11px] text-[#666666]">
                  Require both primary and secondary scale readings before closing custody returns.
                </span>
              </div>
              <input
                type="checkbox"
                checked={requireDualScale}
                onChange={(e) => setRequireDualScale(e.target.checked)}
                className="w-4 h-4 accent-[#B8934A]"
              />
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#111111] hover:bg-[#202020] text-[#D6B875] text-xs font-bold transition-colors shadow-md"
          >
            Save All Platform Settings
          </button>
        </div>

      </form>

    </div>
  );
};
