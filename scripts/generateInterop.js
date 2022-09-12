const fs = require('fs');
const path = require('path');

const twpkg = require('tailwindcss/package.json');
const config = require('tailwindcss/stubs/defaultConfig.stub');
const resolved = require('tailwindcss/resolveConfig')(config);

resolved.__twv = twpkg.version;

const fname = path.resolve(__dirname, '../src/generated/tw.cfg.json');
fs.writeFileSync(fname, JSON.stringify(resolved));

process.stdout.write(`\nWrote interop json to "${fname}".\n`);
