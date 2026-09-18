import { GatewayServer } from "../../gateway/src/server";
import http from "http";

function postJson(url: string, body: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const data = JSON.stringify(body);
    const req = http.request({
      hostname: parsed.hostname,
      port: parsed.port,
      path: parsed.pathname,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data)
      }
    }, (res) => {
      let b = "";
      res.on("data", c => b += c);
      res.on("end", () => {
        try { resolve(JSON.parse(b)); } catch (e) { resolve(b); }
      });
    });
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

function getJson(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = http.request({
      hostname: parsed.hostname,
      port: parsed.port,
      path: parsed.pathname + (parsed.search || ""),
      method: "GET",
      headers: { "Accept": "application/json" }
    }, (res) => {
      let b = "";
      res.on("data", c => b += c);
      res.on("end", () => {
        try { resolve(JSON.parse(b)); } catch (e) { resolve(b); }
      });
    });
    req.on("error", reject);
    req.end();
  });
}

async function runExecutiveTests() {
  console.log("===================================================================");
  console.log(" SkillBridge Autonomous Executive Brain & Multi-Agent Test Suite");
  console.log("===================================================================");

  const PORT = 8998;
  const gateway = new GatewayServer(PORT);
  await gateway.start();

  const baseUrl = `http://localhost:${PORT}`;

  // Test 1: Health check includes Executive Brain
  console.log("\n[Test 1] Verifying Gateway Health Check with Executive Brain...");
  const health = await getJson(`${baseUrl}/health`);
  console.log("Health Status:", health.status);
  console.log("Executive Brain Online:", health.executiveBrain === "online");
  console.log("Total Executive Cycles:", health.totalExecutiveCycles);
  if (health.executiveBrain !== "online") throw new Error("Executive Brain not online in health check");

  // Test 2: Get Full Corporate Executive State
  console.log("\n[Test 2] Querying /api/v1/executive/state...");
  const stateRes = await getJson(`${baseUrl}/api/v1/executive/state`);
  console.log("Company Name:", stateRes.state.companyName);
  console.log("Central Brain Version:", stateRes.state.centralBrainVersion);
  console.log("Active Agents Count:", stateRes.state.agents.length);
  console.log("Agents Roster:", stateRes.state.agents.map((a: any) => `${a.codename} (${a.title})`));
  console.log("Milestones Count:", stateRes.state.milestones.length);
  console.log("Phase 1 Target:", `$${stateRes.state.milestones[0].targetDailyGmvUsd.toLocaleString()}/day`);
  console.log("Phase 4 Target ($1B Unicorn):", `$${stateRes.state.milestones[3].targetDailyGmvUsd.toLocaleString()}/day`);
  console.log("Market Opportunities:", stateRes.state.marketOpportunities.length);
  console.log("Creator Leads:", stateRes.state.creatorPipeline.length);
  console.log("Syndicated Posts Queued:", stateRes.state.syndicationQueue.length);
  console.log("Message Bus Messages:", stateRes.state.messageBus.length);

  if (stateRes.state.agents.length < 5) throw new Error("Expected at least 5 executive agents");

  // Test 3: Trigger Autonomous Corporate Executive Cycle
  console.log("\n[Test 3] Triggering /api/v1/executive/cycle...");
  const cycleRes = await postJson(`${baseUrl}/api/v1/executive/cycle`, {
    directive: "Scale daily GMV to $33k/day and accelerate open-source creator onboarding."
  });
  console.log("Cycle Success:", cycleRes.success);
  console.log("Cycle Index:", cycleRes.cycle.cycleIndex);
  console.log("Cycle Summary:", cycleRes.cycle.summary);
  console.log("Decisions Synthesized:", cycleRes.cycle.decisions);
  console.log("Messages Dispatched across Agents:", cycleRes.cycle.dispatchedMessages.length);
  console.log("Updated Daily GMV:", `$${cycleRes.cycle.updatedMetrics.currentDailyGmvUsd.toLocaleString()}`);

  if (!cycleRes.success || cycleRes.cycle.dispatchedMessages.length < 3) {
    throw new Error("Executive cycle failed to dispatch inter-agent messages");
  }

  // Test 4: Dispatch Custom High-Level Directive
  console.log("\n[Test 4] Dispatching Custom Strategic Directive to Executive Brain...");
  const dispatchRes = await postJson(`${baseUrl}/api/v1/executive/dispatch`, {
    directive: "Launch campaign for Skill #20 Viral Meme Generator and target top 100 GitHub AI repos."
  });
  console.log("Dispatch Success:", dispatchRes.success);
  console.log("Outcome Cycle Index:", dispatchRes.outcome.cycleIndex);
  console.log("Decisions:", dispatchRes.outcome.decisions);
  console.log("Current Run-Rate:", `$${dispatchRes.outcome.updatedMetrics.currentDailyGmvUsd.toLocaleString()}/day`);

  if (!dispatchRes.success) throw new Error("Executive directive dispatch failed");

  console.log("\n===================================================================");
  console.log(" ALL EXECUTIVE BRAIN & MULTI-AGENT TESTS PASSED SUCCESSFULLY! (4/4)");
  console.log("===================================================================");
  process.exit(0);
}

runExecutiveTests().catch(err => {
  console.error("Executive Brain tests failed:", err);
  process.exit(1);
});
