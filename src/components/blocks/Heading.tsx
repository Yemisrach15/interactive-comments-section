import React from 'react';
import { HeadingProps } from '../types';

function Heading({ tag: Tag, children, ...props }: HeadingProps) {
  return <Tag {...props}>{children}</Tag>;
}

export default Heading;
