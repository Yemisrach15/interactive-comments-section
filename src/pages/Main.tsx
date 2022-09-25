import React from 'react';
import { Box, CommentBox, CommentInputForm, Modal } from '../components';
import Data from '../data.json';
import { IComment, IData } from './types';

function Main() {
  const [isOnEdit, setIsOnEdit] = React.useState(false);
  const deleteModalRef = React.useRef<HTMLDialogElement>(null);
  const [data, setData] = React.useState<IData>({} as IData);
  const [newComment, setNewComment] = React.useState<string>('');
  let id = 5;

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
              isOnEdit={isOnEdit}
              upvoteValue={c.score}
              labelID={`comment-${c.user.username}-${c.id}`}
              onEditBtnClick={() => setIsOnEdit(!isOnEdit)}
              onMinusIconClick={() => onMinusIconClick(c.id)}
              onPlusIconClick={() => onPlusIconClick(c.id)}
              onReplyBtnClick={() => onReplyBtnClick(c.id)}
              onChange={(e) => {
                console.log(e.target.value);
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
                      isOnEdit={isOnEdit}
                      upvoteValue={r.score}
                      labelID={`comment-${r.user.username}-${r.id}`}
                      onDeleteBtnClick={() => deleteModalRef.current?.showModal()}
                      onEditBtnClick={() => setIsOnEdit(!isOnEdit)}
                      onMinusIconClick={() => onMinusIconClick(c.id, r.id)}
                      onPlusIconClick={() => onPlusIconClick(c.id, r.id)}
                      onReplyBtnClick={() => onReplyBtnClick(c.id, r.id)}
                      onChange={(e) => {
                        console.log(e.target.value);
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
        ref={deleteModalRef}
        onCancelBtnClick={() => deleteModalRef.current && deleteModalRef.current.close()}
        onDeleteBtnClick={() => console.log('comment deleted')}
      />
    </Box>
  );
}

export default Main;
