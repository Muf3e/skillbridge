import { SkillManifest, ExecutionRequest, ExecutionResult, UserAccount } from "@skillbridge/shared-types";

// In-Memory Storage for POC (Production backs into PostgreSQL + Redis)
export class GatewayRegistry {
  private skills: Map<string, SkillManifest> = new Map();
  private users: Map<string, UserAccount> = new Map();
  private requestEscrow: Map<string, { amount: number; buyerId: string }> = new Map();

  constructor() {
    this.seedUsers();
  }

  private seedUsers() {
    this.users.set("usr_demo_123", {
      id: "usr_demo_123",
      email: "engineer@company.com",
      apiKey: "sk_live_demo_98765",
      balanceUsd: 25.00, // Pre-funded wallet
      activeSubscriptions: []
    });
  }

  public registerSkill(manifest: SkillManifest) {
    this.skills.set(manifest.id, manifest);
    console.log(`[Gateway] Registered skill: ${manifest.name} (${manifest.id}) by ${manifest.authorName}`);
  }

  public getSkill(skillId: string): SkillManifest | undefined {
    return this.skills.get(skillId);
  }

  public listSkills(): SkillManifest[] {
    return Array.from(this.skills.values());
  }

  public getUser(apiKey: string): UserAccount | undefined {
    for (const u of this.users.values()) {
      if (u.apiKey === apiKey) return u;
    }
    return undefined;
  }

  // Escrow pre-authorization
  public preauthorizeRun(apiKey: string, skillId: string, requestId: string): { allowed: boolean; reason?: string } {
    const user = this.getUser(apiKey);
    if (!user) return { allowed: false, reason: "Invalid API Key" };

    const skill = this.skills.get(skillId);
    if (!skill) return { allowed: false, reason: "Skill not found" };

    if (skill.pricing.model === "free") return { allowed: true };

    const cost = skill.pricing.costPerRunUsd || 0;
    if (user.balanceUsd < cost) {
      return { allowed: false, reason: `Insufficient wallet balance ($${user.balanceUsd.toFixed(2)} available, need $${cost.toFixed(2)})` };
    }

    // Lock funds in escrow
    user.balanceUsd -= cost;
    this.requestEscrow.set(requestId, { amount: cost, buyerId: user.id });
    return { allowed: true };
  }

  // Settle or Refund depending on outcome contract
  public settleExecution(requestId: string, success: boolean, skillId: string): { amountBilledUsd: number; settledToPublisherUsd: number; platformRakeUsd: number } {
    const escrow = this.requestEscrow.get(requestId);
    if (!escrow) return { amountBilledUsd: 0, settledToPublisherUsd: 0, platformRakeUsd: 0 };

    this.requestEscrow.delete(requestId);

    if (!success) {
      // Auto-refund to user on execution failure (Outcome-guaranteed escrow)
      const user = this.users.get(escrow.buyerId);
      if (user) {
        user.balanceUsd += escrow.amount;
        console.log(`[Escrow] Execution failed for req ${requestId}. Auto-refunded $${escrow.amount.toFixed(2)} to ${user.id}`);
      }
      return { amountBilledUsd: 0, settledToPublisherUsd: 0, platformRakeUsd: 0 };
    }

    // Success settlement: 85% to Creator, 15% Platform Take-Rate
    const platformRake = escrow.amount * 0.15;
    const publisherPayout = escrow.amount * 0.85;

    console.log(`[Escrow] Execution success for req ${requestId}. Settle: $${publisherPayout.toFixed(2)} to Creator | $${platformRake.toFixed(2)} Platform Rake`);
    return {
      amountBilledUsd: escrow.amount,
      settledToPublisherUsd: publisherPayout,
      platformRakeUsd: platformRake
    };
  }
}
