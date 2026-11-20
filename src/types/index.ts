export type Purity = '24K' | '22K' | '18K';

export interface Karigar {
  id: string;
  name: string;
  workshop: string;
  phone: string;
  speciality: string;
  artisanId: string;
  activeJobs: number;
  completedJobs: number;
  pendingReturns: number;
  goldInCustody: number; // in grams
  reconciledGold: number; // in grams
  accuracyRate: number; // percentage
  rating: number;
  custodyLimit: number; // max allowed grams in custody
  avatar?: string;
  initials: string;
}

export type JobStatus = 
  | 'Issued' 
  | 'In Progress' 
  | 'Ready for Return' 
  | 'Completed' 
  | 'Disputed' 
  | 'Overdue';

export type ProductionStage = 
  | 'Custody Dispatched'
  | 'Melting & Ingot Cast'
  | 'Wire Drawing & Die Cut'
  | 'Hand Filigree Craft'
  | 'Gemstone & Jadau Setting'
  | 'Buffing & Polish'
  | 'Final Weight Audit & Hallmarking';

export interface Job {
  id: string;
  karigarId: string;
  karigarName: string;
  jewelleryType: string;
  goldIssued: number;
  purity: Purity;
  description: string;
  issueDate: string;
  expectedDeliveryDate: string;
  agreedWastagePercent: number; // e.g. 0.8%
  allowedLossGrams: number; // calculated e.g. 0.800g
  status: JobStatus;
  currentStage: ProductionStage;
  stageProgress: number; // 0 to 100
  qrHash: string;
  notes: string;
  labourRatePerGram: number; // in INR
  finishedWeight?: number;
  recoveredScrap?: number;
  approvedLoss?: number;
  unexplainedVariance?: number;
  reconciliationStatus?: 'Reconciled' | 'Requires Review' | 'Discrepancy';
  completedDate?: string;
}

export type TransactionType = 
  | 'Custody Issue' 
  | 'Scrap Return' 
  | 'Finished Jewellery Inward' 
  | 'Bullion Deposit' 
  | 'Wastage Adjustment' 
  | 'Custody Settlement';

export interface GoldTransaction {
  id: string;
  jobId?: string;
  karigarId?: string;
  karigarName?: string;
  type: TransactionType;
  goldWeight: number; // in grams
  purity: Purity;
  date: string;
  timestamp: string;
  status: 'Verified' | 'Custody Transfer' | 'In Transit' | 'Pending Review' | 'Flagged';
  notes: string;
  verifiedBy: string;
}

export interface ReconciliationData {
  jobId: string;
  goldIssued: number;
  finishedJewellery: number;
  recoveredScrap: number;
  approvedLoss: number;
  unexplainedVariance: number;
  status: 'Reconciled' | 'Requires Review' | 'Unexplained Discrepancy';
  formulaExplanation: string;
  aiExplanation?: string;
  recommendedSteps?: string[];
}

export interface Dispute {
  id: string;
  jobId: string;
  karigarId: string;
  karigarName: string;
  jewelleryType: string;
  goldIssued: number;
  discrepancyAmount: number; // grams
  dateRaised: string;
  status: 'Under Clarification' | 'Evidence Review' | 'Resolved' | 'Escalated';
  priority: 'High' | 'Medium' | 'Low';
  manufacturerObservation: string;
  karigarStatement: string;
  aiNeutralSummary: string;
  recommendedSteps: string[];
  evidenceList: Array<{
    id: string;
    name: string;
    type: string;
    timestamp: string;
    size: string;
    previewUrl?: string;
  }>;
}

export interface Settlement {
  id: string;
  jobId: string;
  karigarId: string;
  karigarName: string;
  jewelleryType: string;
  goldIssued: number;
  finishedWeight: number;
  recoveredScrap: number;
  approvedWastage: number;
  variance: number;
  labourCharges: number; // in INR
  wastageDeduction: number; // in INR (0 if within allowance)
  netPayable: number; // in INR
  manufacturerApproved: boolean;
  karigarConfirmed: boolean;
  paymentStatus: 'Pending Sign-off' | 'Ready for NEFT' | 'Disbursed';
  settlementDate: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  category: 'Custody' | 'Weight Verification' | 'AI Audit' | 'Dispute' | 'Settlement' | 'Inventory';
  jobId?: string;
  details: string;
  hash: string;
}

export interface AIAgentInfo {
  id: string;
  name: string;
  role: string;
  purpose: string;
  status: 'Active' | 'Analyzing' | 'Idle';
  lastActivity: string;
  tasksCompleted: number;
  iconName: string;
  confidenceScore: number;
}
