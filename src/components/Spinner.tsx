import React from 'react';
import { Box, Button, Text } from '.';
import { ReactComponent as PlusIcon } from '../assets/icons/icon-plus.svg';
import { ReactComponent as MinusIcon } from '../assets/icons/icon-minus.svg';
import { SpinnerProps } from './types';

function Spinner(props: SpinnerProps) {
  return (
    <Box className="spinner" tag="div">
      <Button onClick={props.onPlusIconClick}>
        <PlusIcon aria-hidden="true" focusable="false" />
        <span className="sr-only">Upvote this comment</span>
      </Button>
      <Text className="text">
        <span aria-hidden="true">{props.value}</span>
        <span className="sr-only">{`${props.value} votes`}</span>
      </Text>
      <Button onClick={props.onMinusIconClick}>
        <MinusIcon aria-hidden="true" focusable="false" />
        <span className="sr-only">Downvote this comment</span>
      </Button>
    </Box>
  );
}

export default Spinner;
