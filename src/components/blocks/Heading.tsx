import React from 'react';

interface HeadingProps {
  children: React.ReactNode;
  className: string;
}

function Heading(props: HeadingProps) {
  return <h2 className={props.className}>{props.children}</h2>;
}

export default Heading;
