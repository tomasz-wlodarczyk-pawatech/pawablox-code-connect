import React from 'react';
import clsx from 'clsx';
import styles from './Spinner.module.scss';

export type SpinnerSize = 'small' | 'medium' | 'large';

export type SpinnerProps = {
  size?: SpinnerSize;
  className?: string;
};

export const Spinner: React.FC<SpinnerProps> = ({ size = 'medium', className }) => {
  return (
    <span
      className={clsx(styles.spinner, styles[size], className)}
      role="status"
      aria-label="Loading"
    />
  );
};
