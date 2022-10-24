import React from 'react';
import { Box, Button, Heading, Text } from '.';
import { ModalProps } from './types';
import FocusTrap from 'focus-trap-react';

const Modal = React.forwardRef((props: ModalProps, ref) => {
  const closeModal = (e: React.MouseEvent) => {
    const modalRef = ref as React.RefObject<HTMLDialogElement>;
    if (modalRef.current && e.target === modalRef.current) {
      props.onCancelBtnClick();
    }
  };

  return (
    <FocusTrap active={props.isActive}>
      <Box
        ref={ref}
        tag={'dialog'}
        id={props.id}
        role="alertdialog"
        aria-labelledby={`dialog-title-${props.id}`}
        aria-describedby={`dialog-desc-${props.id}`}
        onClick={closeModal}
      >
        <Box tag={'div'} role="document" className="fixed fixed--center">
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
      </Box>
    </FocusTrap>
  );
});

Modal.displayName = 'Modal';

export default Modal;
