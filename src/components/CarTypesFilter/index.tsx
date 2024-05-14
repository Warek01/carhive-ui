import { FC, memo, useCallback } from 'react'
import { Box, Chip, Stack } from '@mui/material'

import { carTypes } from '@/lib/listings'

interface Props {
  selected: string[]
  onChange(selected: string[]): void
}

export const CarTypesFilter: FC<Props> = ({ onChange, selected }) => {
  const handleChipClick = useCallback(
    (type: string) => {
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
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        {carTypes.map((type) => (
          <Chip
            key={type}
            clickable
            color={selected.includes(type) ? 'primary' : 'default'}
            label={type}
            size="small"
            onClick={handleChipClick(type)}
          />
        ))}
        <Chip
          color="secondary"
          size="small"
          onDelete={handleClear}
          label="Clear"
        />
      </Stack>
    </Box>
  )
}

export default memo(CarTypesFilter)
