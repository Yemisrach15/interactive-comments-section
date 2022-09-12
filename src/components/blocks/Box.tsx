import React from 'react';
import { BoxProps } from '../types';

function Box({ tag: Tag, children, ...props }: BoxProps) {
  return <Tag {...props}>{children}</Tag>;
}

export default Box;
