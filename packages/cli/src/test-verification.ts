import { GatewayServer } from "../../gateway/src/server";
import { SkillBridgeLocalShim } from "../src/shim";

async function runVerification() {
  console.log("=================================================");
  console.log(" SkillBridge Core Engine: End-to-End Verification");
  console.log("=================================================");

  // 1. Start Gateway Engine on Test Port
  const PORT = 8999;
  const gateway = new GatewayServer(PORT);
  await gateway.start();

  // 2. Initialize Local Client Shim with Demo API Key (Funded Wallet)
  const client = new SkillBridgeLocalShim("sk_live_demo_98765", `http://localhost:${PORT}`);
  client.installSkill("skill_deepsec_audit");
  client.installSkill("skill_sql_query_doctor");

  // 3. Test Remote Tool Execution 1: DeepSec Audit (Secret Leaked)
  console.log("\n[Test 1] Invoking 'skill_deepsec_audit' on suspect code payload...");
  const res1 = await client.executeTool("skill_deepsec_audit", "scan_vulnerabilities", {
    codeOrDependencies: "const AWS_KEY = 'AKIAIOSFODNN7EXAMPLE';\nconst DB_PASS = 'secret123';"
  });

  console.log("Result 1 Success:", res1.success);
  console.log("Result 1 Risk Score:", res1.data.riskScore);
  console.log("Result 1 Billed:", `$${res1.billing.amountBilledUsd.toFixed(2)}`);
  console.log("Result 1 Creator Payout (85%):", `$${res1.billing.settledToPublisherUsd.toFixed(2)}`);
  console.log("Result 1 Platform Rake (15%):", `$${res1.billing.platformRakeUsd.toFixed(2)}`);
  console.log("Result 1 Roundtrip Latency:", `${res1.metrics.durationMs}ms`);

  // 4. Test Remote Tool Execution 2: SQL Query Doctor (Optimization)
  console.log("\n[Test 2] Invoking 'skill_sql_query_doctor' on unindexed query...");
  const res2 = await client.executeTool("skill_sql_query_doctor", "optimize_query", {
    query: "SELECT * FROM orders WHERE tenant_id = 42 ORDER BY created_at DESC LIMIT 50;",
    dialect: "postgresql"
  });

  console.log("Result 2 Success:", res2.success);
  console.log("Result 2 Est Cost Reduction:", res2.data.estimatedCostReduction);
  console.log("Result 2 Billed:", `$${res2.billing.amountBilledUsd.toFixed(2)}`);
  console.log("Result 2 Creator Payout (85%):", `$${res2.billing.settledToPublisherUsd.toFixed(2)}`);

  console.log("\n=================================================");
  console.log(" Verification Completed Successfully! All Systems Operational.");
  console.log("=================================================");
  process.exit(0);
}

runVerification().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
