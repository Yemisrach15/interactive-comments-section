import React from 'react';
import { TextAreaProps } from '../types';

function TextArea({ children, ...props }: TextAreaProps) {
  return <textarea {...props}>{children}</textarea>;
}

export default TextArea;
