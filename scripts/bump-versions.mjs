#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const packages = ['tokens', 'icons', 'components'];

function bumpPatch(version) {
  const [major, minor, patch] = version.split('.').map(Number);
  return `${major}.${minor}.${patch + 1}`;
}

let newVersion = null;

for (const pkg of packages) {
  const pkgPath = join(process.cwd(), 'packages', pkg, 'package.json');
  const pkgJson = JSON.parse(readFileSync(pkgPath, 'utf-8'));

  if (!newVersion) {
    newVersion = bumpPatch(pkgJson.version);
  }

  pkgJson.version = newVersion;
  writeFileSync(pkgPath, JSON.stringify(pkgJson, null, 2) + '\n');
  console.log(`${pkgJson.name}: ${pkgJson.version}`);
}

console.log(`\nBumped all packages to ${newVersion}`);
