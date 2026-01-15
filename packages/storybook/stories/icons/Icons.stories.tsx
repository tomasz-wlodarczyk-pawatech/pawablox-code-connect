import type { Meta, StoryObj } from '@storybook/react';
import { IconCheck } from '@pawablox/components/icons/IconCheck';
import { IconChevronDown } from '@pawablox/components/icons/IconChevronDown';
import { IconChevronUp } from '@pawablox/components/icons/IconChevronUp';
import { IconClose } from '@pawablox/components/icons/IconClose';
import { IconSearch } from '@pawablox/components/icons/IconSearch';
import { IconSpinner } from '@pawablox/components/icons/IconSpinner';
import { Icon, IconSize } from '@pawablox/components/icons/Icon';

const meta: Meta<typeof Icon> = {
  title: 'Icons/Overview',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

const AllIcons = ({ size, color }: { size: IconSize; color?: string }) => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <IconCheck size={size} color={color} />
    <IconClose size={size} color={color} />
    <IconChevronDown size={size} color={color} />
    <IconChevronUp size={size} color={color} />
    <IconSearch size={size} color={color} />
    <IconSpinner size={size} color={color} />
  </div>
);

export const Default: Story = {
  render: () => <AllIcons size="md" />,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <span style={{ marginRight: '8px', fontSize: '12px' }}>xs:</span>
        <AllIcons size="xs" />
      </div>
      <div>
        <span style={{ marginRight: '8px', fontSize: '12px' }}>sm:</span>
        <AllIcons size="sm" />
      </div>
      <div>
        <span style={{ marginRight: '8px', fontSize: '12px' }}>md:</span>
        <AllIcons size="md" />
      </div>
      <div>
        <span style={{ marginRight: '8px', fontSize: '12px' }}>lg:</span>
        <AllIcons size="lg" />
      </div>
      <div>
        <span style={{ marginRight: '8px', fontSize: '12px' }}>xl:</span>
        <AllIcons size="xl" />
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <AllIcons size="lg" color="#9ce800" />
      <AllIcons size="lg" color="#cc371b" />
      <AllIcons size="lg" color="#22bfdb" />
    </div>
  ),
};
