import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@pawablox/components/primitives/button/Button';
import { IconBank } from '@pawablox/icons';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Primary action button for user interactions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'tertiary'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    buttonStyle: {
      control: 'select',
      options: ['square', 'round'],
    },
    isLoading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    title: 'BUTTON',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    title: 'BUTTON',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    title: 'BUTTON',
    variant: 'outline',
  },
};

export const Tertiary: Story = {
  args: {
    title: 'BUTTON',
    variant: 'tertiary',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button title="PRIMARY" variant="primary" />
      <Button title="SECONDARY" variant="secondary" />
      <Button title="OUTLINE" variant="outline" />
      <Button title="TERTIARY" variant="tertiary" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button title="SMALL" size="sm" />
      <Button title="DEFAULT" size="default" />
      <Button title="LARGE" size="lg" />
    </div>
  ),
};

export const Styles: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button title="SQUARE" buttonStyle="square" />
      <Button title="ROUND" buttonStyle="round" />
    </div>
  ),
};

export const WithLeftIcon: Story = {
  args: {
    title: 'BUTTON',
    leftIcon: <IconBank />,
  },
};

export const WithRightIcon: Story = {
  args: {
    title: 'BUTTON',
    rightIcon: <IconBank />,
  },
};

export const WithBothIcons: Story = {
  args: {
    title: 'BUTTON',
    leftIcon: <IconBank />,
    rightIcon: <IconBank />,
  },
};

export const Loading: Story = {
  args: {
    title: 'BUTTON',
    isLoading: true,
  },
};

export const LoadingVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button title="PRIMARY" variant="primary" isLoading />
      <Button title="SECONDARY" variant="secondary" isLoading />
      <Button title="OUTLINE" variant="outline" isLoading />
      <Button title="TERTIARY" variant="tertiary" isLoading />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    title: 'BUTTON',
    disabled: true,
  },
};

export const DisabledVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button title="PRIMARY" variant="primary" disabled />
      <Button title="SECONDARY" variant="secondary" disabled />
      <Button title="OUTLINE" variant="outline" disabled />
      <Button title="TERTIARY" variant="tertiary" disabled />
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    title: 'FULL WIDTH BUTTON',
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const RoundVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button title="PRIMARY" variant="primary" buttonStyle="round" />
      <Button title="SECONDARY" variant="secondary" buttonStyle="round" />
      <Button title="OUTLINE" variant="outline" buttonStyle="round" />
      <Button title="TERTIARY" variant="tertiary" buttonStyle="round" />
    </div>
  ),
};

export const AllSizesRound: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button title="SMALL" size="sm" buttonStyle="round" />
      <Button title="DEFAULT" size="default" buttonStyle="round" />
      <Button title="LARGE" size="lg" buttonStyle="round" />
    </div>
  ),
};
