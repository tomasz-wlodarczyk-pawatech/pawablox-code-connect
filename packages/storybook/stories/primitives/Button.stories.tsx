import type { Meta, StoryObj } from '@storybook/react';
// import { Button } from '@pawablox/components/primitives/button/Button';

// Placeholder story - will be updated when Button component is implemented
const ButtonPlaceholder = () => (
  <div style={{ padding: '20px', background: '#f0f0f0', borderRadius: '4px' }}>
    <p>Button component placeholder</p>
    <p style={{ fontSize: '12px', color: '#666' }}>
      Implement Button component in packages/components/src/primitives/button/Button.tsx
    </p>
  </div>
);

const meta: Meta<typeof ButtonPlaceholder> = {
  title: 'Primitives/Button',
  component: ButtonPlaceholder,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Primary action button for user interactions.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ButtonPlaceholder>;

export const Default: Story = {
  render: () => <ButtonPlaceholder />,
};

// When Button is implemented, use these stories:
// export const Primary: Story = {
//   args: {
//     title: 'Primary Button',
//     variant: 'primary',
//   },
// };

// export const Secondary: Story = {
//   args: {
//     title: 'Secondary Button',
//     variant: 'secondary',
//   },
// };

// export const AllVariants: Story = {
//   render: () => (
//     <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
//       <Button title="Primary" variant="primary" />
//       <Button title="Secondary" variant="secondary" />
//       <Button title="Tertiary" variant="tertiary" />
//       <Button title="Outline" variant="outline" />
//       <Button title="Text" variant="text" />
//       <Button title="Link" variant="link" />
//     </div>
//   ),
// };

// export const Sizes: Story = {
//   render: () => (
//     <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
//       <Button title="Medium" size="medium" />
//       <Button title="Large" size="large" />
//     </div>
//   ),
// };

// export const Loading: Story = {
//   args: {
//     title: 'Loading Button',
//     isLoading: true,
//   },
// };

// export const Disabled: Story = {
//   args: {
//     title: 'Disabled Button',
//     disabled: true,
//   },
// };
