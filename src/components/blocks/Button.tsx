import React from 'react';
import { ButtonProps } from '../types';

function Button({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}

export default Button;
