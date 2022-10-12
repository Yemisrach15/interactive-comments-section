import React from 'react';
import { Box, Heading } from '.';

function Header() {
  return (
    <Box tag={'header'}>
      <Heading className="heading heading--l1" tag={'h1'}>
        Interactive Comments Section Solution
      </Heading>
    </Box>
  );
}

export default Header;
