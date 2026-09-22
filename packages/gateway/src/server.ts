try { require("dotenv").config(); } catch (_) {}
import http from "http";
import path from "path";
import fs from "fs";
import { GatewayRegistry } from "./registry";
import { ALL_SEED_SKILLS } from "./seedSkills";
import { HardenedSandboxEngine } from "./sandboxEngine";
import { SkillBridgeSupportAgent } from "./supportAgent";
import { SkillBridgeExecutiveBrain } from "./executiveBrain";
import { PaymentAdapter } from "./paymentAdapter";
import { ExecutionRequest, ExecutionResult, CreateSupportCaseDTO, ReplySupportCaseDTO } from "@skillbridge/shared-types";

function parseJsonBody(req: any): Promise<any> {
  if (req.body && typeof req.body === "object") return Promise.resolve(req.body);
  if (typeof req.body === "string") {
    try { return Promise.resolve(JSON.parse(req.body)); } catch (e) { return Promise.reject(e); }
  }
  return new Promise((resolve, reject) => {
    let b = "";
    req.on("data", (c: any) => (b += c));
    req.on("end", () => {
      try {
        if (!b.trim()) return resolve({});
        resolve(JSON.parse(b));
      } catch (e) {
        reject(e);
      }
    });
  });
}

function getStaticHtml(filename: string): string | null {
  const candidates = [
    path.join(__dirname, "..", "public", filename),
    path.join(__dirname, "..", filename),
    path.join(process.cwd(), "public", filename),
    path.join(process.cwd(), filename),
    path.join(process.cwd(), "packages", "gateway", "public", filename),
    path.join(process.cwd(), "packages", "gateway", filename),
    path.join(process.cwd(), "apps", "web", "src", filename),
    path.join(process.cwd(), "apps", "web", filename)
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      try {
        return fs.readFileSync(p, "utf8");
      } catch (_) {}
    }
  }
  return null;
}

export class GatewayServer {
  private registry: GatewayRegistry;
  private sandbox: HardenedSandboxEngine;
  public supportAgent: SkillBridgeSupportAgent;
  public executiveBrain: SkillBridgeExecutiveBrain;
  public paymentAdapter: PaymentAdapter;
  private port: number;

  constructor(port = 8787) {
    this.port = port;
    this.registry = new GatewayRegistry();
    this.sandbox = new HardenedSandboxEngine();
    this.supportAgent = new SkillBridgeSupportAgent(this.registry);
    this.executiveBrain = new SkillBridgeExecutiveBrain(this.registry);
    this.paymentAdapter = new PaymentAdapter();
    this.init();
  }

  private init() {
    for (const skill of ALL_SEED_SKILLS) {
      this.registry.registerSkill(skill);
    }
  }

  public async handle(req: any, res: any): Promise<void> {
    // CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
      if (res.writeHead) res.writeHead(204); else res.statusCode = 204;
      res.end();
      return;
    }

    const rawUrl = req.url || "/";
    const url = rawUrl.split("?")[0];
    const method = req.method || "GET";

    // 1. Static HTML Pages
    if (method === "GET") {
      if (url === "/" || url === "/index.html" || url === "") {
        const html = getStaticHtml("index.html");
        if (html) {
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          if (res.writeHead) res.writeHead(200); else res.statusCode = 200;
          res.end(html);
          return;
        }
      }

      if (url === "/compare-capafy.html" || url.startsWith("/compare")) {
        const html = getStaticHtml("compare-capafy.html");
        if (html) {
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          if (res.writeHead) res.writeHead(200); else res.statusCode = 200;
          res.end(html);
          return;
        }
      }

      if (url === "/docs.html" || url.startsWith("/docs")) {
        const html = getStaticHtml("docs.html");
        if (html) {
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          if (res.writeHead) res.writeHead(200); else res.statusCode = 200;
          res.end(html);
          return;
        }
      }

      if (url === "/support.html" || url.startsWith("/support")) {
        const html = getStaticHtml("support.html");
        if (html) {
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          if (res.writeHead) res.writeHead(200); else res.statusCode = 200;
          res.end(html);
          return;
        }
      }

      if (url === "/marketing.html" || url.startsWith("/marketing")) {
        const html = getStaticHtml("marketing.html");
        if (html) {
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          if (res.writeHead) res.writeHead(200); else res.statusCode = 200;
          res.end(html);
          return;
        }
      }

      if (url === "/executive.html" || url.startsWith("/executive") || url === "/war-room") {
        const html = getStaticHtml("executive.html");
        if (html) {
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          if (res.writeHead) res.writeHead(200); else res.statusCode = 200;
          res.end(html);
          return;
        }
      }
    }

    // 2. Health check
    if (method === "GET" && url === "/health") {
      res.setHeader("Content-Type", "application/json");
      if (res.writeHead) res.writeHead(200); else res.statusCode = 200;
      res.end(JSON.stringify({ 
        status: "healthy", 
        version: "0.2.0", 
        activeSkills: ALL_SEED_SKILLS.length,
        supportAgent: "online",
        executiveBrain: "online",
        totalExecutiveCycles: this.executiveBrain.getState().totalCyclesRun,
        openCases: this.supportAgent.listCases({ status: "open" }).length
      }));
      return;
    }

    // 3. List catalog skills
    if (method === "GET" && (url === "/api/v1/skills" || url === "/skills")) {
      res.setHeader("Content-Type", "application/json");
      if (res.writeHead) res.writeHead(200); else res.statusCode = 200;
      res.end(JSON.stringify({ skills: this.registry.listSkills() }));
      return;
    }

    // 4. Single skill lookup
    if (method === "GET" && url.startsWith("/api/v1/skills/")) {
      const skillId = url.replace("/api/v1/skills/", "");
      const skill = this.registry.getSkill(skillId);
      res.setHeader("Content-Type", "application/json");
      if (!skill) {
        if (res.writeHead) res.writeHead(404); else res.statusCode = 404;
        res.end(JSON.stringify({ error: "Skill not found" }));
        return;
      }
      if (res.writeHead) res.writeHead(200); else res.statusCode = 200;
      res.end(JSON.stringify({ skill }));
      return;
    }

    // 5. Support Center: List Cases
    if (method === "GET" && (url === "/api/v1/support/cases" || url === "/api/v1/support/cases/")) {
      const queryString = rawUrl.includes("?") ? rawUrl.split("?")[1] : "";
      const params = new URLSearchParams(queryString);
      const category = params.get("category") || undefined;
      const status = params.get("status") || undefined;
      const search = params.get("search") || undefined;

      const cases = this.supportAgent.listCases({ category, status, search });
      res.setHeader("Content-Type", "application/json");
      if (res.writeHead) res.writeHead(200); else res.statusCode = 200;
      res.end(JSON.stringify({ cases, total: cases.length }));
      return;
    }

    // 6. Support Center: Case Messages & Replies
    if (method === "GET" && url.startsWith("/api/v1/support/cases/") && url.endsWith("/messages")) {
      const caseId = url.replace("/api/v1/support/cases/", "").replace("/messages", "").split("/")[0];
      const foundCase = this.supportAgent.getCase(caseId);
      res.setHeader("Content-Type", "application/json");
      if (!foundCase) {
        if (res.writeHead) res.writeHead(404); else res.statusCode = 404;
        res.end(JSON.stringify({ error: `Support case '${caseId}' not found.` }));
        return;
      }
      if (res.writeHead) res.writeHead(200); else res.statusCode = 200;
      res.end(JSON.stringify({ messages: foundCase.messages || [] }));
      return;
    }

    if (method === "POST" && url.startsWith("/api/v1/support/cases/") && (url.endsWith("/reply") || url.endsWith("/messages"))) {
      const caseId = url.replace("/api/v1/support/cases/", "").replace("/reply", "").replace("/messages", "").split("/")[0];
      try {
        const body: ReplySupportCaseDTO = await parseJsonBody(req);
        if (!body || !body.message || !body.message.trim()) {
          res.setHeader("Content-Type", "application/json");
          if (res.writeHead) res.writeHead(400); else res.statusCode = 400;
          res.end(JSON.stringify({ error: "Missing required 'message' in reply request body." }));
          return;
        }

        const replyResult = await this.supportAgent.replyToCase(caseId, body);
        res.setHeader("Content-Type", "application/json");
        if (res.writeHead) res.writeHead(200); else res.statusCode = 200;
        res.end(JSON.stringify({ 
          success: true, 
          message: "Reply processed and AI agent diagnostic response appended.",
          case: replyResult.case,
          agentReply: replyResult.replyMessage 
        }));
      } catch (err: any) {
        res.setHeader("Content-Type", "application/json");
        const status = err.message?.includes("not found") ? 404 : 500;
        if (res.writeHead) res.writeHead(status); else res.statusCode = status;
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    // 6b. Support Center: Get Case by ID
    if (method === "GET" && url.startsWith("/api/v1/support/cases/")) {
      const caseId = url.replace("/api/v1/support/cases/", "").split("/")[0];
      const foundCase = this.supportAgent.getCase(caseId);
      res.setHeader("Content-Type", "application/json");
      if (!foundCase) {
        if (res.writeHead) res.writeHead(404); else res.statusCode = 404;
        res.end(JSON.stringify({ error: `Support case '${caseId}' not found.` }));
        return;
      }
      if (res.writeHead) res.writeHead(200); else res.statusCode = 200;
      res.end(JSON.stringify({ case: foundCase }));
      return;
    }

    // 7. Support Center: Register / Create New Case (Autonomous Agent Triaged)
    if (method === "POST" && (url === "/api/v1/support/cases" || url === "/api/v1/support/cases/")) {
      try {
        const body: CreateSupportCaseDTO = await parseJsonBody(req);
        if (!body || !body.title || !body.description) {
          res.setHeader("Content-Type", "application/json");
          if (res.writeHead) res.writeHead(400); else res.statusCode = 400;
          res.end(JSON.stringify({ error: "Missing required fields: 'title' and 'description' are mandatory to register a support case." }));
          return;
        }

        const createdCase = await this.supportAgent.createCase(body);
        res.setHeader("Content-Type", "application/json");
        if (res.writeHead) res.writeHead(201); else res.statusCode = 201;
        res.end(JSON.stringify({ 
          success: true, 
          message: `Case ${createdCase.id} registered and triaged by SkillBridge Autonomous Support Agent.`,
          case: createdCase 
        }));
      } catch (err: any) {
        res.setHeader("Content-Type", "application/json");
        if (res.writeHead) res.writeHead(500); else res.statusCode = 500;
        res.end(JSON.stringify({ error: "Failed to process support case", details: err.message }));
      }
      return;
    }

    // 8. Support Center: On-Demand Re-Triage / Resolve Case
    if (method === "POST" && url.startsWith("/api/v1/support/cases/") && url.endsWith("/resolve")) {
      const caseId = url.replace("/api/v1/support/cases/", "").replace("/resolve", "").split("/")[0];
      try {
        const resolved = await this.supportAgent.triageAndResolveCase(caseId);
        res.setHeader("Content-Type", "application/json");
        if (res.writeHead) res.writeHead(200); else res.statusCode = 200;
        res.end(JSON.stringify({ success: true, case: resolved }));
      } catch (err: any) {
        res.setHeader("Content-Type", "application/json");
        if (res.writeHead) res.writeHead(404); else res.statusCode = 404;
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    // 9. Support Center: Direct Agent Diagnostic Consultation
    if (method === "POST" && url === "/api/v1/support/diagnose") {
      try {
        const body = await parseJsonBody(req);
        if (!body || !body.query) {
          res.setHeader("Content-Type", "application/json");
          if (res.writeHead) res.writeHead(400); else res.statusCode = 400;
          res.end(JSON.stringify({ error: "Missing 'query' string in request body." }));
          return;
        }
        const answer = await this.supportAgent.askAgent(body.query, body.context);
        res.setHeader("Content-Type", "application/json");
        if (res.writeHead) res.writeHead(200); else res.statusCode = 200;
        res.end(JSON.stringify({ success: true, ...answer }));
      } catch (err: any) {
        res.setHeader("Content-Type", "application/json");
        if (res.writeHead) res.writeHead(500); else res.statusCode = 500;
        res.end(JSON.stringify({ error: "Agent consultation error", details: err.message }));
      }
      return;
    }

    // 9b. Executive Brain: Retrieve Full Autonomous Company State
    if (method === "GET" && (url === "/api/v1/executive/state" || url === "/api/v1/executive/state/")) {
      res.setHeader("Content-Type", "application/json");
      if (res.writeHead) res.writeHead(200); else res.statusCode = 200;
      res.end(JSON.stringify({ success: true, state: this.executiveBrain.getState() }));
      return;
    }

    // 9c. Executive Brain: Trigger Autonomous Multi-Agent Strategic Cycle
    if (method === "POST" && (url === "/api/v1/executive/cycle" || url === "/api/v1/executive/cycle/")) {
      try {
        const body = await parseJsonBody(req);
        const result = await this.executiveBrain.runExecutiveCycle(body.directive);
        res.setHeader("Content-Type", "application/json");
        if (res.writeHead) res.writeHead(200); else res.statusCode = 200;
        res.end(JSON.stringify({ success: true, cycle: result, state: this.executiveBrain.getState() }));
      } catch (err: any) {
        res.setHeader("Content-Type", "application/json");
        if (res.writeHead) res.writeHead(500); else res.statusCode = 500;
        res.end(JSON.stringify({ error: "Failed to execute executive cycle", details: err.message }));
      }
      return;
    }

    // 9d. Executive Brain: Dispatch High-Level Strategic Directive to Agents
    if (method === "POST" && (url === "/api/v1/executive/dispatch" || url === "/api/v1/executive/dispatch/")) {
      try {
        const body = await parseJsonBody(req);
        if (!body || !body.directive || !body.directive.trim()) {
          res.setHeader("Content-Type", "application/json");
          if (res.writeHead) res.writeHead(400); else res.statusCode = 400;
          res.end(JSON.stringify({ error: "Missing required 'directive' string in request body." }));
          return;
        }
        const outcome = await this.executiveBrain.dispatchDirective(body.directive.trim());
        res.setHeader("Content-Type", "application/json");
        if (res.writeHead) res.writeHead(200); else res.statusCode = 200;
        res.end(JSON.stringify({ 
          success: true, 
          message: "Directive decomposed and delegated across executive agent hierarchy.", 
          outcome,
          state: this.executiveBrain.getState() 
        }));
      } catch (err: any) {
        res.setHeader("Content-Type", "application/json");
        if (res.writeHead) res.writeHead(500); else res.statusCode = 500;
        res.end(JSON.stringify({ error: "Directive dispatch failed", details: err.message }));
      }
      return;
    }

    // 9e. Billing: Gateway Payment Status
    if (method === "GET" && (url === "/api/v1/billing/status" || url === "/api/v1/billing/status/")) {
      res.setHeader("Content-Type", "application/json");
      if (res.writeHead) res.writeHead(200); else res.statusCode = 200;
      res.end(JSON.stringify({ success: true, ...this.paymentAdapter.getStatus() }));
      return;
    }

    // 9f. Billing: Create Top-Up / Skill Escrow Checkout Session
    if (method === "POST" && (url === "/api/v1/billing/checkout" || url === "/api/v1/billing/checkout/")) {
      try {
        const body = await parseJsonBody(req);
        const result = await this.paymentAdapter.createTopUpOrder({
          amountUsd: Number(body.amountUsd) || 50,
          currency: body.currency || "usd",
          gateway: "stripe",
          buyerId: body.buyerId || "usr_demo_123",
          successUrl: body.successUrl,
          cancelUrl: body.cancelUrl
        });

        res.setHeader("Content-Type", "application/json");
        if (result.success) {
          if (res.writeHead) res.writeHead(200); else res.statusCode = 200;
        } else {
          if (res.writeHead) res.writeHead(400); else res.statusCode = 400;
        }
        res.end(JSON.stringify(result));
      } catch (err: any) {
        res.setHeader("Content-Type", "application/json");
        if (res.writeHead) res.writeHead(500); else res.statusCode = 500;
        res.end(JSON.stringify({ error: "Checkout session creation failed", details: err.message }));
      }
      return;
    }

    // 10. Remote Execution Sandbox
    if (method === "POST" && url === "/api/v1/execute") {
      try {
        const payload: ExecutionRequest = await parseJsonBody(req);
        const apiKey = ((req.headers && req.headers["authorization"]) || "").replace("Bearer ", "").trim();

        const authCheck = this.registry.preauthorizeRun(apiKey, payload.skillId, payload.requestId);
        if (!authCheck.allowed) {
          res.setHeader("Content-Type", "application/json");
          if (res.writeHead) res.writeHead(402); else res.statusCode = 402;
          res.end(JSON.stringify({ error: authCheck.reason }));
          return;
        }

        const startTime = Date.now();
        const executionOutput = await this.sandbox.execute(payload);
        const durationMs = Date.now() - startTime;
        const billing = this.registry.settleExecution(payload.requestId, executionOutput.success, payload.skillId);

        const responsePayload: ExecutionResult = {
          requestId: payload.requestId,
          success: executionOutput.success,
          data: executionOutput.data,
          error: executionOutput.error,
          metrics: {
            durationMs,
            tokensUsed: executionOutput.metrics?.tokensUsed || 0
          },
          billing: {
            amountBilledUsd: billing.amountBilledUsd,
            escrowReleased: executionOutput.success,
            settledToPublisherUsd: billing.settledToPublisherUsd,
            platformRakeUsd: billing.platformRakeUsd
          }
        };

        res.setHeader("Content-Type", "application/json");
        if (res.writeHead) res.writeHead(200); else res.statusCode = 200;
        res.end(JSON.stringify(responsePayload));
      } catch (err: any) {
        res.setHeader("Content-Type", "application/json");
        if (res.writeHead) res.writeHead(500); else res.statusCode = 500;
        res.end(JSON.stringify({ error: "Internal Gateway Error", details: err.message }));
      }
      return;
    }

    res.setHeader("Content-Type", "application/json");
    if (res.writeHead) res.writeHead(404); else res.statusCode = 404;
    res.end(JSON.stringify({ error: "Not Found" }));
  }

  public start(): Promise<void> {
    return new Promise((resolve) => {
      const server = http.createServer((req, res) => this.handle(req, res));
      server.listen(this.port, () => {
        console.log(`[SkillBridge Gateway v0.2.0] Live on port ${this.port}`);
        resolve();
      });
    });
  }
}

const defaultGateway = new GatewayServer(Number(process.env.PORT) || 8787);

export default async function handler(req: any, res: any) {
  return defaultGateway.handle(req, res);
}

if (require.main === module) {
  defaultGateway.start();
}

