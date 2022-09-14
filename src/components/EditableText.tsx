import React from 'react';
import { Text, TextArea } from '.';
import { extractUserName } from '../utils';

interface EditableTextProps {
  isOnEdit: boolean;
  label: string;
  labelID: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

function EditableText(props: EditableTextProps) {
  const { userName, text } = extractUserName(props.value || '');
  return props.isOnEdit ? (
    <>
      <label htmlFor={props.labelID} className="sr-only">
        {props.label}
      </label>
      <TextArea
        className="comment-input text--dark"
        id={props.labelID}
        onChange={props.onChange}
        defaultValue={props.value}
      />
    </>
  ) : (
    <Text className="text text--light">
      {userName && (
        <Text className="mention" tag={'span'}>
          {userName}&nbsp;
        </Text>
      )}
      {text}
    </Text>
  );
}

export default EditableText;
