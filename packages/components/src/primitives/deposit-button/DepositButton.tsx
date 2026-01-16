import React, { forwardRef, type ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import { IconChevronDown, IconPlus } from '@pawablox/icons';
import styles from './DepositButton.module.scss';

export interface DepositButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  balance: string;
  showChevron?: boolean;
  'aria-label'?: string;
}

export const DepositButton = forwardRef<HTMLButtonElement, DepositButtonProps>(
  (
    {
      balance,
      showChevron = true,
      disabled = false,
      className,
      type = 'button',
      'aria-label': ariaLabel = 'Deposit',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        aria-label={ariaLabel}
        className={clsx(
          styles.depositButton,
          {
            [styles.disabled]: disabled,
          },
          className
        )}
        {...props}>
        <span className={styles.balanceContainer}>
          <span className={styles.balance}>{balance}</span>
          {showChevron && (
            <span className={styles.chevron}>
              <IconChevronDown size="sm" />
            </span>
          )}
        </span>
        <span className={styles.depositIcon}>
          <IconPlus size="sm" />
        </span>
      </button>
    );
  }
);

DepositButton.displayName = 'DepositButton';
