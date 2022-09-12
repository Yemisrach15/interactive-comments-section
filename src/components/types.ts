export type BoxProps = React.HTMLAttributes<HTMLElement> & {
  tag: React.ElementType;
};

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

type headingLevels = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps extends React.HTMLProps<HTMLHeadingElement> {
  tag: React.ElementType & headingLevels;
}

export interface MentionProps extends React.HTMLProps<HTMLSpanElement> {}

export interface PictureProps extends React.HTMLProps<HTMLPictureElement> {}

export interface TextProps extends React.HTMLProps<HTMLParagraphElement> {}

export interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {}

export interface SpinnerProps {
  value: number;
  onPlusIconClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMinusIconClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
