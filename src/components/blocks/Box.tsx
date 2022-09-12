import React from 'react';

type BoxProps = React.HTMLAttributes<HTMLElement> & {
  tag: React.ElementType;
};

function Box({ tag: Tag, children, ...props }: BoxProps) {
  return <Tag {...props}>{children}</Tag>;
}

export default Box;
