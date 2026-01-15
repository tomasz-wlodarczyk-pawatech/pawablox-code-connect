import React, { FC } from 'react';
import { Icon, IconProps } from './Icon';

const IconCheckComponent: FC<Omit<IconProps, 'children'>> = (props) => {
  return (
    <Icon {...props}>
      <polyline points="20 6 9 17 4 12" />
    </Icon>
  );
};

export const IconCheck = React.memo(IconCheckComponent);
