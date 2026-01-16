import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '@pawablox/components/primitives/icon-button/IconButton';
import { IconBank } from '@pawablox/icons';

const meta: Meta<typeof IconButton> = {
  title: 'Primitives/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Icon-only button for compact actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'tertiary', 'tonal'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    buttonStyle: {
      control: 'select',
      options: ['square', 'circle'],
    },
    isLoading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  args: {
    icon: <IconBank />,
    variant: 'primary',
    'aria-label': 'Bank',
  },
};

export const Secondary: Story = {
  args: {
    icon: <IconBank />,
    variant: 'secondary',
    'aria-label': 'Bank',
  },
};

export const Outline: Story = {
  args: {
    icon: <IconBank />,
    variant: 'outline',
    'aria-label': 'Bank',
  },
};

export const Tertiary: Story = {
  args: {
    icon: <IconBank />,
    variant: 'tertiary',
    'aria-label': 'Bank',
  },
};

export const Tonal: Story = {
  args: {
    icon: <IconBank />,
    variant: 'tonal',
    'aria-label': 'Bank',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <IconButton icon={<IconBank />} variant="primary" aria-label="Primary" />
      <IconButton icon={<IconBank />} variant="secondary" aria-label="Secondary" />
      <IconButton icon={<IconBank />} variant="outline" aria-label="Outline" />
      <IconButton icon={<IconBank />} variant="tertiary" aria-label="Tertiary" />
      <IconButton icon={<IconBank />} variant="tonal" aria-label="Tonal" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <IconButton icon={<IconBank />} size="sm" aria-label="Small" />
      <IconButton icon={<IconBank />} size="default" aria-label="Default" />
      <IconButton icon={<IconBank />} size="lg" aria-label="Large" />
    </div>
  ),
};

export const Styles: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <IconButton icon={<IconBank />} buttonStyle="square" aria-label="Square" />
      <IconButton icon={<IconBank />} buttonStyle="circle" aria-label="Circle" />
    </div>
  ),
};

export const CircleVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <IconButton icon={<IconBank />} variant="primary" buttonStyle="circle" aria-label="Primary" />
      <IconButton
        icon={<IconBank />}
        variant="secondary"
        buttonStyle="circle"
        aria-label="Secondary"
      />
      <IconButton icon={<IconBank />} variant="outline" buttonStyle="circle" aria-label="Outline" />
      <IconButton
        icon={<IconBank />}
        variant="tertiary"
        buttonStyle="circle"
        aria-label="Tertiary"
      />
      <IconButton icon={<IconBank />} variant="tonal" buttonStyle="circle" aria-label="Tonal" />
    </div>
  ),
};

export const Loading: Story = {
  args: {
    icon: <IconBank />,
    isLoading: true,
    'aria-label': 'Loading',
  },
};

export const LoadingVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <IconButton icon={<IconBank />} variant="primary" isLoading aria-label="Primary" />
      <IconButton icon={<IconBank />} variant="secondary" isLoading aria-label="Secondary" />
      <IconButton icon={<IconBank />} variant="outline" isLoading aria-label="Outline" />
      <IconButton icon={<IconBank />} variant="tertiary" isLoading aria-label="Tertiary" />
      <IconButton icon={<IconBank />} variant="tonal" isLoading aria-label="Tonal" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    icon: <IconBank />,
    disabled: true,
    'aria-label': 'Disabled',
  },
};

export const DisabledVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <IconButton icon={<IconBank />} variant="primary" disabled aria-label="Primary" />
      <IconButton icon={<IconBank />} variant="secondary" disabled aria-label="Secondary" />
      <IconButton icon={<IconBank />} variant="outline" disabled aria-label="Outline" />
      <IconButton icon={<IconBank />} variant="tertiary" disabled aria-label="Tertiary" />
      <IconButton icon={<IconBank />} variant="tonal" disabled aria-label="Tonal" />
    </div>
  ),
};

export const AllSizesCircle: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <IconButton icon={<IconBank />} size="sm" buttonStyle="circle" aria-label="Small" />
      <IconButton icon={<IconBank />} size="default" buttonStyle="circle" aria-label="Default" />
      <IconButton icon={<IconBank />} size="lg" buttonStyle="circle" aria-label="Large" />
    </div>
  ),
};
