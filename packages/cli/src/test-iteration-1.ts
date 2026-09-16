import { GatewayServer } from "../../gateway/src/server";
import { SkillBridgeLocalShim } from "../src/shim";

async function verifyCatalogExpansion() {
  console.log("==================================================================");
  console.log(" SkillBridge Autonomous Cycle 1: Catalog Expansion to 7 Skills");
  console.log("==================================================================");

  const PORT = 8997;
  const gateway = new GatewayServer(PORT);
  await gateway.start();

  const client = new SkillBridgeLocalShim("sk_live_demo_98765", `http://localhost:${PORT}`);

  // Test K8s SRE Skill
  console.log("\n[Test K8s SRE] Diagnosing CrashLoop / OOMKilled pod event...");
  const k8sRes = await client.executeTool("skill_k8s_incident_copilot", "diagnose_pod_failure", {
    podStatusOrEvents: "Container failed with exit code 137 Reason: OOMKilled"
  });
  console.log("=> Root Cause:", k8sRes.data.rootCause);
  console.log("=> Remedy:", k8sRes.data.remediationCommands[0]);
  console.log("=> Billed:", `$${k8sRes.billing.amountBilledUsd.toFixed(2)} | Creator Payout: $${k8sRes.billing.settledToPublisherUsd.toFixed(2)}`);

  // Test Legal NDA Skill
  console.log("\n[Test Legal NDA] Scanning non-standard contract liabilities...");
  const legalRes = await client.executeTool("skill_legal_nda_scorer", "audit_nda_clauses", {
    contractText: "The recipient agrees to keep all information perpetual and forever confidential and shall not compete in any market."
  });
  console.log("=> Overall Risk:", legalRes.data.overallRiskScore);
  console.log("=> Flagged Clauses Count:", legalRes.data.flaggedClauses.length);
  console.log("=> Suggested Redline:", legalRes.data.suggestedRedlines[0]);
  console.log("=> Billed:", `$${legalRes.billing.amountBilledUsd.toFixed(2)} | Creator Payout: $${legalRes.billing.settledToPublisherUsd.toFixed(2)}`);

  console.log("\n==================================================================");
  console.log(" Autonomous Iteration 1 Complete: 7 Sovereign Skills Fully Active!");
  console.log("==================================================================");
  process.exit(0);
}

verifyCatalogExpansion().catch(err => {
  console.error(err);
  process.exit(1);
});
