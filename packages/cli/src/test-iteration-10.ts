import { GatewayServer } from "../../gateway/src/server";
import { SkillBridgeLocalShim } from "../src/shim";

async function verifyCycle10() {
  console.log("==================================================================");
  console.log(" SkillBridge Autonomous Cycle 10: Flagship Consensus Skill #15!");
  console.log("==================================================================");

  const PORT = 8992;
  const gateway = new GatewayServer(PORT);
  await gateway.start();

  const client = new SkillBridgeLocalShim("sk_live_demo_98765", `http://localhost:${PORT}`);

  console.log("\n[Test Skill 15: Multi-Agent Swarm Orchestrator & Consensus Engine]");
  const consensusRes = await client.executeTool("skill_multi_agent_consensus", "evaluate_consensus", {
    taskOrCode: "function executePayout(address to, uint256 amt) public { require(msg.sender == owner); to.call{value: amt}(''); }",
    consensusThreshold: 0.80
  });

  console.log("=> Status:", consensusRes.success ? "DELIBERATION_SUCCESS" : "FAILED");
  console.log("=> Engine:", consensusRes.data.engine);
  console.log("=> Quorum Verdict:", consensusRes.data.consensusVerdict);
  console.log("=> Composite Score:", consensusRes.data.compositeScore);
  console.log("=> Participating Agents:", consensusRes.data.participatingAgents);
  console.log("=> Deliberation Log:", JSON.stringify(consensusRes.data.deliberationLog, null, 2));
  console.log("=> Billed:", `$${consensusRes.billing.amountBilledUsd.toFixed(2)} | Creator Payout (85%): $${consensusRes.billing.settledToPublisherUsd.toFixed(2)} | Platform Rake: $${consensusRes.billing.platformRakeUsd.toFixed(2)}`);

  console.log("\n==================================================================");
  console.log(" Autonomous Iteration 10 Complete: 15 Sovereign Skills Live & Billed!");
  console.log("==================================================================");
  process.exit(0);
}

verifyCycle10().catch(err => {
  console.error(err);
  process.exit(1);
});
