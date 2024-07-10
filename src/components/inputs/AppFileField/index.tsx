import { CloudUpload } from '@mui/icons-material';
import { Button, FormControl, Typography, styled } from '@mui/material';
import { ChangeEventHandler, FC, memo, useCallback, useMemo } from 'react';

interface Props {
  file: File | null | undefined;
  placeholderText?: string;
  size?: 'small' | 'medium' | 'large';
  onChange(file: File | null): void;
}

const VisuallyHiddenInput = styled('input')({
  height: 0,
  width: 0,
  overflow: 'hidden',
  hidden: true,
});

const supportedTypes = ['png', 'jpeg', 'avif', 'webp', 'gif'];

const AppFileField: FC<Props> = ({
  onChange,
  file,
  placeholderText = 'Upload an image',
  size = 'small',
}) => {
  const accept = useMemo(
    () => supportedTypes.map((t) => `image/${t}`).join(','),
    [],
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const f = e.target.files;
      onChange(f?.length ? f[0] : null);
    },
    [],
  );

  return (
    <FormControl fullWidth>
      <Button
        component="label"
        role={undefined}
        size={size}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUpload />}
      >
        <Typography
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          fontSize={size}
        >
          {file?.name ?? placeholderText}
        </Typography>
        <VisuallyHiddenInput
          accept={accept}
          type="file"
          onChange={handleChange}
        />
      </Button>
    </FormControl>
  );
};

export default memo(AppFileField);
