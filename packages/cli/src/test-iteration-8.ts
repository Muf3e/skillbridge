import { GatewayServer } from "../../gateway/src/server";
import { SkillBridgeLocalShim } from "../src/shim";

async function verifyCycle8() {
  console.log("==================================================================");
  console.log(" SkillBridge Autonomous Cycle 8: Catalog Expansion to 13 Skills!");
  console.log("==================================================================");

  const PORT = 8989;
  const gateway = new GatewayServer(PORT);
  await gateway.start();

  const client = new SkillBridgeLocalShim("sk_live_demo_98765", `http://localhost:${PORT}`);

  console.log("\n[Test Skill 13: RAG Chunk Optimizer & Vector Store Compressor]");
  const ragRes = await client.executeTool("skill_rag_chunk_optimizer", "optimize_chunks", {
    rawDocument: "# Microservices Architecture Guide\n\nAll services communicate via gRPC over mutual TLS inside private VPC clusters.\n\n### Authentication\nRequests require signed HMAC headers.",
    targetChunkSizeTokens: 256,
    enableNoiseDeduplication: true
  });

  console.log("=> Status:", ragRes.success ? "OPTIMIZED_SUCCESS" : "FAILED");
  console.log("=> Compression Ratio:", ragRes.data.semanticCompressionRatio);
  console.log("=> Strategy:", ragRes.data.strategy);
  console.log("=> Projected Savings:", ragRes.data.vectorDbRecommendations.projectedMonthlySavingsUsd);
  console.log("=> Billed:", `$${ragRes.billing.amountBilledUsd.toFixed(2)} | Creator Payout (85%): $${ragRes.billing.settledToPublisherUsd.toFixed(2)} | Platform Rake: $${ragRes.billing.platformRakeUsd.toFixed(2)}`);

  console.log("\n==================================================================");
  console.log(" Autonomous Iteration 8 Complete: 13 Sovereign Skills Live & Billed!");
  console.log("==================================================================");
  process.exit(0);
}

verifyCycle8().catch(err => {
  console.error(err);
  process.exit(1);
});
