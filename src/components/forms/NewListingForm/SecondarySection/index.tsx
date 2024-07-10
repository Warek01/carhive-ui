import { Box, Stack } from '@mui/material';
import { FC, memo } from 'react';

import { AppSelectField, AppTextField } from '@faf-cars/components/inputs';
import {
  CAR_COLORS,
  CAR_COLOR_HEX_MAP,
  CAR_COLOR_NAME_MAP,
} from '@faf-cars/lib/listings';

const SecondarySection: FC = () => {
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1}>
        <AppTextField
          fullWidth
          type="number"
          label="Clearance (mm)"
          name="clearance"
          variant="outlined"
        />
        <AppTextField
          fullWidth
          type="number"
          label="Wheel size (mm)"
          name="wheelSize"
          variant="outlined"
          inputProps={{ min: 0 }}
        />
      </Stack>
      <Stack direction="row" spacing={1}>
        <AppTextField
          fullWidth
          type="number"
          label="Engine volume (cm3)"
          name="engineVolume"
          variant="outlined"
          inputProps={{ min: 0 }}
        />
        <AppTextField
          fullWidth
          type="number"
          label="Horsepower (hp)"
          name="horsepower"
          variant="outlined"
          inputProps={{ min: 0 }}
        />
      </Stack>
      <Stack direction="row" spacing={1}>
        <AppTextField
          fullWidth
          type="number"
          label="Mileage (km)"
          name="mileage"
          variant="outlined"
          inputProps={{ min: 0 }}
        />
        <AppSelectField
          label="Color"
          name="color"
          values={CAR_COLORS}
          getItemContent={(color) => (
            <Box
              width="100%"
              position="relative"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              {CAR_COLOR_NAME_MAP.get(color)}
              <Box
                width={24}
                height={24}
                borderRadius="100%"
                sx={{ bgcolor: CAR_COLOR_HEX_MAP.get(color) }}
              />
            </Box>
          )}
        />
      </Stack>
    </Stack>
  );
};

export default memo(SecondarySection);
