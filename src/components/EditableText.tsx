import React from 'react';
import { CommentText, TextArea } from '.';
import { EditableTextProps } from './types';

function EditableText(props: EditableTextProps) {
  return props.isOnEdit ? (
    <>
      <label htmlFor={props.labelID} className="sr-only">
        {props.label}
      </label>
      <TextArea
        className="comment-input text--dark"
        id={props.labelID}
        defaultValue={props.value}
      />
    </>
  ) : (
    <CommentText value={props.value} />
  );
}

export default EditableText;
