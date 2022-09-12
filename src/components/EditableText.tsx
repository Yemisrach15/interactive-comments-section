import React from 'react';
import { Text, TextArea } from '.';
import { extractUserName } from '../utils';

interface EditableTextProps {
  isOnEdit?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
}

function EditableText(props: EditableTextProps) {
  const { userName, text } = extractUserName(props.value || '');
  return props.isOnEdit ? (
    <TextArea
      className="comment-input text--dark	"
      onChange={props.onChange}
      defaultValue={props.value}
    />
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
