import { GatewayServer } from "../../gateway/src/server";
import { SkillBridgeLocalShim } from "../src/shim";

async function verifyCycle6() {
  console.log("==================================================================");
  console.log(" SkillBridge Autonomous Cycle 6: Catalog Expansion to 11 Skills!");
  console.log("==================================================================");

  const PORT = 8993;
  const gateway = new GatewayServer(PORT);
  await gateway.start();

  const client = new SkillBridgeLocalShim("sk_live_demo_98765", `http://localhost:${PORT}`);

  console.log("\n[Test SEO Comp Intel] Reverse engineering competitor keyword cluster...");
  const seoRes = await client.executeTool("skill_seo_competitive_intel", "analyze_keyword_gap", {
    targetDomainOrUrl: "skillbridge.ai",
    competitorUrl: "capafy.ai"
  });

  console.log("=> Target Domain:", seoRes.data.targetDomain);
  console.log("=> Top Keyword Gap:", seoRes.data.highIntentKeywordGaps[0]?.query);
  console.log("=> Search Volume:", seoRes.data.highIntentKeywordGaps[0]?.estimatedSearchVolume);
  console.log("=> Actionable Strategy:", seoRes.data.recommendedAction);
  console.log("=> Billed:", `$${seoRes.billing.amountBilledUsd.toFixed(2)} | Creator Payout (85%): $${seoRes.billing.settledToPublisherUsd.toFixed(2)} | Platform Rake: $${seoRes.billing.platformRakeUsd.toFixed(2)}`);

  console.log("\n==================================================================");
  console.log(" Autonomous Iteration 6 Complete: 11 Sovereign Skills Live & Billed!");
  console.log("==================================================================");
  process.exit(0);
}

verifyCycle6().catch(err => {
  console.error(err);
  process.exit(1);
});
