import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import { CSSProperties, FC, memo, useState } from 'react';

import { AppModal } from '@carhive/components';

interface Props {
  images: string[];
  startIndex?: number;
  aspectRatio?: CSSProperties['aspectRatio'];
  showImages?: boolean;
  allowPopup?: boolean;
}

const Carousel: FC<Props> = ({
  images,
  startIndex = 0,
  aspectRatio = '16/9',
  showImages = true,
  allowPopup = true,
}) => {
  const [index, setIndex] = useState(startIndex);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Stack spacing={2}>
      <AppModal
        open={allowPopup && modalOpen}
        onClose={() => setModalOpen(false)}
        width={{ xs: '100vw', lg: '75vw' }}
      >
        <img
          src={images[index]}
          alt=""
          width="100%"
          style={{
            aspectRatio,
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </AppModal>

      <Box display="flex" alignItems="center" position="relative">
        <Button
          sx={{ position: 'absolute', height: '100%', left: 0 }}
          disabled={index === 0}
          onClick={() => setIndex((i) => i - 1)}
        >
          <ArrowLeft fontSize="large" />
        </Button>
        <img
          src={images[index]}
          alt=""
          width="100%"
          style={{
            aspectRatio,
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          onClick={() => setModalOpen(true)}
        />
        <Button
          sx={{ position: 'absolute', height: '100%', right: 0 }}
          disabled={index === images.length - 1}
          onClick={() => setIndex((i) => i + 1)}
        >
          <ArrowRight fontSize="large" />
        </Button>
      </Box>
      {showImages && (
        <Box overflow="auto" pb={2}>
          <Stack spacing={1.5} direction="row" width="fit-content">
            {images.map((image, i) => (
              <Box
                key={image}
                onClick={() => setIndex(i)}
                position="relative"
                p={0.5}
                width={192}
                height="auto"
                borderRadius={3}
                bgcolor={(theme) =>
                  i === index ? theme.palette.primary.main : 'transparent'
                }
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  aspectRatio: '16/9',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={image}
                  alt=""
                  width="100%"
                  height="auto"
                  loading="lazy"
                  style={{
                    aspectRatio,
                    borderRadius: 9,
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </Stack>
  );
};

export default memo(Carousel);
