import React from 'react';

interface MentionProps extends React.HTMLProps<HTMLSpanElement> {}

function Mention({ children, ...props }: MentionProps) {
  return <span {...props}>{children}</span>;
}

export default Mention;
