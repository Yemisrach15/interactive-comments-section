import React from 'react';
import { Box, Button, CommentText, EditableText, Heading, Picture, Spinner, Text } from '.';
import { ReactComponent as ReplyIcon } from '../assets/icons/icon-reply.svg';
import { ReactComponent as EditIcon } from '../assets/icons/icon-edit.svg';
import { ReactComponent as DeleteIcon } from '../assets/icons/icon-delete.svg';
import { CommentBoxProps } from './types';

function CommentBox(props: CommentBoxProps) {
  return (
    <Box tag={'article'}>
      <Box
        tag={'section'}
        className="box box--white comment-box"
        data-id={props.id}
        data-new={props.new as boolean}
      >
        <Box tag={'header'}>
          <Picture className="profile-pic profile-pic--sm">
            <source
              srcSet={require(`../assets/${props.profileImages.webp}`)}
              type="image/webp"
            ></source>
            <img
              src={require(`../assets/${props.profileImages.png}`)}
              alt={`${props.commenter}'s profile`}
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
            />
            <Button className="btn btn--primary btn--uppercase" onClick={props.onUpdateBtnClick}>
              Update
            </Button>
          </form>
        ) : (
          <CommentText value={props.comment} />
        )}
        <Spinner
          value={props.upvoteValue}
          onMinusIconClick={props.onMinusIconClick}
          onPlusIconClick={props.onPlusIconClick}
        />
        <Box tag={'ul'}>
          {props.isOwn ? (
            <>
              <li>
                <Button
                  className="btn btn--iconed btn--text-danger"
                  icon={DeleteIcon}
                  onClick={props.onDeleteBtnClick}
                >
                  Delete
                </Button>
              </li>
              <li>
                <Button
                  className="btn btn--iconed btn--text-primary"
                  icon={props.isOnEdit ? null : EditIcon}
                  onClick={props.onEditBtnClick}
                >
                  {props.isOnEdit ? 'Cancel' : 'Edit'}
                </Button>
              </li>
            </>
          ) : (
            <li>
              <Button
                className="btn btn--iconed btn--text-primary"
                icon={props.isOnReply ? null : ReplyIcon}
                onClick={props.onReplyBtnClick}
              >
                {props.isOnReply ? 'Cancel' : 'Reply'}
              </Button>
            </li>
          )}
        </Box>
      </Box>
      {(props.hasReplies || props.isOnReply) && (
        <Box tag={'div'} className="comment-box--indent">
          {props.children}
        </Box>
      )}
    </Box>
  );
}

export default CommentBox;
