import { MobileOff } from '@mui/icons-material';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { FC, PropsWithChildren, memo } from 'react';

const MobileSplashScreen: FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return isMobile ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <MobileOff sx={{ width: 128, height: 128 }} />
    </Box>
  ) : (
    children
  );
};

export default memo(MobileSplashScreen);
