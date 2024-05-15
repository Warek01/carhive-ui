import { ChangeEventHandler, FC, memo, useCallback, useMemo } from 'react'
import { Button, FormControl, styled } from '@mui/material'
import { CloudUpload } from '@mui/icons-material'

interface Props {
  file: File | null | undefined
  onChange(file: File | null): void
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

const supportedTypes = ['png', 'jpeg', 'avif', 'webp', 'gif']

const FileInput: FC<Props> = ({ onChange, file }) => {
  const accept = useMemo(
    () => supportedTypes.map((t) => `image/${t}`).join(','),
    [],
  )

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const f = e.target.files
      onChange(f?.length ? f[0] : null)
    },
    [],
  )

  return (
    <FormControl fullWidth>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUpload />}
      >
        {file?.name ?? 'Upload an image'}
        <VisuallyHiddenInput
          accept={accept}
          type="file"
          onChange={handleChange}
        />
      </Button>
    </FormControl>
  )
}

export default memo(FileInput)
