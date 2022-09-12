import React from 'react';
import { ButtonProps } from '../types';

function IconedButton({ children, icon: Icon, ...props }: ButtonProps) {
  return (
    <button {...props}>
      {Icon && <Icon aria-hidden="true" focusable="false" />}
      {children}
    </button>
  );
}

export default IconedButton;
