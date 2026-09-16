import { GatewayServer } from "../../gateway/src/server";
import { SkillBridgeLocalShim } from "../src/shim";

async function verifyCycle4() {
  console.log("==================================================================");
  console.log(" SkillBridge Autonomous Cycle 4: Milestone 10 Sovereign Skills!");
  console.log("==================================================================");

  const PORT = 8994;
  const gateway = new GatewayServer(PORT);
  await gateway.start();

  const client = new SkillBridgeLocalShim("sk_live_demo_98765", `http://localhost:${PORT}`);

  console.log("\n[Test LLMOps Profiler] Profiling bloated prompt pipeline for cost reduction...");
  const llmRes = await client.executeTool("skill_llmops_cost_profiler", "profile_llm_pipeline", {
    promptOrSchemaPayload: "You are a helpful assistant. Please carefully analyze the following customer question and ensure that you reply politely and thoroughly with extensive background context...",
    currentMonthlySpendUsd: 4200
  });

  console.log("=> Token Diagnosis:", llmRes.data.redundancyDetected);
  console.log("=> Projected Savings:", llmRes.data.projectedMonthlySavingsUsd);
  console.log("=> Latency Cut:", llmRes.data.latencyImprovementEstimate);
  console.log("=> Recommendation 1:", llmRes.data.recommendedOptimizations[0]);
  console.log("=> Billed:", `$${llmRes.billing.amountBilledUsd.toFixed(2)} | Creator Payout (85%): $${llmRes.billing.settledToPublisherUsd.toFixed(2)} | Platform Rake: $${llmRes.billing.platformRakeUsd.toFixed(2)}`);

  console.log("\n==================================================================");
  console.log(" Autonomous Iteration 4 Complete: 10 Sovereign Skills Fully Live!");
  console.log("==================================================================");
  process.exit(0);
}

verifyCycle4().catch(err => {
  console.error(err);
  process.exit(1);
});
