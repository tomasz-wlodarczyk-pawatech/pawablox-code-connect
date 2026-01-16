import React from 'react';
import { Icon, IconProps } from '../Icon';

export const IconSpinner: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon spin {...props}>
    <path
      d="M12 2v4m0 12v4m10-10h-4M6 12H2m15.07-7.07-2.83 2.83M9.76 14.24l-2.83 2.83m11.31 0-2.83-2.83M9.76 9.76 6.93 6.93"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

IconSpinner.displayName = 'IconSpinner';
