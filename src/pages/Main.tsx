import React from 'react';
import { Box, Button, CommentBox, CommentInputForm, Heading, Modal } from '../components';
import Data from '../data.json';
import { extractUserName, selectTextAreaNode } from '../utils';
import { IComment, IData } from '../types';
import { ReactComponent as SunIcon } from '../assets/icons/icon-sun.svg';
import { ReactComponent as MoonIcon } from '../assets/icons/icon-moon.svg';
import { ThemeContext } from '../App';
import { useRecoilState, useRecoilValue } from 'recoil';
import { commentsState, currentUserState } from '../store';

function Main() {
  const deleteModalRef = React.useRef<HTMLDialogElement>(null);
  const [initialId, setInitialId] = React.useState<number>(0);
  const [id, setId] = React.useState<number>(0);
  const [data, setData] = React.useState<IData>(
    ((localStorage.getItem('data') && JSON.parse(localStorage.getItem('data') as string)) ||
      Data) as IData
  );
  const [comments, setComments] = useRecoilState(commentsState);
  const currentUser = useRecoilValue(currentUserState);
  const [newComment, setNewComment] = React.useState<string>('');
  const [commentToDelete, setCommentToDelete] = React.useState<{ cId: number; rId?: number }>();
  const [isModalActive, setIsModalActive] = React.useState(false);
  const [currentTextAreaId, setCurrentTextAreaId] = React.useState<string | null>(null); // For focusing on edit
  const context = React.useContext(ThemeContext);

  React.useEffect(() => {
    let totalComments = data.comments.length;
    data.comments.forEach((c) => {
      totalComments += c.replies?.length || 0;
    });
    setInitialId(totalComments);
    setId(++totalComments);
  }, []);

  React.useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);

  React.useEffect(() => {
    if (currentTextAreaId && selectTextAreaNode(currentTextAreaId)) {
      selectTextAreaNode(currentTextAreaId).focus();
    }
  }, [currentTextAreaId]);

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

    setData({
      currentUser: data.currentUser,
      comments: [
        ...data.comments,
        {
          id,
          content: newComment,
          createdAt: '1 sec ago',
          score: 0,
          user: data.currentUser,
        },
      ],
    });

    setNewComment('');
    setId((id) => ++id);
  };

  // Function for click on reply button in threads
  const onReplyBtnClick = (isReply: boolean, cId: number, rId?: number) => {
    isReply ? setCurrentTextAreaId(`comment-${id}-for-${rId || cId}`) : setCurrentTextAreaId(null);

    let updatedData;
    if (!rId) {
      updatedData = data.comments.map((c) => {
        if (c.id === cId) c.isOnReply = !c.isOnReply;
        return c;
      });
    } else {
      updatedData = data.comments.map((c) => {
        c.id === cId &&
          c.replies?.map((r) => {
            if (r.id === rId) r.isOnReply = !r.isOnReply;
            return r;
          });

        return c;
      });
    }

    setData({ comments: updatedData, currentUser: data.currentUser });
  };

  // Function for click on new reply submit button in thread
  const onReplySubmitBtnClick = (e: React.MouseEvent, cId: number, rId?: number) => {
    e.preventDefault();

    const newReplyValue = selectTextAreaNode(`comment-${id}-for-${rId || cId}`).value;
    // Don't submit if value is empty
    if (!extractUserName(newReplyValue).text.trim()) return;

    const reply = {
      id,
      content: extractUserName(newReplyValue).text.trim(),
      createdAt: '1 sec ago',
      score: 0,
      user: data.currentUser,
    };
    let updatedData;
    setCurrentTextAreaId(null);

    if (!rId) {
      updatedData = data.comments.map((c) => {
        if (c.id === cId) {
          c.replies = [...(c.replies as IComment[]), { ...reply, replyingTo: c.user.username }];
          c.isOnReply = false;
        }
        return c;
      });
    } else {
      updatedData = data.comments.map((c) => {
        if (c.id === cId) {
          c.replies?.map((r) => {
            if (r.id === rId) {
              c.replies = [...(c.replies as IComment[]), { ...reply, replyingTo: r.user.username }];
              r.isOnReply = false;
            }
          });
        }
        return c;
      });
    }

    setData({ currentUser: data.currentUser, comments: updatedData as IComment[] });
    setId((id) => ++id);
  };

  // Function for click on edit button on own comments
  const onEditBtnClick = (isEdit: boolean, cId: number, rId?: number) => {
    isEdit ? setCurrentTextAreaId(`comment-${rId || cId}`) : setCurrentTextAreaId(null);
    let updatedData;
    if (!rId) {
      updatedData = data.comments.map((c) => {
        if (c.id === cId) c.isOnEdit = !c.isOnEdit;
        return c;
      });
    } else {
      updatedData = data.comments.map((c) => {
        c.id === cId &&
          c.replies?.map((r) => {
            if (r.id === rId) r.isOnEdit = !r.isOnEdit;
            return r;
          });
        return c;
      });
    }

    setData({ comments: updatedData, currentUser: data.currentUser });
  };

  // Function for update button click after editing comment
  const onUpdateBtnClick = (e: React.MouseEvent, cId: number, rId?: number) => {
    e.preventDefault();

    const updatingCommentValue = selectTextAreaNode(`comment-${rId || cId}`).value;
    // Don't submit if value is empty
    if (!extractUserName(updatingCommentValue).text.trim()) return;

    let updatedData;
    setCurrentTextAreaId(null);
    if (!rId) {
      updatedData = data.comments.map((c) => {
        if (c.id === cId) {
          c.content = extractUserName(updatingCommentValue).text.trim();
          c.isOnEdit = false;
        }
        return c;
      });
    } else {
      updatedData = data.comments.map((c) => {
        c.id === cId &&
          c.replies?.map((r) => {
            if (r.id === rId) {
              r.content = extractUserName(updatingCommentValue).text.trim();
              r.isOnEdit = false;
            }
            return r;
          });
        return c;
      });
    }

    setData({ comments: updatedData, currentUser: data.currentUser });
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
    let updatedData;
    if (!commentToDelete?.rId) {
      updatedData = data.comments.filter((c) => c.id !== commentToDelete?.cId);
    } else {
      updatedData = data.comments.map((c) => {
        if (c.id === commentToDelete?.cId)
          c.replies = c.replies?.filter((r) => r.id !== commentToDelete.rId);
        return c;
      });
    }

    setData({ comments: updatedData, currentUser: data.currentUser });
    toggleOpenModal();
  };

  // Set data-theme on body tag to color mode
  document.body.dataset.theme = context.colorMode;

  return (
    <>
      <Box tag={'header'}>
        <Heading className="heading heading--l1" tag={'h1'}>
          Interactive Comments Section Solution
        </Heading>
      </Box>
      <Box tag={'main'}>
        <Button
          className="btn btn--text-primary fixed--left"
          icon={context.colorMode === 'dark' ? MoonIcon : SunIcon}
          onClick={() =>
            context.setColorMode
              ? context.setColorMode(context.colorMode === 'dark' ? 'light' : 'dark')
              : null
          }
          title={`Change to ${context.colorMode === 'dark' ? 'light' : 'dark'} theme`}
        >
          <span className="sr-only">
            {`Change to ${context.colorMode === 'dark' ? 'light' : 'dark'} theme`}
          </span>
        </Button>
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
                isOwn={c.user.username === data.currentUser?.username}
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
                profileImages={{
                  png: require(`../assets/${c.user.image.png}`),
                  webp: require(`../assets/${c.user.image.webp}`),
                }}
                hasReplies={Boolean(c.replies?.length) || false}
              >
                {c.isOnReply && (
                  <CommentInputForm
                    labelID={`comment-${id}-for-${c.id}`}
                    isReply={true}
                    replyingTo={c.user.username}
                    profileImages={{
                      png: require(`../assets/${data.currentUser?.image.png}`),
                      webp: require(`../assets/${data.currentUser?.image.webp}`),
                    }}
                    onSubmitBtnClick={(e) => onReplySubmitBtnClick(e, c.id)}
                    commenter={data.currentUser.username}
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
                        isOwn={r.user.username === data.currentUser?.username}
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
                        profileImages={{
                          png: require(`../assets/${r.user.image.png}`),
                          webp: require(`../assets/${r.user.image.webp}`),
                        }}
                      />
                      {r.isOnReply && (
                        <CommentInputForm
                          labelID={`comment-${id}-for-${r.id}`}
                          isReply={true}
                          replyingTo={r.user.username}
                          profileImages={{
                            png: require(`../assets/${data.currentUser?.image.png}`),
                            webp: require(`../assets/${data.currentUser?.image.webp}`),
                          }}
                          onSubmitBtnClick={(e) => onReplySubmitBtnClick(e, c.id, r.id)}
                          commenter={data.currentUser.username}
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
            profileImages={{
              png: require(`../assets/${currentUser.image.png}`),
              webp: require(`../assets/${currentUser.image.webp}`),
            }}
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
