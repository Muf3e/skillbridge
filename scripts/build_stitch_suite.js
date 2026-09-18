const fs = require("fs");
const path = require("path");

const STITCH_BASE = path.join(
  process.env.USERPROFILE || "C:\\Users\\Mustafa",
  "Downloads",
  "stitch_skillbridge_agent_gateway (1)",
  "stitch_skillbridge_agent_gateway"
);

function getUniversalHeader(activeRoute) {
  // STRICTLY USER-FACING PAGES ONLY (NO ADMIN, NO WAR ROOM, NO LAUNCHPAD)
  const links = [
    { id: "marketplace", label: "Tool Store", href: "/" },
    { id: "playground", label: "Try In Browser", href: "/playground" },
    { id: "publisher", label: "Sell Your Tool (85%)", href: "/publisher" },
    { id: "docs", label: "Beginner Guide", href: "/docs" },
    { id: "security", label: "Safety & Privacy", href: "/security" },
    { id: "support", label: "24/7 AI Help", href: "/support" }
  ];

  const navHtml = links.map(l => {
    const isActive = l.id === activeRoute;
    if (isActive) {
      return `<a aria-current="page" class="px-3 py-1.5 transition-all bg-[#ff6b00] text-white rounded-lg text-xs font-bold shadow-md shadow-[#ff6b00]/20" href="${l.href}">${l.label}</a>`;
    }
    return `<a class="px-3 py-1.5 rounded-lg text-xs font-medium text-[#a0a2a4] hover:text-white hover:bg-[#232527] transition-all" href="${l.href}">${l.label}</a>`;
  }).join("\n      ");

  return `
<!-- Universal Top Announcement Bar -->
<aside aria-label="Announcement" class="bg-[#0f1112] border-b border-white/5 py-1.5 px-4 text-center text-xs text-[#a0a2a4] flex items-center justify-center space-x-2">
  <span class="inline-block px-2 py-0.5 rounded-full bg-[#ff6b00]/20 text-[#ff6b00] font-bold text-[10px] uppercase tracking-wider border border-[#ff6b00]/30">Bounty Live</span>
  <span>Publish an agent skill this month & compete for the <strong class="text-white">$10,000 creator launch pool</strong>.</span>
  <a href="/publisher" class="underline font-bold text-[#ff6b00] hover:text-white ml-1 transition">Publish Skill &rarr;</a>
</aside>

<!-- Universal Stitch Header (Compact h-16, Zero Extra Space) -->
<header class="sticky top-0 z-50 bg-[#121415]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
  <div class="max-w-7xl mx-auto h-16 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
    <div class="flex items-center gap-5 shrink-0">
      <a href="/" class="flex items-center gap-2.5 group">
        <img alt="SkillBridge Logo" class="h-7 w-auto object-contain transition-transform group-hover:scale-105" src="https://lh3.googleusercontent.com/aida/AEtjO1UaICitA37g_MPC4BeiTnjynEuRZbSpbHZd30T-MMDasK2U9N4QdYuCZ9qMQQbLF3f7rfl6F6CEix6NSdoym5nuwqMNVGuNwa9UbzW31u5ySY79WGQP06iJylJLZN1gkFPoIgV6Rmrv06vGxtJrxyhPy6LTsP-RDMNsd9e0UAlEYBk-dW7SHsCEZ4s_IBDfFyy6vHUbxkFK3iHSxD0D56CpA4frLDdn9_VI1NXXTd9m7JKO8lc1AH9whED4"/>
        <div class="flex flex-col">
          <span class="text-base tracking-tight text-white flex items-center gap-1 font-bold font-['Space_Grotesk']">SkillBridge <span class="text-[#ff6b00]">GATEWAY</span></span>
          <span class="text-[9px] text-[#8e9092] tracking-wider uppercase font-mono">v0.2.0 sovereign runtime</span>
        </div>
      </a>
      <nav class="hidden lg:flex items-center gap-1 p-1 bg-[#181a1b] rounded-xl border border-white/5">
        ${navHtml}
      </nav>
    </div>
    
    <div class="flex items-center gap-2.5 shrink-0">
      <div class="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#181a1b] border border-white/5">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span class="text-xs text-[#a0a2a4]">SEV-SNP • <span class="text-[#ff6b00] font-bold">114ms SLA</span></span>
      </div>
      
      <div class="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#232527] border border-white/5">
        <span class="text-[10px] text-[#8e9092] font-mono">CLI</span>
        <code class="text-xs text-white select-all font-mono">npx @skillbridge/cli setup</code>
        <button onclick="navigator.clipboard.writeText('npx @skillbridge/cli setup'); alert('CLI setup command copied!');" class="hover:text-[#ff6b00] transition-colors text-[#a0a2a4]" type="button" title="Copy setup command">
          <span class="material-symbols-outlined text-sm">content_copy</span>
        </button>
      </div>

      <button onclick="alert('Developer wallet funded with $24.15 USD. MicroVM gas escrow ready.');" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#232527] hover:bg-[#2e3133] transition-all border border-white/10" type="button">
        <span class="material-symbols-outlined text-[#ff6b00] text-sm">account_balance_wallet</span>
        <span class="text-xs text-white font-mono font-bold">$24.15</span>
        <span class="text-xs text-[#ff6b00] font-bold">+ Top Up</span>
      </button>
    </div>
  </div>
</header>
`;
}

function getUniversalFooter() {
  return `
<!-- Universal Stitch Institutional Footer -->
<footer class="bg-[#0b0c0d] border-t border-white/10 py-10 px-4 sm:px-6 lg:px-8 mt-auto">
  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
    <div class="md:col-span-2 space-y-3">
      <div class="flex items-center gap-2">
        <img alt="SkillBridge Logo" class="h-6 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UaICitA37g_MPC4BeiTnjynEuRZbSpbHZd30T-MMDasK2U9N4QdYuCZ9qMQQbLF3f7rfl6F6CEix6NSdoym5nuwqMNVGuNwa9UbzW31u5ySY79WGQP06iJylJLZN1gkFPoIgV6Rmrv06vGxtJrxyhPy6LTsP-RDMNsd9e0UAlEYBk-dW7SHsCEZ4s_IBDfFyy6vHUbxkFK3iHSxD0D56CpA4frLDdn9_VI1NXXTd9m7JKO8lc1AH9whED4"/>
        <span class="text-base text-white font-bold font-['Space_Grotesk']">SkillBridge <span class="text-[#ff6b00]">GATEWAY</span></span>
      </div>
      <p class="text-xs text-[#8e9092] max-w-sm leading-relaxed">
        High-performance, hardware-isolated AI agent microVM execution fabric powered by AMD SEV-SNP attestation and MCP native integration.
      </p>
      <div class="flex items-center gap-2 text-[10px] font-mono text-[#8e9092]">
        <span class="px-2 py-0.5 rounded bg-[#181a1b] border border-white/10">MCP V0.2.0 SPEC</span>
        <span class="px-2 py-0.5 rounded bg-[#181a1b] border border-white/10">AMD SEV-SNP ATTESTED</span>
      </div>
    </div>
    
    <div>
      <h4 class="text-xs font-bold uppercase tracking-wider text-white mb-3 font-mono">Tools & Runtime</h4>
      <ul class="space-y-2 text-xs text-[#8e9092]">
        <li><a href="/" class="hover:text-[#ff6b00] transition">Tool Store</a></li>
        <li><a href="/playground" class="hover:text-[#ff6b00] transition">MicroVM Browser Testing</a></li>
        <li><a href="/security" class="hover:text-[#ff6b00] transition">Zero-Leak Proofs</a></li>
        <li><a href="/publisher" class="hover:text-[#ff6b00] transition">Creator Escrow Ledger</a></li>
      </ul>
    </div>
    
    <div>
      <h4 class="text-xs font-bold uppercase tracking-wider text-white mb-3 font-mono">Publishers</h4>
      <ul class="space-y-2 text-xs text-[#8e9092]">
        <li><a href="/publisher" class="hover:text-[#ff6b00] transition">Publish Your Skill</a></li>
        <li><a href="/docs" class="hover:text-[#ff6b00] transition">Publishing CLI</a></li>
        <li><a href="/publisher" class="hover:text-[#ff6b00] transition">Revenue Splitting (85%)</a></li>
        <li><a href="/security" class="hover:text-[#ff6b00] transition">Contract Audits</a></li>
      </ul>
    </div>
    
    <div>
      <h4 class="text-xs font-bold uppercase tracking-wider text-white mb-3 font-mono">Developer Resources</h4>
      <ul class="space-y-2 text-xs text-[#8e9092]">
        <li><a href="/docs" class="hover:text-[#ff6b00] transition">1-Click MCP Setup</a></li>
        <li><a href="/support" class="hover:text-[#ff6b00] transition">24/7 AI Support Desk</a></li>
        <li><a href="/security" class="hover:text-[#ff6b00] transition">Hardware Attestation</a></li>
        <li><a href="/admin" class="hover:text-[#ff6b00] transition text-[#8e9092]/60 hover:text-white font-mono">Admin Portal &rarr;</a></li>
      </ul>
    </div>
  </div>
  
  <div class="max-w-7xl mx-auto pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8e9092]">
    <span>&copy; 2026 SkillBridge Technologies Inc. All rights reserved. Production Genesis Node #0412</span>
    <div class="flex items-center space-x-3 mt-2 sm:mt-0">
      <span>System Status: <strong class="text-emerald-400">99.992%</strong></span>
      <span>&bull;</span>
      <span>Confidential Computing</span>
      <span>&bull;</span>
      <a href="/admin" class="hover:text-[#ff6b00] text-[10px] uppercase font-mono tracking-wider">Admin Console</a>
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

function getMarketplaceInteractivityScript() {
  return [
    "<script>",
    "document.addEventListener('DOMContentLoaded', () => {",
    "  const searchInput = document.querySelector('input[placeholder*=\"Search skills\"]');",
    "  const cards = Array.from(document.querySelectorAll('div.group')).filter(el => el.querySelector('h3'));",
    "  if (searchInput) {",
    "    searchInput.addEventListener('input', (e) => {",
    "      const query = e.target.value.toLowerCase().trim();",
    "      cards.forEach(card => {",
    "        const text = card.innerText.toLowerCase();",
    "        card.style.display = text.includes(query) ? '' : 'none';",
    "      });",
    "    });",
    "  }",
    "  const filterBtns = Array.from(document.querySelectorAll('button')).filter(b => ",
    "    b.innerText.includes('All Skills') || b.innerText.includes('Security') || b.innerText.includes('Web3') || ",
    "    b.innerText.includes('AI Ops') || b.innerText.includes('Database') || b.innerText.includes('DevOps') || b.innerText.includes('Legal')",
    "  );",
    "  filterBtns.forEach(btn => {",
    "    btn.addEventListener('click', () => {",
    "      filterBtns.forEach(b => {",
    "        b.className = 'px-space-md py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high hover:text-on-surface transition-all whitespace-nowrap text-xs';",
    "      });",
    "      btn.className = 'px-space-md py-1.5 rounded-lg bg-primary-container text-on-primary font-semibold shadow-md whitespace-nowrap text-xs';",
    "      const cat = btn.innerText.toLowerCase();",
    "      cards.forEach(card => {",
    "        if (cat.includes('all')) {",
    "          card.style.display = '';",
    "        } else if (cat.includes('security') && (card.innerText.includes('DeepSec') || card.innerText.includes('Security') || card.innerText.includes('SAST'))) {",
    "          card.style.display = '';",
    "        } else if (cat.includes('web3') && (card.innerText.includes('Solidity') || card.innerText.includes('EVM') || card.innerText.includes('Smart Contract'))) {",
    "          card.style.display = '';",
    "        } else if (cat.includes('ai ops') && (card.innerText.includes('Distiller') || card.innerText.includes('Context') || card.innerText.includes('Swarm'))) {",
    "          card.style.display = '';",
    "        } else if (cat.includes('database') && (card.innerText.includes('Migrator') || card.innerText.includes('Lock') || card.innerText.includes('SQL'))) {",
    "          card.style.display = '';",
    "        } else if (cat.includes('devops') && (card.innerText.includes('Chaos') || card.innerText.includes('Load') || card.innerText.includes('k6'))) {",
    "          card.style.display = '';",
    "        } else {",
    "          card.style.display = 'none';",
    "        }",
    "      });",
    "    });",
    "  });",
    "  const mcpBtns = Array.from(document.querySelectorAll('button')).filter(b => b.innerText.includes('+ MCP'));",
    "  mcpBtns.forEach(btn => {",
    "    btn.addEventListener('click', (e) => {",
    "      e.stopPropagation();",
    "      const card = btn.closest('div.group');",
    "      const skillName = card ? card.querySelector('h3')?.innerText || 'Sovereign Skill' : 'Sovereign Skill';",
    "      const skillSlug = 'skill_' + skillName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');",
    "      const cmd = 'npx @skillbridge/cli install ' + skillSlug;",
    "      navigator.clipboard.writeText(cmd).then(() => {",
    "        const orig = btn.innerHTML;",
    "        btn.innerHTML = '<span class=\"material-symbols-outlined text-xs\">done</span><span>Copied!</span>';",
    "        btn.classList.add('bg-emerald-600', 'text-white');",
    "        setTimeout(() => {",
    "          btn.innerHTML = orig;",
    "          btn.classList.remove('bg-emerald-600', 'text-white');",
    "        }, 2000);",
    "      });",
    "    });",
    "  });",
    "});",
    "</script>"
  ].join("\n");
}

function replaceHeaderAndFooter(rawHtml, activeRoute) {
  let html = rawHtml;
  // Replace header
  html = html.replace(/<header[\s\S]*?<\/header>/, getUniversalHeader(activeRoute));
  // Replace footer
  html = html.replace(/<footer[\s\S]*?<\/footer>/, getUniversalFooter());
  // Inject floating support button before </body>
  html = html.replace(/<\/body>/, getFloatingSupportButton() + (activeRoute === "marketplace" ? getMarketplaceInteractivityScript() : "") + "\n</body>");

  // ELIMINATE BLANK SPACES & EXCESSIVE TOP PADDING
  html = html.replace(/class="w-full pt-20 bg-background min-h-screen"/g, 'class="w-full pt-2 sm:pt-4 bg-background min-h-screen"');
  html = html.replace(/class="w-full pt-20 /g, 'class="w-full pt-2 sm:pt-4 ');
  html = html.replace(/pt-space-lg pb-space-xl flex flex-col gap-space-lg/g, 'pt-2 sm:pt-4 pb-6 flex flex-col gap-4');
  html = html.replace(/py-space-xl/g, 'py-5');
  html = html.replace(/py-space-lg/g, 'py-4');
  html = html.replace(/pt-space-lg/g, 'pt-3 sm:pt-4');
  html = html.replace(/pb-space-xl/g, 'pb-6');
  html = html.replace(/gap-space-xl/g, 'gap-5');
  html = html.replace(/gap-space-lg/g, 'gap-4');
  html = html.replace(/p-space-lg/g, 'p-4 sm:p-5');

  // Tighten typography and huge banners that push content offscreen
  html = html.replace(/font-headline-xl text-headline-xl/g, 'text-3xl sm:text-4xl lg:text-5xl font-bold font-[\'Space_Grotesk\']');
  html = html.replace(/font-headline-lg text-headline-lg/g, 'text-2xl sm:text-3xl lg:text-4xl font-bold font-[\'Space_Grotesk\']');
  html = html.replace(/font-headline-md text-headline-md/g, 'text-xl sm:text-2xl font-bold font-[\'Space_Grotesk\']');
  html = html.replace(/min-h-\[300px\] lg:min-h-\[360px\]/g, 'min-h-[140px] lg:min-h-[160px]');
  html = html.replace(/pointer-events-none absolute -top-40 left-1\/2 -translate-x-1\/2 w-\[900px\] h-\[450px\]/g, 'pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px]');

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
  
  // Fix internal stitch navigation links in main content
  content = content.replace(/href="#" data-path="marketplace"/g, 'href="/"');
  content = content.replace(/href="#" data-path="ide-and-enclave-playground"/g, 'href="/playground"');
  content = content.replace(/href="#" data-path="publisher-studio-and-ledger"/g, 'href="/publisher"');
  content = content.replace(/href="#" data-path="war-room-and-telemetry"/g, 'href="/admin"');
  content = content.replace(/href="#" data-path="docs-and-mcp-config"/g, 'href="/docs"');
  content = content.replace(/href="#" data-path="security-whitepaper"/g, 'href="/security"');
  content = content.replace(/href="#" data-path="ai-support"/g, 'href="/support"');

  // Fix generic CTA buttons inside the pages
  content = content.replace(/Explore Enclaves &rarr;/g, '<a href="/playground" class="inline-flex items-center text-primary font-bold">Explore Enclaves &rarr;</a>');

  // Write to all target locations
  for (const tDir of targetsDirs) {
    if (!fs.existsSync(tDir)) continue;
    const dest = path.join(tDir, p.fileName);
    fs.writeFileSync(dest, content, "utf8");
    console.log(`Wrote ${p.fileName} -> ${dest}`);
  }
}

// Synchronize admin.html across all target locations
const adminSrc = path.join(process.cwd(), "admin.html");
if (fs.existsSync(adminSrc)) {
  for (const tDir of targetsDirs) {
    if (!fs.existsSync(tDir)) continue;
    const dest = path.join(tDir, "admin.html");
    fs.copyFileSync(adminSrc, dest);
    console.log(`Synced admin.html -> ${dest}`);
  }
}

console.log("Successfully built and synchronized compact user-focused UI suite!");
