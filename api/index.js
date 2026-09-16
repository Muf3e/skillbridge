const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const url = req.url || '/';

  let targetFile = 'index.html';
  if (url.includes('compare')) targetFile = 'compare-capafy.html';
  if (url.includes('docs')) targetFile = 'docs.html';

  const candidates = [
    path.join(__dirname, '..', 'public', targetFile),
    path.join(__dirname, '..', targetFile),
    path.join(process.cwd(), 'public', targetFile),
    path.join(process.cwd(), targetFile)
  ];

  for (const p of candidates) {
    if (fs.existsSync(p)) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(fs.readFileSync(p, 'utf8'));
    }
  }

  return res.status(200).send("<h1>SkillBridge Gateway Live</h1>");
};
