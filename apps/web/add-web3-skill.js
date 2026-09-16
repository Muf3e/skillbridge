const fs = require('fs');
let html = fs.readFileSync('apps/web/src/index.html', 'utf8');

const web3SkillJs = `
      {
        id: "skill_smart_contract_auditor",
        name: "Smart Contract Gas and Security Auditor",
        author: "AuditChain Labs",
        desc: "Automated bytecode and Solidity static audit engine. Uncovers reentrancy vulnerabilities and high-cost storage slot gas optimizations.",
        price: "$0.75 / run",
        priceNum: 0.75,
        category: "Web3",
        defaultInput: "function withdraw() public { (bool s, ) = msg.sender.call{value: balances[msg.sender]}(\"\"); balances[msg.sender] = 0; }"
      },
`;

html = html.replace('let SKILLS_DATA = [', 'let SKILLS_DATA = [' + web3SkillJs);
html = html.replace('8 Skills', '9 Skills');
html = html.replace('<button onclick="filterCategory(\'Biotech\')"', '<button onclick="filterCategory(\'Web3\')" id="tab-Web3" class="category-tab text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800">Web3</button>\n        <button onclick="filterCategory(\'Biotech\')"');

fs.writeFileSync('apps/web/src/index.html', html, 'utf8');
console.log('Successfully injected Web3 skill into apps/web/src/index.html');
