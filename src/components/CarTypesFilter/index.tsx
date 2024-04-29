import { FC, memo, useCallback, useState } from 'react'
import { Box, Chip, Stack } from '@mui/material'

import { carTypes } from '@/lib/listings'

interface Props {
  initialSelected: number[]
  onChange(selected: number[]): void
}

export const CarTypesFilter: FC<Props> = ({ onChange, initialSelected }) => {
  const [selected, setSelected] = useState<number[]>(initialSelected)

  const handleChipClick = useCallback(
    (type: number) => {
      return () => {
        const newSelected = selected.includes(type)
          ? selected.filter((t) => t !== type)
          : [...selected, type]

        setSelected(newSelected)
        onChange(newSelected)
      }
    },
    [selected],
  )

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
      </Stack>
    </Box>
  )
}

export default memo(CarTypesFilter)
