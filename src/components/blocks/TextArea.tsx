import React from 'react';
import { TextAreaProps } from '../types';

function TextArea({ children, ...props }: TextAreaProps) {
  return (
    <textarea {...props} value={children as string}>
      {children}
    </textarea>
  );
}

export default TextArea;
