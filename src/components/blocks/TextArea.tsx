import React from 'react';

interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {}

function TextArea({ children, ...props }: TextAreaProps) {
  return <textarea {...props}>{children}</textarea>;
}

export default TextArea;
