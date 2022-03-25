const fs = require("fs");
const path = require("path");

let mockFiles = [];
fs.readdirSync(path.join(__dirname, "./mocks")).forEach(path =>
  mockFiles.push(require("./mocks/" + path))
);

module.exports = Object.assign(...mockFiles);
