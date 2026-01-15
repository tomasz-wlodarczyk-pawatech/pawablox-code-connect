import React, { FC } from 'react';
import clsx from 'clsx';
import { Icon, IconProps } from './Icon';
import styles from './IconSpinner.module.scss';

const IconSpinnerComponent: FC<Omit<IconProps, 'children'>> = (props) => {
  const { className, ...rest } = props;

  return (
    <Icon className={clsx(className, styles.spinner)} {...rest}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </Icon>
  );
};

export const IconSpinner = React.memo(IconSpinnerComponent);
