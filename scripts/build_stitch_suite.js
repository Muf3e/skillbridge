const fs = require("fs");
const path = require("path");

const STITCH_BASE = path.join(
  process.env.USERPROFILE || "C:\\Users\\Mustafa",
  "Downloads",
  "stitch_skillbridge_agent_gateway (1)",
  "stitch_skillbridge_agent_gateway"
);

function getUniversalHeader(activeRoute) {
  const links = [
    { id: "marketplace", label: "Marketplace", href: "/" },
    { id: "playground", label: "IDE & Enclave Playground", href: "/playground" },
    { id: "publisher", label: "Publisher Studio & Ledger", href: "/publisher" },
    { id: "warroom", label: "War Room & Telemetry", href: "/executive" },
    { id: "docs", label: "Docs & MCP Config", href: "/docs" },
    { id: "security", label: "Security Whitepaper", href: "/security" },
    { id: "support", label: "24/7 AI Support", href: "/support" },
    { id: "marketing", label: "DevRel Launchpad", href: "/marketing" }
  ];

  const navHtml = links.map(l => {
    const isActive = l.id === activeRoute;
    if (isActive) {
      return `<a aria-current="page" class="px-space-md py-space-xs transition-all bg-primary-container text-on-primary-container rounded-lg font-label-lg text-label-lg font-bold shadow-md shadow-primary/20" href="${l.href}">${l.label}</a>`;
    }
    return `<a class="px-space-md py-space-xs rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all" href="${l.href}">${l.label}</a>`;
  }).join("\n      ");

  return `
<!-- Universal Top Announcement Bar -->
<aside aria-label="Announcement" class="bg-surface-container-lowest border-b border-outline-variant/30 py-2 px-4 text-center text-xs text-on-surface-variant flex items-center justify-center space-x-2">
  <span class="inline-block px-2 py-0.5 rounded-full bg-primary-container/20 text-primary font-bold text-[10px] uppercase tracking-wider border border-primary/30">Bounty Live</span>
  <span>Publish an agent skill this month & compete for the <strong class="text-white">$10,000 creator launch pool</strong>.</span>
  <a href="/publisher" class="underline font-bold text-primary hover:text-white ml-1 transition">Publish Skill &rarr;</a>
</aside>

<!-- Universal Stitch Header -->
<header class="sticky top-0 z-50 bg-[#121415]/90 backdrop-blur-xl border-b border-surface-container-high shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
  <div class="max-w-7xl mx-auto h-20 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-space-md">
    <div class="flex items-center gap-space-lg shrink-0">
      <a href="/" class="flex items-center gap-space-sm group">
        <img alt="SkillBridge Logo" class="h-8 w-auto object-contain transition-transform group-hover:scale-105" src="https://lh3.googleusercontent.com/aida/AEtjO1UaICitA37g_MPC4BeiTnjynEuRZbSpbHZd30T-MMDasK2U9N4QdYuCZ9qMQQbLF3f7rfl6F6CEix6NSdoym5nuwqMNVGuNwa9UbzW31u5ySY79WGQP06iJylJLZN1gkFPoIgV6Rmrv06vGxtJrxyhPy6LTsP-RDMNsd9e0UAlEYBk-dW7SHsCEZ4s_IBDfFyy6vHUbxkFK3iHSxD0D56CpA4frLDdn9_VI1NXXTd9m7JKO8lc1AH9whED4"/>
        <div class="flex flex-col">
          <span class="font-headline-sm text-headline-sm tracking-tight text-on-surface flex items-center gap-space-xs font-bold font-['Space_Grotesk']">SkillBridge <span class="font-headline-sm text-headline-sm text-primary">GATEWAY</span></span>
          <span class="font-label-sm text-label-sm text-outline tracking-wider uppercase">v0.2.0 sovereign microvm runtime</span>
        </div>
      </a>
      <nav class="hidden xl:flex items-center gap-space-xs p-space-xs bg-surface-container-low/80 rounded-xl border border-white/5">
        ${navHtml}
      </nav>
    </div>
    
    <div class="flex items-center gap-space-sm shrink-0">
      <div class="hidden md:flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-low/90 border border-white/5">
        <span class="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
        <span class="font-label-sm text-label-sm text-on-surface-variant">AMD SEV-SNP Active • <span class="text-primary font-bold">114ms SLA</span></span>
      </div>
      
      <div class="hidden lg:flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-surface-container-high/60 border border-white/5">
        <span class="font-label-sm text-label-sm text-outline font-mono">CLI</span>
        <code class="font-body-sm text-body-sm text-on-surface select-all font-mono">npx @skillbridge/cli setup</code>
        <button onclick="navigator.clipboard.writeText('npx @skillbridge/cli setup'); alert('CLI setup command copied!');" class="hover:text-primary transition-colors text-on-surface-variant" type="button" title="Copy setup command">
          <span class="material-symbols-outlined text-sm">content_copy</span>
        </button>
      </div>

      <button onclick="alert('Developer wallet funded with $24.15 USD. MicroVM gas escrow ready.');" class="flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-all border border-white/10" type="button">
        <span class="material-symbols-outlined text-primary text-sm">account_balance_wallet</span>
        <span class="font-label-lg text-label-lg text-on-surface font-mono font-bold">$24.15 USD</span>
        <span class="font-label-sm text-label-sm text-primary font-bold">+ Top Up</span>
      </button>
    </div>
  </div>
</header>
`;
}

function getUniversalFooter() {
  return `
<!-- Universal Stitch Institutional Footer -->
<footer class="bg-surface-container-lowest border-t border-surface-container-high py-12 px-4 sm:px-6 lg:px-8 mt-auto">
  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
    <div class="md:col-span-2 space-y-4">
      <div class="flex items-center gap-2">
        <img alt="SkillBridge Logo" class="h-6 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UaICitA37g_MPC4BeiTnjynEuRZbSpbHZd30T-MMDasK2U9N4QdYuCZ9qMQQbLF3f7rfl6F6CEix6NSdoym5nuwqMNVGuNwa9UbzW31u5ySY79WGQP06iJylJLZN1gkFPoIgV6Rmrv06vGxtJrxyhPy6LTsP-RDMNsd9e0UAlEYBk-dW7SHsCEZ4s_IBDfFyy6vHUbxkFK3iHSxD0D56CpA4frLDdn9_VI1NXXTd9m7JKO8lc1AH9whED4"/>
        <span class="font-headline-sm text-on-surface font-bold font-['Space_Grotesk']">SkillBridge <span class="text-primary">GATEWAY</span></span>
      </div>
      <p class="text-body-sm text-outline max-w-sm">
        High-performance, hardware-isolated AI agent microVM execution fabric powered by AMD SEV-SNP attestation and MCP native integration.
      </p>
      <div class="flex items-center gap-2 text-[10px] font-mono text-outline-variant">
        <span class="px-2 py-0.5 rounded bg-surface-container border border-outline-variant/30">MCP V0.2.0 SPEC</span>
        <span class="px-2 py-0.5 rounded bg-surface-container border border-outline-variant/30">AMD SEV-SNP ATTESTED</span>
      </div>
    </div>
    
    <div>
      <h4 class="text-xs font-bold uppercase tracking-wider text-on-surface mb-4 font-mono">Protocol</h4>
      <ul class="space-y-2 text-xs text-outline">
        <li><a href="/playground" class="hover:text-primary transition">MicroVM Runtime</a></li>
        <li><a href="/security" class="hover:text-primary transition">Proof of Enclave</a></li>
        <li><a href="/executive" class="hover:text-primary transition">Telemetry Engine</a></li>
        <li><a href="/publisher" class="hover:text-primary transition">Consensus Ledger</a></li>
      </ul>
    </div>
    
    <div>
      <h4 class="text-xs font-bold uppercase tracking-wider text-on-surface mb-4 font-mono">Publishers</h4>
      <ul class="space-y-2 text-xs text-outline">
        <li><a href="/publisher" class="hover:text-primary transition">Agent Registry</a></li>
        <li><a href="/docs" class="hover:text-primary transition">Publishing CLI</a></li>
        <li><a href="/publisher" class="hover:text-primary transition">Revenue Splitting (85%)</a></li>
        <li><a href="/security" class="hover:text-primary transition">Contract Audits</a></li>
      </ul>
    </div>
    
    <div>
      <h4 class="text-xs font-bold uppercase tracking-wider text-on-surface mb-4 font-mono">Resources & Support</h4>
      <ul class="space-y-2 text-xs text-outline">
        <li><a href="/docs" class="hover:text-primary transition">MCP Specification</a></li>
        <li><a href="/support" class="hover:text-primary transition">24/7 AI Support Bot</a></li>
        <li><a href="/security" class="hover:text-primary transition">Security Attestation</a></li>
        <li><a href="/marketing" class="hover:text-primary transition">DevRel & Social Hub</a></li>
      </ul>
    </div>
  </div>
  
  <div class="max-w-7xl mx-auto pt-6 border-t border-surface-container-high/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-outline">
    <span>&copy; 2026 SkillBridge Technologies Inc. All rights reserved. Production Genesis Node #0412</span>
    <div class="flex items-center space-x-4 mt-2 sm:mt-0">
      <span>System Status: <strong class="text-primary">99.992%</strong></span>
      <span>&bull;</span>
      <span>Confidential Computing</span>
      <span>&bull;</span>
      <span>Zero-Knowledge Attest</span>
    </div>
  </div>
</footer>
`;
}

function getFloatingSupportButton() {
  return `
<!-- Floating Quick Support Pill -->
<div id="floating-support-btn-container" class="fixed bottom-6 right-6 z-50">
  <a href="/support" class="flex items-center space-x-2.5 px-4 py-2.5 rounded-full bg-[#ff6b00] hover:bg-[#ff8533] text-white text-xs font-bold shadow-xl shadow-[#ff6b00]/30 border border-white/20 transition-all transform hover:-translate-y-0.5 group">
    <span class="relative flex h-2 w-2">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
      <span class="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
    </span>
    <span class="material-symbols-outlined text-sm">support_agent</span>
    <span>Report Issue / Ask AI Support</span>
  </a>
</div>
`;
}

function replaceHeaderAndFooter(rawHtml, activeRoute) {
  let html = rawHtml;
  // Replace header
  html = html.replace(/<header[\s\S]*?<\/header>/, getUniversalHeader(activeRoute));
  // Replace footer
  html = html.replace(/<footer[\s\S]*?<\/footer>/, getUniversalFooter());
  // Inject floating support button before </body>
  html = html.replace(/<\/body>/, getFloatingSupportButton() + "\n</body>");
  return html;
}

// Build all 7 core pages from Stitch
const pageConfigs = [
  {
    folder: "skillbridge_gateway_sovereign_skill_marketplace",
    route: "marketplace",
    fileName: "index.html",
    title: "SkillBridge | The Universal Remote Gateway for Monetized AI Agent Skills"
  },
  {
    folder: "skillbridge_microvm_ide_enclave_playground",
    route: "playground",
    fileName: "playground.html",
    title: "SkillBridge | MicroVM Enclave Playground"
  },
  {
    folder: "skillbridge_publisher_studio_escrow_ledger",
    route: "publisher",
    fileName: "publisher.html",
    title: "SkillBridge | Publisher Studio & Escrow Ledger (85% Split)"
  },
  {
    folder: "skillbridge_omnibrain_war_room_telemetry",
    route: "warroom",
    fileName: "executive.html",
    title: "SkillBridge | OmniBrain Autonomous War Room & Telemetry"
  },
  {
    folder: "skillbridge_mcp_setup_developer_docs",
    route: "docs",
    fileName: "docs.html",
    title: "SkillBridge | 1-Click MCP Setup & Developer Docs"
  },
  {
    folder: "skillbridge_security_attestation_whitepaper",
    route: "security",
    fileName: "security.html",
    title: "SkillBridge | Hardware Attestation & Zero-Leak Whitepaper"
  },
  {
    folder: "skillbridge_support_center_autonomous_ai_bot",
    route: "support",
    fileName: "support.html",
    title: "SkillBridge Support & Resolution Center | Autonomous AI Bot"
  }
];

const targetsDirs = [
  path.join(process.cwd()),
  path.join(process.cwd(), "public"),
  path.join(process.cwd(), "packages", "gateway", "public"),
  path.join(process.cwd(), "apps", "web", "public")
];

for (const p of pageConfigs) {
  const sourcePath = path.join(STITCH_BASE, p.folder, "code.html");
  if (!fs.existsSync(sourcePath)) {
    console.error("Missing source file:", sourcePath);
    continue;
  }
  let content = fs.readFileSync(sourcePath, "utf8");
  
  // Inject title
  if (content.includes("<title>")) {
    content = content.replace(/<title>[\s\S]*?<\/title>/, `<title>${p.title}</title>`);
  } else {
    content = content.replace(/<head>/, `<head>\n<title>${p.title}</title>`);
  }
  
  // Replace header & footer & inject floating support
  content = replaceHeaderAndFooter(content, p.route);
  
  // Fix any internal stitch navigation links in main content
  content = content.replace(/href="#" data-path="marketplace"/g, 'href="/"');
  content = content.replace(/href="#" data-path="ide-and-enclave-playground"/g, 'href="/playground"');
  content = content.replace(/href="#" data-path="publisher-studio-and-ledger"/g, 'href="/publisher"');
  content = content.replace(/href="#" data-path="war-room-and-telemetry"/g, 'href="/executive"');
  content = content.replace(/href="#" data-path="docs-and-mcp-config"/g, 'href="/docs"');
  content = content.replace(/href="#" data-path="security-whitepaper"/g, 'href="/security"');
  content = content.replace(/href="#" data-path="ai-support"/g, 'href="/support"');

  // Also fix any generic CTA buttons inside the pages
  content = content.replace(/Explore Enclaves &rarr;/g, '<a href="/playground" class="inline-flex items-center text-primary font-bold">Explore Enclaves &rarr;</a>');

  // Write to all target locations
  for (const tDir of targetsDirs) {
    if (!fs.existsSync(tDir)) continue;
    const dest = path.join(tDir, p.fileName);
    fs.writeFileSync(dest, content, "utf8");
    console.log(`Wrote ${p.fileName} -> ${dest}`);
  }
}

console.log("Successfully built and synchronized Stitch UI Suite across all target directories!");
