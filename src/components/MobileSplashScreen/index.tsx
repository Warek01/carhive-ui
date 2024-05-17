import { MobileOff } from '@mui/icons-material'
import { Box } from '@mui/material'
import { FC, PropsWithChildren, memo } from 'react'

const MobileSplashScreen: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <MobileOff sx={{ width: 128, height: 128 }} />
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>{children}</Box>
    </>
  )
}

export default memo(MobileSplashScreen)
