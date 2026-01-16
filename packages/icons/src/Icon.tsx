import React from 'react';
import clsx from 'clsx';
import type { IconProps, IconSize } from './types';
import styles from './Icon.module.scss';

const sizeMap: Record<IconSize, string> = {
  xs: '12px',
  sm: '16px',
  md: '20px',
  lg: '24px',
  xl: '32px',
};

export const Icon: React.FC<IconProps> = ({
  size,
  color = 'currentColor',
  className,
  spin = false,
  children,
  ...props
}) => {
  // If no size provided, use 1em to inherit from parent font-size
  const dimension = size ? sizeMap[size] : '1em';

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
