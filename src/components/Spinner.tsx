import React from 'react';
import { Box, Button, Text } from '.';
import { ReactComponent as PlusIcon } from '../assets/icons/icon-plus.svg';
import { ReactComponent as MinusIcon } from '../assets/icons/icon-minus.svg';

interface SpinnerProps {
  value: number;
  onPlusIconClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMinusIconClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function Spinner(props: SpinnerProps) {
  return (
    <Box className="spinner" tag="div">
      <Button onClick={props.onPlusIconClick}>
        <PlusIcon aria-hidden="true" focusable="false" />
        <span className="sr-only">Like</span>
      </Button>
      <Text className="text" aria-label="Number of likes">
        {props.value}
      </Text>
      <Button onClick={props.onMinusIconClick}>
        <MinusIcon aria-hidden="true" focusable="false" />
        <span className="sr-only">Dislike</span>
      </Button>
    </Box>
  );
}

export default Spinner;
