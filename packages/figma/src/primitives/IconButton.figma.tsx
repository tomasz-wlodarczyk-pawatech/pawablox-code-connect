import figma from '@figma/code-connect';
import {
  IconButton,
  IconButtonSize,
  IconButtonStyle,
  IconButtonVariant,
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
    }),
    size: figma.enum('Size', {
      Default: 'default',
      sm: 'sm',
      lg: 'lg',
    }),
    buttonStyle: figma.enum('Style', {
      Square: 'square',
      Circle: 'circle',
    }),
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
      variant={variant as IconButtonVariant}
      size={size as IconButtonSize}
      buttonStyle={buttonStyle as IconButtonStyle}
      disabled={disabled}
      isLoading={isLoading}
      aria-label="Action"
    />
  ),
});
