const ts = require('typescript');
const fs = require('fs');

const configPath = ts.findConfigFile('./', ts.sys.fileExists, 'tsconfig.json');
const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
const parsedConfig = ts.parseJsonConfigFileContent(configFile.config, ts.sys, './');

const program = ts.createProgram({
  rootNames: parsedConfig.fileNames,
  options: parsedConfig.options
});

const allDiagnostics = ts.getPreEmitDiagnostics(program);

let out = '';
allDiagnostics.forEach(diagnostic => {
  if (diagnostic.file) {
    let { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
    let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
    out += `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}\n`;
  } else {
    out += ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n') + '\n';
  }
});

fs.writeFileSync('ts_errors.txt', out);
console.log('Finished writing ts_errors.txt');
