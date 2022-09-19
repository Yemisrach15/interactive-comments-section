import React from 'react';
import { BoxProps } from '../types';

const Box = React.forwardRef(({ tag: Tag, children, ...props }: BoxProps, ref) => {
  return (
    <Tag ref={ref} {...props}>
      {children}
    </Tag>
  );
});

Box.displayName = 'Box';

export default Box;
