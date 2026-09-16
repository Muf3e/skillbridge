const fs = require('fs');
let html = fs.readFileSync('apps/web/src/index.html', 'utf8');

const biotechSkillJs = `
      {
        id: "skill_clinical_trial_synthesizer",
        name: "Biotech Clinical Trial and PubMed Synthesizer",
        author: "BioNexus Intelligence",
        desc: "Extracts trial cohorts, primary end-point efficacy, adverse event percentages, and statistical hazard ratios from study disclosures.",
        price: "$0.60 / run",
        priceNum: 0.60,
        category: "Biotech",
        defaultInput: "Phase 3 clinical trial of Nexa-101 in 840 patients with metastatic solid tumors. Hazard ratio for PFS was 0.68 (p < 0.001). Grade 3 neutropenia occurred in 8.4%."
      },
`;

html = html.replace('let SKILLS_DATA = [', 'let SKILLS_DATA = [' + biotechSkillJs);
html = html.replace('7 Skills', '8 Skills');
html = html.replace('<button onclick="filterCategory(\'DevOps\')"', '<button onclick="filterCategory(\'Biotech\')" id="tab-Biotech" class="category-tab text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800">Biotech</button>\n        <button onclick="filterCategory(\'DevOps\')"');

fs.writeFileSync('apps/web/src/index.html', html, 'utf8');
console.log('Successfully injected Biotech skill into apps/web/src/index.html');
