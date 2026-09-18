const fs = require("fs");
const path = require("path");

const STITCH_BASE = path.join(
  process.env.USERPROFILE || "C:\\Users\\Mustafa",
  "Downloads",
  "stitch_skillbridge_agent_gateway (1)",
  "stitch_skillbridge_agent_gateway"
);

// --- 1. PUBLIC USER-FACING HEADER (NO War Room, NO Launchpad!) ---
function getPublicUserHeader(activeRoute) {
  const userLinks = [
    { id: "marketplace", label: "Marketplace", href: "/" },
    { id: "playground", label: "IDE & Enclave Playground", href: "/playground" },
    { id: "publisher", label: "Publisher Studio & Ledger", href: "/publisher" },
    { id: "docs", label: "Docs & MCP Config", href: "/docs" },
    { id: "security", label: "Security Whitepaper", href: "/security" },
    { id: "support", label: "24/7 AI Support", href: "/support" }
  ];

  const navHtml = userLinks.map(l => {
    const isActive = l.id === activeRoute;
    if (isActive) {
      return `<a aria-current="page" class="px-3.5 py-1.5 transition-all bg-[#ff6b00] text-white rounded-lg text-xs font-bold shadow-md shadow-[#ff6b00]/20" href="${l.href}">${l.label}</a>`;
    }
    return `<a class="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#a0a2a4] hover:text-white hover:bg-[#2f3132] transition-all" href="${l.href}">${l.label}</a>`;
  }).join("\n      ");

  return `
<!-- Universal Top Announcement Bar -->
<aside aria-label="Announcement" class="bg-[#121415] border-b border-white/5 py-2 px-4 text-center text-xs text-[#a0a2a4] flex items-center justify-center space-x-2">
  <span class="inline-block px-2 py-0.5 rounded-full bg-[#ff6b00]/15 text-[#ff6b00] font-bold text-[10px] uppercase tracking-wider border border-[#ff6b00]/30">Bounty Live</span>
  <span>Publish an agent skill this month & compete for the <strong class="text-white">$10,000 creator launch pool</strong>.</span>
  <a href="/publisher" class="underline font-bold text-[#ff6b00] hover:text-white ml-1 transition">Publish Skill &rarr;</a>
</aside>

<!-- Universal Public Stitch Header -->
<header class="sticky top-0 z-50 bg-[#121415]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
  <div class="max-w-7xl mx-auto h-20 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
    <div class="flex items-center gap-6 shrink-0">
      <a href="/" class="flex items-center gap-3 group">
        <img alt="SkillBridge Logo" class="h-8 w-auto object-contain transition-transform group-hover:scale-105" src="https://lh3.googleusercontent.com/aida/AEtjO1UaICitA37g_MPC4BeiTnjynEuRZbSpbHZd30T-MMDasK2U9N4QdYuCZ9qMQQbLF3f7rfl6F6CEix6NSdoym5nuwqMNVGuNwa9UbzW31u5ySY79WGQP06iJylJLZN1gkFPoIgV6Rmrv06vGxtJrxyhPy6LTsP-RDMNsd9e0UAlEYBk-dW7SHsCEZ4s_IBDfFyy6vHUbxkFK3iHSxD0D56CpA4frLDdn9_VI1NXXTd9m7JKO8lc1AH9whED4"/>
        <div class="flex flex-col">
          <span class="text-lg tracking-tight text-white flex items-center gap-1 font-bold font-['Space_Grotesk']">SkillBridge <span class="text-[#ff6b00]">GATEWAY</span></span>
          <span class="text-[10px] text-[#a0a2a4] tracking-wider uppercase font-mono">v0.2.0 sovereign microvm runtime</span>
        </div>
      </a>
      <nav class="hidden xl:flex items-center gap-1 p-1 bg-[#1b1b1f]/80 rounded-xl border border-white/5">
        ${navHtml}
      </nav>
    </div>
    
    <div class="flex items-center gap-3 shrink-0">
      <div class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1b1b1f] border border-white/5">
        <span class="w-2 h-2 rounded-full bg-[#ff6b00] animate-pulse"></span>
        <span class="text-xs text-[#a0a2a4]">AMD SEV-SNP Active • <span class="text-[#ff6b00] font-bold">114ms SLA</span></span>
      </div>
      
      <div class="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#232527] border border-white/5">
        <span class="text-xs text-[#a0a2a4] font-mono">CLI</span>
        <code class="text-xs text-white select-all font-mono">npx @skillbridge/cli setup</code>
        <button onclick="navigator.clipboard.writeText('npx @skillbridge/cli setup'); alert('CLI setup command copied!');" class="hover:text-[#ff6b00] transition-colors text-[#a0a2a4]" type="button" title="Copy setup command">
          <span class="material-symbols-outlined text-sm">content_copy</span>
        </button>
      </div>

      <button onclick="if(typeof openWalletModal==='function'){openWalletModal();}else{alert('Developer wallet balance: $24.15 USD. MicroVM gas escrow ready.');}" class="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#232527] hover:bg-[#2f3132] transition-all border border-white/10" type="button">
        <span class="material-symbols-outlined text-[#ff6b00] text-sm">account_balance_wallet</span>
        <span id="nav-wallet-balance" class="text-xs text-white font-mono font-bold">$24.15 USD</span>
        <span class="text-xs text-[#ff6b00] font-bold">+ Top Up</span>
      </button>

      <button onclick="if(typeof openPublisherStudio==='function'){openPublisherStudio();}else{window.location.href='/publisher';}" class="bg-[#ff6b00] hover:bg-[#ff8533] text-white font-bold text-xs px-3.5 py-2 rounded-xl transition shadow-lg shadow-[#ff6b00]/25 active:scale-95 flex items-center space-x-1.5">
        <span>+ Monetize Skill</span>
      </button>
    </div>
  </div>
</header>
`;
}

// --- 2. UNIVERSAL INSTITUTIONAL FOOTER (with Discreet Admin Portal link) ---
function getPublicUserFooter() {
  return `
<!-- Universal Stitch Institutional Footer -->
<footer class="bg-[#121415] border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
    <div class="md:col-span-2 space-y-4">
      <div class="flex items-center gap-2">
        <img alt="SkillBridge Logo" class="h-6 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UaICitA37g_MPC4BeiTnjynEuRZbSpbHZd30T-MMDasK2U9N4QdYuCZ9qMQQbLF3f7rfl6F6CEix6NSdoym5nuwqMNVGuNwa9UbzW31u5ySY79WGQP06iJylJLZN1gkFPoIgV6Rmrv06vGxtJrxyhPy6LTsP-RDMNsd9e0UAlEYBk-dW7SHsCEZ4s_IBDfFyy6vHUbxkFK3iHSxD0D56CpA4frLDdn9_VI1NXXTd9m7JKO8lc1AH9whED4"/>
        <span class="text-lg text-white font-bold font-['Space_Grotesk']">SkillBridge <span class="text-[#ff6b00]">GATEWAY</span></span>
      </div>
      <p class="text-xs text-[#a0a2a4] max-w-sm leading-relaxed">
        High-performance, hardware-isolated AI agent microVM execution fabric powered by AMD SEV-SNP attestation and MCP native integration.
      </p>
      <div class="flex items-center gap-2 text-[10px] font-mono text-[#a0a2a4]">
        <span class="px-2 py-0.5 rounded bg-[#1b1b1f] border border-white/5">MCP V0.2.0 SPEC</span>
        <span class="px-2 py-0.5 rounded bg-[#1b1b1f] border border-white/5">AMD SEV-SNP ATTESTED</span>
      </div>
    </div>
    
    <div>
      <h4 class="text-xs font-bold uppercase tracking-wider text-white mb-4 font-mono">Protocol</h4>
      <ul class="space-y-2 text-xs text-[#a0a2a4]">
        <li><a href="/playground" class="hover:text-[#ff6b00] transition">MicroVM Runtime</a></li>
        <li><a href="/security" class="hover:text-[#ff6b00] transition">Proof of Enclave</a></li>
        <li><a href="/publisher" class="hover:text-[#ff6b00] transition">Consensus Ledger</a></li>
        <li><a href="/admin" class="hover:text-[#ff6b00] transition text-[#a0a2a4]/70">Admin Console &rarr;</a></li>
      </ul>
    </div>
    
    <div>
      <h4 class="text-xs font-bold uppercase tracking-wider text-white mb-4 font-mono">Publishers</h4>
      <ul class="space-y-2 text-xs text-[#a0a2a4]">
        <li><a href="/publisher" class="hover:text-[#ff6b00] transition">Agent Registry</a></li>
        <li><a href="/docs" class="hover:text-[#ff6b00] transition">Publishing CLI</a></li>
        <li><a href="/publisher" class="hover:text-[#ff6b00] transition">Revenue Splitting (85%)</a></li>
        <li><a href="/security" class="hover:text-[#ff6b00] transition">Contract Audits</a></li>
      </ul>
    </div>
    
    <div>
      <h4 class="text-xs font-bold uppercase tracking-wider text-white mb-4 font-mono">Resources & Support</h4>
      <ul class="space-y-2 text-xs text-[#a0a2a4]">
        <li><a href="/docs" class="hover:text-[#ff6b00] transition">MCP Specification</a></li>
        <li><a href="/support" class="hover:text-[#ff6b00] transition">24/7 AI Support Bot</a></li>
        <li><a href="/security" class="hover:text-[#ff6b00] transition">Security Attestation</a></li>
        <li><a href="/admin" class="hover:text-[#ff6b00] transition text-[#a0a2a4]/50">Operations Portal</a></li>
      </ul>
    </div>
  </div>
  
  <div class="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#a0a2a4]">
    <span>&copy; 2026 SkillBridge Technologies Inc. All rights reserved. Production Genesis Node #0412</span>
    <div class="flex items-center space-x-4 mt-2 sm:mt-0">
      <span>System Status: <strong class="text-[#ff6b00]">99.992%</strong></span>
      <span>&bull;</span>
      <span>Confidential Computing</span>
      <span>&bull;</span>
      <a href="/admin" class="hover:text-[#ff6b00] transition text-[#a0a2a4]/70">Staff Access</a>
    </div>
  </div>
</footer>
`;
}

// --- 3. FLOATING SUPPORT BUTTON ---
function getFloatingSupportButton() {
  return `
<!-- Floating Quick Support Pill -->
<div id="floating-support-btn-container" class="fixed bottom-6 right-6 z-50">
  <button onclick="if(typeof openSupportModal==='function'){openSupportModal('create');}else{window.location.href='/support';}" class="flex items-center space-x-2.5 px-4 py-2.5 rounded-full bg-[#ff6b00] hover:bg-[#ff8533] text-white text-xs font-bold shadow-xl shadow-[#ff6b00]/30 border border-white/20 transition-all transform hover:-translate-y-0.5 group cursor-pointer">
    <span class="relative flex h-2 w-2">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
      <span class="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
    </span>
    <span class="material-symbols-outlined text-sm">support_agent</span>
    <span>Report Issue / Ask AI Support</span>
  </button>
</div>
`;
}

// Target Directories for Synchronization
const targetsDirs = [
  path.join(process.cwd()),
  path.join(process.cwd(), "public"),
  path.join(process.cwd(), "packages", "gateway", "public"),
  path.join(process.cwd(), "apps", "web", "public")
];

function syncFile(fileName, content) {
  for (const tDir of targetsDirs) {
    if (!fs.existsSync(tDir)) continue;
    const dest = path.join(tDir, fileName);
    fs.writeFileSync(dest, content, "utf8");
    console.log(`Synced ${fileName} -> ${dest}`);
  }
}

// --- 4. COMPILE USER-FACING MARKETPLACE (index.html) ---
function compileMarketplace() {
  const { execSync } = require("child_process");
  let content;
  if (fs.existsSync(path.join(process.cwd(), "scratch_index_prev_utf8.html"))) {
    content = fs.readFileSync(path.join(process.cwd(), "scratch_index_prev_utf8.html"), "utf8");
  } else {
    content = execSync("git show 14ed7af:index.html", { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 });
  }

  // A. Replace head typography and styling with Stitch Google Fonts + Luxury Dark Palette
  const stitchHeadStyles = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            primary: '#ff6b00',
            'primary-hover': '#ff8533',
            'primary-container': '#ff6b00',
            'surface-dark': '#121415',
            'surface-card': '#1b1b1f',
            'surface-elevated': '#232527',
            'surface-high': '#2f3132',
            'surface-highest': '#333537',
            'outline-border': 'rgba(255, 255, 255, 0.08)'
          },
          fontFamily: {
            headline: ['Space Grotesk', 'sans-serif'],
            body: ['Inter', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace']
          }
        }
      }
    }
  </script>
  <style>
    body { font-family: 'Inter', sans-serif; background-color: #121415; color: #e2e2e4; }
    h1, h2, h3, h4, .font-headline { font-family: 'Space Grotesk', sans-serif; }
    code, pre, .font-mono { font-family: 'JetBrains Mono', monospace; }
    .glass-panel {
      background: rgba(27, 27, 31, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .glow-radial {
      background: radial-gradient(circle at 50% 0%, rgba(255, 107, 0, 0.12) 0%, rgba(18, 20, 21, 0) 70%);
    }
    .scrollbar-none::-webkit-scrollbar { display: none; }
    .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
  </style>
`;
  content = content.replace(/<script src="https:\/\/cdn.tailwindcss.com">[\s\S]*?<\/style>/, stitchHeadStyles);

  // B. Replace Top Announcement + Navbar with Public User Header (NO War Room, NO Launchpad)
  const headerReplacementRegex = /<aside aria-label="Announcement"[\s\S]*?<\/header>/;
  content = content.replace(headerReplacementRegex, getPublicUserHeader("marketplace"));

  // C. Replace Body Class with Obsidian
  content = content.replace(/<body class="bg-\[#070B14\][^"]*"/, `<body class="bg-[#121415] text-[#e2e2e4] min-h-screen flex flex-col selection:bg-[#ff6b00] selection:text-white"`);

  // D. Replace Live Ticker styling with Stitch amber
  const tickerOldRegex = /<!-- Live Micro-Transaction Activity Ticker -->[\s\S]*?<\/div>\s*<\/div>/;
  const tickerNew = `
  <!-- Live Micro-Transaction Activity Ticker -->
  <div class="border-b border-white/5 bg-[#161819] py-2 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-4 text-xs font-mono text-[#a0a2a4]">
      <div class="flex items-center space-x-2 text-[#ff6b00] font-bold uppercase tracking-wider flex-shrink-0">
        <span class="h-2 w-2 rounded-full bg-[#ff6b00] animate-ping"></span>
        <span class="text-[11px]">Live Gateway Ledger</span>
      </div>
      <div id="live-ticker-text" class="truncate text-[#e2e2e4] text-[11px] animate-pulse">
        ⚡ [122ms] skill_chaos_load_tester simulated 15k RPS surge &bull; ⚡ [118ms] skill_multi_agent_consensus settled $0.85 to SwarmZero AI &bull; ⚡ [94ms] skill_zero_downtime_migrator executed 0-lock plan &bull; ⚡ [142ms] skill_rag_chunk_optimizer compressed 58% tokens &bull; ⚡ [110ms] skill_deepsec_audit passed with 0 leaks
      </div>
    </div>
  </div>`;
  content = content.replace(tickerOldRegex, tickerNew);

  // E. Replace Hero styling
  content = content.replace(/bg-indigo-500\/10 border border-indigo-500\/20 text-indigo-300/, `bg-[#ff6b00]/10 border border-[#ff6b00]/25 text-[#ff6b00] font-mono`);
  content = content.replace(/bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400/, `text-[#ff6b00] font-bold`);
  content = content.replace(/bg-indigo-600 hover:bg-indigo-500 text-white/, `bg-[#ff6b00] hover:bg-[#ff8533] text-white font-bold`);
  content = content.replace(/border-indigo-500\/30/g, `border-white/10`);
  content = content.replace(/text-indigo-400 font-mono/g, `text-[#ff6b00] font-mono`);

  // F. Replace Footer with Public User Footer
  content = content.replace(/<footer[\s\S]*?<\/footer>/, getPublicUserFooter());

  // G. Replace floating support button
  content = content.replace(/<div id="floating-support-btn-container"[\s\S]*?<\/div>\s*<\/div>/, getFloatingSupportButton());
  if (!content.includes("floating-support-btn-container")) {
    content = content.replace(/<\/body>/, getFloatingSupportButton() + "\n</body>");
  }

  // H. Replace card rendering styling in renderGrid() with Stitch Obsidian Glass
  const oldCardTpl = `<div class="glass-panel hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden">`;
  const newCardTpl = `<div class="glass-panel hover:border-[#ff6b00]/50 hover:shadow-2xl hover:shadow-[#ff6b00]/10 transition-all duration-300 rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden bg-[#1b1b1f] border border-white/10">`;
  content = content.replace(oldCardTpl, newCardTpl);
  content = content.replace(/text-white mt-3\.5 tracking-tight group-hover:text-indigo-300/, `text-white mt-3.5 tracking-tight group-hover:text-[#ff6b00] font-['Space_Grotesk']`);
  content = content.replace(/bg-indigo-600\/10 hover:bg-indigo-600 text-indigo-300 hover:text-white px-3\.5 py-1\.5 rounded-xl border border-indigo-500\/30/, `bg-[#ff6b00]/15 hover:bg-[#ff6b00] text-[#ff6b00] hover:text-white px-3.5 py-1.5 rounded-xl border border-[#ff6b00]/30 font-bold`);

  // I. In Category Filter Tabs, use Stitch styling
  content = content.replace(/bg-indigo-600/g, `bg-[#ff6b00]`);

  
  // Clean special character artifacts
  content = content.replace(/ΓÜí/g, "⚡");
  content = content.replace(/Γ£ò/g, "✕");
  content = content.replace(/Γ£ô/g, "✓");
  content = content.replace(/≡fÆ┐/g, "⚡");
  content = content.replace(/≡fôª/g, "📋");
  content = content.replace(/≡fôï/g, "📋");
  content = content.replace(/≡fñû/g, "🤖");
  content = content.replace(/ΓÇó/g, "•");
  content = content.replace(/ΓÇö/g, "—");
  content = content.replace(/Γ₧ò/g, "+");
  content = content.replace(/ΓÜá∩╕Å/g, "⚠️");
  content = content.replace(/≡ƒ[a-zA-Z0-9_]*/g, "");
  content = content.replace(/Γ[a-zA-Z0-9_]*/g, "");
  content = content.replace(/&bull;/g, "•");

  syncFile("index.html", content);
}

// --- 5. COMPILE PUBLIC USER SUB-PAGES ---
const publicSubPages = [
  { folder: "skillbridge_microvm_ide_enclave_playground", route: "playground", fileName: "playground.html", title: "SkillBridge | MicroVM Enclave Playground" },
  { folder: "skillbridge_publisher_studio_escrow_ledger", route: "publisher", fileName: "publisher.html", title: "SkillBridge | Publisher Studio & Escrow Ledger (85% Split)" },
  { folder: "skillbridge_mcp_setup_developer_docs", route: "docs", fileName: "docs.html", title: "SkillBridge | 1-Click MCP Setup & Developer Docs" },
  { folder: "skillbridge_security_attestation_whitepaper", route: "security", fileName: "security.html", title: "SkillBridge | Hardware Attestation & Zero-Leak Whitepaper" },
  { folder: "skillbridge_support_center_autonomous_ai_bot", route: "support", fileName: "support.html", title: "SkillBridge Support & Resolution Center | Autonomous AI Bot" }
];

function compilePublicSubPages() {
  for (const p of publicSubPages) {
    const srcPath = path.join(STITCH_BASE, p.folder, "code.html");
    if (!fs.existsSync(srcPath)) continue;
    let html = fs.readFileSync(srcPath, "utf8");

    // Replace title
    if (html.includes("<title>")) {
      html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${p.title}</title>`);
    } else {
      html = html.replace(/<head>/, `<head>\n<title>${p.title}</title>`);
    }

    // Replace header with Public User Header (NO War Room, NO Launchpad!)
    html = html.replace(/<header[\s\S]*?<\/header>/, getPublicUserHeader(p.route));

    // Replace footer with Public User Footer
    html = html.replace(/<footer[\s\S]*?<\/footer>/, getPublicUserFooter());

    // Inject floating support button
    if (!html.includes("floating-support-btn-container")) {
      html = html.replace(/<\/body>/, getFloatingSupportButton() + "\n</body>");
    }

    // Fix raw stitch links
    html = html.replace(/href="#" data-path="marketplace"/g, 'href="/"');
    html = html.replace(/href="#" data-path="ide-and-enclave-playground"/g, 'href="/playground"');
    html = html.replace(/href="#" data-path="publisher-studio-and-ledger"/g, 'href="/publisher"');
    html = html.replace(/href="#" data-path="docs-and-mcp-config"/g, 'href="/docs"');
    html = html.replace(/href="#" data-path="security-whitepaper"/g, 'href="/security"');
    html = html.replace(/href="#" data-path="ai-support"/g, 'href="/support"');
    // Remove internal war-room links from user content
    html = html.replace(/href="#" data-path="war-room-and-telemetry"/g, 'href="/playground"');

    syncFile(p.fileName, html);
  }
}

// --- 6. COMPILE SEPARATE DEDICATED ADMIN PORTAL (admin.html) ---
function compileAdminPortal() {
  const execSrc = path.join(process.cwd(), "packages", "gateway", "executive.html");
  let content = fs.readFileSync(execSrc, "utf8");

  // Admin Header
  const adminHeader = `
<!-- Admin Operations Header -->
<header class="sticky top-0 z-50 bg-[#121415]/95 backdrop-blur-xl border-b border-rose-500/20 shadow-[0_1px_12px_rgba(244,63,94,0.15)]">
  <div class="max-w-7xl mx-auto h-20 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
    <div class="flex items-center gap-4 shrink-0">
      <a href="/admin" class="flex items-center gap-3 group">
        <img alt="SkillBridge Logo" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UaICitA37g_MPC4BeiTnjynEuRZbSpbHZd30T-MMDasK2U9N4QdYuCZ9qMQQbLF3f7rfl6F6CEix6NSdoym5nuwqMNVGuNwa9UbzW31u5ySY79WGQP06iJylJLZN1gkFPoIgV6Rmrv06vGxtJrxyhPy6LTsP-RDMNsd9e0UAlEYBk-dW7SHsCEZ4s_IBDfFyy6vHUbxkFK3iHSxD0D56CpA4frLDdn9_VI1NXXTd9m7JKO8lc1AH9whED4"/>
        <div class="flex flex-col">
          <span class="text-lg tracking-tight text-white flex items-center gap-2 font-bold font-['Space_Grotesk']">
            SkillBridge <span class="text-rose-500">ADMIN CONSOLE</span>
          </span>
          <span class="text-[10px] text-rose-400 font-mono tracking-wider uppercase flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
            RESTRICTED ACCESS • LEVEL 4 CLEARANCE • AEGIS-ONE ONLINE
          </span>
        </div>
      </a>
    </div>

    <!-- Admin Switcher Tabs -->
    <div class="hidden md:flex items-center gap-2 p-1 bg-[#1b1b1f] rounded-xl border border-white/10 text-xs font-semibold">
      <button onclick="switchAdminSection('warroom')" id="btn-admin-warroom" class="px-3 py-1.5 rounded-lg bg-rose-600 text-white shadow">🧠 War Room & Telemetry</button>
      <button onclick="switchAdminSection('marketing')" id="btn-admin-marketing" class="px-3 py-1.5 rounded-lg text-[#a0a2a4] hover:text-white">🚀 DevRel & Meme Studio</button>
      <button onclick="switchAdminSection('fleet')" id="btn-admin-fleet" class="px-3 py-1.5 rounded-lg text-[#a0a2a4] hover:text-white">🛡️ Fleet Infrastructure</button>
    </div>
    
    <div class="flex items-center gap-3">
      <button onclick="triggerAutonomousCycle()" class="px-3 py-1.5 rounded-xl bg-[#232527] hover:bg-[#2f3132] text-xs font-mono text-cyan-300 border border-cyan-500/30 flex items-center space-x-1.5">
        <span class="material-symbols-outlined text-sm">sync</span>
        <span>Run Cycle</span>
      </button>
      <a href="/" class="text-xs font-bold text-[#a0a2a4] hover:text-white px-3 py-1.5 rounded-xl bg-[#1b1b1f] border border-white/10 hover:border-white/20 transition flex items-center gap-1">
        <span>&larr; Public Marketplace</span>
      </a>
    </div>
  </div>
</header>
`;

  content = content.replace(/<header[\s\S]*?<\/header>/, adminHeader);
  content = content.replace(/<title>[\s\S]*?<\/title>/, `<title>SkillBridge Sovereign Admin & Executive Console</title>`);

  // Append Admin section switcher script
  const adminSwitcherScript = `
<script>
  function switchAdminSection(section) {
    const btnW = document.getElementById('btn-admin-warroom');
    const btnM = document.getElementById('btn-admin-marketing');
    const btnF = document.getElementById('btn-admin-fleet');
    if (btnW) btnW.className = section === 'warroom' ? 'px-3 py-1.5 rounded-lg bg-rose-600 text-white shadow' : 'px-3 py-1.5 rounded-lg text-[#a0a2a4] hover:text-white';
    if (btnM) btnM.className = section === 'marketing' ? 'px-3 py-1.5 rounded-lg bg-rose-600 text-white shadow' : 'px-3 py-1.5 rounded-lg text-[#a0a2a4] hover:text-white';
    if (btnF) btnF.className = section === 'fleet' ? 'px-3 py-1.5 rounded-lg bg-rose-600 text-white shadow' : 'px-3 py-1.5 rounded-lg text-[#a0a2a4] hover:text-white';
    
    // Smooth scroll to target
    if (section === 'marketing') {
      const el = document.getElementById('meme-img')?.closest('.glass-panel');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (section === 'fleet') {
      const el = document.getElementById('fleet-nodes-container') || document.querySelector('.glass-panel');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
</script>
`;
  content = content.replace(/<\/body>/, adminSwitcherScript + "\n</body>");

  syncFile("admin.html", content);
  syncFile("executive.html", content); // Keep executive.html synchronized for backwards compatibility
}

// Execute compilation
console.log("=== COMPILING SKILLBRIDGE SUITE ===");
compileMarketplace();
compilePublicSubPages();
compileAdminPortal();
console.log("=== COMPILATION COMPLETE ===");
