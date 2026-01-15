const FIGMA_API_BASE = 'https://api.figma.com/v1';
const OUTPUT_DIR = 'packages/components/src/icons';

async function main() {
  const token = process.env.FIGMA_ACCESS_TOKEN;
  const fileKey = process.env.FIGMA_FILE_KEY;
  const iconsNodeId = process.env.FIGMA_ICONS_NODE_ID;

  if (!token || !fileKey || !iconsNodeId) {
    console.log('Icon generation script');
    console.log('======================');
    console.log('');
    console.log('To use this script, set the following environment variables:');
    console.log('  FIGMA_ACCESS_TOKEN - Your Figma personal access token');
    console.log('  FIGMA_FILE_KEY - The Figma file key containing your icons');
    console.log('  FIGMA_ICONS_NODE_ID - The node ID of the icons frame');
    console.log('');
    console.log('Example:');
    console.log('  FIGMA_ACCESS_TOKEN=xxx FIGMA_FILE_KEY=yyy FIGMA_ICONS_NODE_ID=zzz bun scripts/icons/app.mjs');
    console.log('');
    console.log(`Icons will be generated to: ${OUTPUT_DIR}/`);
    return;
  }

  console.log('Fetching icons from Figma...');

  try {
    // Get node info
    const response = await fetch(
      `${FIGMA_API_BASE}/files/${fileKey}/nodes?ids=${iconsNodeId}`,
      {
        headers: {
          'X-Figma-Token': token,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Icons data fetched successfully!');

    // TODO: Implement icon generation logic
    // 1. Export SVGs from Figma
    // 2. Convert to React components
    // 3. Write to OUTPUT_DIR
    console.log('');
    console.log('Note: Icon generation not yet implemented.');
    console.log('Please implement the SVG-to-React conversion logic.');

  } catch (error) {
    console.error('Error fetching icons:', error.message);
    process.exit(1);
  }
}

main();
