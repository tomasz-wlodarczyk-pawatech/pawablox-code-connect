#!/usr/bin/env node
import { cpSync, mkdirSync, readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname, basename } from 'path';

const packages = ['components', 'icons'];

for (const pkg of packages) {
  const srcDir = join(process.cwd(), 'packages', pkg, 'src');
  const distDir = join(process.cwd(), 'packages', pkg, 'dist', 'scss');

  // Create dist/scss directory
  mkdirSync(distDir, { recursive: true });

  // Find and copy all SCSS files
  function copyScssFiles(dir, targetDir) {
    const files = readdirSync(dir);
    for (const file of files) {
      const srcPath = join(dir, file);
      const stat = statSync(srcPath);

      if (stat.isDirectory()) {
        copyScssFiles(srcPath, targetDir);
      } else if (file.endsWith('.scss')) {
        // Copy to flat structure in dist/scss
        const targetPath = join(targetDir, file);
        cpSync(srcPath, targetPath);
        console.log(`Copied: ${srcPath} -> ${targetPath}`);
      }
    }
  }

  copyScssFiles(srcDir, distDir);

  // Create index.scss that imports all SCSS files
  const scssFiles = readdirSync(distDir).filter(f => f.endsWith('.scss'));
  const indexContent = scssFiles.map(f => `@use './${basename(f, '.scss')}';`).join('\n') + '\n';
  writeFileSync(join(distDir, 'index.scss'), indexContent);
  console.log(`Created: ${join(distDir, 'index.scss')}`);
}

console.log('\nSCSS files copied successfully!');
