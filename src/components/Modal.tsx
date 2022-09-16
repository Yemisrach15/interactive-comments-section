import React from 'react';
import { Box, Button, Heading, Text } from '.';
import { ModalProps } from './types';

function Modal(props: ModalProps) {
  return (
    <Box
      tag={'dialog'}
      id={props.id}
      role="alertdialog"
      aria-labelledby={`dialog-title-${props.id}`}
      aria-describedby={`dialog-desc-${props.id}`}
    >
      <Heading tag={'h2'} className="heading" id={`dialog-title-${props.id}`}>
        Delete comment
      </Heading>
      <Text className="text text--dark" id={`dialog-desc-${props.id}`}>
        Are you sure you want to delete this comment? This will remove the comment and can't be
        undone.
      </Text>
      <Box tag={'ul'}>
        <li>
          <Button
            className="btn btn--gray btn--uppercase"
            onClick={props.onCancelBtnClick}
            autoFocus={true}
          >
            No, cancel
          </Button>
        </li>
        <li>
          <Button className="btn btn--danger btn--uppercase" onClick={props.onDeleteBtnClick}>
            Yes, delete
          </Button>
        </li>
      </Box>
    </Box>
  );
}

export default Modal;
