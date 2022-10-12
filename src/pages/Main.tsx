import React from 'react';
import { useRecoilValue } from 'recoil';
import { Box, CommentBox, CommentInputForm, Modal } from '../components';
import { useStickystate } from '../hooks';
import { commentsState, currentUserState } from '../store';
import { IComment } from '../types';
import { extractUserName, selectTextAreaNode } from '../utils';
import { StringDictionary } from '../utils/constants';

function Main() {
  const deleteModalRef = React.useRef<HTMLDialogElement>(null);
  const [initialId, setInitialId] = React.useState<number>(0);
  const [id, setId] = React.useState<number>(0);
  const [comments, setComments] = useStickystate<IComment[]>(
    commentsState,
    StringDictionary.COMMENTS
  );
  const currentUser = useRecoilValue(currentUserState);
  const [newComment, setNewComment] = React.useState<string>('');
  const [commentToDelete, setCommentToDelete] = React.useState<{ cId: number; rId?: number }>();
  const [isModalActive, setIsModalActive] = React.useState(false);
  const [currentTextAreaId, setCurrentTextAreaId] = React.useState<string | null>(null); // For focusing on edit

  React.useEffect(() => {
    let totalComments = comments.length;
    comments.forEach((c) => {
      totalComments += c.replies?.length || 0;
    });
    setInitialId(totalComments);
    setId(++totalComments);
  }, []);

  React.useEffect(() => {
    if (currentTextAreaId && selectTextAreaNode(currentTextAreaId)) {
      selectTextAreaNode(currentTextAreaId).focus();
    }
  }, [currentTextAreaId]);

  const changeState = (property: keyof IComment, value: unknown, cId: number, rId?: number) => {
    if (!rId) {
      setComments((currentValue) =>
        currentValue.map((c) => (c.id === cId ? { ...c, [property]: value } : c))
      );
    } else {
      setComments((currentValue) =>
        currentValue.map((c) =>
          c.id === cId
            ? {
                ...c,
                replies: c.replies?.map((r) => (r.id === rId ? { ...r, [property]: value } : r)),
              }
            : c
        )
      );
    }
  };

  // Function for plus and minus button clicks
  const onMinusPlusIconClick = (isMinus: boolean, cId: number, rId?: number) => {
    if (!rId) {
      setComments((currentValue) =>
        currentValue.map((c) =>
          c.id === cId ? { ...c, score: isMinus ? c.score - 1 : c.score + 1 } : c
        )
      );
    } else {
      setComments((currentValue) =>
        currentValue.map((c) =>
          c.id === cId
            ? {
                ...c,
                replies: c.replies?.map((r) =>
                  r.id === rId ? { ...r, score: isMinus ? r.score - 1 : r.score + 1 } : r
                ),
              }
            : c
        )
      );
    }
  };

  // Function for send button click (new comment thread)
  const onSendBtnClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Don't submit if value is empty
    if (!newComment.trim()) return;

    setComments((currentValue) =>
      currentValue.concat({
        id,
        content: newComment,
        createdAt: '1 sec ago',
        score: 0,
        user: currentUser,
      })
    );

    setNewComment('');
    setId((id) => ++id);
  };

  // Function for click on reply button in threads
  const onReplyBtnClick = (isReply: boolean, cId: number, rId?: number) => {
    isReply ? setCurrentTextAreaId(`comment-${id}-for-${rId || cId}`) : setCurrentTextAreaId(null);
    changeState('isOnReply', isReply ? true : false, cId, rId);
  };

  // Function for click on new reply submit button in thread
  const onReplySubmitBtnClick = (e: React.MouseEvent, cId: number, rId?: number) => {
    e.preventDefault();

    const newReplyValue = selectTextAreaNode(`comment-${id}-for-${rId || cId}`).value;
    // Don't submit if value is empty
    if (!extractUserName(newReplyValue).text.trim()) return;

    const reply: IComment = {
      id,
      content: extractUserName(newReplyValue).text.trim(),
      createdAt: '1 sec ago',
      score: 0,
      user: currentUser,
    };
    setCurrentTextAreaId(null);

    if (!rId) {
      setComments((currentValue) =>
        currentValue.map((c) =>
          c.id === cId
            ? {
                ...c,
                isOnReply: false,
                replies: c.replies?.concat({ ...reply, replyingTo: c.user.username }),
              }
            : c
        )
      );
    } else {
      setComments((currentValue) =>
        currentValue.map((c) =>
          c.id === cId
            ? {
                ...c,
                replies: c.replies
                  ?.map((r) => {
                    if (r.id === rId) {
                      reply.replyingTo = r.user.username;
                      return { ...r, isOnReply: false };
                    }
                    return r;
                  })
                  .concat(reply),
              }
            : c
        )
      );
    }

    setId((id) => ++id);
  };

  // Function for click on edit button on own comments
  const onEditBtnClick = (isEdit: boolean, cId: number, rId?: number) => {
    isEdit ? setCurrentTextAreaId(`comment-${rId || cId}`) : setCurrentTextAreaId(null);
    changeState('isOnEdit', isEdit ? true : false, cId, rId);
  };

  // Function for update button click after editing comment
  const onUpdateBtnClick = (e: React.MouseEvent, cId: number, rId?: number) => {
    e.preventDefault();

    const updatingCommentValue = selectTextAreaNode(`comment-${rId || cId}`).value;
    // Don't submit if value is empty
    if (!extractUserName(updatingCommentValue).text.trim()) return;

    changeState('content', extractUserName(updatingCommentValue).text.trim(), cId, rId);
    changeState('isOnEdit', false, cId, rId);

    setCurrentTextAreaId(null);
  };

  const toggleOpenModal = () => {
    setIsModalActive((value) => !value);
    isModalActive ? deleteModalRef.current?.close() : deleteModalRef.current?.showModal();
  };

  // Function for delete button click on own comments
  const onDeleteBtnClick = (cId: number, rId?: number) => {
    toggleOpenModal();
    setCommentToDelete({ cId, rId });
  };

  // Function for click on delete confirmation button on modal
  const onYesDeleteBtnClick = () => {
    if (!commentToDelete?.rId) {
      setComments((currentValue) => currentValue.filter((c) => c.id !== commentToDelete?.cId));
    } else {
      setComments((currentValue) =>
        currentValue.map((c) =>
          c.id === commentToDelete.cId
            ? { ...c, replies: c.replies?.filter((r) => r.id !== commentToDelete.rId) }
            : c
        )
      );
    }
    toggleOpenModal();
  };

  return (
    <>
      <Box tag={'main'}>
        {comments &&
          comments.length &&
          comments.map((c) => (
            <React.Fragment key={c.id}>
              <CommentBox
                key={c.id}
                id={c.id}
                new={c.id !== initialId && c.id === id - 1}
                comment={c.content}
                commenter={c.user.username}
                commentTimestamp={c.createdAt}
                isOwn={c.user.username === currentUser?.username}
                onDeleteBtnClick={() => onDeleteBtnClick(c.id)}
                isOnEdit={c.isOnEdit as boolean}
                isOnReply={c.isOnReply as boolean}
                upvoteValue={c.score}
                labelID={`comment-${c.id}`}
                onEditBtnClick={() => onEditBtnClick(!c.isOnEdit, c.id)}
                onMinusIconClick={() => onMinusPlusIconClick(true, c.id)}
                onPlusIconClick={() => onMinusPlusIconClick(false, c.id)}
                onReplyBtnClick={() => onReplyBtnClick(!c.isOnReply, c.id)}
                onUpdateBtnClick={(e) => onUpdateBtnClick(e, c.id)}
                profileImages={c.user.image}
                hasReplies={Boolean(c.replies?.length) || false}
              >
                {c.isOnReply && (
                  <CommentInputForm
                    labelID={`comment-${id}-for-${c.id}`}
                    isReply={true}
                    replyingTo={c.user.username}
                    profileImages={currentUser.image}
                    onSubmitBtnClick={(e) => onReplySubmitBtnClick(e, c.id)}
                    commenter={currentUser.username}
                  />
                )}
                {c.replies &&
                  c.replies.length !== 0 &&
                  c.replies.map((r) => (
                    <React.Fragment key={r.id}>
                      <CommentBox
                        key={r.id}
                        id={r.id}
                        new={r.id !== initialId && r.id === id - 1}
                        comment={`@${r.replyingTo} ${r.content}`}
                        commenter={r.user.username}
                        commentTimestamp={r.createdAt}
                        isOwn={r.user.username === currentUser?.username}
                        isOnEdit={r.isOnEdit as boolean}
                        isOnReply={r.isOnReply as boolean}
                        upvoteValue={r.score}
                        labelID={`comment-${r.id}`}
                        onDeleteBtnClick={() => onDeleteBtnClick(c.id, r.id)}
                        onEditBtnClick={() => onEditBtnClick(!r.isOnEdit, c.id, r.id)}
                        onMinusIconClick={() => onMinusPlusIconClick(true, c.id, r.id)}
                        onPlusIconClick={() => onMinusPlusIconClick(false, c.id, r.id)}
                        onReplyBtnClick={() => onReplyBtnClick(!r.isOnReply, c.id, r.id)}
                        onUpdateBtnClick={(e) => onUpdateBtnClick(e, c.id, r.id)}
                        profileImages={r.user.image}
                      />
                      {r.isOnReply && (
                        <CommentInputForm
                          labelID={`comment-${id}-for-${r.id}`}
                          isReply={true}
                          replyingTo={r.user.username}
                          profileImages={currentUser.image}
                          onSubmitBtnClick={(e) => onReplySubmitBtnClick(e, c.id, r.id)}
                          commenter={currentUser.username}
                        />
                      )}
                    </React.Fragment>
                  ))}
              </CommentBox>
            </React.Fragment>
          ))}

        {currentUser && (
          <CommentInputForm
            labelID={`comment-${currentUser.username}-${id}`}
            isReply={false}
            onCommentChange={(e) => setNewComment(e.target.value)}
            profileImages={currentUser.image}
            onSubmitBtnClick={onSendBtnClick}
            value={newComment}
            commenter={currentUser.username}
          />
        )}
      </Box>
      <Modal
        id="delete-modal"
        ref={deleteModalRef}
        onCancelBtnClick={toggleOpenModal}
        onDeleteBtnClick={onYesDeleteBtnClick}
        isActive={isModalActive}
      />
    </>
  );
}

export default Main;
