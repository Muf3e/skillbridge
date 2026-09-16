import http from "http";
import { ToolDefinition, ExecutionRequest, ExecutionResult } from "@skillbridge/shared-types";

/**
 * SkillBridge Local MCP Client Shim
 * This component runs locally on the buyer's computer as a standard Model Context Protocol (MCP) server.
 * It presents remote paid skills as native local tools to Claude Code, Cursor, Windsurf, or Codex,
 * and proxies invocations through the authenticated gateway.
 */
export class SkillBridgeLocalShim {
  private gatewayUrl: string;
  private apiKey: string;
  private installedSkills: Set<string> = new Set();

  constructor(apiKey: string, gatewayUrl = "http://localhost:8787") {
    this.apiKey = apiKey;
    this.gatewayUrl = gatewayUrl;
  }

  public installSkill(skillId: string) {
    this.installedSkills.add(skillId);
    console.log(`[Shim] Skill installed locally: ${skillId}`);
  }

  // Simulates an MCP tool execution triggered by the LLM
  public async executeTool(skillId: string, toolName: string, args: Record<string, any>): Promise<ExecutionResult> {
    const requestPayload: ExecutionRequest = {
      requestId: `req_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      skillId,
      toolName,
      arguments: args,
      buyerId: "client_local",
      timestamp: Date.now()
    };

    return new Promise((resolve, reject) => {
      const url = new URL(`${this.gatewayUrl}/api/v1/execute`);
      const postData = JSON.stringify(requestPayload);

      const req = http.request(
        url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(postData),
            Authorization: `Bearer ${this.apiKey}`
          }
        },
        (res) => {
          let body = "";
          res.on("data", (chunk) => (body += chunk));
          res.on("end", () => {
            if (res.statusCode && res.statusCode >= 400) {
              reject(new Error(`Gateway Error (${res.statusCode}): ${body}`));
            } else {
              resolve(JSON.parse(body) as ExecutionResult);
            }
          });
        }
      );

      req.on("error", reject);
      req.write(postData);
      req.end();
    });
  }
}
