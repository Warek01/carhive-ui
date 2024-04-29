import { FC, memo, useCallback } from 'react'
import { Box, Chip, Stack } from '@mui/material'

import { carTypes } from '@/lib/listings'

interface Props {
  selected: number[]
  onChange(selected: number[]): void
}

export const CarTypesFilter: FC<Props> = ({ onChange, selected }) => {
  const handleChipClick = useCallback(
    (type: number) => {
      return () => {
        const newSelected = selected.includes(type)
          ? selected.filter((t) => t !== type)
          : [...selected, type]

        onChange(newSelected)
      }
    },
    [selected, onChange],
  )

  const handleClear = useCallback(() => {
    onChange([])
  }, [onChange])

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        {carTypes.map((type, index) => (
          <Chip
            key={index}
            clickable
            color={selected.includes(index) ? 'success' : 'primary'}
            label={type}
            onClick={handleChipClick(index)}
          />
        ))}
        <Chip color="primary" clickable label="Clear" onClick={handleClear} />
      </Stack>
    </Box>
  )
}

export default memo(CarTypesFilter)
