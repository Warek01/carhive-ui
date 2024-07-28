import { Box, Grid } from '@mui/material';
import { FC, memo } from 'react';

import { AppSelectField, AppTextField } from '@faf-cars/components/inputs';
import {
  CAR_COLORS,
  CAR_COLOR_HEX_MAP,
  CAR_COLOR_NAME_MAP,
  CAR_DRIVETRAINS,
  CAR_DRIVETRAIN_NAME_MAP,
  CAR_STATUSES,
  CAR_STATUS_NAME_MAP,
  CAR_TRANSMISSIONS,
  CAR_TRANSMISSIONS_NAME_MAP,
  CreateListingField,
} from '@faf-cars/lib/listing';

const SecondarySection: FC = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={4} lg={3}>
        <AppTextField
          fullWidth
          type="number"
          label="Clearance (mm)"
          name={'clearance' as CreateListingField}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4} lg={3}>
        <AppTextField
          fullWidth
          type="number"
          label="Wheel size (mm)"
          name={'wheelSize' as CreateListingField}
          variant="outlined"
          inputProps={{ min: 0 }}
        />
      </Grid>
      <Grid item xs={4} lg={3}>
        <AppTextField
          fullWidth
          type="number"
          label="Engine volume (cm³)"
          name={'engineVolume' as CreateListingField}
          variant="outlined"
          inputProps={{ min: 0 }}
        />
      </Grid>
      <Grid item xs={4} lg={3}>
        <AppTextField
          fullWidth
          type="number"
          label="Horsepower (hp)"
          name={'horsepower' as CreateListingField}
          variant="outlined"
          inputProps={{ min: 0 }}
        />
      </Grid>
      <Grid item xs={4} lg={3}>
        <AppTextField
          fullWidth
          type="number"
          label="Mileage (km)"
          name={'mileage' as CreateListingField}
          variant="outlined"
          inputProps={{ min: 0 }}
        />
      </Grid>
      <Grid item xs={4} lg={3}>
        <AppSelectField
          label="Color"
          name={'color' as CreateListingField}
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
      </Grid>
      <Grid item xs={4} lg={3}>
        <AppSelectField
          label="Transmission"
          name={'transmission' as CreateListingField}
          values={CAR_TRANSMISSIONS}
          getItemContent={(transmission) =>
            CAR_TRANSMISSIONS_NAME_MAP.get(transmission)
          }
        />
      </Grid>
      <Grid item xs={4} lg={3}>
        <AppSelectField
          label="Drivetrain"
          name={'drivetrain' as CreateListingField}
          values={CAR_DRIVETRAINS}
          getItemContent={(drivetrain) =>
            CAR_DRIVETRAIN_NAME_MAP.get(drivetrain)
          }
        />
      </Grid>
      <Grid item xs={4} lg={3}>
        <AppSelectField
          label="Car status"
          name={'carStatus' as CreateListingField}
          values={CAR_STATUSES}
          getItemContent={(status) => CAR_STATUS_NAME_MAP.get(status)}
        />
      </Grid>
      <Grid item xs={4} lg={3}>
        <AppTextField
          fullWidth
          variant="outlined"
          label="Address"
          name={'sellAddress' as CreateListingField}
        />
      </Grid>
    </Grid>
  );
};

export default memo(SecondarySection);
