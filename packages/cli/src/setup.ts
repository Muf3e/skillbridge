import fs from "fs";
import path from "path";
import os from "os";

export interface SetupOptions {
  apiKey?: string;
  gatewayUrl?: string;
}

export async function runIdeSetup(opts: SetupOptions = {}) {
  const apiKey = opts.apiKey || process.env.SKILLBRIDGE_API_KEY || "sk_live_demo_98765";
  const gatewayUrl = opts.gatewayUrl || process.env.SKILLBRIDGE_GATEWAY_URL || "https://skillbridge-gateway.vercel.app";

  console.log("\n==================================================================");
  console.log(" 🌉 SkillBridge 1-Click AI IDE & Claude Auto-Configurator");
  console.log("==================================================================");
  console.log(`[Config] Gateway Target: ${gatewayUrl}`);
  console.log(`[Config] Pre-funded Demo Key: ${apiKey}`);

  // Test live connection to Vercel gateway
  try {
    const startTime = Date.now();
    const res = await fetch(`${gatewayUrl}/health`);
    const data = await res.json() as any;
    const latency = Date.now() - startTime;
    console.log(`[Network] Gateway Verified: ${data.status} | Latency: ${latency}ms | Active Skills: ${data.activeSkills || 14}`);
  } catch (err: any) {
    console.log(`[Network Warning] Gateway health check bypassed: ${err.message}`);
  }

  const homedir = os.homedir();
  const isWindows = process.platform === "win32";
  const isMac = process.platform === "darwin";

  const targetConfigs: { name: string; dir: string; file: string; format: "claude" | "cursor" }[] = [];

  // 1. Claude Desktop
  if (isWindows) {
    const appData = process.env.APPDATA || path.join(homedir, "AppData", "Roaming");
    targetConfigs.push({
      name: "Claude Desktop (Windows)",
      dir: path.join(appData, "Claude"),
      file: path.join(appData, "Claude", "claude_desktop_config.json"),
      format: "claude"
    });
  } else if (isMac) {
    const appSupport = path.join(homedir, "Library", "Application Support");
    targetConfigs.push({
      name: "Claude Desktop (macOS)",
      dir: path.join(appSupport, "Claude"),
      file: path.join(appSupport, "Claude", "claude_desktop_config.json"),
      format: "claude"
    });
  } else {
    targetConfigs.push({
      name: "Claude Desktop (Linux)",
      dir: path.join(homedir, ".config", "Claude"),
      file: path.join(homedir, ".config", "Claude", "claude_desktop_config.json"),
      format: "claude"
    });
  }

  // 2. Cursor IDE (~/.cursor/mcp.json or workspace .cursor/mcp.json)
  targetConfigs.push({
    name: "Cursor IDE (Global)",
    dir: path.join(homedir, ".cursor"),
    file: path.join(homedir, ".cursor", "mcp.json"),
    format: "cursor"
  });

  // 3. Windsurf IDE (~/.codeium/windsurf/mcp_config.json)
  targetConfigs.push({
    name: "Windsurf Cascade (Global)",
    dir: path.join(homedir, ".codeium", "windsurf"),
    file: path.join(homedir, ".codeium", "windsurf", "mcp_config.json"),
    format: "claude"
  });

  // 4. Local Workspace .mcp/config.json
  targetConfigs.push({
    name: "Local Workspace (.mcp)",
    dir: path.join(process.cwd(), ".mcp"),
    file: path.join(process.cwd(), ".mcp", "config.json"),
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
      if (!fs.existsSync(target.dir)) {
        fs.mkdirSync(target.dir, { recursive: true });
      }

      let existingConfig: any = {};
      if (fs.existsSync(target.file)) {
        try {
          existingConfig = JSON.parse(fs.readFileSync(target.file, "utf8"));
        } catch (_) {
          existingConfig = {};
        }
      }

      if (!existingConfig.mcpServers) {
        existingConfig.mcpServers = {};
      }

      existingConfig.mcpServers["skillbridge"] = mcpServerConfig;

      fs.writeFileSync(target.file, JSON.stringify(existingConfig, null, 2), "utf8");
      console.log(`[Success] Configured ${target.name} -> ${target.file}`);
      configuredCount++;
    } catch (err: any) {
      console.log(`[Skipped] Could not configure ${target.name}: ${err.message}`);
    }
  }

  console.log("\n==================================================================");
  console.log(` ✅ Setup Complete! Successfully configured ${configuredCount} IDE environments.`);
  console.log(" 🚀 Next step: Restart Claude Desktop, Cursor, or Windsurf.");
  console.log(" You can now run all 14 sovereign skills directly in your chat prompts!");
  console.log("==================================================================\n");
}

if (require.main === module) {
  runIdeSetup().catch(console.error);
}
