import { FC, memo, useCallback, useState } from 'react'
import { Chip } from '@mui/material'

import { CarType } from 'lib/car/CarType'

interface Props {
  initialSelected: CarType[]
  onChange(selected: CarType[]): void
}

export const CarTypesSelect: FC<Props> = ({ onChange, initialSelected }) => {
  const [selected, setSelected] = useState<CarType[]>(initialSelected)

  const handleChipClick = useCallback(
    (type: CarType) => {
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
        {Object.entries(CarType).map(([type, name]) => (
          <li key={type}>
            <Chip
              clickable
              color={selected.includes(type as CarType) ? 'success' : 'primary'}
              label={name}
              onClick={handleChipClick(type as CarType)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default memo(CarTypesSelect)
