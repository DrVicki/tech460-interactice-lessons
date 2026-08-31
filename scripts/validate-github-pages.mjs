#!/usr/bin/env node

/**
 * Validation script for GitHub Pages static companion
 * Run with: node scripts/validate-github-pages.mjs
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const docsDir = join(__dirname, '..', 'docs');

let errors = [];
let warnings = [];

// Check required files
const requiredFiles = [
  'index.html',
  'certificate.html',
  '404.html',
  '.nojekyll',
  'assets/css/styles.css',
  'assets/js/site.js'
];

console.log('🔍 Validating GitHub Pages static companion...\n');

requiredFiles.forEach(file => {
  const path = join(docsDir, file);
  if (existsSync(path)) {
    console.log(`✅ ${file}`);
  } else {
    errors.push(`Missing required file: ${file}`);
    console.log(`❌ ${file}`);
  }
});

// Check index.html content
try {
  const indexPath = join(docsDir, 'index.html');
  const indexContent = readFileSync(indexPath, 'utf8');
  
  // Check for relative paths
  if (indexContent.includes('src="/assets/') || indexContent.includes('href="/assets/')) {
    errors.push('index.html uses root-relative paths (should use relative paths like "assets/...")');
  } else {
    console.log('✅ Uses relative asset paths');
  }
  
  // Check for live platform link
  if (indexContent.includes('tech460les1-haxrjpha.manus.space')) {
    console.log('✅ Links to live course platform');
  } else {
    warnings.push('index.html should link to the live course platform');
  }
  
  // Check for course content
  if (indexContent.includes('curriculum-list')) {
    console.log('✅ Contains full 8-week curriculum');
  } else {
    warnings.push('index.html may be missing some curriculum content');
  }
  
  // Check for certificate page link
  if (indexContent.includes('certificate.html')) {
    console.log('✅ Links to certificate generator');
  } else {
    warnings.push('index.html should link to certificate.html');
  }
  
  // Check for interactive checklist
  if (indexContent.includes('progress-summary') || indexContent.includes('checkbox')) {
    console.log('✅ Contains interactive checklist');
  } else {
    warnings.push('index.html may be missing interactive checklist');
  }
  
} catch (e) {
  errors.push(`Error reading index.html: ${e.message}`);
}

// Check certificate.html
try {
  const certPath = join(docsDir, 'certificate.html');
  const certContent = readFileSync(certPath, 'utf8');
  
  if (certContent.includes('studentName') && certContent.includes('scoreLink')) {
    console.log('✅ Certificate page has input fields');
  }
  
  if (certContent.includes('downloadCertificate')) {
    console.log('✅ Certificate page has download functionality');
  }
} catch (e) {
  errors.push(`Error reading certificate.html: ${e.message}`);
}

// Check CSS file
try {
  const cssPath = join(docsDir, 'assets/css/styles.css');
  const cssContent = readFileSync(cssPath, 'utf8');
  
  if (cssContent.includes(':root') && cssContent.includes('--primary')) {
    console.log('✅ CSS contains design tokens');
  }
  
  if (cssContent.includes('curriculum-checkbox') || cssContent.includes('completed')) {
    console.log('✅ CSS contains checklist styles');
  }
} catch (e) {
  errors.push(`Error reading styles.css: ${e.message}`);
}

// Check JS file
try {
  const jsPath = join(docsDir, 'assets/js/site.js');
  const jsContent = readFileSync(jsPath, 'utf8');
  
  if (jsContent.includes('courseModules') && jsContent.includes('week: 8')) {
    console.log('✅ JavaScript contains course data');
  } else {
    warnings.push('JavaScript may be missing course data');
  }
  
  if (jsContent.includes('toggleModule') && jsContent.includes('localStorage')) {
    console.log('✅ JavaScript contains progress tracking');
  }
} catch (e) {
  errors.push(`Error reading site.js: ${e.message}`);
}

// Summary
console.log('\n' + '='.repeat(50));
if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ All checks passed! Ready for GitHub Pages deployment.');
  process.exit(0);
} else {
  if (errors.length > 0) {
    console.log('\n❌ Errors:');
    errors.forEach(e => console.log(`   - ${e}`));
  }
  if (warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    warnings.forEach(w => console.log(`   - ${w}`));
  }
  process.exit(errors.length > 0 ? 1 : 0);
}
