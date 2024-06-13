import { HideImage } from '@mui/icons-material'
import { Box, Skeleton } from '@mui/material'
import { FC, memo, useState } from 'react'

interface Props {
  apiFile?: boolean
  src?: string | null
  width?: number | string
  height?: number | string
  alt?: string
}

const Image: FC<Props> = ({ height, src, width, alt, apiFile = false }) => {
  const [loaded, setLoaded] = useState<boolean>(false)
  const [err, setErr] = useState<boolean>(false)

  const isError = !src || err

  if (apiFile) src = import.meta.env.VITE_API_FILE_BASENAME + '/' + src

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
      {isError ? (
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
              aspectRatio: !height ? '16/9' : 'initial',
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
