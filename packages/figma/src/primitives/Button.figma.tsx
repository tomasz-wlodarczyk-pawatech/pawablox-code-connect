import figma from '@figma/code-connect';
import { Button } from '@pawablox/components/primitives/button/Button';

figma.connect(Button, '<FIGMA_BUTTON>', {
  props: {
    variant: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'secondary',
      Tertiary: 'tertiary',
      Outline: 'outline',
    }),
    size: figma.enum('Size', {
      Default: 'default',
      Sm: 'sm',
      Lg: 'lg',
    }),
    buttonStyle: figma.enum('Style', {
      Square: 'square',
      Round: 'round',
    }),
    disabled: figma.enum('State', {
      Disabled: true,
    }),
    isLoading: figma.enum('State', {
      Loading: true,
    }),
  },
  example: ({ variant, size, buttonStyle, disabled, isLoading }) => (
    <Button
      variant={variant}
      size={size}
      buttonStyle={buttonStyle}
      disabled={disabled}
      isLoading={isLoading}
    >
      Button
    </Button>
  ),
});
