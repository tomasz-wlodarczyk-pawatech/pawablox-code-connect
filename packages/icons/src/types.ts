import type { SVGProps } from 'react';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type IconProps = {
  size?: IconSize;
  color?: string;
  className?: string;
  spin?: boolean;
} & SVGProps<SVGSVGElement>;
