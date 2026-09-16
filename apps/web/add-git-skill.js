const fs = require('fs');
let html = fs.readFileSync('apps/web/src/index.html', 'utf8');

const gitSkillJs = `
      {
        id: "skill_git_conflict_resolver",
        name: "Git Semantic Conflict and PR Merge Resolver",
        author: "MergeFlow Labs",
        desc: "Autonomous code integration engine for engineering teams. Resolves complex three-way git merge conflicts and verifies syntax.",
        price: "$0.20 / run",
        priceNum: 0.20,
        category: "Engineering",
        defaultInput: "<<<<<<< HEAD\\nexport function log(msg) { console.log(msg); }\\n=======\\nexport function log(msg) { logger.info(msg); }\\n>>>>>>> incoming"
      },
`;

html = html.replace('let SKILLS_DATA = [', 'let SKILLS_DATA = [' + gitSkillJs);
html = html.replace('11 Skills', '12 Skills');

fs.writeFileSync('apps/web/src/index.html', html, 'utf8');
console.log('Successfully injected Git Conflict Resolver skill into apps/web/src/index.html');
