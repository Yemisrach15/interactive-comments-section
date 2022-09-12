import React from 'react';
import { MentionProps } from '../types';

function Mention({ children, ...props }: MentionProps) {
  return <span {...props}>{children}</span>;
}

export default Mention;
