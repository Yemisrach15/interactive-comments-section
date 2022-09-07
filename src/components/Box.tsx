import React from 'react';
import { BoxProps } from '../types';

function Box({ children }: BoxProps) {
  return <div>{children}</div>;
}

export default Box;
