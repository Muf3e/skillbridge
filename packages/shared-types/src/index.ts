export interface SkillManifest {
  id: string;
  name: string;
  version: string;
  description: string;
  authorId: string;
  authorName: string;
  pricing: SkillPricing;
  tools: ToolDefinition[];
  capabilities: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SkillPricing {
  model: 'pay_per_run' | 'subscription' | 'free';
  costPerRunUsd?: number;
  monthlySubscriptionUsd?: number;
  sandboxSurchargeUsd?: number;
}

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, any>;
    required?: string[];
  };
}

export interface ExecutionRequest {
  requestId: string;
  skillId: string;
  toolName: string;
  arguments: Record<string, any>;
  buyerId: string;
  timestamp: number;
}

export interface ExecutionResult {
  requestId: string;
  success: boolean;
  data?: any;
  error?: {
    code: string;
    message: string;
    recoverable: boolean;
  };
  metrics: {
    durationMs: number;
    tokensUsed?: number;
  };
  billing: {
    amountBilledUsd: number;
    escrowReleased: boolean;
    settledToPublisherUsd: number;
    platformRakeUsd: number;
  };
}

export interface UserAccount {
  id: string;
  email: string;
  apiKey: string;
  balanceUsd: number;
  activeSubscriptions: string[];
}

export type SupportCaseCategory =
  | 'skill_execution'
  | 'gateway_api'
  | 'cli_mcp_setup'
  | 'wallet_billing'
  | 'ui_navigation'
  | 'general_feedback';

export type SupportCaseSeverity = 'low' | 'medium' | 'high' | 'critical';
export type SupportCaseStatus = 'open' | 'investigating' | 'resolved' | 'action_required';

export interface SupportCaseDiagnostics {
  timestamp: string;
  analyzedBy: string;
  confidenceScore: number;
  detectedRootCause: string;
  affectedComponent: string;
  escrowStatus?: string;
  remediationType: 'automatic_hotfix' | 'configuration_guidance' | 'escrow_refund' | 'documentation_pointer' | 'platform_fix';
}

export interface SupportCaseResolution {
  resolvedAt: string;
  summary: string;
  detailedFix: string;
  actionableSteps: string[];
  cliCommands?: string[];
  autoApplied: boolean;
  feedbackRating?: number;
}

export interface SupportCaseMessage {
  id: string;
  caseId: string;
  sender: 'user' | 'agent' | 'system';
  senderName: string;
  message: string;
  createdAt: string;
  suggestedAction?: string;
  cliCommands?: string[];
}

export interface SupportCase {
  id: string;
  title: string;
  category: SupportCaseCategory;
  severity: SupportCaseSeverity;
  status: SupportCaseStatus;
  description: string;
  stepsToReproduce?: string;
  errorLogs?: string;
  skillId?: string;
  userEmail?: string;
  createdAt: string;
  updatedAt: string;
  diagnostics?: SupportCaseDiagnostics;
  resolution?: SupportCaseResolution;
  messages?: SupportCaseMessage[];
}

export interface CreateSupportCaseDTO {
  title: string;
  category: SupportCaseCategory;
  severity?: SupportCaseSeverity;
  description: string;
  stepsToReproduce?: string;
  errorLogs?: string;
  skillId?: string;
  userEmail?: string;
}

export interface ReplySupportCaseDTO {
  message: string;
  senderName?: string;
  email?: string;
}

