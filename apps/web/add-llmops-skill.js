const fs = require('fs');
let html = fs.readFileSync('apps/web/src/index.html', 'utf8');

const llmOpsSkillJs = `
      {
        id: "skill_llmops_cost_profiler",
        name: "LLMOps Cost and Token Latency Profiler",
        author: "TokenMetrics AI",
        desc: "High-demand AI infrastructure analyzer. Diagnoses token inflation, redundant prompts, and model switching opportunities (Sonnet to Haiku / 4o to Mini).",
        price: "$0.20 / run",
        priceNum: 0.20,
        category: "AI Ops",
        defaultInput: "You are a helpful assistant. Please carefully analyze the following customer question and ensure that you reply politely and thoroughly..."
      },
`;

html = html.replace('let SKILLS_DATA = [', 'let SKILLS_DATA = [' + llmOpsSkillJs);
html = html.replace('9 Skills', '10 Skills');
html = html.replace('<button onclick="filterCategory(\'Web3\')"', '<button onclick="filterCategory(\'AI Ops\')" id="tab-AI-Ops" class="category-tab text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800">AI Ops</button>\n        <button onclick="filterCategory(\'Web3\')"');

fs.writeFileSync('apps/web/src/index.html', html, 'utf8');
console.log('Successfully injected LLMOps skill into apps/web/src/index.html');
