const fs = require('fs');
let html = fs.readFileSync('apps/web/src/index.html', 'utf8');

const seoSkillJs = `
      {
        id: "skill_seo_competitive_intel",
        name: "SEO Semantic Gap and Competitor Reverse Engineer",
        author: "RankSurge AI",
        desc: "Reverse engineers search visibility, extracts competitor content clusters, finds unranked question keywords, and outputs structured schema markup.",
        price: "$0.25 / run",
        priceNum: 0.25,
        category: "Marketing",
        defaultInput: "Target: skillbridge.ai vs Competitor: capafy.ai"
      },
`;

html = html.replace('let SKILLS_DATA = [', 'let SKILLS_DATA = [' + seoSkillJs);
html = html.replace('10 Skills', '11 Skills');

fs.writeFileSync('apps/web/src/index.html', html, 'utf8');
console.log('Successfully injected SEO Competitive Intel skill into apps/web/src/index.html');
