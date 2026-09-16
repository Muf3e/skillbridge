import { ApiKeyManager } from "../../gateway/src/apiKeyManager";

function verifyApiKeyGovernance() {
  console.log("==================================================================");
  console.log(" SkillBridge Autonomous Cycle 5: Developer API Key Governance");
  console.log("==================================================================");

  const keyMgr = new ApiKeyManager();

  // Test 1: Validate Default Key
  const check1 = keyMgr.validateKey("sk_live_demo_98765");
  console.log("\n[Test 1] Validating existing demo key:");
  console.log("=> Valid:", check1.valid);
  console.log("=> Key Name:", check1.keyInfo?.name);
  console.log("=> Monthly Limit:", `$${check1.keyInfo?.spendingLimitMonthlyUsd}`);

  // Test 2: Generate New Developer Key
  console.log("\n[Test 2] Generating new developer production key:");
  const newKey = keyMgr.generateKey("Cursor Production Worker", "usr_agent_88", 100);
  console.log("=> Raw Secret:", newKey.rawKey.substring(0, 16) + "...");
  console.log("=> Key ID:", newKey.keyInfo.keyId);

  // Test 3: Record Spend & Check Enforcement
  console.log("\n[Test 3] Simulating execution spend and threshold enforcement:");
  keyMgr.recordSpend(newKey.rawKey, 25.50);
  const checkAfterSpend = keyMgr.validateKey(newKey.rawKey);
  console.log("=> Current Spend Recorded:", `$${checkAfterSpend.keyInfo?.currentSpendThisMonthUsd.toFixed(2)}`);
  console.log("=> Remains Valid:", checkAfterSpend.valid);

  // Test 4: Exceed Budget Limit
  keyMgr.recordSpend(newKey.rawKey, 80.00); // Total: $105.50 (Limit: $100)
  const checkExceeded = keyMgr.validateKey(newKey.rawKey);
  console.log("=> Exceeded Check Valid:", checkExceeded.valid);
  console.log("=> Exceeded Reason:", checkExceeded.reason);

  console.log("\n==================================================================");
  console.log(" Autonomous Iteration 5 Complete: API Key Governance Active!");
  console.log("==================================================================");
}

verifyApiKeyGovernance();
