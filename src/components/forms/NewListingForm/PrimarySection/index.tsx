import { Delete } from '@mui/icons-material';
import { Button, Grid, Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { FC, memo, useCallback, useState } from 'react';

import { Image } from '@faf-cars/components';
import {
  AppFileField,
  AppSelectField,
  AppTextField,
} from '@faf-cars/components/inputs';
import {
  BODY_STYLES,
  BODY_STYLE_NAME_MAP,
  CAR_BRANDS_TEMP,
  CreateListingDto,
  FUEL_TYPES,
  FUEL_TYPE_NAME_MAP,
} from '@faf-cars/lib/listings';
import { fileToBase64 } from '@faf-cars/lib/utils';

const PrimarySection: FC = () => {
  const formik = useFormikContext<CreateListingDto>();

  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);

  const handlePreviewChange = useCallback(async (file: File) => {
    await formik.setFieldValue('preview', file);
    setPreviewDataUrl(await fileToBase64(file));
  }, []);

  const resetPreview = useCallback(async () => {
    setPreviewDataUrl(null);
    await formik.setFieldValue('preview', null);
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid
        item
        xs={3}
        display="flex"
        gap={1}
        flexDirection="column"
        justifyContent="center"
      >
        <Image src={previewDataUrl} height={194} aspectRatio="16/9" />
        <Stack direction="row" spacing={1}>
          <AppFileField
            placeholderText="Select preview"
            file={formik.values.preview}
            onChange={handlePreviewChange}
          />
          <Button
            disabled={!formik.values.preview}
            onClick={resetPreview}
            color="error"
            size="small"
          >
            <Delete fontSize="small" />
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={9}>
        <Stack gap={1}>
          <Stack direction="row" spacing={1}>
            <AppSelectField
              required
              name="brandName"
              label="Brand"
              values={CAR_BRANDS_TEMP}
              getItemContent={(brandName) => brandName}
            />
            <AppSelectField
              name="bodyStyle"
              label="Body style"
              values={BODY_STYLES}
              getItemContent={(bodyStyle) => BODY_STYLE_NAME_MAP.get(bodyStyle)}
            />
          </Stack>
          <Stack direction="row" spacing={1}>
            <AppTextField
              fullWidth
              variant="outlined"
              name="price"
              label="Price"
              inputProps={{ min: 0 }}
              type="number"
            />
            <AppTextField
              fullWidth
              variant="outlined"
              required
              name="modelName"
              label="Model"
            />
          </Stack>
          <Stack direction="row" gap={1}>
            <AppSelectField
              name="fuelType"
              label="Fuel type"
              values={FUEL_TYPES}
              getItemContent={(fuelType) => FUEL_TYPE_NAME_MAP.get(fuelType)}
            />
            <AppTextField
              variant="outlined"
              fullWidth
              name="productionYear"
              label="Production year"
              inputProps={{ min: 0, max: new Date().getFullYear() + 1 }}
              type="number"
            />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default memo(PrimarySection);
