import React from 'react';
import { TextAreaProps } from '../types';

function TextArea({ children, ...props }: TextAreaProps) {
  return (
    <textarea {...props} defaultValue={props.defaultValue || (children as string)}>
      {children}
    </textarea>
  );
}

export default TextArea;
