import figma from '@figma/code-connect';
import {
  Button,
  ButtonSize,
  ButtonStyle,
  ButtonVariant,
} from '@tomasz-wlodarczyk-pawatech/components/primitives/button/Button';

figma.connect(Button, '<FIGMA_BUTTON>', {
  props: {
    variant: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'secondary',
      Tertiary: 'tertiary',
      Outline: 'outline',
    }) as ButtonVariant,
    size: figma.enum('Size', {
      Default: 'default',
      Sm: 'sm',
      Lg: 'lg',
    }) as ButtonSize,
    buttonStyle: figma.enum('Style', {
      Square: 'square',
      Round: 'round',
    }) as ButtonStyle,
    disabled: figma.enum('State', {
      Disabled: true,
    }),
    isLoading: figma.enum('State', {
      Loading: true,
    }),
  },
  example: ({ variant, size, buttonStyle, disabled, isLoading }) => (
    <Button
      title="Button"
      variant={variant}
      size={size}
      buttonStyle={buttonStyle}
      disabled={disabled}
      isLoading={isLoading}
    />
  ),
});
