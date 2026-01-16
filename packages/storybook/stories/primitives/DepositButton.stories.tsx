import type { Meta, StoryObj } from '@storybook/react';
import { DepositButton } from '@tomasz-wlodarczyk-pawatech/components/primitives/deposit-button/DepositButton';

const meta: Meta<typeof DepositButton> = {
  title: 'Primitives/DepositButton',
  component: DepositButton,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        component:
          'A deposit button that displays the user balance and provides quick access to the deposit flow.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    balance: {
      control: 'text',
      description: 'The balance to display',
    },
    showChevron: {
      control: 'boolean',
      description: 'Whether to show the chevron icon',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DepositButton>;

export const Default: Story = {
  args: {
    balance: 'GH₵ 882.10',
    showChevron: true,
  },
};

export const WithoutChevron: Story = {
  args: {
    balance: 'GH₵ 882.10',
    showChevron: false,
  },
};

export const LongBalance: Story = {
  args: {
    balance: 'GH₵ 1,234,567.89',
    showChevron: true,
  },
};

export const ZeroBalance: Story = {
  args: {
    balance: 'GH₵ 0.00',
    showChevron: true,
  },
};

export const Disabled: Story = {
  args: {
    balance: 'GH₵ 882.10',
    showChevron: true,
    disabled: true,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <DepositButton balance="GH₵ 882.10" showChevron />
      <DepositButton balance="GH₵ 882.10" showChevron={false} />
      <DepositButton balance="GH₵ 882.10" showChevron disabled />
    </div>
  ),
};
