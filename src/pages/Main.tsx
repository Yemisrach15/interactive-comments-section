import React from 'react';
import { Box, CommentBox, CommentInputForm, Modal } from '../components';
import Data from '../data.json';
import { IComment, IData } from './types';

function Main() {
  const deleteModalRef = React.useRef<HTMLDialogElement>(null);
  const [data, setData] = React.useState<IData>({} as IData);
  const [newComment, setNewComment] = React.useState<string>('');
  const [newReply, setNewReply] = React.useState<string>('');
  let id = 5;
  const [commentToDelete, setCommentToDelete] = React.useState<{ cId: number; rId?: number }>();

  React.useEffect(() => {
    if (localStorage.getItem('data')) {
      setData(JSON.parse(localStorage.getItem('data') || ''));
    } else {
      setData(Data as IData);
      localStorage.setItem('data', JSON.stringify(Data));
    }
  }, []);

  const onMinusIconClick = (id: number, rId?: number) => {
    if (!rId) {
      const updatedData =
        data.comments &&
        data.comments.map((c) => {
          c.id === id && c.score--;
          return c;
        });

      setData({ comments: updatedData, currentUser: data.currentUser });

      return;
    }

    const updatedData =
      data.comments &&
      data.comments.map((c) => {
        c.id === id &&
          c.replies?.map((r) => {
            r.id === rId && r.score--;
          });
        return c;
      });

    setData({ comments: updatedData, currentUser: data.currentUser });
  };

  const onPlusIconClick = (id: number, rId?: number) => {
    if (!rId) {
      const updatedData =
        data.comments &&
        data.comments.map((c) => {
          c.id === id && c.score++;
          return c;
        });

      setData({ comments: updatedData, currentUser: data.currentUser });

      return;
    }

    const updatedData =
      data.comments &&
      data.comments.map((c) => {
        c.id === id &&
          c.replies?.map((r) => {
            r.id === rId && r.score++;
          });
        return c;
      });

    setData({ comments: updatedData, currentUser: data.currentUser });
  };

  const onReplyBtnClick = (id: number, rId?: number) => {
    if (!rId) {
      const updatedData = data.comments.map((c) => {
        if (c.id === id) c.isOnReply = true;
        return c;
      });
      setData({ comments: updatedData, currentUser: data.currentUser });

      return;
    }

    const updatedData = data.comments.map((c) => {
      c.id === id &&
        c.replies?.map((r) => {
          if (r.id === rId) r.isOnReply = true;
          return r;
        });

      return c;
    });

    setData({ comments: updatedData, currentUser: data.currentUser });
  };

  const onSubmitBtnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setData({
      currentUser: data.currentUser,
      comments: [
        ...data.comments,
        {
          id,
          content: newComment || '',
          createdAt: 'few minutes ago',
          score: 0,
          user: data.currentUser,
        },
      ],
    });
    setNewComment('');

    id++;
  };

  const onReplySubmitBtnClick = (e: React.MouseEvent, cId: number, rId?: number) => {
    e.preventDefault();

    if (!rId) {
      const updatedData = data.comments.map((c) => {
        if (c.id === cId) {
          c.replies = [
            ...(c.replies as IComment[]),
            {
              id,
              content: newComment,
              createdAt: 'few minutes ago',
              score: 0,
              replyingTo: c.user.username,
              user: data.currentUser,
            },
          ];
          c.isOnReply = false;
        }
        return c;
      });

      setData({
        currentUser: data.currentUser,
        comments: updatedData as IComment[],
      });

      return;
    }

    const updatedData = data.comments.map((c) => {
      if (c.id === cId) {
        c.replies?.map((r) => {
          if (r.id === rId) {
            c.replies = [
              ...(c.replies as IComment[]),
              {
                id,
                content: newComment,
                createdAt: 'few minutes ago',
                score: 0,
                replyingTo: r.user.username,
                user: data.currentUser,
              },
            ];
            r.isOnReply = false;
          }
        });
      }
      return c;
    });

    setData({
      currentUser: data.currentUser,
      comments: updatedData as IComment[],
    });

    setNewComment('');
    id++;
  };

  const onEditBtnClick = (id: number, rId?: number) => {
    if (!rId) {
      const updatedData = data.comments.map((c) => {
        if (c.id === id) c.isOnEdit = true;
        return c;
      });
      setData({ comments: updatedData, currentUser: data.currentUser });
    }

    const updatedData = data.comments.map((c) => {
      c.id === id &&
        c.replies?.map((r) => {
          if (r.id === rId) r.isOnEdit = true;
          return r;
        });
      return c;
    });
    setData({ comments: updatedData, currentUser: data.currentUser });
  };

  const onUpdateBtnClick = (e: React.MouseEvent, cId: number, rId?: number) => {
    e.preventDefault();
    let updatedData;
    if (!rId) {
      updatedData = data.comments.map((c) => {
        if (c.id === cId) {
          c.content = newReply;
          c.isOnEdit = false;
        }
        return c;
      });
    }

    updatedData = data.comments.map((c) => {
      c.id === cId &&
        c.replies?.map((r) => {
          if (r.id === rId) {
            r.content = newReply;
            r.isOnEdit = false;
          }
          return r;
        });
      return c;
    });

    setData({ comments: updatedData, currentUser: data.currentUser });
  };

  const onDeleteBtnClick = (id: number, rId?: number) => {
    deleteModalRef.current?.showModal();
    setCommentToDelete({ cId: id, rId: rId });
  };

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

    deleteModalRef.current && deleteModalRef.current.close();
  };

  return (
    <Box tag={'main'}>
      {data.comments &&
        data.comments.length &&
        data.comments.map((c) => (
          <React.Fragment key={c.id}>
            <CommentBox
              key={c.id}
              comment={c.content}
              commenter={c.user.username}
              commentTimestamp={c.createdAt}
              isOwn={c.user.username === data.currentUser?.username}
              onDeleteBtnClick={() => onDeleteBtnClick(c.id)}
              isOnEdit={c.isOnEdit as boolean}
              upvoteValue={c.score}
              labelID={`comment-${c.user.username}-${c.id}`}
              onEditBtnClick={() => onEditBtnClick(c.id)}
              onMinusIconClick={() => onMinusIconClick(c.id)}
              onPlusIconClick={() => onPlusIconClick(c.id)}
              onReplyBtnClick={() => onReplyBtnClick(c.id)}
              onUpdateBtnClick={(e) => onUpdateBtnClick(e, c.id)}
              onChange={(e) => {
                setNewReply(e.target.value);
              }}
              profileImages={{
                png: require(`../assets/${c.user.image.png}`),
                webp: require(`../assets/${c.user.image.webp}`),
              }}
            />
            {c.isOnReply && (
              <CommentInputForm
                labelID="comment-5"
                isReply={true}
                replyingTo={c.user.username}
                onCommentChange={(e) => setNewComment(e.target.value)}
                profileImages={{
                  png: require(`../assets/${data.currentUser?.image.png}`),
                  webp: require(`../assets/${data.currentUser?.image.webp}`),
                }}
                onSubmitBtnClick={(e) => onReplySubmitBtnClick(e, c.id)}
              />
            )}
            {c.replies && c.replies.length !== 0 && (
              <Box tag={'div'} className="comment-box--indent">
                {c.replies.map((r) => (
                  <React.Fragment key={r.id}>
                    <CommentBox
                      key={r.id}
                      comment={`@${r.replyingTo} ${r.content}`}
                      commenter={r.user.username}
                      commentTimestamp={r.createdAt}
                      isOwn={r.user.username === data.currentUser?.username}
                      isOnEdit={r.isOnEdit as boolean}
                      upvoteValue={r.score}
                      labelID={`comment-${r.user.username}-${r.id}`}
                      onDeleteBtnClick={() => onDeleteBtnClick(c.id, r.id)}
                      onEditBtnClick={() => onEditBtnClick(c.id, r.id)}
                      onMinusIconClick={() => onMinusIconClick(c.id, r.id)}
                      onPlusIconClick={() => onPlusIconClick(c.id, r.id)}
                      onReplyBtnClick={() => onReplyBtnClick(c.id, r.id)}
                      onUpdateBtnClick={(e) => onUpdateBtnClick(e, c.id, r.id)}
                      onChange={(e) => {
                        setNewReply(e.target.value);
                      }}
                      profileImages={{
                        png: require(`../assets/${r.user.image.png}`),
                        webp: require(`../assets/${r.user.image.webp}`),
                      }}
                    />
                    {r.isOnReply && (
                      <CommentInputForm
                        labelID="comment-5"
                        isReply={true}
                        replyingTo={r.user.username}
                        onCommentChange={(e) => setNewComment(e.target.value)}
                        profileImages={{
                          png: require(`../assets/${data.currentUser?.image.png}`),
                          webp: require(`../assets/${data.currentUser?.image.webp}`),
                        }}
                        onSubmitBtnClick={(e) => onReplySubmitBtnClick(e, c.id, r.id)}
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
          labelID="comment-5"
          isReply={false}
          onCommentChange={(e) => setNewComment(e.target.value)}
          profileImages={{
            png: require(`../assets/${data.currentUser?.image.png}`),
            webp: require(`../assets/${data.currentUser?.image.webp}`),
          }}
          onSubmitBtnClick={onSubmitBtnClick}
          value={newComment}
        />
      )}
      <Modal
        id="delete-modal"
        ref={deleteModalRef}
        onCancelBtnClick={() => deleteModalRef.current && deleteModalRef.current.close()}
        onDeleteBtnClick={onYesDeleteBtnClick}
      />
    </Box>
  );
}

export default Main;
