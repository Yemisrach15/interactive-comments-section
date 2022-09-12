import React from 'react';
import { PictureProps } from '../types';

function Picture({ children, ...props }: PictureProps) {
  return <picture {...props}>{children}</picture>;
}

export default Picture;
