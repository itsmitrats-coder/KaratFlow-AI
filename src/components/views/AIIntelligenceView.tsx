import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKaratFlow } from '../../context/KaratFlowContext';
import { 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  Scale, 
  FileCheck, 
  Coins, 
  Send, 
  Bot, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Cpu, 
  GitBranch, 
  Layers,
  Terminal,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  query?: string;
  text: string;
  cards?: Array<{
    title: string;
    detail: string;
    link?: string;
    tag?: string;
  }>;
}

export const AIIntelligenceView: React.FC = () => {
  const navigate = useNavigate();
  const { 
    aiAgents, 
    jobs, 
    karigars, 
    disputes, 
    goldRates, 
    showToast 
  } = useKaratFlow();

  const [inputQuery, setInputQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeAgentTab, setActiveAgentTab] = useState<string>('All');

  // Pre-loaded Chat History with realistic enterprise operational responses
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-01',
      sender: 'assistant',
      timestamp: 'Today, 02:00 PM',
      text: 'KARAT FLOW Multi-Agent Operations System online. The Central Orchestrator is actively coordinating the 5 specialized operational agents across your workshop ledger. How may I assist your bullion audit today?'
    }
  ]);

  const presetQueries = [
    'Show me all jobs with unexplained gold discrepancies.',
    'Which karigars have overdue jobs?',
    'Prepare a reconciliation report for job KF-1024.',
    'Show gold issued to karigars this month.',
    "Audit Ramesh Soni's scrap recovery track record."
  ];

  const handleSendQuery = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: queryText
    };

    setChatMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsProcessing(true);

    // Simulate Agentic Orchestrator Thinking & Dispatching
    setTimeout(() => {
      let responseMsg: ChatMessage;
      const lower = queryText.toLowerCase();

      if (lower.includes('discrepanc') || lower.includes('variance') || lower.includes('unexplained')) {
        responseMsg = {
          id: `ast-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: 'The Reconciliation Agent and Dispute Resolution Agent scanned all active job records. Currently, 3 jobs have unresolved gold discrepancies totaling 0.930 g:',
          cards: [
            {
              title: 'Job KF-1024 — Ramesh Soni',
              detail: 'Issued: 100.000g | Finished: 97.800g | Scrap: 1.000g | Approved Loss: 0.700g. Unexplained Variance: 0.500 g. Non-adversarial recommendation: Inspect rotary buffing suction unit.',
              link: '/reconciliation?jobId=KF-1024',
              tag: 'High Priority (0.500g)'
            },
            {
              title: 'Job KF-1018 — Gopal Chitrakar',
              detail: 'Issued: 73.800g | Finished: 71.850g | Scrap: 1.116g | Approved Loss: 0.554g. Unexplained Variance: 0.280 g. Recommendation: Borax glaze extraction from graphite crucible.',
              link: '/disputes',
              tag: 'Medium Priority (0.280g)'
            },
            {
              title: 'Job KF-1012 — Dinesh Patwa',
              detail: 'Issued: 28.500g | Accounted: 28.350g. Discrepancy: 0.150 g. Status: Karigar melted lac wax; 0.145g recovered. Residual within instrument scale tolerance.',
              link: '/disputes',
              tag: 'Low / Settled (0.150g)'
            }
          ]
        };
      } else if (lower.includes('overdue') || lower.includes('sla') || lower.includes('late')) {
        responseMsg = {
          id: `ast-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: 'The Job Tracking Agent evaluated all expected delivery SLAs. 2 karigars currently hold jobs past their agreed completion timeline:',
          cards: [
            {
              title: 'Job KF-1027 — Dinesh Patwa (Sarafa Bazaar)',
              detail: 'Royal Kundan Jadau Choker (52.400g 22K). Expected: 16 Nov 2026 (+4 days overdue). Karigar note: Natural Basra pearl assortment matching delayed stone setting stage.',
              link: '/jobs?filter=Overdue',
              tag: 'Overdue by 4 Days'
            },
            {
              title: 'Job KF-1019 — Babu Shilpi (Bowbazar)',
              detail: 'Broad Mesh Filigree Cuff (80.000g 22K). Expected: 15 Nov 2026 (+2 days overdue). Karigar note: 7-row wire mesh alignment requires secondary annealing.',
              link: '/jobs?filter=Overdue',
              tag: 'Overdue by 2 Days'
            }
          ]
        };
      } else if (lower.includes('report') || lower.includes('kf-1024') || lower.includes('1024')) {
        responseMsg = {
          id: `ast-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: 'Reconciliation Agent compiled forensic audit report for Job KF-1024 (Antique 22K Temple Choker Necklace):',
          cards: [
            {
              title: 'Job KF-1024 Forensic Mass Balance Audit',
              detail: 'Issued: 100.000g 22K Bullion. Finished piece returned: 97.800g. Bench scrap submitted: 1.000g. Agreed craft wastage: 0.700g (0.70%). Net mass accounted: 99.500g. Variance deficit: 0.500g (Valuation: ₹3,598). Dual scale tare logs confirmed valid. Recommended action: Physical suction chamber inspection.',
              link: '/reconciliation?jobId=KF-1024',
              tag: 'Forensic Audit Ready'
            }
          ]
        };
      } else if (lower.includes('issued') || lower.includes('month') || lower.includes('total')) {
        responseMsg = {
          id: `ast-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: 'The Gold Issue Agent reports that a total of 1,280.500 g of gold is currently issued under active artisan custody contracts across 10 karigars. Vault reserves hold an additional 1,170.250 g, bringing total manufacturer custody to 2,450.750 g (Valuation: ₹1.76 Cr).',
          cards: [
            {
              title: 'Gold Custody Distribution Overview',
              detail: 'Active Jobs: 48 | Safe Vault Ingot: 1,170.25g | In Karigar Custody: 1,280.50g | Reconciled This Month: 86 jobs (3,840.10g returned).',
              link: '/inventory',
              tag: 'Ledger Synced'
            }
          ]
        };
      } else if (lower.includes('ramesh') || lower.includes('soni') || lower.includes('track record')) {
        responseMsg = {
          id: `ast-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: 'Dispute Resolution Agent evaluated artisan profile for Ramesh Soni (Artisan ID: MH-BOM-ART-4402):',
          cards: [
            {
              title: 'Artisan Craft History: Ramesh Soni',
              detail: 'Historical jobs completed: 42. Total lifetime gold handled: 3,840.25g. Cumulative mass-balance accuracy: 99.8%. Zero historical malice or default. AI assessment strongly concludes that the 0.500g variance is technical workshop dispersion rather than breach of trust.',
              link: '/karigars',
              tag: 'Trust Rating: 4.9 / 5.0'
            }
          ]
        };
      } else {
        responseMsg = {
          id: `ast-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `Central Orchestrator processed query: "${queryText}". The 5 operational agents have verified the ledger. 48 active jobs are running, 3 require variance review, and 12 are queued for micro-scale verification today.`
        };
      }

      setChatMessages(prev => [...prev, responseMsg]);
      setIsProcessing(false);
    }, 1000);
  };

  const getAgentIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#B8934A]" />;
      case 'Activity': return <Activity className="w-5 h-5 text-blue-500" />;
      case 'Scale': return <Scale className="w-5 h-5 text-[#29372F]" />;
      case 'FileCheck': return <FileCheck className="w-5 h-5 text-purple-500" />;
      case 'Coins': return <Coins className="w-5 h-5 text-emerald-500" />;
      default: return <Bot className="w-5 h-5 text-[#D6B875]" />;
    }
  };

  const triggerAgentScan = (agentName: string) => {
    showToast(
      'Agent Scan Triggered',
      `${agentName} initiated autonomous ledger audit across 10 workshops.`,
      'info'
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D6B875]/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#111111]">
              AI Intelligence Centre
            </h1>
            <span className="text-[10px] bg-gradient-to-r from-[#D6B875] to-[#B8934A] text-[#111111] px-2 py-0.5 rounded font-mono font-bold uppercase">
              Agentic Multi-Bot Core
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#666666] mt-0.5">
            Five specialized autonomous agents working under a central orchestrator to prevent disputes and eliminate trust deficits.
          </p>
        </div>

        {/* Prototype Disclaimer Banner */}
        <div className="px-3 py-1.5 rounded-xl bg-[#FAF5EA] border border-[#D6B875]/40 text-xs text-[#6D5027] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C5A253]" />
          <span className="font-semibold text-[11px]">
            Simulated Agentic Intelligence Engine • Tech4Bharat 2026
          </span>
        </div>
      </div>

      {/* Visual Workflow Orchestration Panel (Central Orchestrator -> 5 Agents) */}
      <div className="p-5 rounded-2xl bg-gradient-to-b from-[#181818] to-[#111111] border border-[#D6B875]/35 shadow-lg text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#29372F] border border-[#D6B875] flex items-center justify-center">
              <Cpu className="w-4 h-4 text-[#D6B875]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-white">
                Central Multi-Agent Orchestration Architecture
              </h3>
              <p className="text-[11px] text-gray-400">
                Autonomous event routing between physical workshop scale inputs and digital custody ledger
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-400 font-mono font-semibold">5 / 5 Agents Online</span>
          </div>
        </div>

        {/* Flow Representation */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
          {aiAgents.map((agent, index) => (
            <div 
              key={agent.id}
              className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#D6B875]/60 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-black/40 border border-white/10 group-hover:border-[#D6B875] transition-colors">
                    {getAgentIcon(agent.iconName)}
                  </div>
                  <span className="text-[9px] font-mono font-bold bg-[#D6B875]/20 text-[#D6B875] px-1.5 py-0.5 rounded">
                    AGT-0{index + 1}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-white group-hover:text-[#D6B875] transition-colors">
                  {agent.name}
                </h4>
                <p className="text-[10px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                  {agent.purpose}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-semibold">{agent.status}</span>
                <span className="font-mono text-gray-400">{agent.confidenceScore}% conf</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5 Specialized Agent Cards Detail Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {aiAgents.map((agent) => (
          <div 
            key={agent.id}
            className="p-4 rounded-2xl bg-white border border-[#D6B875]/30 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-xl bg-[#FAF8F5] border border-gray-200">
                  {getAgentIcon(agent.iconName)}
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                  {agent.status}
                </span>
              </div>

              <h4 className="font-serif font-bold text-sm text-[#111111]">
                {agent.name}
              </h4>
              <span className="text-[10px] text-[#858585] font-semibold block mb-2">
                {agent.role}
              </span>

              <p className="text-[11px] text-[#555555] leading-relaxed mb-3">
                {agent.purpose}
              </p>
            </div>

            <div className="border-t border-gray-100 pt-3 space-y-2 text-xs">
              <div>
                <span className="text-[10px] text-[#858585] uppercase block">Last Autonomous Event:</span>
                <p className="text-[11px] font-medium text-[#202020] mt-0.5 line-clamp-2">
                  "{agent.lastActivity}"
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#666666] pt-1">
                <span>Audits: <strong>{agent.tasksCompleted}</strong></span>
                <button
                  onClick={() => triggerAgentScan(agent.name)}
                  className="text-[10px] text-[#B8934A] hover:text-[#88652D] font-bold flex items-center gap-0.5"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Scan</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enterprise Operational AI Assistant (Interactive Chat) */}
      <div className="p-6 rounded-2xl bg-white border border-[#D6B875]/35 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#111111] text-[#D6B875] border border-[#D6B875] flex items-center justify-center font-serif font-bold text-sm">
              KF
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#111111]">
                Karat Flow Operational AI Assistant
              </h3>
              <p className="text-xs text-[#666666]">
                Natural language querying engine connected to live jewellery inventory, dual scale logs, and karigar records.
              </p>
            </div>
          </div>

          <span className="text-[11px] font-mono text-[#858585]">
            Engine: Jeweltech-Orchestrator-v2
          </span>
        </div>

        {/* Clickable Preset Query Chips */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-semibold text-[#858585] uppercase tracking-wider">
            Suggested Operational Inquiries:
          </div>
          <div className="flex flex-wrap gap-2">
            {presetQueries.map((query) => (
              <button
                key={query}
                type="button"
                onClick={() => handleSendQuery(query)}
                className="px-3 py-1.5 rounded-full bg-[#FAF8F5] hover:bg-[#FAF5EA] border border-[#D6B875]/30 text-xs text-[#333333] hover:text-[#111111] transition-colors text-left"
              >
                "{query}"
              </button>
            ))}
          </div>
        </div>

        {/* Chat History Container */}
        <div className="h-80 overflow-y-auto space-y-3 p-4 bg-[#FAF8F5] rounded-xl border border-gray-200">
          {chatMessages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div 
                className={`max-w-2xl p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#111111] text-[#FAF8F5] rounded-br-none shadow-xs'
                    : 'bg-white text-[#202020] rounded-bl-none border border-[#D6B875]/30 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-3 text-[10px] text-[#858585] mb-1 font-mono">
                  <span>{msg.sender === 'user' ? 'Rajesh Verma (Operations)' : 'Central AI Orchestrator'}</span>
                  <span>{msg.timestamp}</span>
                </div>
                <p className="text-xs">{msg.text}</p>

                {/* Structured Cards in Assistant Response */}
                {msg.cards && msg.cards.length > 0 && (
                  <div className="space-y-2 mt-3 pt-2 border-t border-gray-100">
                    {msg.cards.map((card, cIdx) => (
                      <div 
                        key={cIdx}
                        className="p-2.5 rounded-xl bg-[#FAF8F5] border border-gray-200 text-left hover:border-[#D6B875] transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-[#111111]">{card.title}</span>
                          {card.tag && (
                            <span className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.2 rounded font-semibold font-mono">
                              {card.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#555555]">{card.detail}</p>
                        {card.link && (
                          <button
                            onClick={() => navigate(card.link!)}
                            className="text-[11px] text-[#B8934A] hover:text-[#88652D] font-bold mt-1.5 flex items-center gap-1"
                          >
                            <span>Inspect Record</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-200 w-max text-xs text-[#666666] animate-pulse">
              <Bot className="w-4 h-4 text-[#B8934A] animate-spin" />
              <span>Delegating task across 5 operational agents...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendQuery(inputQuery);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask anything about gold weight, karigars, variances, or settlements..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 px-4 py-2.5 text-xs bg-[#FAF8F5] border border-[#D6B875]/40 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D6B875]"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isProcessing}
            className="px-5 py-2.5 rounded-xl bg-[#111111] hover:bg-[#202020] text-[#D6B875] text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Ask AI</span>
          </button>
        </form>
      </div>

    </div>
  );
};
