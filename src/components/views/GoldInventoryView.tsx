import React, { useState } from 'react';
import { useKaratFlow } from '../../context/KaratFlowContext';
import { Purity, TransactionType } from '../../types';
import { 
  Coins, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus, 
  Search, 
  Filter, 
  ArrowUpDown, 
  ShieldCheck, 
  Lock, 
  Download,
  CheckCircle2,
  AlertCircle,
  Clock,
  Layers,
  X
} from 'lucide-react';

export const GoldInventoryView: React.FC = () => {
  const { 
    transactions, 
    karigars, 
    goldRates, 
    addGoldToVault, 
    showToast 
  } = useKaratFlow();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPurity, setSelectedPurity] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortField, setSortField] = useState<'date' | 'weight'>('date');
  const [sortAsc, setSortAsc] = useState(false);

  // Modal for Bullion Inward
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [depositWeight, setDepositWeight] = useState('250.000');
  const [depositPurity, setDepositPurity] = useState<Purity>('24K');
  const [depositNotes, setDepositNotes] = useState('Purchased MMTC-PAMP 999.9 fine gold bars for workshop reserve.');

  // Vault stats
  const totalAvailableInVault = 1170.250;
  const goldIssuedToKarigars = 1280.500;
  const goldReturnedCycle = 3840.100;
  const goldUnderProcessing = 840.400;

  // Filter & sort
  const filteredTransactions = transactions
    .filter(t => {
      const matchSearch = 
        t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.karigarName && t.karigarName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (t.jobId && t.jobId.toLowerCase().includes(searchTerm.toLowerCase())) ||
        t.notes.toLowerCase().includes(searchTerm.toLowerCase());

      const matchPurity = selectedPurity === 'All' || t.purity === selectedPurity;
      const matchType = selectedType === 'All' || t.type === selectedType;
      const matchStatus = selectedStatus === 'All' || t.status === selectedStatus;

      return matchSearch && matchPurity && matchType && matchStatus;
    })
    .sort((a, b) => {
      if (sortField === 'weight') {
        return sortAsc ? a.goldWeight - b.goldWeight : b.goldWeight - a.goldWeight;
      }
      return sortAsc ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
    });

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(depositWeight);
    if (isNaN(w) || w <= 0) {
      showToast('Invalid Weight', 'Please specify a positive gold weight in grams.', 'error');
      return;
    }
    addGoldToVault(w, depositPurity, depositNotes);
    setIsDepositModalOpen(false);
  };

  const handleExportCSV = () => {
    showToast('Vault Inventory Exported', 'Downloaded signed CSV report of all vault transactions.', 'info');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D6B875]/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#111111]">
              Gold Inventory & Vault Balance
            </h1>
            <span className="text-[10px] bg-[#29372F] text-[#FAF8F5] px-2 py-0.5 rounded font-mono font-semibold">
              Dual-Sensor Ledger
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#666666] mt-0.5">
            Real-time manufacturer vault reserves, issued custody balances, and raw bullion inventory.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 rounded-xl bg-white border border-[#D6B875]/30 hover:bg-[#FAF8F5] text-xs font-semibold text-[#202020] flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#29372F]" />
            <span>Export Inventory Ledger</span>
          </button>
          <button
            onClick={() => setIsDepositModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D6B875] to-[#B8934A] text-[#111111] font-bold text-xs flex items-center gap-1.5 shadow-md hover:from-[#E4CE92] hover:to-[#C5A253] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Deposit Vault Bullion</span>
          </button>
        </div>
      </div>

      {/* 4 Core Inventory Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total Available Gold */}
        <div className="p-5 rounded-2xl bg-white border border-[#D6B875]/30 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-[#858585] mb-1">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Safe Vault Balance</span>
            <Lock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-[#111111]">
            {totalAvailableInVault.toFixed(3)}<span className="text-sm font-sans font-medium text-[#666666]"> g</span>
          </div>
          <div className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium inline-block mt-2">
            Physically verified in Central Safe
          </div>
          <div className="mt-2 text-[10px] text-[#858585] flex justify-between">
            <span>24K: 650.00g</span>
            <span>22K: 420.00g</span>
            <span>18K: 100.25g</span>
          </div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-bl-full pointer-events-none"></div>
        </div>

        {/* Metric 2: Gold Issued to Karigars */}
        <div className="p-5 rounded-2xl bg-white border border-[#D6B875]/30 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-[#858585] mb-1">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Issued to Karigars</span>
            <ArrowUpRight className="w-4 h-4 text-[#C5A253]" />
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-[#C5A253]">
            {goldIssuedToKarigars.toFixed(3)}<span className="text-sm font-sans font-medium text-[#666666]"> g</span>
          </div>
          <div className="text-[11px] text-[#6D5027] bg-[#FAF5EA] px-2 py-0.5 rounded font-medium inline-block mt-2">
            Distributed across 10 artisans
          </div>
          <div className="mt-2 text-[10px] text-[#858585]">
            48 active job contracts under custody
          </div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#D6B875]/10 rounded-bl-full pointer-events-none"></div>
        </div>

        {/* Metric 3: Gold Returned & Accounted */}
        <div className="p-5 rounded-2xl bg-white border border-[#D6B875]/30 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-[#858585] mb-1">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Returned & Accounted</span>
            <ArrowDownLeft className="w-4 h-4 text-[#29372F]" />
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-[#29372F]">
            {goldReturnedCycle.toFixed(3)}<span className="text-sm font-sans font-medium text-[#666666]"> g</span>
          </div>
          <div className="text-[11px] text-[#29372F] bg-[#FAF8F5] border border-[#29372F]/20 px-2 py-0.5 rounded font-medium inline-block mt-2">
            Current cycle finished intake
          </div>
          <div className="mt-2 text-[10px] text-[#858585]">
            86 completed jobs reconciled
          </div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#29372F]/5 rounded-bl-full pointer-events-none"></div>
        </div>

        {/* Metric 4: Gold Under Processing */}
        <div className="p-5 rounded-2xl bg-white border border-[#D6B875]/30 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-[#858585] mb-1">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Under Processing</span>
            <Clock className="w-4 h-4 text-[#B8934A]" />
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-[#111111]">
            {goldUnderProcessing.toFixed(3)}<span className="text-sm font-sans font-medium text-[#666666]"> g</span>
          </div>
          <div className="text-[11px] text-[#858585] bg-gray-100 px-2 py-0.5 rounded font-medium inline-block mt-2">
            In bench filigree & setting stages
          </div>
          <div className="mt-2 text-[10px] text-[#858585]">
            12 jobs ready for return this week
          </div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-gray-500/5 rounded-bl-full pointer-events-none"></div>
        </div>

      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#D6B875]/25 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#858585] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search transactions by ID, Karigar, Job ID or notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#D6B875]/30 rounded-lg text-[#202020] placeholder-[#858585] focus:outline-none focus:ring-1 focus:ring-[#D6B875]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Purity */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-[#858585] font-medium">Purity:</span>
            <select
              value={selectedPurity}
              onChange={(e) => setSelectedPurity(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#D6B875]/30 text-xs text-[#202020] focus:outline-none"
            >
              <option value="All">All Purities</option>
              <option value="24K">24K Bullion (999)</option>
              <option value="22K">22K Standard (916)</option>
              <option value="18K">18K Alloy (750)</option>
            </select>
          </div>

          {/* Type */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-[#858585] font-medium">Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#D6B875]/30 text-xs text-[#202020] focus:outline-none"
            >
              <option value="All">All Types</option>
              <option value="Custody Issue">Custody Issue</option>
              <option value="Finished Jewellery Inward">Finished Inward</option>
              <option value="Scrap Return">Scrap Return</option>
              <option value="Bullion Deposit">Bullion Deposit</option>
              <option value="Custody Settlement">Custody Settlement</option>
            </select>
          </div>

          {/* Status */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-[#858585] font-medium">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#D6B875]/30 text-xs text-[#202020] focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Verified">Verified</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Flagged">Flagged</option>
              <option value="Custody Transfer">Custody Transfer</option>
            </select>
          </div>

          {/* Sort Button */}
          <button
            onClick={() => {
              if (sortField === 'weight') {
                setSortAsc(!sortAsc);
              } else {
                setSortField('weight');
                setSortAsc(false);
              }
            }}
            className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-1 text-xs transition-colors ${
              sortField === 'weight'
                ? 'bg-[#111111] text-[#D6B875] border-[#111111]'
                : 'bg-[#FAF8F5] border-[#D6B875]/30 text-[#202020]'
            }`}
          >
            <ArrowUpDown className="w-3 h-3" />
            <span>Weight {sortField === 'weight' ? (sortAsc ? '↑' : '↓') : ''}</span>
          </button>
        </div>

      </div>

      {/* Inventory Transaction History Table */}
      <div className="p-5 rounded-2xl bg-white border border-[#D6B875]/25 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#111111]">
              Inventory Transaction History ({filteredTransactions.length})
            </h3>
            <p className="text-xs text-[#666666]">
              Dual-verification cryptographic logs for every gram of gold transferred
            </p>
          </div>
          <span className="text-xs font-mono text-[#858585]">
            Page 1 of 1 • Showing {filteredTransactions.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#F0EBE1] text-[#858585] uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Transaction ID</th>
                <th className="py-3 px-3">Karigar / Entity</th>
                <th className="py-3 px-3 text-right">Gold Quantity</th>
                <th className="py-3 px-3 text-center">Purity</th>
                <th className="py-3 px-3">Transaction Type</th>
                <th className="py-3 px-3">Date & Timestamp</th>
                <th className="py-3 px-3">Verified By</th>
                <th className="py-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F1E8]">
              {filteredTransactions.map((txn) => {
                let statusPill = (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Verified
                  </span>
                );
                if (txn.status === 'Pending Review') {
                  statusPill = (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                      Pending Review
                    </span>
                  );
                } else if (txn.status === 'Flagged') {
                  statusPill = (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-red-50 text-red-700 border border-red-200 animate-pulse">
                      Discrepancy Flag
                    </span>
                  );
                } else if (txn.status === 'Custody Transfer') {
                  statusPill = (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                      Custody Transfer
                    </span>
                  );
                }

                return (
                  <tr key={txn.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-mono font-bold text-[#111111]">{txn.id}</div>
                      {txn.jobId && (
                        <div className="text-[10px] font-mono text-[#B8934A]">{txn.jobId}</div>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-[#202020]">
                        {txn.karigarName || 'Central Bullion Vault Refiner'}
                      </div>
                      <div className="text-[10px] text-[#858585] max-w-xs truncate">
                        {txn.notes}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="font-mono font-bold text-sm text-[#111111]">
                        {txn.goldWeight.toFixed(3)}
                      </span>
                      <span className="text-[11px] text-[#666666] font-medium ml-1">g</span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        txn.purity === '24K' 
                          ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                          : txn.purity === '22K'
                          ? 'bg-[#FAF5EA] text-[#6D5027] border border-[#D6B875]/40'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {txn.purity}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-medium text-[#444444] bg-[#FAF8F5] px-2 py-1 rounded text-xs">
                        {txn.type}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-[#202020] font-medium">{txn.date}</div>
                      <div className="text-[10px] text-[#858585] font-mono">{txn.timestamp}</div>
                    </td>
                    <td className="py-3 px-3 text-[#666666] text-[11px]">
                      {txn.verifiedBy}
                    </td>
                    <td className="py-3 px-3 text-right">
                      {statusPill}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deposit Bullion Inward Modal */}
      {isDepositModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#D6B875]/40 shadow-2xl relative">
            <button
              onClick={() => setIsDepositModalOpen(false)}
              className="absolute top-4 right-4 text-[#858585] hover:text-[#111111]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-xl bg-[#FAF5EA] text-[#B8934A]">
                <Coins className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#111111]">
                Deposit Vault Bullion
              </h3>
            </div>
            <p className="text-xs text-[#666666] mb-4">
              Record verified fresh bullion bar deposit into the safe vault reserve.
            </p>

            <form onSubmit={handleDepositSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#202020] mb-1">
                  Gold Weight (Grams) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.001"
                    min="0.1"
                    required
                    value={depositWeight}
                    onChange={(e) => setDepositWeight(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-mono font-bold bg-[#FAF8F5] border border-[#D6B875]/40 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D6B875]"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-medium text-[#858585]">grams</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202020] mb-1">
                  Purity Hallmark *
                </label>
                <select
                  value={depositPurity}
                  onChange={(e) => setDepositPurity(e.target.value as Purity)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D6B875]/40 rounded-xl focus:outline-none"
                >
                  <option value="24K">24K Bullion (999.9 Fine Gold)</option>
                  <option value="22K">22K Standard Grain (916 BIS Hallmarked)</option>
                  <option value="18K">18K White/Rose Alloy (750)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202020] mb-1">
                  Assay & Purchase Notes
                </label>
                <textarea
                  rows={3}
                  value={depositNotes}
                  onChange={(e) => setDepositNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D6B875]/40 rounded-xl focus:outline-none"
                ></textarea>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#D6B875]/30 text-xs">
                <div className="flex items-center justify-between text-[#666666]">
                  <span>Estimated Valuation:</span>
                  <span className="font-mono font-bold text-[#111111]">
                    ₹{(parseFloat(depositWeight || '0') * (goldRates[depositPurity] || 7850)).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDepositModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#666666] hover:bg-[#FAF8F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#111111] hover:bg-[#202020] text-[#D6B875] text-xs font-bold transition-colors shadow-md"
                >
                  Confirm Vault Deposit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
