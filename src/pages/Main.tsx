import React from 'react';
import { Box, CommentBox, CommentInputForm, Modal } from '../components';
import JuliusProfilePNG from '../assets/images/avatars/image-juliusomo.png';
import JuliusProfileWEBP from '../assets/images/avatars/image-juliusomo.webp';

function Main() {
  const [value, setValue] = React.useState(12);
  const [isOnEdit, setIsOnEdit] = React.useState(false);
  const deleteModalRef = React.useRef<HTMLDialogElement>(null);

  return (
    <Box tag={'section'}>
      <CommentBox
        isOwn={false}
        isOnEdit={false}
        profileImages={{ png: JuliusProfilePNG, webp: JuliusProfileWEBP }}
        commenter={'ramsesmiron'}
        commentTimestamp={'1 week ago'}
        comment={
          "@maxblagun If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first."
        }
        upvoteValue={value}
        onMinusIconClick={() => setValue(value - 1)}
        onPlusIconClick={() => setValue(value + 1)}
        labelID={'comment-1'}
        onChange={() => {
          console.log('edited');
        }}
      />
      <CommentBox
        isOwn={true}
        isOnEdit={isOnEdit}
        profileImages={{ png: JuliusProfilePNG, webp: JuliusProfileWEBP }}
        commenter={'juliusomo'}
        commentTimestamp={'2 days ago'}
        comment={
          "@ramsesmiron I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant."
        }
        upvoteValue={value}
        onDeleteBtnClick={() => {
          if (deleteModalRef.current && typeof deleteModalRef.current.showModal === 'function') {
            deleteModalRef.current.showModal();
          }
        }}
        onEditBtnClick={() => setIsOnEdit(!isOnEdit)}
        onMinusIconClick={() => setValue(value - 1)}
        onPlusIconClick={() => setValue(value + 1)}
        labelID={'comment-2'}
        onChange={(e) => {
          console.log(e.target.value);
        }}
        onUpdateBtnClick={(e) => {
          e.preventDefault();
          console.log(e);
          setIsOnEdit(false);
        }}
      />
      <Modal
        id="delete-modal"
        ref={deleteModalRef}
        onCancelBtnClick={() => deleteModalRef.current && deleteModalRef.current.close()}
        onDeleteBtnClick={() => console.log('comment deleted')}
      />
      <CommentInputForm
        labelID="comment-3"
        isReply={false}
        onCommentChange={(e) => console.log(e)}
        profileImages={{ png: JuliusProfilePNG, webp: JuliusProfileWEBP }}
      />
      <CommentInputForm
        labelID="comment-4"
        isReply={true}
        replyingTo={'ramsesmiron'}
        onCommentChange={(e) => console.log(e.target.value)}
        profileImages={{ png: JuliusProfilePNG, webp: JuliusProfileWEBP }}
      />
    </Box>
  );
}

export default Main;
