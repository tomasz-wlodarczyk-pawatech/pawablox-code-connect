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
    children: 'BUTTON',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'BUTTON',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'BUTTON',
    variant: 'outline',
  },
};

export const Tertiary: Story = {
  args: {
    children: 'BUTTON',
    variant: 'tertiary',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button variant="primary">PRIMARY</Button>
      <Button variant="secondary">SECONDARY</Button>
      <Button variant="outline">OUTLINE</Button>
      <Button variant="tertiary">TERTIARY</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button size="sm">SMALL</Button>
      <Button size="default">DEFAULT</Button>
      <Button size="lg">LARGE</Button>
    </div>
  ),
};

export const Styles: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button buttonStyle="square">SQUARE</Button>
      <Button buttonStyle="round">ROUND</Button>
    </div>
  ),
};

export const WithLeftIcon: Story = {
  args: {
    children: 'BUTTON',
    leftIcon: <IconBank />,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'BUTTON',
    rightIcon: <IconBank />,
  },
};

export const WithBothIcons: Story = {
  args: {
    children: 'BUTTON',
    leftIcon: <IconBank />,
    rightIcon: <IconBank />,
  },
};

export const Loading: Story = {
  args: {
    children: 'BUTTON',
    isLoading: true,
  },
};

export const LoadingVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button variant="primary" isLoading>
        PRIMARY
      </Button>
      <Button variant="secondary" isLoading>
        SECONDARY
      </Button>
      <Button variant="outline" isLoading>
        OUTLINE
      </Button>
      <Button variant="tertiary" isLoading>
        TERTIARY
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'BUTTON',
    disabled: true,
  },
};

export const DisabledVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button variant="primary" disabled>
        PRIMARY
      </Button>
      <Button variant="secondary" disabled>
        SECONDARY
      </Button>
      <Button variant="outline" disabled>
        OUTLINE
      </Button>
      <Button variant="tertiary" disabled>
        TERTIARY
      </Button>
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    children: 'FULL WIDTH BUTTON',
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
      <Button variant="primary" buttonStyle="round">
        PRIMARY
      </Button>
      <Button variant="secondary" buttonStyle="round">
        SECONDARY
      </Button>
      <Button variant="outline" buttonStyle="round">
        OUTLINE
      </Button>
      <Button variant="tertiary" buttonStyle="round">
        TERTIARY
      </Button>
    </div>
  ),
};

export const AllSizesRound: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button size="sm" buttonStyle="round">
        SMALL
      </Button>
      <Button size="default" buttonStyle="round">
        DEFAULT
      </Button>
      <Button size="lg" buttonStyle="round">
        LARGE
      </Button>
    </div>
  ),
};
