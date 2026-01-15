import React, { FC } from 'react';
import { Icon, IconProps } from './Icon';

const IconChevronDownComponent: FC<Omit<IconProps, 'children'>> = (props) => {
  return (
    <Icon {...props}>
      <polyline points="6 9 12 15 18 9" />
    </Icon>
  );
};

export const IconChevronDown = React.memo(IconChevronDownComponent);
