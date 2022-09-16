import React from 'react';
import { Box, CommentBox } from '../components';
import JuliusProfilePNG from '../assets/images/avatars/image-juliusomo.png';
import JuliusProfileWEBP from '../assets/images/avatars/image-juliusomo.webp';

function Main() {
  const [value, setValue] = React.useState(12);
  const [isOnEdit, setIsOnEdit] = React.useState(false);

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
    </Box>
  );
}

export default Main;
