const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3080;
const HTML_PATH = path.join(__dirname, 'index.html');

http.createServer((req, res) => {
  fs.readFile(HTML_PATH, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`[SkillBridge Web Storefront] Live at http://localhost:${PORT}`);
});
