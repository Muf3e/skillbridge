const fs = require('fs');
let html = fs.readFileSync('apps/web/src/index.html', 'utf8');

const newSkillsJs = `
      {
        id: "skill_k8s_incident_copilot",
        name: "K8s SRE Incident and CrashLoop Copilot",
        author: "InfraSentinel AI",
        desc: "Autonomous cloud diagnostic engine for Kubernetes workloads. Ingests pod events, describes CrashLoopBackOff, OOMKilled, and generates precise kubectl remedies.",
        price: "$0.30 / run",
        priceNum: 0.30,
        category: "DevOps",
        defaultInput: "Last State: Terminated\\nReason: OOMKilled\\nExit Code: 137\\nStarted: Wed, 16 Sep 2026\\nFinished: Wed, 16 Sep 2026"
      },
      {
        id: "skill_legal_nda_scorer",
        name: "Commercial NDA Risk and Clause Scorer",
        author: "LexProtocol AI",
        desc: "Automated contract review intelligence for founders and counsel. Scans mutual and unilateral NDAs for non-standard indemnities and non-compete traps.",
        price: "$0.45 / run",
        priceNum: 0.45,
        category: "Legal",
        defaultInput: "Recipient agrees to keep all proprietary ideas perpetual and forever confidential and shall not compete in any market for 5 years."
      },
`;

html = html.replace('let SKILLS_DATA = [', 'let SKILLS_DATA = [' + newSkillsJs);
html = html.replace('5 Skills', '7 Skills');
html = html.replace('<button onclick="filterCategory(\'Finance\')"', '<button onclick="filterCategory(\'DevOps\')" id="tab-DevOps" class="category-tab text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800">DevOps</button>\n        <button onclick="filterCategory(\'Legal\')" id="tab-Legal" class="category-tab text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800">Legal</button>\n        <button onclick="filterCategory(\'Finance\')"');

fs.writeFileSync('apps/web/src/index.html', html, 'utf8');
console.log('Successfully updated apps/web/src/index.html with K8s and Legal skills');
