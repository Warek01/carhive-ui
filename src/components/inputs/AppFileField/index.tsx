import { CloudUpload } from '@mui/icons-material';
import { Button, FormControl, Typography, styled } from '@mui/material';
import { FC, memo } from 'react';

interface Props {
  value?: string;
  required?: boolean;
  text?: string;
  accept?: string;
  multiple?: boolean;
  size?: 'small' | 'medium' | 'large';
  onChange(files: FileList): void;
}

const VisuallyHiddenInput = styled('input')({
  height: 0,
  width: 0,
  overflow: 'hidden',
  hidden: true,
});

const AppFileField: FC<Props> = ({
  onChange,
  multiple = false,
  accept = '*/*',
  required = true,
  text = 'Upload a file',
  size = 'small',
}) => {
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
          {text}
        </Typography>
        <VisuallyHiddenInput
          accept={accept}
          required={required}
          multiple={multiple}
          aria-label={text}
          type="file"
          onChange={(e) => onChange(e.target.files!)}
        />
      </Button>
    </FormControl>
  );
};

export default memo(AppFileField);
