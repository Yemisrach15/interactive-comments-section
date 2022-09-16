import React from 'react';
import { Box, CommentBox } from '../components';
import JuliusProfilePNG from '../assets/images/avatars/image-juliusomo.png';
import JuliusProfileWEBP from '../assets/images/avatars/image-juliusomo.webp';

function Main() {
  const [value, setValue] = React.useState(12);
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
      />
      <CommentBox
        isOwn={true}
        isOnEdit={true}
        profileImages={{ png: JuliusProfilePNG, webp: JuliusProfileWEBP }}
        commenter={'juliusomo'}
        commentTimestamp={'2 days ago'}
        comment={
          "@ramsesmiron I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant."
        }
        upvoteValue={value}
        onMinusIconClick={() => setValue(value - 1)}
        onPlusIconClick={() => setValue(value + 1)}
      />
    </Box>
  );
}

export default Main;
