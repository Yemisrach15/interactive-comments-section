import React from 'react';
import { Box, Button, Picture, TextArea } from '.';
import { CommentInputFormProps } from './types';

function CommentInputForm(props: CommentInputFormProps) {
  return (
    <Box className="box box--white comment-input-form" tag={'form'}>
      <Picture className="profile-pic profile-pic--sm">
        <source srcSet={props.profileImages.webp} type="image/webp"></source>
        <img
          src={props.profileImages.png}
          alt="Profile"
          width={64}
          height={64}
          aria-hidden="true"
        />
      </Picture>
      <label htmlFor={props.labelID} className="sr-only">
        Add a comment
      </label>
      <TextArea
        className="comment-input text--dark"
        id={props.labelID}
        placeholder="Add a comment..."
        defaultValue={props.isReply ? `@${props.replyingTo}` : ''}
        onChange={props.onCommentChange}
        value={props.value}
      />
      <Button className="btn btn--primary btn--uppercase" onClick={props.onSubmitBtnClick}>
        {props.isReply ? 'Reply' : 'Send'}
      </Button>
    </Box>
  );
}

export default CommentInputForm;
