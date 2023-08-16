const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

function obfuscateFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'UTF-8');
  const obfuscationResult = JavaScriptObfuscator.obfuscate(fileContent);
  fs.writeFileSync(filePath, obfuscationResult.getObfuscatedCode());
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (stat.isFile() && path.extname(filePath) === '.js') {
      obfuscateFile(filePath);
    }
  });
}

walkDir('dist'); // Specify the directory of the JS files you want to obfuscate
