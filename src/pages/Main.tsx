import React from 'react';
import { Box, Button, CommentBox, CommentInputForm, Heading, Modal } from '../components';
import Data from '../data.json';
import { extractUserName } from '../utils';
import { IComment, IData } from './types';
import { ReactComponent as SunIcon } from '../assets/icons/icon-sun.svg';
import { ReactComponent as MoonIcon } from '../assets/icons/icon-moon.svg';
import { ThemeContext } from '../App';

function Main() {
  const deleteModalRef = React.useRef<HTMLDialogElement>(null);
  const [initialId, setInitialId] = React.useState<number>(0);
  const [id, setId] = React.useState<number>(0);
  const [data, setData] = React.useState<IData>(
    ((localStorage.getItem('data') && JSON.parse(localStorage.getItem('data') as string)) ||
      Data) as IData
  );
  const [newComment, setNewComment] = React.useState<string>('');
  const [newReply, setNewReply] = React.useState<string>('');
  const [commentToDelete, setCommentToDelete] = React.useState<{ cId: number; rId?: number }>();
  const [isModalActive, setIsModalActive] = React.useState(false);
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

  // Function for plus and minus button clicks
  const onMinusPlusIconClick = (isMinus: boolean, cId: number, rId?: number) => {
    let updatedData;
    if (!rId) {
      updatedData =
        data.comments &&
        data.comments.map((c) => {
          c.id === cId && (isMinus ? c.score-- : c.score++);
          return c;
        });
    } else {
      updatedData =
        data.comments &&
        data.comments.map((c) => {
          c.id === cId &&
            c.replies?.map((r) => {
              r.id === rId && (isMinus ? r.score-- : r.score++);
              return r;
            });
          return c;
        });
    }

    setData({ comments: updatedData, currentUser: data.currentUser });
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
  const onReplyBtnClick = (cId: number, rId?: number) => {
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

    // Don't submit if value is empty
    if (!extractUserName(newReply).text.trim()) return;

    const reply = {
      id,
      content: extractUserName(newReply).text,
      createdAt: '1 sec ago',
      score: 0,
      user: data.currentUser,
    };
    let updatedData;

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
    setNewReply('');
    setId((id) => ++id);
  };

  // Function for click on edit button on own comments
  const onEditBtnClick = (cId: number, rId?: number) => {
    let updatedData;
    if (!rId) {
      updatedData = data.comments.map((c) => {
        if (c.id === cId) {
          c.isOnEdit = !c.isOnEdit;
          setNewReply(c.content);
        }
        return c;
      });
    } else {
      updatedData = data.comments.map((c) => {
        c.id === cId &&
          c.replies?.map((r) => {
            if (r.id === rId) {
              r.isOnEdit = !r.isOnEdit;
              setNewReply(r.content);
            }
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

    // Don't submit if value is empty
    if (!extractUserName(newReply).text.trim()) return;

    let updatedData;
    if (!rId) {
      updatedData = data.comments.map((c) => {
        if (c.id === cId) {
          c.content = extractUserName(newReply).text;
          c.isOnEdit = false;
        }
        return c;
      });
    } else {
      updatedData = data.comments.map((c) => {
        c.id === cId &&
          c.replies?.map((r) => {
            if (r.id === rId) {
              r.content = extractUserName(newReply).text;
              r.isOnEdit = false;
            }
            return r;
          });
        return c;
      });
    }

    setData({ comments: updatedData, currentUser: data.currentUser });
    setNewReply('');
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
      <Box tag={'main'}>
        <Heading className="heading heading--l1" tag={'h1'}>
          Interactive Comments Section Solution
        </Heading>
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
        {data.comments &&
          data.comments.length &&
          data.comments.map((c) => (
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
                labelID={`comment-${c.user.username}-${c.id}`}
                onEditBtnClick={() => onEditBtnClick(c.id)}
                onMinusIconClick={() => onMinusPlusIconClick(true, c.id)}
                onPlusIconClick={() => onMinusPlusIconClick(false, c.id)}
                onReplyBtnClick={() => onReplyBtnClick(c.id)}
                onUpdateBtnClick={(e) => onUpdateBtnClick(e, c.id)}
                onChange={(e) => setNewReply(e.target.value)}
                profileImages={{
                  png: require(`../assets/${c.user.image.png}`),
                  webp: require(`../assets/${c.user.image.webp}`),
                }}
              />
              {c.isOnReply && (
                <CommentInputForm
                  labelID={`comment-${data.currentUser.username}-${id}-for-${c.id}`}
                  isReply={true}
                  replyingTo={c.user.username}
                  onCommentChange={(e) => setNewReply(e.target.value)}
                  profileImages={{
                    png: require(`../assets/${data.currentUser?.image.png}`),
                    webp: require(`../assets/${data.currentUser?.image.webp}`),
                  }}
                  onSubmitBtnClick={(e) => onReplySubmitBtnClick(e, c.id)}
                  commenter={data.currentUser.username}
                />
              )}
              {c.replies && c.replies.length !== 0 && (
                <Box tag={'div'} className="comment-box--indent">
                  {c.replies.map((r) => (
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
                        labelID={`comment-${r.user.username}-${r.id}`}
                        onDeleteBtnClick={() => onDeleteBtnClick(c.id, r.id)}
                        onEditBtnClick={() => onEditBtnClick(c.id, r.id)}
                        onMinusIconClick={() => onMinusPlusIconClick(true, c.id, r.id)}
                        onPlusIconClick={() => onMinusPlusIconClick(false, c.id, r.id)}
                        onReplyBtnClick={() => onReplyBtnClick(c.id, r.id)}
                        onUpdateBtnClick={(e) => onUpdateBtnClick(e, c.id, r.id)}
                        onChange={(e) => setNewReply(e.target.value)}
                        profileImages={{
                          png: require(`../assets/${r.user.image.png}`),
                          webp: require(`../assets/${r.user.image.webp}`),
                        }}
                      />
                      {r.isOnReply && (
                        <CommentInputForm
                          labelID={`comment-${data.currentUser.username}-${id}-for-${r.id}`}
                          isReply={true}
                          replyingTo={r.user.username}
                          onCommentChange={(e) => setNewReply(e.target.value)}
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
                </Box>
              )}
            </React.Fragment>
          ))}

        {data.currentUser && (
          <CommentInputForm
            labelID={`comment-${data.currentUser.username}-${id}`}
            isReply={false}
            onCommentChange={(e) => setNewComment(e.target.value)}
            profileImages={{
              png: require(`../assets/${data.currentUser?.image.png}`),
              webp: require(`../assets/${data.currentUser?.image.webp}`),
            }}
            onSubmitBtnClick={onSendBtnClick}
            value={newComment}
            commenter={data.currentUser.username}
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
