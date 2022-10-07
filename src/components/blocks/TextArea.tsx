import React from 'react';
import { TextAreaProps } from '../types';

function TextArea({ children, ...props }: TextAreaProps) {
  return (
    <textarea
      onFocus={(e) => (e.target.selectionStart = e.target.selectionEnd = e.target.value.length)}
      defaultValue={props.defaultValue || (children as string)}
      {...props}
    >
      {children}
    </textarea>
  );
}

export default TextArea;
