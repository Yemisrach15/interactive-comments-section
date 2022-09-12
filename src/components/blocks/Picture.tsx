import React from 'react';

interface PictureProps extends React.HTMLProps<HTMLPictureElement> {}

function Picture(props: PictureProps) {
  return <picture {...props}>{props.children}</picture>;
}

export default Picture;
