#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/setup.ts
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_os = __toESM(require("os"));
async function runIdeSetup(opts = {}) {
  const apiKey = opts.apiKey || process.env.SKILLBRIDGE_API_KEY || "sk_live_demo_98765";
  const gatewayUrl = opts.gatewayUrl || process.env.SKILLBRIDGE_GATEWAY_URL || "https://skillbridge-gateway.vercel.app";
  console.log("\n==================================================================");
  console.log(" \u{1F309} SkillBridge 1-Click AI IDE & Claude Auto-Configurator");
  console.log("==================================================================");
  console.log(`[Config] Gateway Target: ${gatewayUrl}`);
  console.log(`[Config] Pre-funded Demo Key: ${apiKey}`);
  try {
    const startTime = Date.now();
    const res = await fetch(`${gatewayUrl}/health`);
    const data = await res.json();
    const latency = Date.now() - startTime;
    console.log(`[Network] Gateway Verified: ${data.status} | Latency: ${latency}ms | Active Skills: ${data.activeSkills || 14}`);
  } catch (err) {
    console.log(`[Network Warning] Gateway health check bypassed: ${err.message}`);
  }
  const homedir = import_os.default.homedir();
  const isWindows = process.platform === "win32";
  const isMac = process.platform === "darwin";
  const targetConfigs = [];
  if (isWindows) {
    const appData = process.env.APPDATA || import_path.default.join(homedir, "AppData", "Roaming");
    targetConfigs.push({
      name: "Claude Desktop (Windows)",
      dir: import_path.default.join(appData, "Claude"),
      file: import_path.default.join(appData, "Claude", "claude_desktop_config.json"),
      format: "claude"
    });
  } else if (isMac) {
    const appSupport = import_path.default.join(homedir, "Library", "Application Support");
    targetConfigs.push({
      name: "Claude Desktop (macOS)",
      dir: import_path.default.join(appSupport, "Claude"),
      file: import_path.default.join(appSupport, "Claude", "claude_desktop_config.json"),
      format: "claude"
    });
  } else {
    targetConfigs.push({
      name: "Claude Desktop (Linux)",
      dir: import_path.default.join(homedir, ".config", "Claude"),
      file: import_path.default.join(homedir, ".config", "Claude", "claude_desktop_config.json"),
      format: "claude"
    });
  }
  targetConfigs.push({
    name: "Cursor IDE (Global)",
    dir: import_path.default.join(homedir, ".cursor"),
    file: import_path.default.join(homedir, ".cursor", "mcp.json"),
    format: "cursor"
  });
  targetConfigs.push({
    name: "Windsurf Cascade (Global)",
    dir: import_path.default.join(homedir, ".codeium", "windsurf"),
    file: import_path.default.join(homedir, ".codeium", "windsurf", "mcp_config.json"),
    format: "claude"
  });
  targetConfigs.push({
    name: "Local Workspace (.mcp)",
    dir: import_path.default.join(process.cwd(), ".mcp"),
    file: import_path.default.join(process.cwd(), ".mcp", "config.json"),
    format: "claude"
  });
  const mcpServerConfig = {
    command: "npx",
    args: ["-y", "@skillbridge/cli", "mcp-proxy"],
    env: {
      SKILLBRIDGE_API_KEY: apiKey,
      SKILLBRIDGE_GATEWAY_URL: gatewayUrl
    }
  };
  let configuredCount = 0;
  for (const target of targetConfigs) {
    try {
      if (!import_fs.default.existsSync(target.dir)) {
        import_fs.default.mkdirSync(target.dir, { recursive: true });
      }
      let existingConfig = {};
      if (import_fs.default.existsSync(target.file)) {
        try {
          existingConfig = JSON.parse(import_fs.default.readFileSync(target.file, "utf8"));
        } catch (_) {
          existingConfig = {};
        }
      }
      if (!existingConfig.mcpServers) {
        existingConfig.mcpServers = {};
      }
      existingConfig.mcpServers["skillbridge"] = mcpServerConfig;
      import_fs.default.writeFileSync(target.file, JSON.stringify(existingConfig, null, 2), "utf8");
      console.log(`[Success] Configured ${target.name} -> ${target.file}`);
      configuredCount++;
    } catch (err) {
      console.log(`[Skipped] Could not configure ${target.name}: ${err.message}`);
    }
  }
  console.log("\n==================================================================");
  console.log(` \u2705 Setup Complete! Successfully configured ${configuredCount} IDE environments.`);
  console.log(" \u{1F680} Next step: Restart Claude Desktop, Cursor, or Windsurf.");
  console.log(" You can now run all 14 sovereign skills directly in your chat prompts!");
  console.log("==================================================================\n");
}
if (require.main === module) {
  runIdeSetup().catch(console.error);
}

// src/index.ts
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || "setup";
  switch (command) {
    case "setup":
    case "init":
      await runIdeSetup();
      break;
    case "help":
    case "--help":
    case "-h":
      console.log("SkillBridge CLI - The Sovereign AI Agent Skill Gateway\n\nCommands:\n  setup    Auto-configure Claude Desktop, Cursor, and Windsurf\n  skills   List active sovereign skills\n  status   Check gateway status");
      break;
    case "skills":
      try {
        const gatewayUrl = process.env.SKILLBRIDGE_GATEWAY_URL || "https://skillbridge-gateway.vercel.app";
        console.log("Fetching active skills from " + gatewayUrl + "...");
        const res = await fetch(gatewayUrl + "/api/v1/skills");
        const data = await res.json();
        console.log("\nActive Sovereign Skills (" + (data.skills ? data.skills.length : 0) + "):\n");
        (data.skills || []).forEach((s, idx) => {
          const cat = s.category || s.capabilities && s.capabilities[0] || "general";
          const price = s.pricing?.costPerRunUsd ?? s.pricing?.pricePerCall ?? 0.2;
          console.log("  " + (idx + 1) + ". [" + cat.toUpperCase() + "] " + s.name + " ($" + price.toFixed(2) + "/run)");
          console.log("     ID: " + s.id + " | " + s.description);
        });
      } catch (err) {
        console.error("Failed to fetch skills:", err.message);
      }
      break;
    case "status":
      try {
        const gatewayUrl = process.env.SKILLBRIDGE_GATEWAY_URL || "https://skillbridge-gateway.vercel.app";
        const res = await fetch(gatewayUrl + "/health");
        const health = await res.json();
        console.log("SkillBridge Gateway Status:", JSON.stringify(health, null, 2));
      } catch (err) {
        console.error("Gateway unreachable:", err.message);
      }
      break;
    default:
      console.log("Unknown command: " + command + ". Running setup by default...");
      await runIdeSetup();
      break;
  }
}
main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
