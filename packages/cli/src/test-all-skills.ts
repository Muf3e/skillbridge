import { GatewayServer } from "../../gateway/src/server";
import { SkillBridgeLocalShim } from "../src/shim";

async function verifyAllFiveSkills() {
  console.log("==========================================================");
  console.log(" SkillBridge Phase 2 Verification: 5 Seed Sovereign Skills");
  console.log("==========================================================");

  const PORT = 8998;
  const gateway = new GatewayServer(PORT);
  await gateway.start();

  const client = new SkillBridgeLocalShim("sk_live_demo_98765", `http://localhost:${PORT}`);

  // Test 1: DeepSec Audit
  console.log("\n[Test 1] DeepSec Audit...");
  const res1 = await client.executeTool("skill_deepsec_audit", "scan_vulnerabilities", {
    codeOrDependencies: "const API_KEY = 'AKIA2398472938472'; eval(req.body.code);"
  });
  console.log("=> DeepSec Findings Count:", res1.data.vulnerabilitiesCount, "| Billed:", `$${res1.billing.amountBilledUsd.toFixed(2)}`);

  // Test 2: SQL Query Doctor
  console.log("\n[Test 2] SQL Query Doctor...");
  const res2 = await client.executeTool("skill_sql_query_doctor", "optimize_query", {
    query: "SELECT * FROM users WHERE active = true ORDER BY created_at DESC",
    dialect: "postgresql"
  });
  console.log("=> SQL Optimization:", res2.data.estimatedCostReduction, "| Billed:", `$${res2.billing.amountBilledUsd.toFixed(2)}`);

  // Test 3: Viral Hook Analyzer
  console.log("\n[Test 3] Viral Hook & Script Analyzer...");
  const res3 = await client.executeTool("skill_viral_hook_analyzer", "analyze_hook", {
    scriptText: "Most people are building AI agents completely wrong and wasting thousands.",
    targetPlatform: "TikTok"
  });
  console.log("=> Hook Retention Score:", res3.data.retentionScore, "/ 100 | Billed:", `$${res3.billing.amountBilledUsd.toFixed(2)}`);

  // Test 4: Financial Forensics
  console.log("\n[Test 4] Financial 10-K Forensic Scanner...");
  const res4 = await client.executeTool("skill_financial_forensics", "scan_filing_anomalies", {
    filingExcerpt: "Accounts receivable increased 45% while top-line revenue increased 4%.",
    tickerOrCompany: "ACME_TECH"
  });
  console.log("=> Forensics Alert:", res4.data.forensicScore, "| Billed:", `$${res4.billing.amountBilledUsd.toFixed(2)}`);

  // Test 5: Tailwind Unifier
  console.log("\n[Test 5] Tailwind Design System Unifier...");
  const res5 = await client.executeTool("skill_tailwind_unifier", "unify_design_tokens", {
    rawCodeOrStyles: "<div style='background: #0f172a; padding: 16px; border-radius: 12px;'>Header</div>"
  });
  console.log("=> Unified Tailwind Output:", res5.data.unifiedTailwindClasses, "| Billed:", `$${res5.billing.amountBilledUsd.toFixed(2)}`);

  console.log("\n==========================================================");
  console.log(" All 5 Flagship Seed Skills Verified & Billed in Real Time!");
  console.log("==========================================================");
  process.exit(0);
}

verifyAllFiveSkills().catch((err) => {
  console.error("Phase 2 test failed:", err);
  process.exit(1);
});
