import figma from '@figma/code-connect';
import {
  IconButton,
  type IconButtonVariant,
  type IconButtonSize,
  type IconButtonStyle,
} from '@pawablox/components/primitives/icon-button/IconButton';

figma.connect(IconButton, '<FIGMA_ICON_BUTTON>', {
  props: {
    icon: figma.instance('Icon'),
    variant: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'secondary',
      Tertiary: 'tertiary',
      Outline: 'outline',
      Tonal: 'tonal',
    }) as IconButtonVariant,
    size: figma.enum('Size', {
      Default: 'default',
      sm: 'sm',
      lg: 'lg',
    }) as IconButtonSize,
    buttonStyle: figma.enum('Style', {
      Square: 'square',
      Circle: 'circle',
    }) as IconButtonStyle,
    disabled: figma.enum('State', {
      Disabled: true,
    }),
    isLoading: figma.enum('State', {
      Loading: true,
    }),
  },
  example: ({ icon, variant, size, buttonStyle, disabled, isLoading }) => (
    <IconButton
      icon={icon}
      variant={variant}
      size={size}
      buttonStyle={buttonStyle}
      disabled={disabled}
      isLoading={isLoading}
      aria-label="Action"
    />
  ),
});
