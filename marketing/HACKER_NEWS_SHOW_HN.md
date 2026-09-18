# 📰 Show HN: SkillBridge – Sovereign remote execution & monetization gateway for AI agent skills

### Title
`Show HN: SkillBridge – Sovereign remote execution & monetization gateway for AI agent skills`

### URL
`https://skillbridge-gateway.vercel.app/`

---

## 📝 Submission Text

Hey HN,

We built **SkillBridge** (https://skillbridge-gateway.vercel.app/) to solve two major friction points in the fast-growing Model Context Protocol (MCP) and agentic tool ecosystem:

1. **The Client-Side Execution Burden & Dependency Hell:**
Running specialized developer tools locally inside Claude Desktop or Cursor requires users to clone Python virtual environments, compile C/Rust bindings, manage GPU dependencies, and run unsandboxed local scripts with direct access to their filesystem and private environment variables.

2. **The Creator Monetization Dilemma (Prompt & Code Leaks):**
Tool creators who build high-value autonomous capabilities (deep static analysis, chaos engineering fuzzer, zero-downtime DDL planning) currently have no reliable way to monetize their work. As soon as you ship a client-side MCP server or prompt file, your intellectual property is cloned, decompiled, or leaked.

### What is SkillBridge?
SkillBridge is an open remote gateway and hardened microVM execution layer for AI agent skills. 

- **1-Click Local MCP Shim:** Running `npx @skillbridge/cli setup` auto-detects installed Claude Desktop, Cursor, or Windsurf configurations, writes standard MCP JSON configs, and routes tool calls through a sub-150ms remote proxy.
- **Hardened MicroVM Sandboxing:** Skills execute within isolated, ephemeral microVM containers. The client never touches complex dependencies, and the tool creator never exposes their proprietary algorithms or system prompts to the caller.
- **Outcome-Guaranteed Escrow:** When an agent invokes a paid skill ($0.10 - $1.00/run), funds are locked in an atomic escrow. If the execution crashes or fails output schema verification, the caller is automatically refunded 100% with zero friction.
- **85% Creator Payout:** Upon successful execution and contract fulfillment, 85% of the fee settles directly to the creator's wallet.

### Current Sovereign Skills Catalog (18 Skills Live)
We have seeded 18 enterprise skills accessible in both the web playground and through the CLI:
- **Chaos Engineering & Synthetic Load Fuzzer:** Enterprise SRE stress simulator injecting latency jitter and outputting executable k6/Locust scripts.
- **Zero-Downtime Database Migration Planner:** Analyzes raw DDL, detects table-locking hazards, and generates Expand/Contract migration scripts.
- **Multi-Agent Consensus Swarm:** 3-agent adversarial review (Whitehat, Perf/Cost, Architecture) synthesizing Byzantine consensus on code PRs.
- **Context Distiller & Token Reducer:** AST-aware context compaction reducing prompt token footprints by 65-80%.
- **DeepSec Repo Audit:** Static AST scanner for leaked AWS credentials, SQL injection, and vulnerable transitive dependencies.

### Tech Stack & Open Source
- **Gateway Core:** Node.js micro-kernel, TypeScript, strict contract validation.
- **Client & MCP Stdio Shim:** `@skillbridge/cli` bundled with esbuild into an ultra-fast standalone binary.
- **Autonomous Support Desk:** Integrated AI support agent triaging issues, verifying microVM logs, and resolving developer cases live at `/support`.
- **GitHub Repository:** https://github.com/Muf3e/skillbridge

We'd love HN's candid feedback on:
1. Micro-metering vs monthly seat subscriptions for agent tools.
2. Latency tolerances for complex multi-tool chains in coding IDEs.
3. Security considerations around remote MCP stdio bridging.

Happy to answer any technical questions in the comments!
