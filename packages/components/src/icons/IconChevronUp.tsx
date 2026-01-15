import React, { FC } from 'react';
import { Icon, IconProps } from './Icon';

const IconChevronUpComponent: FC<Omit<IconProps, 'children'>> = (props) => {
  return (
    <Icon {...props}>
      <polyline points="18 15 12 9 6 15" />
    </Icon>
  );
};

export const IconChevronUp = React.memo(IconChevronUpComponent);
