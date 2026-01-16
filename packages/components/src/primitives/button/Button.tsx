import React, { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';
import { Spinner } from '../spinner/Spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'tonal' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

const ButtonComponent: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  isLoading = false,
  fullWidth = false,
  type = 'button',
  className,
  style,
  onClick,
  ...rest
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      {...rest}
      type={type}
      disabled={isDisabled}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        {
          [styles.disabled]: isDisabled,
          [styles.fullWidth]: fullWidth,
          [styles.loading]: isLoading,
        },
        className
      )}
      style={style}
      onClick={isDisabled ? undefined : onClick}
    >
      {isLoading ? (
        <Spinner size="small" className={styles.spinner} />
      ) : (
        children
      )}
    </button>
  );
};

export const Button = React.memo(ButtonComponent);
