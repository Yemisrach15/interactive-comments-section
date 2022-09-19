import React from 'react';
import { Box, CommentBox, CommentInputForm, Modal } from '../components';
import data from '../data.json';

function Main() {
  const [value, setValue] = React.useState(12);
  const [isOnEdit, setIsOnEdit] = React.useState(false);
  const deleteModalRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    console.log('mounted');
    console.log(data);
  }, []);

  return (
    <Box tag={'section'}>
      {data.comments.map((c) => (
        <>
          <CommentBox
            key={c.id}
            comment={c.content}
            commenter={c.user.username}
            commentTimestamp={c.createdAt}
            isOwn={c.user.username === data.currentUser.username}
            isOnEdit={isOnEdit}
            upvoteValue={c.score}
            labelID={`comment-${c.user.username}-${c.id}`}
            onEditBtnClick={() => setIsOnEdit(!isOnEdit)}
            onMinusIconClick={() => setValue(value - 1)}
            onPlusIconClick={() => setValue(value + 1)}
            onChange={(e) => {
              console.log(e.target.value);
            }}
            profileImages={{
              png: require(`../assets/${c.user.image.png}`),
              webp: require(`../assets/${c.user.image.webp}`),
            }}
          />
          {c.replies.length !== 0 &&
            c.replies.map((r) => (
              <CommentBox
                key={r.id}
                comment={`@${r.replyingTo} ${r.content}`}
                commenter={r.user.username}
                commentTimestamp={r.createdAt}
                isOwn={r.user.username === data.currentUser.username}
                isOnEdit={isOnEdit}
                upvoteValue={r.score}
                labelID={`comment-${r.user.username}-${r.id}`}
                onDeleteBtnClick={() => deleteModalRef.current?.showModal()}
                onEditBtnClick={() => setIsOnEdit(!isOnEdit)}
                onMinusIconClick={() => setValue(value - 1)}
                onPlusIconClick={() => setValue(value + 1)}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
                profileImages={{
                  png: require(`../assets/${r.user.image.png}`),
                  webp: require(`../assets/${r.user.image.webp}`),
                }}
              />
            ))}
        </>
      ))}
      <CommentInputForm
        labelID="comment-5"
        isReply={false}
        onCommentChange={(e) => console.log(e.target.value)}
        profileImages={{
          png: require(`../assets/${data.currentUser.image.png}`),
          webp: require(`../assets/${data.currentUser.image.webp}`),
        }}
      />
      <Modal
        ref={deleteModalRef}
        onCancelBtnClick={() => deleteModalRef.current && deleteModalRef.current.close()}
        onDeleteBtnClick={() => console.log('comment deleted')}
      />
    </Box>
  );
}

export default Main;
