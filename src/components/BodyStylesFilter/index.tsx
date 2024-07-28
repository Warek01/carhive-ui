import { Box, Chip, Stack } from '@mui/material';
import { FC, memo, useCallback } from 'react';

import { BODY_STYLE_NAME_MAP, BodyStyle } from '@faf-cars/lib/listing';
import { toggleArrayItem } from '@faf-cars/lib/utils';

interface Props {
  selected: BodyStyle[];
  onChange(selected: BodyStyle[]): void;
}

export const BodyStylesFilter: FC<Props> = ({ onChange, selected }) => {
  const handleChipClick = useCallback(
    (bodyStyle: BodyStyle) => {
      return () => {
        const newSelected = toggleArrayItem(selected, bodyStyle);
        onChange(newSelected);
      };
    },
    [selected, onChange],
  );

  const handleClear = useCallback(() => {
    onChange([]);
  }, [onChange]);

  return (
    <Box>
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        {Array.from(BODY_STYLE_NAME_MAP).map(([bodyStyle, text]) => (
          <Chip
            key={bodyStyle}
            clickable
            color={selected.includes(bodyStyle) ? 'primary' : 'default'}
            label={text}
            size="small"
            onClick={handleChipClick(bodyStyle)}
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
  );
};

export default memo(BodyStylesFilter);
