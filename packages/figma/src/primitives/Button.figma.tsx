import figma from '@figma/code-connect';
import {
  Button,
  type ButtonVariant,
  type ButtonSize,
  type ButtonStyle,
} from '@pawablox/components/primitives/button/Button';

figma.connect(Button, '<FIGMA_BUTTON>', {
  props: {
    children: figma.string('buttonText'),
    variant: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'secondary',
      Tertiary: 'tertiary',
      Outline: 'outline',
    }) as ButtonVariant,
    size: figma.enum('Size', {
      Default: 'default',
      sm: 'sm',
      lg: 'lg',
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
    leftIcon: figma.boolean('showLeftIcon', {
      true: figma.instance('IconLeft'),
      false: undefined,
    }),
    rightIcon: figma.boolean('showRightIcon', {
      true: figma.instance('IconRight'),
      false: undefined,
    }),
  },
  example: ({ children, leftIcon, rightIcon, ...props }) => (
    <Button leftIcon={leftIcon} rightIcon={rightIcon} {...props}>
      {children}
    </Button>
  ),
});
