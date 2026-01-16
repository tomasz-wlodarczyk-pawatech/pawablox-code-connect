import type { IconSize } from '@pawablox/icons';

export type ButtonSize = 'sm' | 'default' | 'lg';

export const spinnerSizeMap: Record<ButtonSize, IconSize> = {
  sm: 'xs',
  default: 'sm',
  lg: 'md',
};
