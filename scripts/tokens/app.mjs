import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = 'packages/tokens/scss/vars';
const TOKENS_DIR = 'tokens';

async function main() {
  console.log('pawaBlox Token Generator');
  console.log('========================');
  console.log('');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Read from tokens/ directory (Tokens Studio sync)
  if (!fs.existsSync(TOKENS_DIR)) {
    console.log('No tokens found!');
    console.log('');
    console.log('Setup Tokens Studio for Figma:');
    console.log('  1. Install Tokens Studio plugin in Figma');
    console.log('  2. Configure GitHub sync to tokens/ directory');
    console.log('  3. Push tokens from Figma');
    return;
  }

  const jsonFiles = fs.readdirSync(TOKENS_DIR).filter(f => f.endsWith('.json'));
  if (jsonFiles.length === 0) {
    console.log('No JSON files found in tokens/ directory');
    return;
  }

  let tokensData = {};
  console.log('Reading tokens from Tokens Studio (tokens/)...');
  for (const file of jsonFiles) {
    const filePath = path.join(TOKENS_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    console.log(`  - ${file}`);
    Object.assign(tokensData, data);
  }

  const tokensByCategory = {
    colors: [],
    spacing: [],
    sizing: [],
    borderWidth: [],
    borderRadius: [],
    opacity: [],
    typography: [],
    shadows: [],
    other: [],
  };

  // Process W3C token format
  for (const collectionKey in tokensData) {
    const collection = tokensData[collectionKey];
    console.log(`  Processing collection: ${collectionKey}`);
    processTokenGroup(collection, '', tokensByCategory);
  }

  // Deduplicate tokens - later collections (Theme) override earlier ones (TailwindCSS)
  for (const category in tokensByCategory) {
    const seen = new Map();
    for (const token of tokensByCategory[category]) {
      seen.set(token.name, token);
    }
    tokensByCategory[category] = [...seen.values()];
  }

  console.log('');
  console.log('Generating SCSS files...');

  // Colors
  if (tokensByCategory.colors.length > 0) {
    writeScssFile('_colors.scss', tokensByCategory.colors, 'COLOR TOKENS');
    console.log(`  _colors.scss (${tokensByCategory.colors.length} variables)`);
  }

  // Spacing
  if (tokensByCategory.spacing.length > 0) {
    writeScssFile('_spacing.scss', tokensByCategory.spacing, 'SPACING TOKENS');
    console.log(`  _spacing.scss (${tokensByCategory.spacing.length} variables)`);
  }

  // Sizing
  if (tokensByCategory.sizing.length > 0) {
    writeScssFile('_sizing.scss', tokensByCategory.sizing, 'SIZING TOKENS');
    console.log(`  _sizing.scss (${tokensByCategory.sizing.length} variables)`);
  }

  // Border Width
  if (tokensByCategory.borderWidth.length > 0) {
    writeScssFile('_border-width.scss', tokensByCategory.borderWidth, 'BORDER WIDTH TOKENS');
    console.log(`  _border-width.scss (${tokensByCategory.borderWidth.length} variables)`);
  }

  // Border Radius
  if (tokensByCategory.borderRadius.length > 0) {
    writeScssFile('_border-radius.scss', tokensByCategory.borderRadius, 'BORDER RADIUS TOKENS');
    console.log(`  _border-radius.scss (${tokensByCategory.borderRadius.length} variables)`);
  }

  // Opacity
  if (tokensByCategory.opacity.length > 0) {
    writeScssFile('_opacity.scss', tokensByCategory.opacity, 'OPACITY TOKENS');
    console.log(`  _opacity.scss (${tokensByCategory.opacity.length} variables)`);
  }

  // Typography (needs fonts import for $roboto reference)
  if (tokensByCategory.typography.length > 0) {
    writeScssFile('_typography.scss', tokensByCategory.typography, 'TYPOGRAPHY TOKENS', ["@use 'fonts';"]);
    console.log(`  _typography.scss (${tokensByCategory.typography.length} variables)`);
  }

  // Shadows
  if (tokensByCategory.shadows.length > 0) {
    writeScssFile('_shadows.scss', tokensByCategory.shadows, 'SHADOW TOKENS');
    console.log(`  _shadows.scss (${tokensByCategory.shadows.length} variables)`);
  }

  // Other
  if (tokensByCategory.other.length > 0) {
    writeScssFile('_other.scss', tokensByCategory.other, 'OTHER TOKENS');
    console.log(`  _other.scss (${tokensByCategory.other.length} variables)`);
  }

  // Static files
  generateFontsFile();
  generateBreakpointsFile();
  generateZIndicesFile();

  console.log('');
  console.log('Done!');
}

function processTokenGroup(obj, prefix, tokensByCategory) {
  for (const key in obj) {
    if (key.startsWith('$')) continue; // Skip $extensions, $type, $value, etc.

    const item = obj[key];

    if (item && typeof item === 'object') {
      // Check for both W3C DTCG format ($value) and Tokens Studio format (value)
      const hasValue = '$value' in item || 'value' in item;

      if (hasValue) {
        // This is a token
        const name = prefix ? `${prefix}-${key}` : key;
        const token = createToken(name, item);
        if (token) {
          // Get type from both formats
          const tokenType = item.$type || item.type;
          const category = categorizeToken(token.name, tokenType);
          tokensByCategory[category].push(token);
        }
      } else {
        // This is a group, recurse
        const newPrefix = prefix ? `${prefix}-${key}` : key;
        processTokenGroup(item, newPrefix, tokensByCategory);
      }
    }
  }
}

function createToken(name, item) {
  // Support both W3C DTCG format ($type/$value) and Tokens Studio format (type/value)
  const type = item.$type || item.type;
  let value = item.$value !== undefined ? item.$value : item.value;
  const description = item.$description || item.description || '';

  // Clean up name
  name = name
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '');

  // Remove redundant prefixes like "opacity-opacity-0" -> "opacity-0"
  // or "border-width-border-0" -> "border-0"
  name = name
    .replace(/^(opacity)-opacity-/, '$1-')
    .replace(/^(border-width)-border-/, 'border-')
    .replace(/^(border-radius)-rounded-/, 'rounded-')
    .replace(/^(font-size)-text-/, 'text-')
    .replace(/^(font-weight)-font-/, 'font-')
    .replace(/^(line-height)-leading-/, 'leading-');

  // Handle alias references like "{spacing.2}" or "{roboto}"
  if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
    const aliasPath = value.slice(1, -1);
    // Convert path like "spacing.2" to "spacing-2" or "spacing.0-5" to "spacing-0-5"
    const aliasName = aliasPath
      .split('.')
      .join('-')
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/--+/g, '-')
      .replace(/^-|-$/g, '');

    if (aliasName) {
      // Check if it's a font reference (roboto, geist-mono, georgia) - these need namespace
      const fontNames = ['roboto', 'geist-mono', 'georgia'];
      if (fontNames.includes(aliasName)) {
        value = `fonts.$${aliasName}`;
      } else {
        value = `$${aliasName}`;
      }
    } else {
      // Invalid alias, skip this token
      return null;
    }
  } else if (type === 'number' && typeof value === 'number') {
    // Format number values
    const lowerName = name.toLowerCase();

    if (lowerName.includes('opacity')) {
      // Opacity: keep as decimal (0-1) or convert from 0-100
      value = value > 1 ? value / 100 : value;
    } else if (lowerName.startsWith('font-') && !lowerName.includes('size')) {
      // Font weight: keep as number (no px)
      value = value;
    } else if (lowerName.startsWith('leading-') || lowerName.includes('line-height')) {
      // Line height ratios: keep as number if <= 3
      if (value <= 3) {
        value = value;
      } else {
        value = `${value}px`;
      }
    } else {
      // Default: add px
      value = `${value}px`;
    }
  } else if (type === 'color') {
    // Color values are already hex strings
    value = value;
  }

  if (value === undefined || value === null) return null;

  return {
    name,
    value,
    type,
    comment: description || null,
  };
}

function categorizeToken(name, type) {
  const lowerName = name.toLowerCase();

  if (type === 'color') return 'colors';
  if (lowerName.startsWith('spacing-')) return 'spacing';
  if (lowerName.startsWith('border-') && !lowerName.includes('radius')) return 'borderWidth';
  if (lowerName.startsWith('rounded-')) return 'borderRadius';
  if (lowerName.startsWith('opacity-')) return 'opacity';
  if (lowerName.startsWith('text-') || lowerName.startsWith('font-') || lowerName.startsWith('leading-') || lowerName.startsWith('tracking-')) return 'typography';
  if (lowerName.includes('shadow')) return 'shadows';
  if (lowerName.includes('size') && !lowerName.includes('font') && !lowerName.includes('text')) return 'sizing';

  return 'other';
}

function writeScssFile(filename, tokens, title, imports = []) {
  const lines = [
    '// ==========================================',
    `// ${title}`,
    '// Auto-generated from Figma - DO NOT EDIT',
    '// ==========================================',
    '',
  ];

  // Add any required imports
  if (imports.length > 0) {
    lines.push(...imports);
    lines.push('');
  }

  // Separate tokens into primitives (raw values) and references (tokens that use $variable)
  const primitiveTokens = tokens.filter(t => !String(t.value).startsWith('$'));
  const referenceTokens = tokens.filter(t => String(t.value).startsWith('$'));

  // Sort function for natural ordering
  const naturalSort = (a, b) => {
    const aMatch = a.name.match(/^(.+?)-?(\d+)$/);
    const bMatch = b.name.match(/^(.+?)-?(\d+)$/);

    if (aMatch && bMatch && aMatch[1] === bMatch[1]) {
      return parseInt(aMatch[2]) - parseInt(bMatch[2]);
    }

    return a.name.localeCompare(b.name);
  };

  primitiveTokens.sort(naturalSort);
  referenceTokens.sort(naturalSort);

  // Write primitive tokens first (they don't depend on anything)
  let lastGroup = '';
  for (const token of primitiveTokens) {
    const group = token.name.split('-')[0];
    if (group !== lastGroup && lastGroup !== '') {
      lines.push('');
    }
    lastGroup = group;

    if (token.comment) {
      lines.push(`// ${token.comment}`);
    }
    lines.push(`$${token.name}: ${token.value};`);
  }

  // Add separator if we have both types
  if (primitiveTokens.length > 0 && referenceTokens.length > 0) {
    lines.push('');
    lines.push('// Semantic tokens (references)');
  }

  // Write reference tokens (they depend on primitives)
  lastGroup = '';
  for (const token of referenceTokens) {
    const group = token.name.split('-')[0];
    if (group !== lastGroup && lastGroup !== '') {
      lines.push('');
    }
    lastGroup = group;

    if (token.comment) {
      lines.push(`// ${token.comment}`);
    }
    lines.push(`$${token.name}: ${token.value};`);
  }

  lines.push('');

  fs.writeFileSync(path.join(OUTPUT_DIR, filename), lines.join('\n'));
}

function generateFontsFile() {
  const content = `// ==========================================
// FONT FAMILIES
// Static definitions
// ==========================================

$roboto: 'Roboto', sans-serif;
$geist-mono: 'Geist Mono', monospace;
$georgia: 'Georgia', serif;
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, '_fonts.scss'), content);
  console.log('  _fonts.scss (static)');
}

function generateBreakpointsFile() {
  const content = `// ==========================================
// BREAKPOINTS
// Tailwind CSS defaults
// ==========================================

$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;
$breakpoint-2xl: 1536px;

// Max-width breakpoints (for down queries)
$breakpoint-sm-max: 639px;
$breakpoint-md-max: 767px;
$breakpoint-lg-max: 1023px;
$breakpoint-xl-max: 1279px;
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, '_breakpoints.scss'), content);
  console.log('  _breakpoints.scss (static)');
}

function generateZIndicesFile() {
  const content = `// ==========================================
// Z-INDEX SCALE
// Tailwind CSS defaults
// ==========================================

$z-0: 0;
$z-10: 10;
$z-20: 20;
$z-30: 30;
$z-40: 40;
$z-50: 50;
$z-auto: auto;

// Semantic z-indices
$z-dropdown: 1000;
$z-sticky: 1020;
$z-fixed: 1030;
$z-modal-backdrop: 1040;
$z-modal: 1050;
$z-popover: 1060;
$z-tooltip: 1070;
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, '_z-indices.scss'), content);
  console.log('  _z-indices.scss (static)');
}

main();
