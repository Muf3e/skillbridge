import http from "http";
import { GatewayRegistry } from "./registry";
import { ALL_SEED_SKILLS } from "./seedSkills";
import { HardenedSandboxEngine } from "./sandboxEngine";
import { ExecutionRequest, ExecutionResult } from "@skillbridge/shared-types";

export class GatewayServer {
  private registry: GatewayRegistry;
  private sandbox: HardenedSandboxEngine;
  private port: number;

  constructor(port = 8787) {
    this.port = port;
    this.registry = new GatewayRegistry();
    this.sandbox = new HardenedSandboxEngine();
    this.init();
  }

  private init() {
    for (const skill of ALL_SEED_SKILLS) {
      this.registry.registerSkill(skill);
    }
  }

  public start(): Promise<void> {
    return new Promise((resolve) => {
      const server = http.createServer(async (req, res) => {
        // Enable CORS
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

        if (req.method === "OPTIONS") {
          res.writeHead(204);
          res.end();
          return;
        }

        res.setHeader("Content-Type", "application/json");

        const url = req.url || "";
        const method = req.method || "GET";

        if (method === "GET" && url === "/health") {
          res.writeHead(200);
          res.end(JSON.stringify({ status: "healthy", version: "0.2.0", activeSkills: ALL_SEED_SKILLS.length }));
          return;
        }

        // List catalog of marketplace skills
        if (method === "GET" && url === "/api/v1/skills") {
          res.writeHead(200);
          res.end(JSON.stringify({ skills: this.registry.listSkills() }));
          return;
        }

        // Get single skill details
        if (method === "GET" && url.startsWith("/api/v1/skills/")) {
          const skillId = url.replace("/api/v1/skills/", "");
          const skill = this.registry.getSkill(skillId);
          if (!skill) {
            res.writeHead(404);
            res.end(JSON.stringify({ error: "Skill not found" }));
            return;
          }
          res.writeHead(200);
          res.end(JSON.stringify({ skill }));
          return;
        }

        // Remote Execution Endpoint (Called by Local MCP Client)
        if (method === "POST" && url === "/api/v1/execute") {
          let body = "";
          req.on("data", (chunk) => (body += chunk));
          req.on("end", async () => {
            try {
              const apiKey = (req.headers["authorization"] || "").replace("Bearer ", "").trim();
              const payload: ExecutionRequest = JSON.parse(body);

              // 1. Escrow Pre-Authorization
              const authCheck = this.registry.preauthorizeRun(apiKey, payload.skillId, payload.requestId);
              if (!authCheck.allowed) {
                res.writeHead(402); // Payment Required
                res.end(JSON.stringify({ error: authCheck.reason }));
                return;
              }

              const startTime = Date.now();

              // 2. Dispatch to Hardened Sandbox (Zero-Leak Execution)
              const executionOutput = await this.sandbox.execute(payload);

              // 3. Settle or Refund depending on outcome contract
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

              res.writeHead(200);
              res.end(JSON.stringify(responsePayload));
            } catch (err: any) {
              res.writeHead(500);
              res.end(JSON.stringify({ error: "Internal Gateway Error", details: err.message }));
            }
          });
          return;
        }

        res.writeHead(404);
        res.end(JSON.stringify({ error: "Not Found" }));
      });

      server.listen(this.port, () => {
        console.log(`[SkillBridge Gateway v0.2.0] Live with ${ALL_SEED_SKILLS.length} seed skills on port ${this.port}`);
        resolve();
      });
    });
  }
}

if (require.main === module) {
  new GatewayServer(8787).start();
}
