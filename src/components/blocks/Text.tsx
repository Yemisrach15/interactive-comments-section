import React from 'react';
import { TextProps } from '../types';

function Text({ children, tag: Tag, ...props }: TextProps) {
  return Tag ? <Tag {...props}>{children}</Tag> : <p {...props}>{children}</p>;
}

export default Text;
