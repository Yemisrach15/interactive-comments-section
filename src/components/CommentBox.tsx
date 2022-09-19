import React from 'react';
import { Box, Button, EditableText, Heading, Picture, Spinner, Text } from '.';
import { ReactComponent as ReplyIcon } from '../assets/icons/icon-reply.svg';
import { ReactComponent as EditIcon } from '../assets/icons/icon-edit.svg';
import { ReactComponent as DeleteIcon } from '../assets/icons/icon-delete.svg';
import { CommentBoxProps } from './types';
import { extractUserName } from '../utils';

function CommentBox(props: CommentBoxProps) {
  const { userName, text } = extractUserName(props.comment || '');

  return (
    <Box className="box box--white comment-box" tag={'article'}>
      <Box tag={'section'}>
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
        <Heading className="heading" tag={'h2'}>
          {props.commenter}
          {props.isOwn && (
            <Text className="badge" tag={'span'}>
              you
            </Text>
          )}
        </Heading>
        <Text className="text text--light">{props.commentTimestamp}</Text>
      </Box>
      {props.isOnEdit && props.isOwn ? (
        <form>
          <EditableText
            isOnEdit={props.isOnEdit}
            label={'Edit comment'}
            labelID={props.labelID}
            value={props.comment}
            onChange={props.onChange}
          />
          <Button className="btn btn--primary btn--uppercase" onClick={props.onUpdateBtnClick}>
            Update
          </Button>
        </form>
      ) : (
        <Text className="text text--light">
          {userName && (
            <Text className="mention" tag={'span'}>
              {userName}&nbsp;
            </Text>
          )}
          {text}
        </Text>
      )}
      <Spinner
        value={props.upvoteValue}
        onMinusIconClick={props.onMinusIconClick}
        onPlusIconClick={props.onPlusIconClick}
      />
      <Box tag={'div'}>
        {props.isOwn ? (
          <>
            <Button
              className="btn btn--iconed btn--text-danger"
              icon={DeleteIcon}
              onClick={props.onDeleteBtnClick}
            >
              Delete
            </Button>
            <Button
              className="btn btn--iconed btn--text-primary"
              disabled={props.isOnEdit}
              icon={EditIcon}
              onClick={props.onEditBtnClick}
            >
              Edit
            </Button>
          </>
        ) : (
          <Button
            className="btn btn--iconed btn--text-primary"
            icon={ReplyIcon}
            onClick={props.onReplyBtnClick}
          >
            Reply
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default CommentBox;
