import type { Meta, StoryObj } from '@storybook/react';
import { Icon, IconSize } from '@tomasz-wlodarczyk-pawatech/icons';

// Import all icons from @tomasz-wlodarczyk-pawatech/icons
// After running `bun script:icons`, uncomment and update these imports:
// import { IconCheck, IconClose, IconChevronDown, ... } from '@tomasz-wlodarczyk-pawatech/icons';

const meta: Meta<typeof Icon> = {
  title: 'Icons/Overview',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'color',
    },
    spin: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

// Example icon using the base Icon component
const ExampleIcon = ({ size, color }: { size: IconSize; color?: string }) => (
  <Icon size={size} color={color}>
    <polyline points="20 6 9 17 4 12" />
  </Icon>
);

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <ExampleIcon size="md" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as IconSize[]).map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', width: '24px' }}>{size}:</span>
          <ExampleIcon size={size} />
        </div>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ExampleIcon size="lg" color="#9ce800" />
      <ExampleIcon size="lg" color="#cc371b" />
      <ExampleIcon size="lg" color="#22bfdb" />
    </div>
  ),
};

export const Spinning: Story = {
  render: () => (
    <Icon size="lg" spin>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeDasharray="30 70"
      />
    </Icon>
  ),
};
