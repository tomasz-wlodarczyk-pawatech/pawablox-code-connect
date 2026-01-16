import React, { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import { IconSpinner } from '@pawablox/icons';
import { spinnerSizeMap, type ButtonSize } from '../../utils/buttonSizes';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'tertiary';
export type { ButtonSize };
export type ButtonStyle = 'square' | 'round';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'title'> {
  title: string;
  titleClassName?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  buttonStyle?: ButtonStyle;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      title,
      titleClassName,
      variant = 'primary',
      size = 'default',
      buttonStyle = 'square',
      leftIcon,
      rightIcon,
      isLoading = false,
      fullWidth = false,
      disabled = false,
      className,
      type = 'button',
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
        className={clsx(
          styles.button,
          styles[variant],
          styles[size],
          styles[buttonStyle],
          {
            [styles.loading]: isLoading,
            [styles.disabled]: isDisabled,
            [styles.fullWidth]: fullWidth,
          },
          className
        )}
        {...props}>
        {isLoading && (
          <span className={styles.icon}>
            <IconSpinner size={spinnerSizeMap[size]} />
          </span>
        )}
        {!isLoading && leftIcon && <span className={styles.icon}>{leftIcon}</span>}
        <span className={clsx(styles.title, titleClassName)}>{title}</span>
        {!isLoading && rightIcon && <span className={styles.icon}>{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
