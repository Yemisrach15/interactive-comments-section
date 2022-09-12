import React from 'react';

interface PictureProps extends React.HTMLProps<HTMLPictureElement> {}

function Picture({ children, ...props }: PictureProps) {
  return <picture {...props}>{children}</picture>;
}

export default Picture;
