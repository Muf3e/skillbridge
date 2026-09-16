import http from "http";
import path from "path";
import fs from "fs";
import { GatewayRegistry } from "./registry";
import { ALL_SEED_SKILLS } from "./seedSkills";
import { HardenedSandboxEngine } from "./sandboxEngine";
import { ExecutionRequest, ExecutionResult } from "@skillbridge/shared-types";

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
    }

    // 2. Health check
    if (method === "GET" && url === "/health") {
      res.setHeader("Content-Type", "application/json");
      if (res.writeHead) res.writeHead(200); else res.statusCode = 200;
      res.end(JSON.stringify({ status: "healthy", version: "0.2.0", activeSkills: ALL_SEED_SKILLS.length }));
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

    // 5. Remote Execution Sandbox
    if (method === "POST" && url === "/api/v1/execute") {
      const parseBody = (): Promise<ExecutionRequest> => {
        if (req.body && typeof req.body === "object") return Promise.resolve(req.body);
        if (typeof req.body === "string") return Promise.resolve(JSON.parse(req.body));
        return new Promise((resolve, reject) => {
          let b = "";
          req.on("data", (c: any) => (b += c));
          req.on("end", () => {
            try { resolve(JSON.parse(b)); } catch (e) { reject(e); }
          });
        });
      };

      try {
        const payload = await parseBody();
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

