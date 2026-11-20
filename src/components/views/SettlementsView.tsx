import React, { useState } from 'react';
import { useKaratFlow } from '../../context/KaratFlowContext';
import { Settlement } from '../../types';
import { 
  CheckSquare, 
  Search, 
  Filter, 
  FileText, 
  Download, 
  CheckCircle2, 
  Clock, 
  Coins, 
  Printer, 
  Send,
  UserCheck,
  ShieldCheck,
  X
} from 'lucide-react';

export const SettlementsView: React.FC = () => {
  const { 
    settlements, 
    approveSettlement, 
    disburseSettlementPayment, 
    showToast 
  } = useKaratFlow();

  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSettlement, setSelectedSettlement] = useState<Settlement | null>(settlements[0] || null);

  const filteredSettlements = settlements.filter(s => {
    const matchesSearch = 
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.jobId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.karigarName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.jewelleryType.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === 'pending') {
      return matchesSearch && s.paymentStatus !== 'Disbursed';
    }
    if (activeTab === 'completed') {
      return matchesSearch && s.paymentStatus === 'Disbursed';
    }
    return matchesSearch;
  });

  const handlePrintVoucher = () => {
    showToast('Settlement Voucher Printed', 'Cryptographically signed settlement slip ready for print.', 'info');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D6B875]/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#111111]">
              Artisan Settlements & Labour Payouts
            </h1>
            <span className="text-[10px] bg-[#29372F] text-[#FAF8F5] px-2 py-0.5 rounded font-mono font-semibold">
              Bilateral Sign-Off
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#666666] mt-0.5">
            Transparent final weight reconciliation, labour charges, and cryptographically verified mutual approval.
          </p>
        </div>

        <button
          onClick={handlePrintVoucher}
          className="px-4 py-2 rounded-xl bg-white border border-[#D6B875]/30 hover:bg-[#FAF8F5] text-xs font-semibold text-[#202020] flex items-center gap-1.5 shadow-xs w-max"
        >
          <Printer className="w-3.5 h-3.5 text-[#29372F]" />
          <span>Print Settlement Batch</span>
        </button>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-[#D6B875]/25 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'all'
                ? 'bg-[#111111] text-[#D6B875]'
                : 'bg-[#FAF8F5] text-[#666666] hover:bg-gray-100'
            }`}
          >
            All Settlements ({settlements.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'pending'
                ? 'bg-[#111111] text-[#D6B875]'
                : 'bg-[#FAF8F5] text-[#666666] hover:bg-gray-100'
            }`}
          >
            Pending Sign-off ({settlements.filter(s => s.paymentStatus !== 'Disbursed').length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'completed'
                ? 'bg-[#111111] text-[#D6B875]'
                : 'bg-[#FAF8F5] text-[#666666] hover:bg-gray-100'
            }`}
          >
            Completed & Disbursed ({settlements.filter(s => s.paymentStatus === 'Disbursed').length})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#858585] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search settlements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1 text-xs bg-[#FAF8F5] border border-[#D6B875]/30 rounded-lg text-[#202020] focus:outline-none"
          />
        </div>
      </div>

      {/* Main Grid: Left Table & Right Statement Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Settlements Table */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white border border-[#D6B875]/25 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#F0EBE1] text-[#858585] uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Voucher ID</th>
                  <th className="py-3 px-3">Artisan</th>
                  <th className="py-3 px-3">Jewellery Job</th>
                  <th className="py-3 px-3 text-right">Labour Due</th>
                  <th className="py-3 px-3 text-center">Mutual Sign-off</th>
                  <th className="py-3 px-3 text-right">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F1E8]">
                {filteredSettlements.map((s) => {
                  const isSelected = selectedSettlement?.id === s.id;

                  return (
                    <tr 
                      key={s.id}
                      onClick={() => setSelectedSettlement(s)}
                      className={`hover:bg-[#FAF8F5] cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#FAF5EA]/50' : ''
                      }`}
                    >
                      <td className="py-3.5 px-3">
                        <div className="font-mono font-bold text-[#111111]">{s.id}</div>
                        <div className="text-[10px] font-mono text-[#858585]">{s.jobId}</div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-semibold text-[#111111] block">{s.karigarName}</span>
                        <span className="text-[10px] text-[#858585]">{s.settlementDate}</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="font-medium text-[#202020] truncate max-w-xs">{s.jewelleryType}</div>
                        <div className="text-[10px] text-[#858585] font-mono">
                          Finished: {s.finishedWeight.toFixed(3)}g • Scrap: {s.recoveredScrap.toFixed(3)}g
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <span className="font-mono font-bold text-sm text-[#111111]">
                          ₹{s.netPayable.toLocaleString('en-IN')}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <div className="flex items-center justify-center gap-1.5 text-[10px]">
                          <span 
                            className={`px-1.5 py-0.5 rounded font-semibold ${
                              s.manufacturerApproved 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-gray-100 text-gray-500'
                            }`}
                            title="Manufacturer Signed"
                          >
                            MFR {s.manufacturerApproved ? '✓' : '—'}
                          </span>
                          <span 
                            className={`px-1.5 py-0.5 rounded font-semibold ${
                              s.karigarConfirmed 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-gray-100 text-gray-500'
                            }`}
                            title="Karigar Confirmed"
                          >
                            KRG {s.karigarConfirmed ? '✓' : '—'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          s.paymentStatus === 'Disbursed'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : s.paymentStatus === 'Ready for NEFT'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}>
                          {s.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Detailed Settlement Statement Card */}
        {selectedSettlement ? (
          <div className="p-6 rounded-2xl bg-white border border-[#D6B875]/35 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#B8934A]">
                  STATEMENT: {selectedSettlement.id}
                </span>
                <h3 className="font-serif font-bold text-lg text-[#111111]">
                  Final Settlement Ledger
                </h3>
              </div>
              <span className="text-xs font-mono text-[#858585]">
                {selectedSettlement.settlementDate}
              </span>
            </div>

            {/* Job & Artisan summary */}
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-gray-200 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-[#666666]">Job Reference:</span>
                <span className="font-mono font-bold text-[#111111]">{selectedSettlement.jobId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">Artisan:</span>
                <span className="font-bold text-[#111111]">{selectedSettlement.karigarName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">Jewellery Item:</span>
                <span className="font-medium text-[#111111] truncate max-w-[170px] text-right">
                  {selectedSettlement.jewelleryType}
                </span>
              </div>
            </div>

            {/* Mass Balance Audit Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="font-bold uppercase tracking-wider text-[10px] text-[#858585] mb-1">
                Gold Reconciliation Breakdown
              </div>
              <div className="flex justify-between text-[#555555]">
                <span>1. Gold Issued:</span>
                <span className="font-mono font-semibold text-[#111111]">
                  {selectedSettlement.goldIssued.toFixed(3)} g
                </span>
              </div>
              <div className="flex justify-between text-[#555555]">
                <span>2. Finished Jewellery:</span>
                <span className="font-mono font-semibold text-[#29372F]">
                  {selectedSettlement.finishedWeight.toFixed(3)} g
                </span>
              </div>
              <div className="flex justify-between text-[#555555]">
                <span>3. Recovered Scrap:</span>
                <span className="font-mono font-semibold text-[#B8934A]">
                  {selectedSettlement.recoveredScrap.toFixed(3)} g
                </span>
              </div>
              <div className="flex justify-between text-[#555555]">
                <span>4. Approved Wastage Allowance:</span>
                <span className="font-mono font-semibold text-amber-700">
                  {selectedSettlement.approvedWastage.toFixed(3)} g
                </span>
              </div>
              <div className="flex justify-between text-[#111111] font-bold border-t border-gray-100 pt-1.5">
                <span>Final Unaccounted Variance:</span>
                <span className="font-mono text-emerald-700">
                  {selectedSettlement.variance.toFixed(3)} g (Reconciled)
                </span>
              </div>
            </div>

            {/* Financial Ledger */}
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-2">
              <div className="font-bold uppercase tracking-wider text-[10px] text-[#858585]">
                Financial Labour Ledger
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">Gross Labour Charges:</span>
                <span className="font-mono font-bold text-[#111111]">
                  ₹{selectedSettlement.labourCharges.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-[#666666]">
                <span>Wastage Deduction:</span>
                <span className="font-mono font-bold text-emerald-700">₹0 (Zero Deficit)</span>
              </div>
              <div className="flex justify-between text-sm font-bold border-t border-gray-200 pt-2 text-[#111111]">
                <span>Net Payable:</span>
                <span className="font-mono text-[#29372F] text-base">
                  ₹{selectedSettlement.netPayable.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Dual Digital Approvals State */}
            <div className="space-y-2 pt-1">
              <div className="font-bold text-[10px] uppercase tracking-wider text-[#858585]">
                Dual Cryptographic Sign-Off
              </div>

              {/* Manufacturer Sign */}
              <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-gray-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className={`w-4 h-4 ${selectedSettlement.manufacturerApproved ? 'text-emerald-600' : 'text-gray-400'}`} />
                  <div>
                    <div className="font-semibold text-[#111111]">Manufacturer Approval</div>
                    <div className="text-[10px] text-[#858585]">
                      {selectedSettlement.manufacturerApproved ? 'Signed by Rajesh Verma' : 'Awaiting your signature'}
                    </div>
                  </div>
                </div>

                {!selectedSettlement.manufacturerApproved ? (
                  <button
                    type="button"
                    onClick={() => approveSettlement(selectedSettlement.id, 'manufacturer')}
                    className="px-2.5 py-1 rounded-lg bg-[#111111] text-[#D6B875] text-[11px] font-bold"
                  >
                    Sign Now
                  </button>
                ) : (
                  <span className="text-[10px] text-emerald-700 font-bold">Approved</span>
                )}
              </div>

              {/* Karigar Confirm */}
              <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-gray-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <UserCheck className={`w-4 h-4 ${selectedSettlement.karigarConfirmed ? 'text-emerald-600' : 'text-gray-400'}`} />
                  <div>
                    <div className="font-semibold text-[#111111]">Artisan Confirmation</div>
                    <div className="text-[10px] text-[#858585]">
                      {selectedSettlement.karigarConfirmed ? 'Verified via Mobile PIN' : 'Awaiting artisan confirmation'}
                    </div>
                  </div>
                </div>

                {!selectedSettlement.karigarConfirmed ? (
                  <button
                    type="button"
                    onClick={() => approveSettlement(selectedSettlement.id, 'karigar')}
                    className="px-2.5 py-1 rounded-lg bg-[#FAF5EA] border border-[#D6B875]/40 text-[#6D5027] text-[11px] font-bold"
                  >
                    Simulate OTP
                  </button>
                ) : (
                  <span className="text-[10px] text-emerald-700 font-bold">Confirmed</span>
                )}
              </div>
            </div>

            {/* Payout Action Button */}
            <div className="pt-2">
              {selectedSettlement.paymentStatus === 'Disbursed' ? (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-center text-emerald-900 font-bold flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Payout Completed via Instant NEFT</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => disburseSettlementPayment(selectedSettlement.id)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D6B875] to-[#B8934A] hover:from-[#E4CE92] hover:to-[#C5A253] text-[#111111] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Coins className="w-4 h-4" />
                  <span>Initiate Payout (₹{selectedSettlement.netPayable.toLocaleString('en-IN')})</span>
                </button>
              )}
            </div>

          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-2xl border border-gray-200 text-gray-400 text-xs">
            Select a settlement from the table to view the full voucher.
          </div>
        )}

      </div>

    </div>
  );
};
