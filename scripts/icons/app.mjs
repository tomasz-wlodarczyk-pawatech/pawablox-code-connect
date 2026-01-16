import { mkdir, readdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FIGMA_API_BASE = 'https://api.figma.com/v1';
const OUTPUT_DIR = join(__dirname, '../../packages/icons/src/icons');
const INDEX_FILE = join(__dirname, '../../packages/icons/src/index.ts');

/**
 * Convert Figma node ID from URL format (1565-5788) to API format (1565:5788)
 */
function normalizeNodeId(nodeId) {
  return nodeId.replace(/-/g, ':');
}

/**
 * Convert Figma component name to React component name
 * Examples:
 * - "icon/check" → "IconCheck"
 * - "Icons/Chevron Down" → "IconChevronDown"
 * - "24/alert-triangle" → "IconAlertTriangle"
 * - "circle-dollar-sign" → "IconCircleDollarSign"
 */
function figmaNameToComponentName(name) {
  // Remove common prefixes like "icon/", "Icons/", "24/", etc.
  const cleaned = name
    .replace(/^(icon[s]?|icons?|\d+)[\/\\]/i, '')
    .replace(/[\/\\]/g, ' ');

  // Convert to PascalCase
  const pascalCase = cleaned
    .split(/[\s\-_]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');

  // Ensure it starts with "Icon"
  return pascalCase.startsWith('Icon') ? pascalCase : `Icon${pascalCase}`;
}

/**
 * Check if a name is a valid component name (not a variant property)
 */
function isValidComponentName(name) {
  // Skip variant property names like "Size=24x24(2)", "State=Active", etc.
  if (name.includes('=')) return false;
  // Skip names that are just numbers or sizes
  if (/^\d+x\d+/.test(name)) return false;
  if (/^\d+$/.test(name)) return false;
  return true;
}

/**
 * Convert SVG attributes to React-compatible camelCase
 */
function svgAttributesToReact(svg) {
  const attributeMap = {
    'stroke-width': 'strokeWidth',
    'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin',
    'stroke-dasharray': 'strokeDasharray',
    'stroke-dashoffset': 'strokeDashoffset',
    'stroke-miterlimit': 'strokeMiterlimit',
    'stroke-opacity': 'strokeOpacity',
    'fill-opacity': 'fillOpacity',
    'fill-rule': 'fillRule',
    'clip-path': 'clipPath',
    'clip-rule': 'clipRule',
    'font-family': 'fontFamily',
    'font-size': 'fontSize',
    'font-weight': 'fontWeight',
    'font-style': 'fontStyle',
    'text-anchor': 'textAnchor',
    'dominant-baseline': 'dominantBaseline',
    'alignment-baseline': 'alignmentBaseline',
    'stop-color': 'stopColor',
    'stop-opacity': 'stopOpacity',
    'xlink:href': 'xlinkHref',
    'xml:space': 'xmlSpace',
  };

  let result = svg;
  for (const [kebab, camel] of Object.entries(attributeMap)) {
    result = result.replace(new RegExp(kebab, 'g'), camel);
  }

  return result;
}

/**
 * Optimize and clean SVG content
 */
function optimizeSvg(svg) {
  let optimized = svg
    // Remove XML declaration
    .replace(/<\?xml[^?]*\?>/gi, '')
    // Remove DOCTYPE
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    // Remove comments
    .replace(/<!--[\s\S]*?-->/g, '')
    // Remove Figma-specific attributes
    .replace(/\s*data-[^=]*="[^"]*"/g, '')
    .replace(/\s*id="[^"]*"/g, '')
    // Replace fixed colors with currentColor for flexibility
    .replace(/stroke="(?!none|currentColor)[^"]*"/g, 'stroke="currentColor"')
    .replace(/fill="(?!none|currentColor)[^"]*"/g, 'fill="currentColor"')
    // Clean up whitespace
    .replace(/>\s+</g, '><')
    .trim();

  return optimized;
}

/**
 * Extract inner SVG content (everything between <svg> and </svg>)
 */
function extractSvgContent(svg) {
  const match = svg.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
  return match ? match[1].trim() : '';
}

/**
 * Generate React component code
 */
function generateComponent(componentName, svgContent) {
  return `// Auto-generated from Figma - DO NOT EDIT
import React from 'react';
import { Icon, IconProps } from '../Icon';

export const ${componentName}: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    ${svgContent}
  </Icon>
);

${componentName}.displayName = '${componentName}';
`;
}

/**
 * Generate barrel exports for all icons
 */
function generateIndexContent(iconNames) {
  const exports = iconNames
    .map(name => `export { ${name} } from './icons/${name}';`)
    .join('\n');

  return `// Base Icon component and types
export { Icon } from './Icon';
export type { IconProps, IconSize } from './types';

// Auto-generated icon exports
${exports}
`;
}

/**
 * Find all icon components in the Figma file node
 * Only picks up COMPONENT_SETs (using parent name) and standalone COMPONENTs
 */
function findIconComponents(node, icons = [], visitedSets = new Set()) {
  // For COMPONENT_SET, use the set name and first variant's ID
  if (node.type === 'COMPONENT_SET') {
    if (!visitedSets.has(node.id) && isValidComponentName(node.name)) {
      visitedSets.add(node.id);
      // Get the first variant (usually the default)
      const defaultVariant = node.children?.[0];
      if (defaultVariant) {
        icons.push({
          id: defaultVariant.id,
          name: node.name,
        });
      }
    }
    // Don't recurse into COMPONENT_SET children to avoid picking up variants
    return icons;
  }

  // For standalone COMPONENT (not inside a COMPONENT_SET)
  if (node.type === 'COMPONENT' && isValidComponentName(node.name)) {
    icons.push({
      id: node.id,
      name: node.name,
    });
  }

  // Recurse into children (frames, groups, etc.)
  if (node.children) {
    for (const child of node.children) {
      findIconComponents(child, icons, visitedSets);
    }
  }

  return icons;
}

async function main() {
  const token = process.env.FIGMA_ACCESS_TOKEN;
  const fileKey = process.env.FIGMA_ICONS_FILE_KEY || process.env.FIGMA_FILE_KEY;
  let iconsNodeId = process.env.FIGMA_ICONS_NODE_ID;

  if (!token || !fileKey || !iconsNodeId) {
    console.log('Icon generation script');
    console.log('======================');
    console.log('');
    console.log('To use this script, set the following environment variables:');
    console.log('  FIGMA_ACCESS_TOKEN    - Your Figma personal access token');
    console.log('  FIGMA_ICONS_FILE_KEY  - The Figma file key containing your icons');
    console.log('                          (or FIGMA_FILE_KEY as fallback)');
    console.log('  FIGMA_ICONS_NODE_ID   - The node ID of the icons frame');
    console.log('                          (supports both URL format 1565-5788 and API format 1565:5788)');
    console.log('');
    console.log('Example:');
    console.log('  FIGMA_ACCESS_TOKEN=xxx FIGMA_ICONS_FILE_KEY=yyy FIGMA_ICONS_NODE_ID=1565-5788 bun script:icons');
    console.log('');
    console.log(`Icons will be generated to: packages/icons/src/icons/`);
    return;
  }

  // Normalize node ID (convert URL format to API format)
  iconsNodeId = normalizeNodeId(iconsNodeId);

  console.log('Fetching icons from Figma...');
  console.log(`File key: ${fileKey}`);
  console.log(`Node ID: ${iconsNodeId}`);

  try {
    // Step 1: Get node info to find all icon components
    console.log('\n[1/4] Fetching icon components from Figma...');
    const nodeResponse = await fetch(
      `${FIGMA_API_BASE}/files/${fileKey}/nodes?ids=${iconsNodeId}`,
      {
        headers: {
          'X-Figma-Token': token,
        },
      }
    );

    if (!nodeResponse.ok) {
      const errorText = await nodeResponse.text();
      throw new Error(`Figma API error: ${nodeResponse.status} ${nodeResponse.statusText}\n${errorText}`);
    }

    const nodeData = await nodeResponse.json();
    const rootNode = nodeData.nodes[iconsNodeId]?.document;

    if (!rootNode) {
      throw new Error(`Node ${iconsNodeId} not found in Figma file`);
    }

    // Find all icon components
    const iconComponents = findIconComponents(rootNode);
    console.log(`Found ${iconComponents.length} icon components`);

    if (iconComponents.length === 0) {
      console.log('No icon components found. Make sure the node contains COMPONENT or COMPONENT_SET nodes.');
      return;
    }

    // Log found icons
    console.log('Icons to generate:');
    iconComponents.forEach(ic => console.log(`  - ${ic.name}`));

    // Step 2: Export SVGs for all components
    console.log('\n[2/4] Exporting SVGs from Figma...');
    const nodeIds = iconComponents.map(c => c.id).join(',');
    const imagesResponse = await fetch(
      `${FIGMA_API_BASE}/images/${fileKey}?ids=${nodeIds}&format=svg`,
      {
        headers: {
          'X-Figma-Token': token,
        },
      }
    );

    if (!imagesResponse.ok) {
      const errorText = await imagesResponse.text();
      throw new Error(`Figma Images API error: ${imagesResponse.status}\n${errorText}`);
    }

    const imagesData = await imagesResponse.json();
    const svgUrls = imagesData.images;

    // Step 3: Download and process SVGs
    console.log('\n[3/4] Processing SVGs and generating React components...');

    // Create output directory if it doesn't exist (preserve existing icons)
    await mkdir(OUTPUT_DIR, { recursive: true });

    // Get existing icons to merge with new ones
    let existingIcons = [];
    if (existsSync(OUTPUT_DIR)) {
      const files = await readdir(OUTPUT_DIR);
      existingIcons = files
        .filter(f => f.endsWith('.tsx'))
        .map(f => f.replace('.tsx', ''));
      console.log(`Found ${existingIcons.length} existing icons`);
    }

    const generatedIcons = [];

    for (const icon of iconComponents) {
      const svgUrl = svgUrls[icon.id];
      if (!svgUrl) {
        console.warn(`  Warning: No SVG URL for ${icon.name} (${icon.id})`);
        continue;
      }

      // Fetch SVG content
      const svgResponse = await fetch(svgUrl);
      if (!svgResponse.ok) {
        console.warn(`  Warning: Failed to fetch SVG for ${icon.name}`);
        continue;
      }

      let svgContent = await svgResponse.text();

      // Process SVG
      svgContent = optimizeSvg(svgContent);
      svgContent = svgAttributesToReact(svgContent);
      const innerContent = extractSvgContent(svgContent);

      if (!innerContent) {
        console.warn(`  Warning: Empty SVG content for ${icon.name}`);
        continue;
      }

      // Generate component
      const componentName = figmaNameToComponentName(icon.name);
      const componentCode = generateComponent(componentName, innerContent);

      // Write component file
      const componentPath = join(OUTPUT_DIR, `${componentName}.tsx`);
      await writeFile(componentPath, componentCode, 'utf-8');

      generatedIcons.push(componentName);
      console.log(`  Generated: ${componentName}`);
    }

    // Step 4: Generate barrel exports (merge existing + new icons)
    console.log('\n[4/4] Generating barrel exports...');

    // Merge existing icons with newly generated ones (deduplicate)
    const allIcons = [...new Set([...existingIcons, ...generatedIcons])].sort();
    const indexContent = generateIndexContent(allIcons);
    await writeFile(INDEX_FILE, indexContent, 'utf-8');

    console.log('\n========================================');
    console.log(`Generated ${generatedIcons.length} new icon components`);
    console.log(`Total icons: ${allIcons.length}`);
    console.log(`Output directory: packages/icons/src/icons/`);
    console.log('========================================\n');

  } catch (error) {
    console.error('Error generating icons:', error.message);
    process.exit(1);
  }
}

main();
