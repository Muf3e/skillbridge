import http from "http";
import { GatewayServer } from "../../gateway/src/server";

function httpRequest(urlStr: string, options: http.RequestOptions, bodyData?: any): Promise<{ statusCode: number; data: any }> {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const postPayload = bodyData ? (typeof bodyData === "string" ? bodyData : JSON.stringify(bodyData)) : undefined;

    const headers: Record<string, string | number> = {
      ...(options.headers as any || {})
    };
    if (postPayload) {
      headers["Content-Type"] = "application/json";
      headers["Content-Length"] = Buffer.byteLength(postPayload);
    }

    const req = http.request(
      url,
      {
        method: options.method || "GET",
        headers
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          let parsed: any;
          try {
            parsed = JSON.parse(body);
          } catch {
            parsed = body;
          }
          resolve({ statusCode: res.statusCode || 0, data: parsed });
        });
      }
    );

    req.on("error", reject);
    if (postPayload) {
      req.write(postPayload);
    }
    req.end();
  });
}

async function runSupportAgentVerification() {
  console.log("=================================================");
  console.log(" SkillBridge Support Agent: Comprehensive Verification");
  console.log("=================================================");

  const PORT = 8998;
  const gateway = new GatewayServer(PORT);
  await gateway.start();
  const BASE_URL = `http://localhost:${PORT}`;

  // Test 1: Health check includes Support Agent status
  console.log("\n[Test 1] Checking Gateway Health & Support Agent Status...");
  const healthRes = await httpRequest(`${BASE_URL}/health`, { method: "GET" });
  console.log("Status Code:", healthRes.statusCode);
  console.log("Health Payload:", healthRes.data);
  if (healthRes.data.supportAgent !== "online") {
    throw new Error(`Expected supportAgent to be 'online', got: ${healthRes.data.supportAgent}`);
  }
  console.log("✅ Test 1 Passed: Support Agent is online.");

  // Test 2: List pre-seeded support cases
  console.log("\n[Test 2] Listing pre-seeded support cases from Gateway...");
  const listRes = await httpRequest(`${BASE_URL}/api/v1/support/cases`, { method: "GET" });
  console.log("Total Cases Count:", listRes.data.total);
  if (!Array.isArray(listRes.data.cases) || listRes.data.cases.length < 3) {
    throw new Error(`Expected at least 3 pre-seeded cases, found: ${listRes.data.cases?.length}`);
  }
  console.log("First Seeded Case:", listRes.data.cases[0].id, "-", listRes.data.cases[0].title);
  console.log("✅ Test 2 Passed: Seeded cases catalog retrieved successfully.");

  // Test 3: Register Skill Execution Error & Autonomous Triage
  console.log("\n[Test 3] Registering Skill Execution Case (Autonomous Bot Triage)...");
  const case1Payload = {
    title: "MicroVM Timeout in Chaos Load Simulator at 30k RPS",
    category: "skill_execution",
    severity: "high",
    skillId: "skill_chaos_load_tester",
    userEmail: "lead-dev@growthscale.com",
    description: "Simulated high concurrent load surge in microVM and received 504 timeout after 3500ms.",
    stepsToReproduce: "Invoke skill_chaos_load_tester with 30,000 peak RPS in microVM sandbox.",
    errorLogs: "504 Gateway Timeout: microVM execution exceeded SLA threshold (3000ms)"
  };

  const createRes1 = await httpRequest(`${BASE_URL}/api/v1/support/cases`, { method: "POST" }, case1Payload);
  console.log("Status Code:", createRes1.statusCode);
  console.log("Created Case ID:", createRes1.data.case?.id);
  console.log("Case Status:", createRes1.data.case?.status);
  console.log("Autonomous Diagnostics:", createRes1.data.case?.diagnostics?.detectedRootCause);
  console.log("Agent Resolution Summary:", createRes1.data.case?.resolution?.summary);
  console.log("Actionable Steps:", createRes1.data.case?.resolution?.actionableSteps);

  if (createRes1.statusCode !== 201) {
    throw new Error(`Expected HTTP 201, got ${createRes1.statusCode}`);
  }
  if (createRes1.data.case?.status !== "resolved") {
    throw new Error(`Expected case to be auto-resolved by AI bot, got: ${createRes1.data.case?.status}`);
  }
  if (!createRes1.data.case?.diagnostics || !createRes1.data.case?.resolution) {
    throw new Error("Diagnostics or resolution missing from created case");
  }
  if (!Array.isArray(createRes1.data.case?.messages) || createRes1.data.case.messages.length < 2) {
    throw new Error(`Expected at least 2 messages (user report + agent resolution), got: ${createRes1.data.case?.messages?.length}`);
  }
  console.log("Conversation Thread Messages:", createRes1.data.case.messages.length);
  console.log("Agent Initial Message:", createRes1.data.case.messages[1].message.slice(0, 80) + "...");
  console.log("✅ Test 3 Passed: Case created and autonomously triaged & resolved with message thread.");

  const createdCaseId = createRes1.data.case.id;

  // Test 4: Register CLI / MCP Integration Issue
  console.log("\n[Test 4] Registering CLI & IDE Integration Issue...");
  const case2Payload = {
    title: "Cursor IDE cannot connect to SkillBridge MCP server",
    category: "cli_mcp_setup",
    severity: "medium",
    description: "Configured Cursor settings with skillbridge binary, but tool palette shows red error indicator.",
    errorLogs: "spawn skillbridge ENOENT at Process.ChildProcess"
  };

  const createRes2 = await httpRequest(`${BASE_URL}/api/v1/support/cases`, { method: "POST" }, case2Payload);
  console.log("Status Code:", createRes2.statusCode);
  console.log("Case ID:", createRes2.data.case?.id);
  console.log("Agent Recommended CLI Commands:", createRes2.data.case?.resolution?.cliCommands);
  if (!createRes2.data.case?.resolution?.cliCommands?.some((c: string) => c.includes("npx"))) {
    throw new Error("Expected resolution to recommend npx command for Cursor setup");
  }
  console.log("✅ Test 4 Passed: CLI/Cursor issue resolved with exact npx setup guidance.");

  // Test 5: Fetch Case by ID
  console.log("\n[Test 5] Fetching single case by ID...");
  const getRes = await httpRequest(`${BASE_URL}/api/v1/support/cases/${createdCaseId}`, { method: "GET" });
  console.log("Status Code:", getRes.statusCode);
  console.log("Fetched Case Title:", getRes.data.case?.title);
  if (getRes.statusCode !== 200 || getRes.data.case?.id !== createdCaseId) {
    throw new Error("Failed to fetch exact case by ID");
  }
  console.log("✅ Test 5 Passed: Case fetched successfully.");

  // Test 6: Re-triage / Resolve Case on demand
  console.log("\n[Test 6] On-demand re-triage of case...");
  const resolveRes = await httpRequest(`${BASE_URL}/api/v1/support/cases/${createdCaseId}/resolve`, { method: "POST" });
  console.log("Status Code:", resolveRes.statusCode);
  console.log("Resolved Status:", resolveRes.data.case?.status);
  if (resolveRes.statusCode !== 200 || resolveRes.data.case?.status !== "resolved") {
    throw new Error("Failed to re-triage case on demand");
  }
  console.log("✅ Test 6 Passed: On-demand re-triage verified.");

  // Test 6b: Developer Follow-up Reply & AI Agent Response
  console.log("\n[Test 6b] Posting follow-up reply to registered case...");
  const replyRes1 = await httpRequest(`${BASE_URL}/api/v1/support/cases/${createdCaseId}/reply`, { method: "POST" }, {
    message: "Can you provide more details on the streaming buffer settings or recommended payload sizes?",
    senderName: "lead-dev@growthscale.com"
  });
  console.log("Status Code:", replyRes1.statusCode);
  console.log("Updated Messages Count:", replyRes1.data.case?.messages?.length);
  console.log("Agent Follow-up Reply:", replyRes1.data.agentReply?.message?.slice(0, 90) + "...");
  if (replyRes1.statusCode !== 200 || !replyRes1.data.case?.messages || replyRes1.data.case.messages.length < 4) {
    throw new Error(`Expected at least 4 messages after reply, got ${replyRes1.data.case?.messages?.length}`);
  }
  if (!replyRes1.data.agentReply || replyRes1.data.agentReply.sender !== "agent") {
    throw new Error("Expected agent response to follow-up reply");
  }
  console.log("✅ Test 6b Passed: Follow-up reply processed and AI agent responded.");

  // Test 6c: Retrieve messages thread for case
  console.log("\n[Test 6c] Fetching messages thread for case...");
  const messagesRes = await httpRequest(`${BASE_URL}/api/v1/support/cases/${createdCaseId}/messages`, { method: "GET" });
  console.log("Status Code:", messagesRes.statusCode);
  console.log("Thread Messages Retrieved:", messagesRes.data.messages?.length);
  if (messagesRes.statusCode !== 200 || !Array.isArray(messagesRes.data.messages) || messagesRes.data.messages.length !== replyRes1.data.case.messages.length) {
    throw new Error("Failed to retrieve complete message history");
  }
  console.log("✅ Test 6c Passed: Case message conversation thread fetched.");

  // Test 6d: Case Satisfaction Reply (Closure)
  console.log("\n[Test 6d] Posting satisfaction confirmation reply...");
  const replyRes2 = await httpRequest(`${BASE_URL}/api/v1/support/cases/${createdCaseId}/reply`, { method: "POST" }, {
    message: "Thank you, that resolved it! It works now!"
  });
  console.log("Status Code:", replyRes2.statusCode);
  console.log("Case Final Status:", replyRes2.data.case?.status);
  console.log("Agent Final Reply:", replyRes2.data.agentReply?.message?.slice(0, 80) + "...");
  if (replyRes2.statusCode !== 200 || replyRes2.data.case?.status !== "resolved") {
    throw new Error("Expected case to be resolved upon user satisfaction");
  }
  console.log("✅ Test 6d Passed: Case satisfaction and closure verified.");

  // Test 7: Direct AI Support Consultation (Q&A Endpoint) without case pollution
  console.log("\n[Test 7] Direct AI Support Bot Consultation (verifying zero case pollution)...");
  const preConsultList = await httpRequest(`${BASE_URL}/api/v1/support/cases`, { method: "GET" });
  const casesBeforeConsult = preConsultList.data.total;

  const consultRes = await httpRequest(`${BASE_URL}/api/v1/support/diagnose`, { method: "POST" }, {
    query: "Why am I getting 401 Unauthorized when executing tools from my node script?"
  });
  console.log("Status Code:", consultRes.statusCode);
  console.log("Consultation Diagnosis:", consultRes.data.diagnosis);
  console.log("Consultation Solution:", consultRes.data.solution);
  if (consultRes.statusCode !== 200 || !consultRes.data.solution.includes("Bearer")) {
    throw new Error("Expected consultation response to mention Bearer authentication token");
  }

  const postConsultList = await httpRequest(`${BASE_URL}/api/v1/support/cases`, { method: "GET" });
  const casesAfterConsult = postConsultList.data.total;
  console.log(`Cases before consultation: ${casesBeforeConsult}, Cases after: ${casesAfterConsult}`);
  if (casesAfterConsult !== casesBeforeConsult) {
    throw new Error(`Direct consultation improperly created a case! Expected ${casesBeforeConsult} cases, but found ${casesAfterConsult}`);
  }
  console.log("✅ Test 7 Passed: Direct AI Support Consultation working seamlessly without polluting cases.");

  // Test 8: Edge Cases
  console.log("\n[Test 8] Edge Cases Handling...");
  // 8a: Missing required title/description
  const invalidCaseRes = await httpRequest(`${BASE_URL}/api/v1/support/cases`, { method: "POST" }, { title: "" });
  console.log("Empty title HTTP status:", invalidCaseRes.statusCode);
  if (invalidCaseRes.statusCode !== 400) {
    throw new Error(`Expected 400 for empty case title, got ${invalidCaseRes.statusCode}`);
  }

  // 8b: Non-existent case lookup
  const notFoundRes = await httpRequest(`${BASE_URL}/api/v1/support/cases/CASE-999999`, { method: "GET" });
  console.log("Non-existent case HTTP status:", notFoundRes.statusCode);
  if (notFoundRes.statusCode !== 404) {
    throw new Error(`Expected 404 for missing case, got ${notFoundRes.statusCode}`);
  }

  // 8c: Category filter
  const filterRes = await httpRequest(`${BASE_URL}/api/v1/support/cases?category=cli_mcp_setup`, { method: "GET" });
  console.log("Filtered by cli_mcp_setup count:", filterRes.data.cases?.length);
  if (!filterRes.data.cases?.every((c: any) => c.category === "cli_mcp_setup")) {
    throw new Error("Category filter did not properly restrict cases");
  }

  console.log("✅ Test 8 Passed: All edge cases correctly handled.");

  // Test 9: Static /support and /support.html endpoints
  console.log("\n[Test 9] Verifying Static /support page delivery...");
  const staticSupportRes = await httpRequest(`${BASE_URL}/support`, { method: "GET" });
  console.log("/support HTTP Status:", staticSupportRes.statusCode);
  if (staticSupportRes.statusCode !== 200 || typeof staticSupportRes.data !== "string" || !staticSupportRes.data.includes("SkillBridge Support & Resolution Center")) {
    throw new Error("Static /support endpoint failed to deliver expected HTML page");
  }
  console.log("✅ Test 9 Passed: /support page delivered successfully.");

  console.log("\n=================================================");
  console.log(" ALL SUPPORT AGENT TESTS PASSED WITH 100% SUCCESS!");
  console.log("=================================================");
  process.exit(0);
}

runSupportAgentVerification().catch((err) => {
  console.error("Support Agent Verification failed:", err);
  process.exit(1);
});
