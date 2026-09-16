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
