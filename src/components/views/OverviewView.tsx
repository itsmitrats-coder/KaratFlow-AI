import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKaratFlow } from '../../context/KaratFlowContext';
import { 
  PlusCircle, 
  Scale, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Coins, 
  Sparkles, 
  ArrowUpRight, 
  TrendingUp, 
  ShieldCheck, 
  FileSpreadsheet, 
  ChevronRight,
  Filter,
  Eye,
  Layers
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { GOLD_MOVEMENT_CHART_DATA, JOB_STATUS_PIE_DATA } from '../../data/mockData';

export const OverviewView: React.FC = () => {
  const navigate = useNavigate();
  const { 
    jobs, 
    transactions, 
    disputes, 
    karigars, 
    goldRates,
    showToast 
  } = useKaratFlow();

  const [chartTimeframe, setChartTimeframe] = useState<'14d' | '30d'>('14d');

  // KPI calculations
  const totalCustodyGold = 2450.75;
  const currentlyIssuedGold = 1280.50;
  const activeJobsCount = 48;
  const pendingReturnsCount = 12;
  const unresolvedDiscrepanciesCount = 3;
  const completedJobsThisMonth = 86;

  const totalValuation = Math.round(totalCustodyGold * goldRates['22K']);

  const handleExportLedger = () => {
    showToast(
      'Ledger Exported',
      'Daily Gold Custody Ledger (CSV/PDF) generated with cryptographic hash.',
      'info'
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Top Banner: Tech4Bharat 2026 Problem Statement Context */}
      <div className="bg-gradient-to-r from-[#29372F] via-[#1E2822] to-[#111111] text-[#FAF8F5] rounded-2xl p-5 border border-[#D6B875]/40 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D6B875]/20 via-transparent to-transparent pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#D6B875] text-[#111111] rounded font-mono">
                Tech4Bharat 2026 • PS 2.2
              </span>
              <span className="text-xs text-[#D6B875] font-semibold">Jeweltech National Hackathon</span>
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-white tracking-wide">
              KARAT FLOW: Trustless Gold Custody & Automated Reconciliation
            </h2>
            <p className="text-xs md:text-sm text-gray-300 mt-1 max-w-2xl leading-relaxed">
              Replacing informal trust-based karigar job-work with real-time digital custody, micro-weight verification, and AI-driven dispute prevention.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => navigate('/issue')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D6B875] to-[#B8934A] text-[#111111] font-bold text-xs flex items-center gap-2 shadow-md hover:from-[#E4CE92] hover:to-[#C5A253] transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Issue New Gold</span>
            </button>
            <button
              onClick={() => navigate('/reconciliation')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-2 border border-white/20 transition-colors"
            >
              <Scale className="w-4 h-4 text-[#D6B875]" />
              <span>Reconciliation Centre</span>
            </button>
          </div>
        </div>
      </div>

      {/* Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D6B875]/20 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#111111]">
            Good morning, Rajesh
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] mt-0.5">
            Here's your gold operations overview across 10 active master karigars.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportLedger}
            className="px-3 py-1.5 rounded-lg bg-white border border-[#D6B875]/30 hover:bg-[#FAF8F5] text-xs font-semibold text-[#202020] flex items-center gap-1.5 shadow-xs"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#29372F]" />
            <span>Export Daily Ledger</span>
          </button>
          <button
            onClick={() => navigate('/ai-intelligence')}
            className="px-3 py-1.5 rounded-lg bg-[#FAF5EA] border border-[#D6B875]/50 hover:bg-[#F3E7CF]/60 text-xs font-semibold text-[#6D5027] flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A253]" />
            <span>AI Operations Audit</span>
          </button>
        </div>
      </div>

      {/* AI Operational Insights Panel */}
      <div className="p-4 rounded-xl bg-white border-l-4 border-l-[#C5A253] border border-[#D6B875]/30 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#FAF5EA] text-[#B8934A] shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                Autonomous AI Operations Insight
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">
                Live Scan
              </span>
            </div>
            <p className="text-xs text-[#444444] mt-1 leading-relaxed">
              "Three jobs require attention. Two are overdue (KF-1027, KF-1019), and one has an unexplained gold variance of <strong>0.500 g</strong> (Job KF-1024 with Ramesh Soni). Micro-dust recovery recommended."
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => navigate('/reconciliation')}
            className="px-3 py-1.5 rounded-lg bg-[#111111] hover:bg-[#202020] text-[#D6B875] text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>Inspect Discrepancy</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => navigate('/disputes')}
            className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold flex items-center gap-1.5 border border-red-200 transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Open Disputes (3)</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row (Exact Values Specified in Prompt) */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
        
        {/* Card 1: Total Gold Under Custody */}
        <div className="p-4 rounded-xl gold-card relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-[#858585] mb-1">
            <span className="font-medium">Total Custody</span>
            <Coins className="w-4 h-4 text-[#D6B875]" />
          </div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-[#111111]">
            2,450.75<span className="text-sm font-sans font-medium text-[#666666]"> g</span>
          </div>
          <div className="mt-2 text-[10px] text-[#29372F] font-semibold flex items-center gap-1">
            <span>≈ ₹{(totalValuation / 10000000).toFixed(2)} Cr Valuation</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D6B875] to-[#B8934A]"></div>
        </div>

        {/* Card 2: Gold Currently Issued */}
        <div className="p-4 rounded-xl gold-card relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-[#858585] mb-1">
            <span className="font-medium">Currently Issued</span>
            <ArrowUpRight className="w-4 h-4 text-[#C5A253]" />
          </div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-[#111111]">
            1,280.50<span className="text-sm font-sans font-medium text-[#666666]"> g</span>
          </div>
          <div className="mt-2 text-[10px] text-[#666666]">
            Issued to 10 active karigars
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D6B875]"></div>
        </div>

        {/* Card 3: Active Jobs */}
        <div 
          onClick={() => navigate('/jobs')}
          className="p-4 rounded-xl gold-card relative overflow-hidden cursor-pointer hover:border-[#D6B875]"
        >
          <div className="flex items-center justify-between text-xs text-[#858585] mb-1">
            <span className="font-medium">Active Jobs</span>
            <Clock className="w-4 h-4 text-[#29372F]" />
          </div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-[#111111]">
            48
          </div>
          <div className="mt-2 text-[10px] text-amber-600 font-semibold flex items-center gap-1">
            <span>12 nearing SLA deadline</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#29372F]"></div>
        </div>

        {/* Card 4: Pending Returns */}
        <div 
          onClick={() => navigate('/jobs?filter=Ready for Return')}
          className="p-4 rounded-xl gold-card relative overflow-hidden cursor-pointer hover:border-[#D6B875]"
        >
          <div className="flex items-center justify-between text-xs text-[#858585] mb-1">
            <span className="font-medium">Pending Returns</span>
            <Scale className="w-4 h-4 text-[#B8934A]" />
          </div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-[#111111]">
            12
          </div>
          <div className="mt-2 text-[10px] text-[#666666]">
            Ready for dual micro-weighing
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#B8934A]"></div>
        </div>

        {/* Card 5: Unresolved Discrepancies */}
        <div 
          onClick={() => navigate('/disputes')}
          className="p-4 rounded-xl gold-card relative overflow-hidden cursor-pointer hover:border-red-400 bg-red-50/20"
        >
          <div className="flex items-center justify-between text-xs text-red-700 mb-1">
            <span className="font-semibold">Discrepancies</span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-red-600">
            3
          </div>
          <div className="mt-2 text-[10px] text-red-700 font-semibold">
            0.930g total under review
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500"></div>
        </div>

        {/* Card 6: Completed Jobs This Month */}
        <div 
          onClick={() => navigate('/jobs?filter=Completed')}
          className="p-4 rounded-xl gold-card relative overflow-hidden cursor-pointer hover:border-[#D6B875]"
        >
          <div className="flex items-center justify-between text-xs text-[#858585] mb-1">
            <span className="font-medium">Completed Jobs</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-[#111111]">
            86
          </div>
          <div className="mt-2 text-[10px] text-emerald-700 font-semibold">
            100% reconciled & settled
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600"></div>
        </div>

      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Gold Movement Analytics Chart */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white border border-[#D6B875]/25 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#111111]">
                Daily Gold Movement & Accounted Recovery (Grams)
              </h3>
              <p className="text-xs text-[#666666]">
                Comparison of gold issued vs finished jewellery returned + recovered bench scrap
              </p>
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-[#FAF8F5] rounded-lg border border-gray-200 text-xs">
              <button
                onClick={() => setChartTimeframe('14d')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                  chartTimeframe === '14d'
                    ? 'bg-[#111111] text-[#D6B875]'
                    : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                Last 14 Days
              </button>
              <button
                onClick={() => setChartTimeframe('30d')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                  chartTimeframe === '30d'
                    ? 'bg-[#111111] text-[#D6B875]'
                    : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                Monthly Trend
              </button>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={GOLD_MOVEMENT_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIssued" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D6B875" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#D6B875" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorReturned" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#29372F" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#29372F" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EBE1" />
                <XAxis dataKey="day" stroke="#858585" fontSize={11} tickLine={false} />
                <YAxis stroke="#858585" fontSize={11} tickLine={false} unit="g" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#181818',
                    border: '1px solid #D6B875',
                    borderRadius: '8px',
                    color: '#FAF8F5',
                    fontSize: '12px'
                  }}
                  formatter={(value: any) => [`${Number(value).toFixed(2)} g`, '']}
                />
                <Area 
                  type="monotone" 
                  dataKey="issued" 
                  name="Gold Issued" 
                  stroke="#C5A253" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#colorIssued)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="returned" 
                  name="Accounted Return" 
                  stroke="#29372F" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorReturned)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#D6B875]"></span>
              <span className="text-[#444444] font-medium">Gold Issued (g)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#29372F]"></span>
              <span className="text-[#444444] font-medium">Accounted Return (Finished + Scrap)</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>99.82% Overall Historical Mass Balance</span>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Job Status Distribution Donut Chart */}
        <div className="p-5 rounded-2xl bg-white border border-[#D6B875]/25 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-serif font-bold text-lg text-[#111111]">
                Job Status Pipeline
              </h3>
              <span className="text-xs font-mono font-semibold text-[#858585]">
                Total: 133
              </span>
            </div>
            <p className="text-xs text-[#666666]">
              Current distribution of jobs across active production stages
            </p>
          </div>

          <div className="h-56 w-full my-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={JOB_STATUS_PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {JOB_STATUS_PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#181818',
                    border: '1px solid #D6B875',
                    borderRadius: '8px',
                    color: '#FAF8F5',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 border-t border-gray-100 pt-3 text-xs">
            {JOB_STATUS_PIE_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-[#333333] font-medium">{item.name}</span>
                </div>
                <span className="font-mono font-bold text-[#111111]">{item.value} jobs</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Two Column Layout: Recent Transactions & Pending Job Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Recent Transactions Table */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white border border-[#D6B875]/25 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#111111]">
                Recent Gold Custody Transactions
              </h3>
              <p className="text-xs text-[#666666]">
                Immutable timestamped logs of gold inward, outward, and scrap returns
              </p>
            </div>
            <button
              onClick={() => navigate('/inventory')}
              className="text-xs font-semibold text-[#B8934A] hover:text-[#88652D] flex items-center gap-1"
            >
              <span>View Full Ledger</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#F0EBE1] text-[#858585] uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Transaction</th>
                  <th className="py-2.5 px-3">Karigar / Entity</th>
                  <th className="py-2.5 px-3 text-right">Gold Weight</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F1E8]">
                {transactions.slice(0, 6).map((txn) => {
                  let statusBadge = (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800">
                      Verified
                    </span>
                  );
                  if (txn.status === 'Pending Review') {
                    statusBadge = (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800">
                        Review
                      </span>
                    );
                  } else if (txn.status === 'Flagged') {
                    statusBadge = (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-50 text-red-700">
                        Variance Flag
                      </span>
                    );
                  } else if (txn.status === 'Custody Transfer') {
                    statusBadge = (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700">
                        In Transit
                      </span>
                    );
                  }

                  return (
                    <tr key={txn.id} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="py-3 px-3 font-mono font-semibold text-[#111111]">
                        {txn.id}
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-medium text-[#202020] block">
                          {txn.karigarName || 'Central Vault Refiner'}
                        </span>
                        {txn.jobId && (
                          <span className="text-[10px] font-mono text-[#858585]">{txn.jobId}</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-[#111111]">
                        {txn.goldWeight.toFixed(3)}g
                        <span className="text-[10px] font-sans font-normal text-[#858585] ml-1">
                          ({txn.purity})
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 bg-[#FAF5EA] text-[#6D5027] rounded text-[11px] font-medium">
                          {txn.type}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[#666666] font-mono text-[11px]">
                        {txn.date}
                      </td>
                      <td className="py-3 px-3 text-right">
                        {statusBadge}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Pending Job Alerts & Quick Actions */}
        <div className="space-y-4">
          
          {/* Quick Action Buttons Card */}
          <div className="p-4 rounded-2xl bg-white border border-[#D6B875]/30 shadow-xs">
            <h4 className="font-serif font-bold text-base text-[#111111] mb-3">
              Operator Quick Actions
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => navigate('/issue')}
                className="p-3 rounded-xl bg-[#FAF8F5] hover:bg-[#FAF5EA] border border-[#D6B875]/30 text-left transition-colors group cursor-pointer"
              >
                <PlusCircle className="w-5 h-5 text-[#B8934A] mb-1.5 group-hover:scale-110 transition-transform" />
                <div className="font-bold text-[#111111]">Issue New Gold</div>
                <div className="text-[10px] text-[#666666] mt-0.5">Generate QR custody slip</div>
              </button>

              <button
                onClick={() => navigate('/reconciliation')}
                className="p-3 rounded-xl bg-[#FAF8F5] hover:bg-[#FAF5EA] border border-[#D6B875]/30 text-left transition-colors group cursor-pointer"
              >
                <Scale className="w-5 h-5 text-[#29372F] mb-1.5 group-hover:scale-110 transition-transform" />
                <div className="font-bold text-[#111111]">Reconciliation</div>
                <div className="text-[10px] text-[#666666] mt-0.5">Weight mass-balance</div>
              </button>

              <button
                onClick={() => navigate('/disputes')}
                className="p-3 rounded-xl bg-[#FAF8F5] hover:bg-red-50/50 border border-[#D6B875]/30 text-left transition-colors group cursor-pointer"
              >
                <AlertTriangle className="w-5 h-5 text-red-600 mb-1.5 group-hover:scale-110 transition-transform" />
                <div className="font-bold text-[#111111]">Dispute Center</div>
                <div className="text-[10px] text-[#666666] mt-0.5">3 active inquiries</div>
              </button>

              <button
                onClick={() => navigate('/ai-intelligence')}
                className="p-3 rounded-xl bg-[#FAF8F5] hover:bg-[#FAF5EA] border border-[#D6B875]/30 text-left transition-colors group cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-[#C5A253] mb-1.5 group-hover:scale-110 transition-transform" />
                <div className="font-bold text-[#111111]">AI Agent Hub</div>
                <div className="text-[10px] text-[#666666] mt-0.5">5 specialized bots</div>
              </button>
            </div>
          </div>

          {/* Pending Job Alerts Card */}
          <div className="p-4 rounded-2xl bg-white border border-[#D6B875]/30 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-serif font-bold text-base text-[#111111]">
                Urgent Operations Alerts
              </h4>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-100 text-red-800 font-bold">
                Action Required
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div 
                onClick={() => navigate('/reconciliation')}
                className="p-3 rounded-xl bg-red-50/70 border border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between font-semibold text-red-800">
                  <span>Job KF-1024 Variance</span>
                  <span className="font-mono text-xs font-bold text-red-600">0.500 g</span>
                </div>
                <p className="text-[11px] text-red-700 mt-1">
                  Ramesh Soni • Temple Necklace. Finished (97.8g) + Scrap (1g) + Loss (0.7g) leaves 0.500g unaccounted.
                </p>
                <div className="mt-2 flex items-center justify-between text-[10px] font-semibold text-red-800">
                  <span>Suction filter check advised</span>
                  <span className="underline">Resolve &rarr;</span>
                </div>
              </div>

              <div 
                onClick={() => navigate('/jobs?filter=Overdue')}
                className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 hover:bg-amber-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between font-semibold text-amber-800">
                  <span>Job KF-1027 SLA Overdue</span>
                  <span className="font-mono text-xs text-amber-700">+4 days</span>
                </div>
                <p className="text-[11px] text-amber-700 mt-1">
                  Dinesh Patwa • Kundan Jadau Choker. Delayed by natural pearl matching.
                </p>
                <div className="mt-2 flex items-center justify-between text-[10px] font-semibold text-amber-800">
                  <span>Expected: 16 Nov 2026</span>
                  <span className="underline">View Job &rarr;</span>
                </div>
              </div>

              <div 
                onClick={() => navigate('/settlements')}
                className="p-3 rounded-xl bg-[#FAF5EA] border border-[#D6B875]/40 hover:bg-[#F3E7CF]/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between font-semibold text-[#553E20]">
                  <span>SET-501 Ready for NEFT</span>
                  <span className="font-mono text-xs text-[#88652D]">₹13,276</span>
                </div>
                <p className="text-[11px] text-[#6D5027] mt-1">
                  Babu Shilpi • Filigree Jhumkas. Mutual digital sign-off completed.
                </p>
                <div className="mt-2 flex items-center justify-between text-[10px] font-semibold text-[#553E20]">
                  <span>Both parties signed</span>
                  <span className="underline">Disburse &rarr;</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
