import React from 'react';
import { TextAreaProps } from '../types';

function TextArea(props: TextAreaProps) {
  return (
    <textarea
      onFocus={(e) => (e.target.selectionStart = e.target.selectionEnd = e.target.value.length)}
      {...props}
    />
  );
}

export default TextArea;
