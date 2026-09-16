import http from "http";
import crypto from "crypto";

export interface DeveloperApiKey {
  keyId: string;
  hashedSecret: string;
  name: string;
  userId: string;
  permissions: string[];
  createdAt: number;
  lastUsedAt?: number;
  spendingLimitMonthlyUsd: number;
  currentSpendThisMonthUsd: number;
}

export class ApiKeyManager {
  private keys: Map<string, DeveloperApiKey> = new Map();

  constructor() {
    this.seedDefaultKey();
  }

  private seedDefaultKey() {
    this.keys.set("sk_live_demo_98765", {
      keyId: "key_demo_01",
      hashedSecret: this.hashKey("sk_live_demo_98765"),
      name: "Default CLI & IDE Key",
      userId: "usr_demo_123",
      permissions: ["skills:read", "skills:execute", "wallet:deduct"],
      createdAt: Date.now(),
      spendingLimitMonthlyUsd: 500,
      currentSpendThisMonthUsd: 1.25
    });
  }

  private hashKey(key: string): string {
    return crypto.createHash("sha256").update(key).digest("hex");
  }

  public generateKey(name: string, userId: string, monthlyLimit = 250): { rawKey: string; keyInfo: DeveloperApiKey } {
    const rawKey = `sk_live_${crypto.randomBytes(24).toString("hex")}`;
    const keyInfo: DeveloperApiKey = {
      keyId: `key_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`,
      hashedSecret: this.hashKey(rawKey),
      name,
      userId,
      permissions: ["skills:read", "skills:execute", "wallet:deduct"],
      createdAt: Date.now(),
      spendingLimitMonthlyUsd: monthlyLimit,
      currentSpendThisMonthUsd: 0
    };

    this.keys.set(rawKey, keyInfo);
    console.log(`[API Key Manager] Generated new key: ${keyInfo.keyId} (${name}) with $${monthlyLimit} limit`);
    return { rawKey, keyInfo };
  }

  public validateKey(rawKey: string): { valid: boolean; keyInfo?: DeveloperApiKey; reason?: string } {
    const keyInfo = this.keys.get(rawKey);
    if (!keyInfo) {
      return { valid: false, reason: "Invalid or revoked API Key." };
    }

    if (keyInfo.currentSpendThisMonthUsd >= keyInfo.spendingLimitMonthlyUsd) {
      return { valid: false, reason: `Monthly spending limit reached ($${keyInfo.spendingLimitMonthlyUsd.toFixed(2)} limit).` };
    }

    keyInfo.lastUsedAt = Date.now();
    return { valid: true, keyInfo };
  }

  public recordSpend(rawKey: string, amountUsd: number) {
    const keyInfo = this.keys.get(rawKey);
    if (keyInfo) {
      keyInfo.currentSpendThisMonthUsd += amountUsd;
    }
  }

  public listKeysForUser(userId: string): Array<Omit<DeveloperApiKey, "hashedSecret">> {
    return Array.from(this.keys.values())
      .filter(k => k.userId === userId)
      .map(({ hashedSecret, ...rest }) => rest);
  }
}
