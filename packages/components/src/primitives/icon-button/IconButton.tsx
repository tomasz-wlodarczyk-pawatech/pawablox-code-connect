import React, { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import { IconSpinner } from '@tomasz-wlodarczyk-pawatech/icons';
import { spinnerSizeMap, type ButtonSize } from '../../utils/buttonSizes';
import styles from './IconButton.module.scss';

export type IconButtonVariant = 'primary' | 'secondary' | 'outline' | 'tertiary' | 'tonal';
export type IconButtonSize = ButtonSize;
export type IconButtonStyle = 'square' | 'circle';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  buttonStyle?: IconButtonStyle;
  isLoading?: boolean;
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant = 'primary',
      size = 'default',
      buttonStyle = 'square',
      isLoading = false,
      disabled = false,
      className,
      type = 'button',
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-label={ariaLabel}
        className={clsx(
          styles.iconButton,
          styles[variant],
          styles[size],
          styles[buttonStyle],
          {
            [styles.loading]: isLoading,
            [styles.disabled]: isDisabled,
          },
          className
        )}
        {...props}>
        {isLoading ? (
          <IconSpinner size={spinnerSizeMap[size]} />
        ) : (
          <span className={styles.icon}>{icon}</span>
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
