import React, { CSSProperties, FC, SVGProps } from 'react';
import clsx from 'clsx';
import styles from './Icon.module.scss';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type IconProps = {
  size?: IconSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
  dataTestId?: string;
} & SVGProps<SVGSVGElement>;

const sizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

const IconComponent: FC<IconProps & { children: React.ReactNode }> = (props) => {
  const {
    size = 'md',
    color = 'currentColor',
    className = '',
    style,
    dataTestId,
    children,
    ...rest
  } = props;

  const pixelSize = sizeMap[size];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx(className, styles.icon)}
      style={style}
      data-test-id={dataTestId}
      {...rest}>
      {children}
    </svg>
  );
};

export const Icon = React.memo(IconComponent);
