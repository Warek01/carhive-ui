import { HideImage } from '@mui/icons-material'
import { Box, Skeleton } from '@mui/material'
import { FC, memo, useState } from 'react'

interface Props {
  src?: string | null
  width?: number | string
  height?: number | string
  alt?: string
}

const Image: FC<Props> = ({ height, src, width, alt }) => {
  const [loaded, setLoaded] = useState<boolean>(false)
  const [err, setErr] = useState<boolean>(false)

  return (
    <Box
      component="div"
      width="100%"
      height="100%"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ aspectRatio: !height ? '16/9' : 'initial' }}
    >
      {!src || err ? (
        <HideImage fontSize="large" color="inherit" />
      ) : (
        <>
          <img
            alt={alt}
            src={src ?? ''}
            style={{
              width: loaded ? '100%' : 0,
              height: loaded ? 'auto' : 0,
              display: 'block',
            }}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setErr(true)}
          />
          {!loaded && (
            <Skeleton
              variant="rectangular"
              width={width ?? '100%'}
              height={height ?? '100%'}
            />
          )}
        </>
      )}
    </Box>
  )
}

export default memo(Image)
