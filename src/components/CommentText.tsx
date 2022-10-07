import React from 'react';
import { Text } from '../components';
import { extractUserName } from '../utils';
import { CommentTextProps } from './types';

function CommentText(props: CommentTextProps) {
  const { userName, text } = extractUserName(props.value || '');

  return (
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

export default CommentText;
