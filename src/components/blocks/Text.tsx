import React from 'react';
import { TextProps } from '../types';

function Text({ children, ...props }: TextProps) {
  return <p {...props}>{children}</p>;
}

export default Text;
