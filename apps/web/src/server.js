const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3080;
const INDEX_PATH = path.join(__dirname, 'index.html');
const COMPARE_PATH = path.join(__dirname, 'compare-capafy.html');
const DOCS_PATH = path.join(__dirname, 'docs.html');

http.createServer((req, res) => {
  const url = req.url || '/';

  if (url === '/compare/capafy' || url === '/vs-capafy') {
    fs.readFile(COMPARE_PATH, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
    return;
  }

  if (url === '/docs' || url === '/api-docs') {
    fs.readFile(DOCS_PATH, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
    return;
  }

  fs.readFile(INDEX_PATH, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`[SkillBridge Web Storefront] Live with /docs and /compare at http://localhost:${PORT}`);
});
