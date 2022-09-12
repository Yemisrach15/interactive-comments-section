import React from 'react';

interface HeadingProps extends React.HTMLProps<HTMLHeadingElement> {}

function Heading({ children, ...props }: HeadingProps) {
  return <h2 {...props}>{children}</h2>;
}

export default Heading;
