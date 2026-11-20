import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Karigar, 
  Job, 
  GoldTransaction, 
  Dispute, 
  Settlement, 
  AuditLogEntry, 
  AIAgentInfo,
  JobStatus,
  ProductionStage,
  Purity
} from '../types';
import { 
  INITIAL_KARIGARS, 
  INITIAL_JOBS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_DISPUTES, 
  INITIAL_SETTLEMENTS, 
  INITIAL_AUDIT_LOG, 
  AI_AGENTS,
  GOLD_RATES 
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
  timestamp: string;
}

interface KaratFlowContextType {
  karigars: Karigar[];
  jobs: Job[];
  transactions: GoldTransaction[];
  disputes: Dispute[];
  settlements: Settlement[];
  auditLogs: AuditLogEntry[];
  aiAgents: AIAgentInfo[];
  goldRates: typeof GOLD_RATES;
  toasts: ToastMessage[];
  dismissToast: (id: string) => void;
  showToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  
  // Actions
  issueGold: (jobData: {
    karigarId: string;
    jewelleryType: string;
    goldWeight: number;
    purity: Purity;
    description: string;
    expectedDeliveryDate: string;
    agreedWastagePercent: number;
    notes: string;
    labourRatePerGram?: number;
  }) => string; // returns generated Job ID

  reconcileJob: (
    jobId: string, 
    finishedWeight: number, 
    recoveredScrap: number, 
    approvedLoss: number
  ) => { variance: number; status: 'Reconciled' | 'Requires Review' | 'Discrepancy' };

  updateJobStage: (jobId: string, stage: ProductionStage, progress: number) => void;
  updateJobStatus: (jobId: string, status: JobStatus) => void;
  
  resolveDispute: (disputeId: string, resolutionNotes: string) => void;
  createDisputeFromVariance: (jobId: string, variance: number, notes: string) => void;
  
  approveSettlement: (settlementId: string, actor: 'manufacturer' | 'karigar') => void;
  disburseSettlementPayment: (settlementId: string) => void;
  
  addGoldToVault: (weight: number, purity: Purity, notes: string) => void;
  
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const KaratFlowContext = createContext<KaratFlowContextType | undefined>(undefined);

export const KaratFlowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [karigars, setKarigars] = useState<Karigar[]>(() => {
    const saved = localStorage.getItem('kf_karigars');
    return saved ? JSON.parse(saved) : INITIAL_KARIGARS;
  });

  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem('kf_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [transactions, setTransactions] = useState<GoldTransaction[]>(() => {
    const saved = localStorage.getItem('kf_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [disputes, setDisputes] = useState<Dispute[]>(() => {
    const saved = localStorage.getItem('kf_disputes');
    return saved ? JSON.parse(saved) : INITIAL_DISPUTES;
  });

  const [settlements, setSettlements] = useState<Settlement[]>(() => {
    const saved = localStorage.getItem('kf_settlements');
    return saved ? JSON.parse(saved) : INITIAL_SETTLEMENTS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    const saved = localStorage.getItem('kf_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOG;
  });

  const [aiAgents] = useState<AIAgentInfo[]>(AI_AGENTS);
  const [goldRates] = useState(GOLD_RATES);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Local storage persistence
  useEffect(() => {
    localStorage.setItem('kf_karigars', JSON.stringify(karigars));
  }, [karigars]);

  useEffect(() => {
    localStorage.setItem('kf_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('kf_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('kf_disputes', JSON.stringify(disputes));
  }, [disputes]);

  useEffect(() => {
    localStorage.setItem('kf_settlements', JSON.stringify(settlements));
  }, [settlements]);

  useEffect(() => {
    localStorage.setItem('kf_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  const showToast = (title: string, message: string, type: ToastMessage['type'] = 'success') => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title,
      message,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setToasts(prev => [newToast, ...prev].slice(0, 5));

    setTimeout(() => {
      dismissToast(newToast.id);
    }, 5000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Generate Unique Hex Hash for Audit Trail
  const generateSimulatedHash = () => {
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 4; i++) hash += chars[Math.floor(Math.random() * chars.length)];
    hash += '...';
    for (let i = 0; i < 4; i++) hash += chars[Math.floor(Math.random() * chars.length)];
    return hash;
  };

  // Issue Gold Action
  const issueGold: KaratFlowContextType['issueGold'] = (jobData) => {
    const karigar = karigars.find(k => k.id === jobData.karigarId);
    const karigarName = karigar ? karigar.name : 'Registered Karigar';
    
    // Generate new Job ID
    const nextNum = 1034 + Math.floor(Math.random() * 20);
    const jobId = `KF-${nextNum}`;
    const allowedLoss = Number(((jobData.goldWeight * jobData.agreedWastagePercent) / 100).toFixed(3));
    const labourRate = jobData.labourRatePerGram || 160;
    const todayStr = '20 Nov 2026';

    const newJob: Job = {
      id: jobId,
      karigarId: jobData.karigarId,
      karigarName,
      jewelleryType: jobData.jewelleryType,
      goldIssued: jobData.goldWeight,
      purity: jobData.purity,
      description: jobData.description,
      issueDate: todayStr,
      expectedDeliveryDate: jobData.expectedDeliveryDate,
      agreedWastagePercent: jobData.agreedWastagePercent,
      allowedLossGrams: allowedLoss,
      status: 'Issued',
      currentStage: 'Melting & Ingot Cast',
      stageProgress: 15,
      qrHash: `KF-QR-${jobId}-${Math.floor(1000 + Math.random() * 9000)}`,
      notes: jobData.notes || 'Gold issued under strict digital custody agreement.',
      labourRatePerGram: labourRate
    };

    // Update Jobs
    setJobs(prev => [newJob, ...prev]);

    // Update Karigar Custody Balance
    setKarigars(prev => prev.map(k => {
      if (k.id === jobData.karigarId) {
        return {
          ...k,
          activeJobs: k.activeJobs + 1,
          goldInCustody: Number((k.goldInCustody + jobData.goldWeight).toFixed(3))
        };
      }
      return k;
    }));

    // Create Transaction
    const newTxn: GoldTransaction = {
      id: `TXN-${Math.floor(8841 + Math.random() * 100)}`,
      jobId,
      karigarId: jobData.karigarId,
      karigarName,
      type: 'Custody Issue',
      goldWeight: jobData.goldWeight,
      purity: jobData.purity,
      date: todayStr,
      timestamp: 'Just now',
      status: 'Verified',
      notes: `Issued for ${jobData.jewelleryType}. Max allowable loss: ${allowedLoss}g (${jobData.agreedWastagePercent}%).`,
      verifiedBy: 'Rajesh Verma (Operations Head)'
    };
    setTransactions(prev => [newTxn, ...prev]);

    // Create Audit Log
    const newAudit: AuditLogEntry = {
      id: `AUD-${Math.floor(9911 + Math.random() * 100)}`,
      timestamp: `${todayStr}, 02:40 PM`,
      actor: 'Rajesh Verma (Operations Head)',
      action: 'Gold Issued Under Custody Contract',
      category: 'Custody',
      jobId,
      details: `Issued ${jobData.goldWeight.toFixed(3)}g ${jobData.purity} gold to ${karigarName}. QR sealed tamper pouch created.`,
      hash: generateSimulatedHash()
    };
    setAuditLogs(prev => [newAudit, ...prev]);

    showToast(
      'Gold Custody Transfer Created',
      `Job ${jobId} successfully issued to ${karigarName} (${jobData.goldWeight.toFixed(3)}g ${jobData.purity}).`,
      'success'
    );

    return jobId;
  };

  // Reconcile Job with Real TypeScript Calculation
  const reconcileJob: KaratFlowContextType['reconcileJob'] = (
    jobId, 
    finishedWeight, 
    recoveredScrap, 
    approvedLoss
  ) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) {
      showToast('Error', `Job ${jobId} not found`, 'error');
      return { variance: 0, status: 'Requires Review' };
    }

    const accounted = finishedWeight + recoveredScrap + approvedLoss;
    const variance = Number((job.goldIssued - accounted).toFixed(3));
    
    let status: 'Reconciled' | 'Requires Review' | 'Discrepancy';
    if (Math.abs(variance) <= 0.02) {
      status = 'Reconciled';
    } else if (variance > 0 && variance <= 0.20) {
      status = 'Requires Review';
    } else {
      status = 'Discrepancy';
    }

    // Update job state
    setJobs(prev => prev.map(j => {
      if (j.id === jobId) {
        return {
          ...j,
          finishedWeight,
          recoveredScrap,
          approvedLoss,
          unexplainedVariance: variance,
          reconciliationStatus: status,
          status: status === 'Reconciled' ? 'Completed' : (status === 'Discrepancy' ? 'Disputed' : 'Ready for Return'),
          completedDate: status === 'Reconciled' ? '20 Nov 2026' : undefined
        };
      }
      return j;
    }));

    // Add Audit Log
    const auditEntry: AuditLogEntry = {
      id: `AUD-${Math.floor(9920 + Math.random() * 100)}`,
      timestamp: '20 Nov 2026, 02:45 PM',
      actor: 'Reconciliation Agent',
      action: 'Automated Weight Equation Audit',
      category: 'Weight Verification',
      jobId,
      details: `Equation: Issued (${job.goldIssued.toFixed(3)}g) = Finished (${finishedWeight.toFixed(3)}g) + Scrap (${recoveredScrap.toFixed(3)}g) + Loss (${approvedLoss.toFixed(3)}g) + Variance (${variance.toFixed(3)}g). Status: ${status}`,
      hash: generateSimulatedHash()
    };
    setAuditLogs(prev => [auditEntry, ...prev]);

    // If reconciled, automatically prepare settlement
    if (status === 'Reconciled') {
      const labour = Number((finishedWeight * job.labourRatePerGram).toFixed(0));
      const newSettlement: Settlement = {
        id: `SET-${Math.floor(510 + Math.random() * 50)}`,
        jobId: job.id,
        karigarId: job.karigarId,
        karigarName: job.karigarName,
        jewelleryType: job.jewelleryType,
        goldIssued: job.goldIssued,
        finishedWeight,
        recoveredScrap,
        approvedWastage: approvedLoss,
        variance,
        labourCharges: labour,
        wastageDeduction: 0,
        netPayable: labour,
        manufacturerApproved: true,
        karigarConfirmed: false,
        paymentStatus: 'Pending Sign-off',
        settlementDate: '20 Nov 2026'
      };

      setSettlements(prev => [newSettlement, ...prev.filter(s => s.jobId !== jobId)]);

      // Release karigar custody gold
      setKarigars(prev => prev.map(k => {
        if (k.id === job.karigarId) {
          return {
            ...k,
            activeJobs: Math.max(0, k.activeJobs - 1),
            completedJobs: k.completedJobs + 1,
            goldInCustody: Math.max(0, Number((k.goldInCustody - job.goldIssued).toFixed(3))),
            reconciledGold: Number((k.reconciledGold + job.goldIssued).toFixed(3))
          };
        }
        return k;
      }));

      showToast(
        'Reconciliation Complete',
        `Job ${jobId} successfully reconciled with 0.000g variance. Settlement voucher generated.`,
        'success'
      );
    } else {
      showToast(
        'Variance Detected',
        `Job ${jobId} has an unexplained variance of ${variance.toFixed(3)}g. Flagged for review.`,
        'warning'
      );
    }

    return { variance, status };
  };

  const updateJobStage = (jobId: string, stage: ProductionStage, progress: number) => {
    setJobs(prev => prev.map(j => {
      if (j.id === jobId) {
        return {
          ...j,
          currentStage: stage,
          stageProgress: progress,
          status: progress >= 100 ? 'Ready for Return' : (j.status === 'Issued' ? 'In Progress' : j.status)
        };
      }
      return j;
    }));

    showToast('Job Stage Updated', `Job ${jobId} updated to stage: ${stage}`, 'info');
  };

  const updateJobStatus = (jobId: string, status: JobStatus) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status } : j));
    showToast('Status Changed', `Job ${jobId} status changed to ${status}`, 'info');
  };

  const createDisputeFromVariance = (jobId: string, variance: number, notes: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    const newDisputeId = `DSP-${Math.floor(305 + Math.random() * 50)}`;
    const newDispute: Dispute = {
      id: newDisputeId,
      jobId: job.id,
      karigarId: job.karigarId,
      karigarName: job.karigarName,
      jewelleryType: job.jewelleryType,
      goldIssued: job.goldIssued,
      discrepancyAmount: variance,
      dateRaised: '20 Nov 2026',
      status: 'Under Clarification',
      priority: variance > 0.4 ? 'High' : 'Medium',
      manufacturerObservation: notes || `Discrepancy of ${variance.toFixed(3)}g detected between issued gold and accounted return.`,
      karigarStatement: 'Awaiting karigar statement submission. Polishing recovery check requested.',
      aiNeutralSummary: `Neutral analysis indicates ${variance.toFixed(3)}g variance requires verification of suction collector and bench filings. Karigar ${job.karigarName} maintains a high craft trust history.`,
      recommendedSteps: [
        'Collect polishing chamber suction dust for trial burn.',
        'Weigh secondary scrap envelope on calibrated dual micro-balance.',
        'Review bench video log and mutual weighing certificate.'
      ],
      evidenceList: [
        {
          id: `EVD-${Date.now()}`,
          name: `DualScale_Printout_${jobId}.pdf`,
          type: 'Scale Certificate',
          timestamp: '20 Nov 2026, 02:40 PM',
          size: '1.4 MB'
        }
      ]
    };

    setDisputes(prev => [newDispute, ...prev]);
    showToast('Dispute Registered', `Dispute ${newDisputeId} initiated for Job ${jobId}.`, 'warning');
  };

  const resolveDispute = (disputeId: string, resolutionNotes: string) => {
    setDisputes(prev => prev.map(d => {
      if (d.id === disputeId) {
        return {
          ...d,
          status: 'Resolved',
          aiNeutralSummary: `${d.aiNeutralSummary} [RESOLVED: ${resolutionNotes}]`
        };
      }
      return d;
    }));

    // Update corresponding job
    const dispute = disputes.find(d => d.id === disputeId);
    if (dispute) {
      setJobs(prev => prev.map(j => {
        if (j.id === dispute.jobId) {
          return {
            ...j,
            status: 'Completed',
            reconciliationStatus: 'Reconciled',
            completedDate: '20 Nov 2026'
          };
        }
        return j;
      }));
    }

    const auditEntry: AuditLogEntry = {
      id: `AUD-${Math.floor(9930 + Math.random() * 50)}`,
      timestamp: '20 Nov 2026, 02:50 PM',
      actor: 'Dispute Resolution Agent',
      action: 'Dispute Amicably Resolved',
      category: 'Dispute',
      jobId: dispute?.jobId,
      details: `Dispute ${disputeId} closed. Resolution: ${resolutionNotes}`,
      hash: generateSimulatedHash()
    };
    setAuditLogs(prev => [auditEntry, ...prev]);

    showToast('Dispute Resolved', `Dispute ${disputeId} resolved successfully.`, 'success');
  };

  const approveSettlement = (settlementId: string, actor: 'manufacturer' | 'karigar') => {
    setSettlements(prev => prev.map(s => {
      if (s.id === settlementId) {
        const updated = {
          ...s,
          manufacturerApproved: actor === 'manufacturer' ? true : s.manufacturerApproved,
          karigarConfirmed: actor === 'karigar' ? true : s.karigarConfirmed,
        };
        if (updated.manufacturerApproved && updated.karigarConfirmed && s.paymentStatus === 'Pending Sign-off') {
          updated.paymentStatus = 'Ready for NEFT';
        }
        return updated;
      }
      return s;
    }));

    showToast('Settlement Signed', `${actor === 'manufacturer' ? 'Manufacturer' : 'Karigar'} sign-off verified digitally.`, 'success');
  };

  const disburseSettlementPayment = (settlementId: string) => {
    setSettlements(prev => prev.map(s => {
      if (s.id === settlementId) {
        return {
          ...s,
          paymentStatus: 'Disbursed'
        };
      }
      return s;
    }));

    showToast('Payment Disbursed', `NEFT transfer initiated for settlement ${settlementId}.`, 'success');
  };

  const addGoldToVault = (weight: number, purity: Purity, notes: string) => {
    const txn: GoldTransaction = {
      id: `TXN-${Math.floor(8860 + Math.random() * 50)}`,
      type: 'Bullion Deposit',
      goldWeight: weight,
      purity,
      date: '20 Nov 2026',
      timestamp: 'Just now',
      status: 'Verified',
      notes: notes || 'Vault inward bullion bar deposit.',
      verifiedBy: 'Rajesh Verma (Operations Head)'
    };

    setTransactions(prev => [txn, ...prev]);
    showToast('Vault Inward Added', `Deposited ${weight.toFixed(3)}g ${purity} bullion into the vault.`, 'success');
  };

  return (
    <KaratFlowContext.Provider value={{
      karigars,
      jobs,
      transactions,
      disputes,
      settlements,
      auditLogs,
      aiAgents,
      goldRates,
      toasts,
      dismissToast,
      showToast,
      issueGold,
      reconcileJob,
      updateJobStage,
      updateJobStatus,
      resolveDispute,
      createDisputeFromVariance,
      approveSettlement,
      disburseSettlementPayment,
      addGoldToVault,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </KaratFlowContext.Provider>
  );
};

export const useKaratFlow = () => {
  const context = useContext(KaratFlowContext);
  if (!context) {
    throw new Error('useKaratFlow must be used within a KaratFlowProvider');
  }
  return context;
};
