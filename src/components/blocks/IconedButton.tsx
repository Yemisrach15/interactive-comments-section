import React from 'react';

interface IconedButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

function IconedButton({ children, icon: Icon, ...props }: IconedButtonProps) {
  return (
    <button {...props}>
      {<Icon />}
      {children}
    </button>
  );
}

export default IconedButton;
