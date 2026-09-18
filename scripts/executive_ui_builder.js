const fs = require("fs");
const path = require("path");

function getExecutiveHtml() {
  const candidates = [
    path.join(__dirname, "..", "executive.html"),
    path.join(__dirname, "..", "packages", "gateway", "public", "executive.html"),
    path.join(__dirname, "..", "public", "executive.html")
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      return fs.readFileSync(p, "utf8");
    }
  }
  throw new Error("Could not locate executive.html template");
}

module.exports = { getExecutiveHtml };
