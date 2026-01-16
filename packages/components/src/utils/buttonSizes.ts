import type { IconSize } from '@tomasz-wlodarczyk-pawatech/icons';

export type ButtonSize = 'sm' | 'default' | 'lg';

export const spinnerSizeMap: Record<ButtonSize, IconSize> = {
  sm: 'xs',
  default: 'sm',
  lg: 'md',
};
