import { HideImage } from '@mui/icons-material';
import { Box, Skeleton } from '@mui/material';
import { CSSProperties, HTMLProps, forwardRef, memo, useState } from 'react';

interface Props {
  src?: string | null;
  width?: number | string;
  height?: number | string;
  alt?: string;
  lazy?: boolean;
  aspectRatio?: CSSProperties['aspectRatio'];
  objectFit?: CSSProperties['objectFit'];
  objectPosition?: CSSProperties['objectPosition'];
  imgProps?: HTMLProps<HTMLImageElement>;
}

const Image = forwardRef<HTMLImageElement, Props>(
  (
    {
      height,
      src,
      width,
      alt,
      imgProps,
      aspectRatio = 'initial',
      lazy = true,
      objectFit = 'cover',
      objectPosition = 'center',
    },
    ref,
  ) => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [err, setErr] = useState<boolean>(false);

    const isError = !src || err;

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
            {!lazy && src && <link rel="preload" as="image" href={src} />}
            <img
              alt={alt}
              src={src}
              ref={ref}
              style={{
                width: loaded ? '100%' : 0,
                height: loaded ? 'auto' : 0,
                display: 'block',
                aspectRatio,
                objectFit,
                objectPosition,
              }}
              loading={lazy ? 'lazy' : 'eager'}
              onLoad={() => setLoaded(true)}
              onError={() => setErr(true)}
              {...imgProps}
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
    );
  },
);

export default memo(Image);
