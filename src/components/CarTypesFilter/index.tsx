import { FC, memo, useCallback, useState } from 'react'
import { Chip } from '@mui/material'

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
    <div>
      <ul className="flex gap-3">
        {carTypes.map((type, index) => (
          <li key={index}>
            <Chip
              clickable
              color={selected.includes(index) ? 'success' : 'primary'}
              label={type}
              onClick={handleChipClick(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default memo(CarTypesFilter)
