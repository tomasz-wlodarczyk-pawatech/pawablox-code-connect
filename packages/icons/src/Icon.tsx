import React from 'react';
import clsx from 'clsx';
import type { IconProps, IconSize } from './types';
import styles from './Icon.module.scss';

const sizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

export const Icon: React.FC<IconProps> = ({
  size = 'md',
  color = 'currentColor',
  className,
  spin = false,
  children,
  ...props
}) => {
  const dimension = sizeMap[size];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimension}
      height={dimension}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx(styles.icon, spin && styles.spin, className)}
      {...props}>
      {children}
    </svg>
  );
};

export type { IconProps, IconSize };
