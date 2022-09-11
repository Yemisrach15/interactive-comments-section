import React from 'react';

interface TextProps {
  children: React.ReactNode;
  className: string;
}

function Text(props: TextProps) {
  return <p className={props.className}>{props.children}</p>;
}

export default Text;
