import React from 'react';

interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {}

function TextArea(props: TextAreaProps) {
  return (
    <textarea className={props.className} placeholder={props.placeholder} required={props.required}>
      {props.children}
    </textarea>
  );
}

export default TextArea;
