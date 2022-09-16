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

type textualElements = 'p' | 'span';

export interface TextProps extends React.HTMLProps<HTMLParagraphElement> {
  tag?: React.ElementType & textualElements;
}

export interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {}

export interface SpinnerProps {
  value: number;
  onPlusIconClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMinusIconClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface EditableTextProps {
  isOnEdit: boolean;
  label: string;
  labelID: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

export interface CommentBoxProps
  extends Omit<SpinnerProps, 'value'>,
    Omit<EditableTextProps, 'value' | 'label'> {
  comment: string;
  commenter: string;
  commentTimestamp: string;
  isOnEdit: boolean;
  isOwn: boolean;
  onDeleteBtnClick?: (e: React.MouseEvent) => void;
  onEditBtnClick?: (e: React.MouseEvent) => void;
  onReplyBtnClick?: (e: React.MouseEvent) => void;
  onUpdateBtnClick?: (e: React.MouseEvent) => void;
  profileImages: { png: string; webp: string };
  upvoteValue: number;
}

export interface ModalProps extends React.HTMLProps<HTMLDialogElement> {
  onCancelBtnClick: (e: React.MouseEvent) => void;
  onDeleteBtnClick: (e: React.MouseEvent) => void;
}
