import React from 'react';

interface IconedButtonProps {
  children: React.ReactNode;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  className: string;
}

function IconedButton(props: IconedButtonProps) {
  return (
    <button className={props.className}>
      <>
        {<props.icon />}
        {props.children}
      </>
    </button>
  );
}

export default IconedButton;
