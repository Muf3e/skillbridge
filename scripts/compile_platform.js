const fs = require("fs");
const path = require("path");

const STITCH_BASE = path.join(
  process.env.USERPROFILE || "C:\\Users\\Mustafa",
  "Downloads",
  "stitch_skillbridge_agent_gateway (1)",
  "stitch_skillbridge_agent_gateway"
);

// --- 1. PUBLIC USER-FACING HEADER (Clean, simple, non-tech friendly) ---
function getPublicUserHeader(activeRoute) {
  const userLinks = [
    { id: "marketplace", label: "Tool Store", href: "/" },
    { id: "playground", label: "Try In Browser", href: "/playground" },
    { id: "publisher", label: "Sell Your Tool (85%)", href: "/publisher" },
    { id: "docs", label: "Beginner Guide", href: "/docs" },
    { id: "security", label: "Safety & Privacy", href: "/security" },
    { id: "support", label: "24/7 AI Help", href: "/support" }
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
  <span class="inline-block px-2 py-0.5 rounded-full bg-[#ff6b00]/15 text-[#ff6b00] font-bold text-[10px] uppercase tracking-wider border border-[#ff6b00]/30">Creator Opportunity</span>
  <span>Have a prompt or script? Turn it into a paid AI tool and keep <strong class="text-white">85% of all earnings</strong>.</span>
  <a href="/publisher" class="underline font-bold text-[#ff6b00] hover:text-white ml-1 transition">Start Selling &rarr;</a>
</aside>

<!-- Universal Public Header -->
<header class="sticky top-0 z-50 bg-[#121415]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
  <div class="max-w-7xl mx-auto h-20 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
    <div class="flex items-center gap-6 shrink-0">
      <a href="/" class="flex items-center gap-3 group">
        <img alt="SkillBridge Logo" class="h-8 w-auto object-contain transition-transform group-hover:scale-105" src="https://lh3.googleusercontent.com/aida/AEtjO1UaICitA37g_MPC4BeiTnjynEuRZbSpbHZd30T-MMDasK2U9N4QdYuCZ9qMQQbLF3f7rfl6F6CEix6NSdoym5nuwqMNVGuNwa9UbzW31u5ySY79WGQP06iJylJLZN1gkFPoIgV6Rmrv06vGxtJrxyhPy6LTsP-RDMNsd9e0UAlEYBk-dW7SHsCEZ4s_IBDfFyy6vHUbxkFK3iHSxD0D56CpA4frLDdn9_VI1NXXTd9m7JKO8lc1AH9whED4"/>
        <div class="flex flex-col">
          <span class="text-lg tracking-tight text-white flex items-center gap-1 font-bold font-['Space_Grotesk']">SkillBridge</span>
          <span class="text-[10px] text-[#ff6b00] font-semibold tracking-wide uppercase">The Simple App Store for AI</span>
        </div>
      </a>
      <nav class="hidden xl:flex items-center gap-1 p-1 bg-[#1b1b1f]/80 rounded-xl border border-white/5">
        ${navHtml}
      </nav>
    </div>
    
    <div class="flex items-center gap-3 shrink-0">
      <div class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1b1b1f] border border-white/5">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span class="text-xs text-[#a0a2a4]">100% Safe Cloud Execution • <span class="text-emerald-400 font-bold">Fast &amp; Private</span></span>
      </div>
      
      <div class="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#232527] border border-white/5">
        <span class="text-xs text-[#a0a2a4]">1-Click AI Setup:</span>
        <code class="text-xs text-white select-all font-mono">npx @skillbridge/cli setup</code>
        <button onclick="navigator.clipboard.writeText('npx @skillbridge/cli setup'); alert('1-Click setup command copied! Run this in your terminal to connect Claude, Cursor, or ChatGPT.');" class="hover:text-[#ff6b00] transition-colors text-[#a0a2a4]" type="button" title="Copy setup command">
          <span class="material-symbols-outlined text-sm">content_copy</span>
        </button>
      </div>

      <button onclick="if(typeof openWalletModal==='function'){openWalletModal();}else{alert('Your wallet balance: $24.15 USD. Ready to use any tool.');}" class="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#232527] hover:bg-[#2f3132] transition-all border border-white/10" type="button">
        <span class="material-symbols-outlined text-[#ff6b00] text-sm">account_balance_wallet</span>
        <span id="nav-wallet-balance" class="text-xs text-white font-bold">$24.15 Balance</span>
        <span class="text-xs text-[#ff6b00] font-bold">+ Top Up</span>
      </button>

      <button onclick="if(typeof openPublisherStudio==='function'){openPublisherStudio();}else{window.location.href='/publisher';}" class="bg-[#ff6b00] hover:bg-[#ff8533] text-white font-bold text-xs px-3.5 py-2 rounded-xl transition shadow-lg shadow-[#ff6b00]/25 active:scale-95 flex items-center space-x-1.5">
        <span>+ Earn 85% Sharing a Tool</span>
      </button>
    </div>
  </div>
</header>
`;
}

// --- 2. UNIVERSAL INSTITUTIONAL FOOTER ---
function getPublicUserFooter() {
  return `
<!-- Universal Institutional Footer -->
<footer class="bg-[#121415] border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
    <div class="md:col-span-2 space-y-4">
      <div class="flex items-center gap-2">
        <img alt="SkillBridge Logo" class="h-6 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UaICitA37g_MPC4BeiTnjynEuRZbSpbHZd30T-MMDasK2U9N4QdYuCZ9qMQQbLF3f7rfl6F6CEix6NSdoym5nuwqMNVGuNwa9UbzW31u5ySY79WGQP06iJylJLZN1gkFPoIgV6Rmrv06vGxtJrxyhPy6LTsP-RDMNsd9e0UAlEYBk-dW7SHsCEZ4s_IBDfFyy6vHUbxkFK3iHSxD0D56CpA4frLDdn9_VI1NXXTd9m7JKO8lc1AH9whED4"/>
        <span class="text-lg text-white font-bold font-['Space_Grotesk']">SkillBridge</span>
      </div>
      <p class="text-xs text-[#a0a2a4] max-w-sm leading-relaxed">
        The simple, safe App Store for AI tools. We let anyone give superpower skills to their AI assistants safely in the cloud with zero risk of computer viruses, zero leaked files, and a 100% money-back guarantee.
      </p>
      <div class="flex items-center gap-2 text-[10px] text-[#a0a2a4]">
        <span class="px-2 py-0.5 rounded bg-[#1b1b1f] border border-white/5 text-emerald-400 font-semibold">🛡️ 100% SAFE CLOUD LOCKBOX</span>
        <span class="px-2 py-0.5 rounded bg-[#1b1b1f] border border-white/5 text-cyan-400 font-semibold">⚡ FAST RESULTS (&lt; 0.2s)</span>
      </div>
    </div>
    
    <div>
      <h4 class="text-xs font-bold uppercase tracking-wider text-white mb-4 font-mono">Explore Tools</h4>
      <ul class="space-y-2 text-xs text-[#a0a2a4]">
        <li><a href="/" class="hover:text-[#ff6b00] transition">All Ready Tools</a></li>
        <li><a href="/playground" class="hover:text-[#ff6b00] transition">Try in Browser (Free)</a></li>
        <li><a href="/security" class="hover:text-[#ff6b00] transition">How We Keep You Safe</a></li>
        <li><a href="/admin" class="hover:text-[#ff6b00] transition text-[#a0a2a4]/50">Staff Portal &rarr;</a></li>
      </ul>
    </div>
    
    <div>
      <h4 class="text-xs font-bold uppercase tracking-wider text-white mb-4 font-mono">For Creators</h4>
      <ul class="space-y-2 text-xs text-[#a0a2a4]">
        <li><a href="/publisher" class="hover:text-[#ff6b00] transition">Sell a Tool (Keep 85%)</a></li>
        <li><a href="/docs" class="hover:text-[#ff6b00] transition">Step-by-Step Guide</a></li>
        <li><a href="/publisher" class="hover:text-[#ff6b00] transition">Creator Payouts</a></li>
      </ul>
    </div>
    
    <div>
      <h4 class="text-xs font-bold uppercase tracking-wider text-white mb-4 font-mono">Help &amp; Support</h4>
      <ul class="space-y-2 text-xs text-[#a0a2a4]">
        <li><a href="/support" class="hover:text-[#ff6b00] transition">24/7 AI Help Center</a></li>
        <li><a href="/docs" class="hover:text-[#ff6b00] transition">Beginner's Guide</a></li>
        <li><a href="/security" class="hover:text-[#ff6b00] transition">Privacy Guarantee</a></li>
      </ul>
    </div>
  </div>
  
  <div class="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#a0a2a4]">
    <span>&copy; 2026 SkillBridge Inc. All rights reserved. Simple, secure tools for everyday AI users.</span>
    <div class="flex items-center space-x-4 mt-2 sm:mt-0">
      <span>System Status: <strong class="text-emerald-400">100% Operational</strong></span>
      <span>&bull;</span>
      <span>100% Safe Cloud Execution</span>
      <span>&bull;</span>
      <a href="/admin" class="hover:text-[#ff6b00] transition text-[#a0a2a4]/50">Staff Access</a>
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
    <span>Need Help? Ask AI Support (24/7)</span>
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

  // D. Replace Live Ticker with Simple, Friendly Activity
  const tickerOldRegex = /<!-- Live Micro-Transaction Activity Ticker -->[\s\S]*?<\/div>\s*<\/div>/;
  const tickerNew = `
  <!-- Live Activity Ticker -->
  <div class="border-b border-white/5 bg-[#161819] py-2 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-4 text-xs font-mono text-[#a0a2a4]">
      <div class="flex items-center space-x-2 text-[#ff6b00] font-bold uppercase tracking-wider flex-shrink-0">
        <span class="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
        <span class="text-[11px]">Live Activity</span>
      </div>
      <div id="live-ticker-text" class="truncate text-[#e2e2e4] text-[11px]">
        ⚡ Someone tested "Legal Contract Risk Scorer" — 0 risks found &bull; ⚡ Tool Creator received $0.42 payout &bull; ⚡ "Website Performance Audit" completed in 0.14s &bull; ⚡ "Social Media Ad Copy Generator" created 3 variations &bull; ⚡ "Smart Contract Security Scanner" verified 0 vulnerabilities
      </div>
    </div>
  </div>`;
  content = content.replace(tickerOldRegex, tickerNew);

  // E. Replace Hero Section with Beginner-Friendly Design & 3 Simple Steps
  const heroOldRegex = /<!-- Hero Section -->[\s\S]*?<\/section>/;
  const heroNew = `
  <!-- Hero Section -->
  <section class="relative pt-14 pb-16 overflow-hidden glow-radial border-b border-white/5">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
      <div class="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold mb-6 shadow-inner">
        <span class="flex h-2 w-2 relative">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span>Simple, Safe &amp; Private • Works with Claude, Cursor, ChatGPT &amp; Web</span>
      </div>
      
      <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.15]">
        The Easy App Store for <br class="hidden sm:inline" />
        <span class="text-[#ff6b00]">AI Skills &amp; Tools</span>
      </h1>
      
      <p class="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-[#a0a2a4] leading-relaxed font-normal">
        Just like downloading apps onto your phone, SkillBridge lets you add real-world skills to your AI in 1 click. Review contracts, test websites, make graphics, or check code—safely in the cloud without ever risking your computer or passwords.
      </p>

      <!-- 3 Easy Steps for Complete Beginners -->
      <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
        <div class="bg-[#1b1b1f] border border-white/10 rounded-2xl p-5 hover:border-[#ff6b00]/30 transition shadow-lg">
          <div class="w-10 h-10 rounded-xl bg-[#ff6b00]/15 text-[#ff6b00] flex items-center justify-center font-bold text-lg mb-3">1</div>
          <h3 class="text-base font-bold text-white mb-1 font-['Space_Grotesk']">Pick Any Tool</h3>
          <p class="text-xs text-[#a0a2a4] leading-relaxed">Browse 20 ready-to-use tools below. From business contracts to web testing, pick whatever you need done.</p>
        </div>
        <div class="bg-[#1b1b1f] border border-white/10 rounded-2xl p-5 hover:border-[#ff6b00]/30 transition shadow-lg">
          <div class="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center font-bold text-lg mb-3">2</div>
          <h3 class="text-base font-bold text-white mb-1 font-['Space_Grotesk']">Test Free in 1-Click</h3>
          <p class="text-xs text-[#a0a2a4] leading-relaxed">Click "Try Live Demo" to run it right in your browser, or copy a 1-line command to add it to your AI app.</p>
        </div>
        <div class="bg-[#1b1b1f] border border-white/10 rounded-2xl p-5 hover:border-[#ff6b00]/30 transition shadow-lg">
          <div class="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold text-lg mb-3">3</div>
          <h3 class="text-base font-bold text-white mb-1 font-['Space_Grotesk']">100% Safe Cloud Bubble</h3>
          <p class="text-xs text-[#a0a2a4] leading-relaxed">Runs in a locked cloud sandbox. Zero risk of computer viruses, zero leaked files, and a 100% money-back guarantee.</p>
        </div>
      </div>

      <!-- Quick 1-Click Setup Widget for Tech & Non-Tech users -->
      <div class="mt-8 max-w-xl mx-auto">
        <div class="bg-[#1b1b1f] p-2.5 rounded-2xl flex items-center justify-between space-x-3 shadow-xl border border-white/10">
          <div class="flex items-center space-x-3 pl-3 overflow-hidden">
            <span class="text-[#ff6b00] font-mono text-sm font-bold select-none">&gt;</span>
            <code id="cli-cmd-display" class="text-xs sm:text-sm font-mono text-slate-200 truncate select-all">npx @skillbridge/cli setup</code>
          </div>
          <button 
            onclick="copyCliCommand()" 
            id="copy-cli-btn"
            class="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#ff6b00] hover:bg-[#ff8533] text-white font-bold text-xs transition duration-150 shadow-md flex-shrink-0"
          >
            <span class="material-symbols-outlined text-sm">content_copy</span>
            <span>Copy 1-Click Setup</span>
          </button>
        </div>
        <div class="mt-2 text-xs text-[#a0a2a4] text-center flex items-center justify-center space-x-2">
          <span>✨ Automatically connects to Claude, Cursor &amp; Windsurf in 3 seconds</span>
        </div>
      </div>

      <!-- Trust Metrics Badges -->
      <div class="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left border-t border-white/5 pt-8">
        <div class="bg-[#1b1b1f] p-4 rounded-xl border border-white/5">
          <div class="text-2xl sm:text-3xl font-black text-white">85%</div>
          <div class="text-xs text-[#a0a2a4] font-medium mt-1">Paid to Tool Creators</div>
        </div>
        <div class="bg-[#1b1b1f] p-4 rounded-xl border border-white/5">
          <div class="text-2xl sm:text-3xl font-black text-cyan-400">&lt; 0.2s</div>
          <div class="text-xs text-[#a0a2a4] font-medium mt-1">Superfast Cloud Speed</div>
        </div>
        <div class="bg-[#1b1b1f] p-4 rounded-xl border border-white/5">
          <div class="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
          <div class="text-xs text-[#a0a2a4] font-medium mt-1">Money-Back Guarantee</div>
        </div>
        <div class="bg-[#1b1b1f] p-4 rounded-xl border border-white/5">
          <div class="text-2xl sm:text-3xl font-black text-[#ff6b00]">100% Safe</div>
          <div class="text-xs text-[#a0a2a4] font-medium mt-1">Zero File or Password Leaks</div>
        </div>
      </div>
    </div>
  </section>`;
  content = content.replace(heroOldRegex, heroNew);

  // F. Replace Marketplace Header and Search with Friendly Labels
  const marketHeaderOld = /<div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800\/80">[\s\S]*?<\/div>\s*<\/div>/;
  const marketHeaderNew = `
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
      <div>
        <div class="flex items-center space-x-3">
          <h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight font-['Space_Grotesk']">Ready-to-Use AI Tools</h2>
          <span id="skill-count-badge" class="text-xs bg-[#ff6b00]/20 text-[#ff6b00] font-bold px-3 py-1 rounded-full border border-[#ff6b00]/30">20 Tools Available</span>
        </div>
        <p class="text-sm text-[#a0a2a4] mt-1">Pick any tool to test it free in your browser right now, or click to add it to your AI.</p>
      </div>

      <!-- Quick Search Bar -->
      <div class="relative w-full md:w-80">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#a0a2a4]">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>
        <input 
          id="search-input"
          type="text" 
          placeholder="Search tools (e.g. contracts, website, meme)..." 
          oninput="handleSearch(this.value)"
          class="w-full bg-[#1b1b1f] border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-[#a0a2a4] focus:outline-none focus:border-[#ff6b00] focus:ring-1 focus:ring-[#ff6b00] transition shadow-inner"
        />
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <kbd class="text-[10px] font-mono text-[#a0a2a4] bg-[#232527] px-1.5 py-0.5 rounded border border-white/10">/</kbd>
        </div>
      </div>
    </div>`;
  content = content.replace(marketHeaderOld, marketHeaderNew);

  // G. Replace Category Filter Tabs with Friendly Categories
  const catOldRegex = /<!-- Category Filter Tabs -->[\s\S]*?<\/div>/;
  const catNew = `
    <!-- Category Filter Tabs -->
    <div class="flex items-center space-x-2 overflow-x-auto py-4 scrollbar-none">
      <button onclick="filterCategory('all')" id="tab-all" class="category-tab text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-[#ff6b00] text-white whitespace-nowrap shadow-sm">All Tools (20)</button>
      <button onclick="filterCategory('Legal')" id="tab-Legal" class="category-tab text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-[#1b1b1f] text-[#a0a2a4] hover:text-white border border-white/10 whitespace-nowrap transition">Contracts &amp; Legal</button>
      <button onclick="filterCategory('Marketing')" id="tab-Marketing" class="category-tab text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-[#1b1b1f] text-[#a0a2a4] hover:text-white border border-white/10 whitespace-nowrap transition">Marketing &amp; Social</button>
      <button onclick="filterCategory('Security')" id="tab-Security" class="category-tab text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-[#1b1b1f] text-[#a0a2a4] hover:text-white border border-white/10 whitespace-nowrap transition">Security &amp; Safety</button>
      <button onclick="filterCategory('Engineering')" id="tab-Engineering" class="category-tab text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-[#1b1b1f] text-[#a0a2a4] hover:text-white border border-white/10 whitespace-nowrap transition">Coding &amp; Web</button>
      <button onclick="filterCategory('Database')" id="tab-Database" class="category-tab text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-[#1b1b1f] text-[#a0a2a4] hover:text-white border border-white/10 whitespace-nowrap transition">Database &amp; Data</button>
      <button onclick="filterCategory('Finance')" id="tab-Finance" class="category-tab text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-[#1b1b1f] text-[#a0a2a4] hover:text-white border border-white/10 whitespace-nowrap transition">Business &amp; Finance</button>
      <button onclick="filterCategory('AI Ops')" id="tab-AI-Ops" class="category-tab text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-[#1b1b1f] text-[#a0a2a4] hover:text-white border border-white/10 whitespace-nowrap transition">AI Optimization</button>
      <button onclick="filterCategory('DevOps')" id="tab-DevOps" class="category-tab text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-[#1b1b1f] text-[#a0a2a4] hover:text-white border border-white/10 whitespace-nowrap transition">Cloud &amp; DevOps</button>
      <button onclick="filterCategory('Biotech')" id="tab-Biotech" class="category-tab text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-[#1b1b1f] text-[#a0a2a4] hover:text-white border border-white/10 whitespace-nowrap transition">Science &amp; Health</button>
    </div>`;
  content = content.replace(catOldRegex, catNew);

  // H. Replace Footer
  content = content.replace(/<footer[\s\S]*?<\/footer>/, getPublicUserFooter());

  // Remove old duplicate floating support button
  content = content.replace(/<!-- Floating Support & Feedback FAB -->[\s\S]*?<\/div>\s*<\/div>/, "");

  // I. Replace Floating Support Button
  content = content.replace(/<div id="floating-support-btn-container"[\s\S]*?<\/div>\s*<\/div>/, getFloatingSupportButton());
  if (!content.includes("floating-support-btn-container")) {
    content = content.replace(/<\/body>/, getFloatingSupportButton() + "\n</body>");
  }

  // J. Simplify the Playground Modal in index.html
  const modalPlayOld = /<!-- MODAL 1: Interactive Live Demo Playground[\s\S]*?<!-- MODAL 2: Publisher Studio/;
  const modalPlayNew = `<!-- MODAL 1: Interactive Live Demo Playground -->
  <div id="playground-modal" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 hidden flex items-center justify-center p-4">
    <div class="bg-[#1b1b1f] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
      <div class="p-6 border-b border-white/10 flex items-center justify-between">
        <div>
          <h3 id="modal-title" class="text-lg font-bold text-white font-['Space_Grotesk']">Test This AI Tool Live</h3>
          <p id="modal-author" class="text-xs text-[#ff6b00] mt-0.5 font-medium"></p>
        </div>
        <button onclick="closeModal('playground-modal')" class="text-[#a0a2a4] hover:text-white text-sm font-semibold p-1">✕ Close</button>
      </div>

      <!-- Playground Tabs -->
      <div class="flex border-b border-white/10 bg-[#161819] px-6 text-xs font-semibold">
        <button onclick="switchPlaygroundTab('exec')" id="tab-play-exec" class="py-2.5 px-3 border-b-2 border-[#ff6b00] text-[#ff6b00]">▶ Try It Live</button>
        <button onclick="switchPlaygroundTab('mcp')" id="tab-play-mcp" class="py-2.5 px-3 border-b-2 border-transparent text-[#a0a2a4] hover:text-white">🤖 Connect to Your AI (Claude / Cursor)</button>
        <button onclick="switchPlaygroundTab('curl')" id="tab-play-curl" class="py-2.5 px-3 border-b-2 border-transparent text-[#a0a2a4] hover:text-white">💻 For Developers (API / cURL)</button>
      </div>

      <div class="p-6 space-y-4 overflow-y-auto flex-1">
        <!-- Tab 1: Execution -->
        <div id="panel-play-exec" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-white mb-2">Your Request / Test Data (feel free to edit or use the sample below):</label>
            <textarea id="modal-input" rows="4" class="w-full bg-[#121415] border border-white/10 rounded-xl p-3 font-mono text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-[#ff6b00]"></textarea>
          </div>

          <button id="modal-run-btn" onclick="executeRemoteSkill()" class="w-full bg-[#ff6b00] hover:bg-[#ff8533] font-bold text-white py-3 rounded-xl shadow-lg shadow-[#ff6b00]/20 transition flex items-center justify-center space-x-2">
            <span>▶ Run This Tool (Free Instant Preview)</span>
          </button>

          <div class="flex items-center justify-between text-[11px] text-[#a0a2a4] px-1">
            <span class="flex items-center gap-1 text-emerald-400">
              <span class="material-symbols-outlined text-sm">security</span>
              <span>Runs safely in the cloud — your computer is 100% protected</span>
            </span>
            <button onclick="reportActiveSkillIssue()" class="text-[#ff6b00] hover:underline font-medium flex items-center space-x-1">
              <span>Need help with this tool?</span>
            </button>
          </div>

          <!-- Result Box -->
          <div id="modal-result-box" class="hidden">
            <div class="flex items-center justify-between text-xs text-[#a0a2a4] mb-1.5">
              <span class="font-bold text-white flex items-center gap-1.5">
                <span class="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
                <span>Result from AI Tool:</span>
              </span>
              <span id="modal-timing" class="font-mono text-emerald-400 text-xs"></span>
            </div>
            <pre id="modal-output" class="bg-[#121415] border border-white/10 p-4 rounded-xl text-xs font-mono text-emerald-300 overflow-x-auto max-h-60 leading-relaxed"></pre>

            <!-- Quick Report Issue Button -->
            <div class="mt-3 flex items-center justify-between bg-[#161819] border border-white/10 rounded-xl p-3">
              <div class="text-[11px] text-[#a0a2a4]">
                <span class="font-semibold text-white">Have a question or noticed something unexpected?</span>
                <p>Our friendly 24/7 AI Support Agent is ready to help explain the result.</p>
              </div>
              <button onclick="reportActiveSkillIssue()" class="text-xs bg-[#232527] hover:bg-[#2f3132] text-white border border-white/10 px-3 py-1.5 rounded-lg font-semibold transition flex items-center space-x-1.5 flex-shrink-0 ml-2">
                <span>💬 Ask AI Support</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Tab 2: MCP Config -->
        <div id="panel-play-mcp" class="hidden space-y-4">
          <div class="bg-[#161819] p-4 rounded-xl border border-white/10">
            <h4 class="text-sm font-bold text-white mb-1 font-['Space_Grotesk']">How to use this tool in Claude or Cursor</h4>
            <p class="text-xs text-[#a0a2a4] leading-relaxed">
              Run this 1-line command in your terminal. It automatically detects and adds this tool to Claude Desktop, Cursor, or Windsurf in less than 3 seconds:
            </p>
            <div class="mt-3 flex items-center justify-between bg-[#121415] border border-white/10 rounded-xl p-3 font-mono text-xs text-[#ff6b00]">
              <span id="modal-mcp-cli-cmd">npx -y @skillbridge/cli setup</span>
              <button onclick="copyCommand('npx -y @skillbridge/cli setup')" class="bg-[#ff6b00] hover:bg-[#ff8533] text-white font-semibold px-3 py-1.5 rounded-lg text-xs transition">
                Copy Command
              </button>
            </div>
          </div>

          <div>
            <p class="text-xs text-[#a0a2a4] mb-2">Or copy the configuration block manually:</p>
            <pre id="modal-mcp-code" class="bg-[#121415] border border-white/10 p-4 rounded-xl text-xs font-mono text-cyan-300 overflow-x-auto"></pre>
            <button onclick="copyCommand(document.getElementById('modal-mcp-code').innerText)" class="mt-2 text-xs bg-[#232527] hover:bg-[#2f3132] text-white font-semibold px-3 py-1.5 rounded-lg border border-white/10">Copy Configuration</button>
          </div>
        </div>

        <!-- Tab 3: cURL & SDK -->
        <div id="panel-play-curl" class="hidden space-y-3">
          <p class="text-xs text-[#a0a2a4]">For software engineers who want to call this skill via HTTP API:</p>
          <pre id="modal-curl-code" class="bg-[#121415] border border-white/10 p-4 rounded-xl text-xs font-mono text-amber-300 overflow-x-auto"></pre>
          <button onclick="copyCommand(document.getElementById('modal-curl-code').innerText)" class="text-xs bg-[#232527] hover:bg-[#2f3132] text-white font-semibold px-3 py-1.5 rounded-lg border border-white/10">Copy cURL Snippet</button>
        </div>
      </div>
    </div>
  </div>

  <!-- MODAL 2: Publisher Studio`;
  content = content.replace(modalPlayOld, modalPlayNew);

  // K. Update Card Rendering Template in renderGrid() with Friendly Layout
  const renderCardOld = /grid\.innerHTML = filtered\.map\(s => \{[\s\S]*?\}\)\.join\(""\);/;
  const renderCardNew = `grid.innerHTML = filtered.map(s => {
        const color = getCategoryColor(s.category);
        const creatorSplit = (s.priceNum * 0.85).toFixed(2);
        return \`
        <div class="glass-panel hover:border-[#ff6b00]/50 hover:shadow-2xl hover:shadow-[#ff6b00]/10 transition-all duration-300 rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden bg-[#1b1b1f] border border-white/10">
          <div>
            <div class="flex items-center justify-between gap-2">
              <span class="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full \${color.bg} \${color.text} border \${color.border}">
                \${s.category}
              </span>
              <div class="text-right">
                <span class="text-sm font-extrabold text-white">\${s.price}</span>
                <div class="text-[10px] text-emerald-400 font-medium">Free Live Preview</div>
              </div>
            </div>

            <h3 class="text-lg font-bold text-white mt-3.5 tracking-tight group-hover:text-[#ff6b00] font-['Space_Grotesk'] transition-colors">
              \${s.name}
            </h3>
            <p class="text-xs text-[#a0a2a4] font-medium mt-1 flex items-center space-x-1">
              <span>by \${s.author}</span>
              <span class="text-emerald-400 text-[10px]" title="Verified Safe Creator">✓ Verified</span>
            </p>
            <p class="text-xs text-[#a0a2a4] mt-3 leading-relaxed line-clamp-3">
              \${s.desc}
            </p>
          </div>

          <div class="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
            <button onclick="openMcpConfigModal()" class="text-xs text-[#a0a2a4] hover:text-white transition flex items-center space-x-1" title="Add to Claude, Cursor, or ChatGPT">
              <span class="material-symbols-outlined text-sm text-[#ff6b00]">add_circle</span>
              <span>Add to AI</span>
            </button>
            <button onclick="openPlayground('\${s.id}')" class="text-xs font-bold bg-[#ff6b00] hover:bg-[#ff8533] text-white px-4 py-2 rounded-xl transition shadow-md shadow-[#ff6b00]/20 flex-shrink-0 flex items-center space-x-1.5">
              <span>▶ Try Live Demo</span>
            </button>
          </div>
        </div>
      \`;
      }).join("");`;
  content = content.replace(renderCardOld, renderCardNew);

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
  content = content.replace(
    'btn.innerText = "Running in Isolated MicroVM...";',
    'btn.innerText = "⏳ Running safely in cloud...";'
  );
  content = content.replace(
    'btn.innerText = "⚡ Execute in Isolated MicroVM";',
    'btn.innerHTML = "<span>▶ Run This Tool (Free Instant Preview)</span>";'
  );
  content = content.replace(
    'sandboxEnvironment: "Isolated Firecracker MicroVM"',
    'sandboxEnvironment: "100% Safe Cloud Bubble"'
  );

  syncFile("index.html", content);
}

// --- 5. COMPILE PUBLIC USER SUB-PAGES WITH BEGINNER EXPLAINERS ---
const publicSubPages = [
  { 
    folder: "skillbridge_microvm_ide_enclave_playground", 
    route: "playground", 
    fileName: "playground.html", 
    title: "SkillBridge | Try AI Tools Live in Your Browser",
    explainer: `
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
  <div class="bg-gradient-to-r from-[#1b1b1f] to-[#232527] border border-[#ff6b00]/30 rounded-2xl p-6 shadow-xl">
    <div class="flex items-start gap-4">
      <div class="w-12 h-12 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-2xl">science</span>
      </div>
      <div>
        <span class="text-[11px] font-bold uppercase tracking-wider text-cyan-400">Live Browser Testing Lab</span>
        <h2 class="text-lg sm:text-xl font-bold text-white mt-0.5 font-['Space_Grotesk']">Try Any AI Tool Right Here — Nothing to Install</h2>
        <p class="text-xs sm:text-sm text-[#a0a2a4] mt-2 leading-relaxed">
          You don't need any technical skills or software installed on your machine. Choose any tool from the list, type your question or request into the box (or leave the pre-filled sample), and click "Run" to see the instant result returned in under 0.2 seconds.
        </p>
        <div class="mt-3 flex flex-wrap items-center gap-3 text-xs">
          <span class="px-2.5 py-1 rounded-lg bg-white/5 text-white font-medium">▶ Free instant testing</span>
          <span class="px-2.5 py-1 rounded-lg bg-white/5 text-white font-medium">⚡ Runs in 0.14 seconds</span>
          <span class="px-2.5 py-1 rounded-lg bg-white/5 text-white font-medium">🔒 Safe cloud sandbox</span>
        </div>
      </div>
    </div>
  </div>
</div>`
  },
  { 
    folder: "skillbridge_publisher_studio_escrow_ledger", 
    route: "publisher", 
    fileName: "publisher.html", 
    title: "SkillBridge | Creator Studio — Sell Your AI Tools (85% Split)",
    explainer: `
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
  <div class="bg-gradient-to-r from-[#1b1b1f] to-[#232527] border border-[#ff6b00]/30 rounded-2xl p-6 shadow-xl">
    <div class="flex items-start gap-4">
      <div class="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-2xl">payments</span>
      </div>
      <div>
        <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Creator Earnings & Studio</span>
        <h2 class="text-lg sm:text-xl font-bold text-white mt-0.5 font-['Space_Grotesk']">Sell Your AI Skills &amp; Keep 85% of Every Run</h2>
        <p class="text-xs sm:text-sm text-[#a0a2a4] mt-2 leading-relaxed">
          Have you written a great prompt, script, or automated tool? You can publish it on SkillBridge in under 2 minutes. Whenever another person or company uses your tool, you automatically receive 85% of the fee directly into your wallet. Your source prompts and code are 100% protected and hidden so nobody can copy them.
        </p>
        <div class="mt-3 flex flex-wrap items-center gap-3 text-xs">
          <span class="px-2.5 py-1 rounded-lg bg-white/5 text-white font-medium">💰 85% Creator Payouts</span>
          <span class="px-2.5 py-1 rounded-lg bg-white/5 text-white font-medium">🔒 Prompt Protection (Zero Copying)</span>
          <span class="px-2.5 py-1 rounded-lg bg-white/5 text-white font-medium">⏱️ 2-Minute Setup</span>
        </div>
      </div>
    </div>
  </div>
</div>`
  },
  { 
    folder: "skillbridge_mcp_setup_developer_docs", 
    route: "docs", 
    fileName: "docs.html", 
    title: "SkillBridge | Beginner's Guide & 1-Click AI Setup",
    explainer: `
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
  <div class="bg-gradient-to-r from-[#1b1b1f] to-[#232527] border border-[#ff6b00]/30 rounded-2xl p-6 shadow-xl">
    <div class="flex items-start gap-4">
      <div class="w-12 h-12 rounded-xl bg-[#ff6b00]/15 text-[#ff6b00] flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-2xl">menu_book</span>
      </div>
      <div>
        <span class="text-[11px] font-bold uppercase tracking-wider text-[#ff6b00]">Beginner Friendly Guide</span>
        <h2 class="text-lg sm:text-xl font-bold text-white mt-0.5 font-['Space_Grotesk']">What is an AI Tool and how do I use it?</h2>
        <p class="text-xs sm:text-sm text-[#a0a2a4] mt-2 leading-relaxed">
          Think of an AI tool just like an app on your smartphone. By default, an AI assistant like Claude or Cursor can only write text. When you add a SkillBridge tool, you give your AI superpowers—like the ability to check legal contracts, test websites, or analyze balance sheets. Best of all, everything runs in a secure cloud lockbox so your computer files and passwords are never exposed.
        </p>
        <div class="mt-3 flex flex-wrap items-center gap-3 text-xs">
          <span class="px-2.5 py-1 rounded-lg bg-white/5 text-white font-medium">⚡ Works in 1 click</span>
          <span class="px-2.5 py-1 rounded-lg bg-white/5 text-white font-medium">🛡️ 100% Safe &amp; Private</span>
          <span class="px-2.5 py-1 rounded-lg bg-white/5 text-white font-medium">💰 100% Money-back Guarantee</span>
        </div>
      </div>
    </div>
  </div>
</div>`
  },
  { 
    folder: "skillbridge_security_attestation_whitepaper", 
    route: "security", 
    fileName: "security.html", 
    title: "SkillBridge | Safety & Privacy First — 100% Protection",
    explainer: `
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
  <div class="bg-gradient-to-r from-[#1b1b1f] to-[#232527] border border-[#ff6b00]/30 rounded-2xl p-6 shadow-xl">
    <div class="flex items-start gap-4">
      <div class="w-12 h-12 rounded-xl bg-[#ff6b00]/15 text-[#ff6b00] flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-2xl">shield</span>
      </div>
      <div>
        <span class="text-[11px] font-bold uppercase tracking-wider text-[#ff6b00]">100% Privacy &amp; Safety Guarantee</span>
        <h2 class="text-lg sm:text-xl font-bold text-white mt-0.5 font-['Space_Grotesk']">How SkillBridge Protects Your Computer and Passwords</h2>
        <p class="text-xs sm:text-sm text-[#a0a2a4] mt-2 leading-relaxed">
          Unlike standard AI plugins that run directly on your personal computer where they could potentially read files or passwords, SkillBridge executes all tools inside an isolated cloud lockbox (microVM). The tool can only see the specific text you send it. Once the job is done, the lockbox vanishes. Your computer, passwords, and private files stay 100% untouched.
        </p>
        <div class="mt-3 flex flex-wrap items-center gap-3 text-xs">
          <span class="px-2.5 py-1 rounded-lg bg-white/5 text-white font-medium">🛡️ Zero Virus Risk</span>
          <span class="px-2.5 py-1 rounded-lg bg-white/5 text-white font-medium">🔒 Zero Password/File Leaks</span>
          <span class="px-2.5 py-1 rounded-lg bg-white/5 text-white font-medium">✅ Automatic Escrow Refunds</span>
        </div>
      </div>
    </div>
  </div>
</div>`
  },
  { 
    folder: "skillbridge_support_center_autonomous_ai_bot", 
    route: "support", 
    fileName: "support.html", 
    title: "SkillBridge Support & Resolution Center | 24/7 Autonomous AI Bot",
    explainer: `
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
  <div class="bg-gradient-to-r from-[#1b1b1f] to-[#232527] border border-[#ff6b00]/30 rounded-2xl p-6 shadow-xl">
    <div class="flex items-start gap-4">
      <div class="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-2xl">support_agent</span>
      </div>
      <div>
        <span class="text-[11px] font-bold uppercase tracking-wider text-purple-400">24/7 AI Resolution Center</span>
        <h2 class="text-lg sm:text-xl font-bold text-white mt-0.5 font-['Space_Grotesk']">SkillBridge Support &amp; Resolution Center</h2>
        <p class="text-xs sm:text-sm text-[#a0a2a4] mt-2 leading-relaxed">
          Need help with a tool or have a question? Our friendly 24/7 AI Support Agent is always online to answer questions, diagnose issues, and help you get the most out of your AI skills. You can also submit a case and receive an instant step-by-step resolution.
        </p>
        <div class="mt-3 flex flex-wrap items-center gap-3 text-xs">
          <span class="px-2.5 py-1 rounded-lg bg-white/5 text-white font-medium">🤖 Instant AI Answers</span>
          <span class="px-2.5 py-1 rounded-lg bg-white/5 text-white font-medium">🎫 Track Support Cases</span>
          <span class="px-2.5 py-1 rounded-lg bg-white/5 text-white font-medium">💰 Instant Escrow Refund Resolution</span>
        </div>
      </div>
    </div>
  </div>
</div>`
  }
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
