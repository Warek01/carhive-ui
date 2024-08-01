import { Box, BoxProps, Modal } from '@mui/material';
import { FC, PropsWithChildren, memo } from 'react';

interface Props {
  open: boolean;
  onClose?: () => void;
  width?: BoxProps['width'];
  height?: BoxProps['height'];
}

const AppModal: FC<PropsWithChildren<Props>> = ({
  open,
  children,
  onClose,
  width = 'fit-content',
  height = 'fit-content',
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        width={width}
        height={height}
        position="absolute"
        top="50%"
        left="50%"
        sx={{ transform: 'translate(-50%, -50%)' }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default memo(AppModal);
