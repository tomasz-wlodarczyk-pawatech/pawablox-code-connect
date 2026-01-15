

import fs from 'fs';
import path from 'path';

const componentName = process.argv[2];
const category = process.argv[3] || 'primitives';

if (!componentName) {
  console.log('Component Generator');
  console.log('===================');
  console.log('');
  console.log('Usage: bun scripts/generate-component.mjs ComponentName [category]');
  console.log('');
  console.log('Categories: primitives (default), layout, compositions');
  console.log('');
  console.log('Examples:');
  console.log('  bun scripts/generate-component.mjs Button');
  console.log('  bun scripts/generate-component.mjs Card compositions');
  console.log('  bun scripts/generate-component.mjs Flex layout');
  process.exit(0);
}

const folderName = componentName.toLowerCase();
const componentDir = path.join('packages/components/src', category, folderName);
const storiesDir = path.join('packages/storybook/stories', category);
const figmaDir = path.join('packages/figma/src', category);

// Component template
const componentTemplate = `import React, { CSSProperties, FC, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './${componentName}.module.scss';

export type ${componentName}Props = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  dataTestId?: string;
};

const ${componentName}Component: FC<${componentName}Props> = (props) => {
  const { children, className = '', style, dataTestId } = props;

  return (
    <div
      className={clsx(className, styles.${folderName})}
      style={style}
      data-test-id={dataTestId}>
      {children}
    </div>
  );
};

export const ${componentName} = React.memo(${componentName}Component);
`;

const scssTemplate = `@use '@pawablox/tokens/scss/mixins';
@use '@pawablox/tokens/scss/vars/colors';
@use '@pawablox/tokens/scss/vars/sizes';

.${folderName} {
  // Add your styles here
}
`;

const storyTemplate = `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from '@pawablox/components/${category}/${folderName}/${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: '${category.charAt(0).toUpperCase() + category.slice(1)}/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {
  args: {
    children: '${componentName} content',
  },
};
`;

// Figma Code Connect template
const figmaTemplate = `import figma from '@figma/code-connect';
// import { ${componentName} } from '@pawablox/components/${category}/${folderName}/${componentName}';

// TODO: Update FIGMA_${componentName.toUpperCase()}_URL with actual Figma component URL
const FIGMA_${componentName.toUpperCase()}_URL = '<FIGMA_${componentName.toUpperCase()}>';

// Uncomment and update when component is connected to Figma
// figma.connect(${componentName}, FIGMA_${componentName.toUpperCase()}_URL, {
//   props: {
//     // Map Figma properties to component props
//   },
//   example: (props) => <${componentName} {...props} />,
// });

export {};
`;

// Create directories
[componentDir, storiesDir, figmaDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Write files
fs.writeFileSync(path.join(componentDir, `${componentName}.tsx`), componentTemplate);
fs.writeFileSync(path.join(componentDir, `${componentName}.module.scss`), scssTemplate);
fs.writeFileSync(path.join(storiesDir, `${componentName}.stories.tsx`), storyTemplate);
fs.writeFileSync(path.join(figmaDir, `${componentName}.figma.tsx`), figmaTemplate);

console.log(`Generated ${componentName} component!`);
console.log('');
console.log('Files created:');
console.log(`  ${path.join(componentDir, `${componentName}.tsx`)}`);
console.log(`  ${path.join(componentDir, `${componentName}.module.scss`)}`);
console.log(`  ${path.join(storiesDir, `${componentName}.stories.tsx`)}`);
console.log(`  ${path.join(figmaDir, `${componentName}.figma.tsx`)}`);
console.log('');
console.log('Next steps:');
console.log(`  1. Implement the component in ${componentName}.tsx`);
console.log(`  2. Add styles in ${componentName}.module.scss`);
console.log(`  3. Update the story in ${componentName}.stories.tsx`);
console.log(`  4. Connect to Figma in ${componentName}.figma.tsx`);
