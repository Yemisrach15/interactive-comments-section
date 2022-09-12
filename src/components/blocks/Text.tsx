import React from 'react';

interface TextProps extends React.HTMLProps<HTMLParagraphElement> {}

function Text({ children, ...props }: TextProps) {
  return <p {...props}>{children}</p>;
}

export default Text;
