import { CSSProperties, ReactNode } from 'react';

export type CommonComponentProps = {
  className?: string;
  style?: CSSProperties;
  dataTestId?: string;
};

export type WithChildren = {
  children?: ReactNode;
};

export type WithDisabled = {
  disabled?: boolean;
};

export type FormFieldProps = {
  name?: string;
  required?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
};

export type SizeVariant = 'small' | 'medium' | 'large';

export type ValidationState = 'default' | 'error' | 'success' | 'warning';
