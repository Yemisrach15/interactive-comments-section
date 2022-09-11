import React from 'react';

interface MentionProps {
  children: React.ReactNode;
  className: string;
}

function Mention(props: MentionProps) {
  return <span className={props.className}>{props.children}</span>;
}

export default Mention;
