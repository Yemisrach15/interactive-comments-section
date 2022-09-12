import React from 'react';

type headingLevels = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps extends React.HTMLProps<HTMLHeadingElement> {
  tag: React.ElementType & headingLevels;
}

function Heading({ tag: Tag, children, ...props }: HeadingProps) {
  return <Tag {...props}>{children}</Tag>;
}

export default Heading;
