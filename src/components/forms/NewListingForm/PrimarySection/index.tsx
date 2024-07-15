import { AddAPhoto, Delete } from '@mui/icons-material';
import { Button, CircularProgress, Grid, IconButton } from '@mui/material';
import { useFormikContext } from 'formik';
import {
  ChangeEventHandler,
  FC,
  memo,
  useCallback,
  useRef,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import { IMAGE_SIZE_LIMIT } from '@faf-cars/components/forms/NewListingForm/constants';
import { AppSelectField, AppTextField } from '@faf-cars/components/inputs';
import { useLogger } from '@faf-cars/hooks';
import {
  BODY_STYLES,
  BODY_STYLE_NAME_MAP,
  CAR_BRANDS_TEMP,
  CreateListingDto,
  FUEL_TYPES,
  FUEL_TYPE_NAME_MAP,
} from '@faf-cars/lib/listings';
import { ToastId } from '@faf-cars/lib/toast';
import { fileToBase64 } from '@faf-cars/lib/utils';

const PrimarySection: FC = () => {
  const formik = useFormikContext<CreateListingDto>();
  const logger = useLogger();

  const addImageInputRef = useRef<HTMLInputElement | null>(null);

  const [imagesDataUrls, setImagesDataUrls] = useState<string[]>([]);
  const [isImageDataUrlLoading, setIsImageDataUrlLoading] = useState(false);

  const handleImageAdd: ChangeEventHandler<HTMLInputElement> = useCallback(
    async (event) => {
      setIsImageDataUrlLoading(true);
      try {
        const newImage = event.target.files!.item(0);
        addImageInputRef.current!.value = '';

        if (!newImage) {
          return;
        }

        if (newImage.size > IMAGE_SIZE_LIMIT) {
          toast('Image is too large', {
            type: 'error',
            toastId: ToastId.ListingCreate,
          });

          return;
        }

        const { images } = formik.values;
        await formik.setFieldValue('images', images.concat(newImage));

        const dataUrl = await fileToBase64(newImage);
        setImagesDataUrls((v) => v.concat(dataUrl));
      } catch (err) {
        logger.error(err);
      } finally {
        setIsImageDataUrlLoading(false);
      }
    },
    [formik],
  );

  const handleImageDelete = useCallback(
    (imageIndex: number) => {
      return async () => {
        const filteredImages = formik.values.images.toSpliced(imageIndex, 1);
        await formik.setFieldValue('images', filteredImages);
        setImagesDataUrls((v) => v.toSpliced(imageIndex, 1));
      };
    },
    [formik],
  );

  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <AppSelectField
          required
          name="brandName"
          label="Brand"
          values={CAR_BRANDS_TEMP}
          getItemContent={(brandName) => brandName}
        />
      </Grid>
      <Grid item xs={4}>
        <AppSelectField
          name="bodyStyle"
          label="Body style"
          values={BODY_STYLES}
          getItemContent={(bodyStyle) => BODY_STYLE_NAME_MAP.get(bodyStyle)}
        />
      </Grid>
      <Grid item xs={4}>
        <AppTextField
          fullWidth
          variant="outlined"
          name="price"
          label="Price"
          inputProps={{ min: 0 }}
          type="number"
        />
      </Grid>
      <Grid item xs={4}>
        <AppTextField
          fullWidth
          variant="outlined"
          required
          name="modelName"
          label="Model"
        />
      </Grid>
      <Grid item xs={4}>
        <AppSelectField
          name="fuelType"
          label="Fuel type"
          values={FUEL_TYPES}
          getItemContent={(fuelType) => FUEL_TYPE_NAME_MAP.get(fuelType)}
        />
      </Grid>
      <Grid item xs={4}>
        <AppTextField
          variant="outlined"
          fullWidth
          name="productionYear"
          label="Production year"
          inputProps={{ min: 0, max: new Date().getFullYear() + 1 }}
          type="number"
        />
      </Grid>
      <Grid item container spacing={1}>
        {imagesDataUrls.map((dataUrl, index) => (
          <Grid
            item
            xs={3}
            key={index}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              '&:hover .delete-btn': {
                opacity: 1,
              },
            }}
          >
            <IconButton
              color="error"
              size="large"
              className="delete-btn"
              sx={{
                position: 'absolute',
                opacity: 0,
                transition: 'opacity linear 150ms',
              }}
              onClick={handleImageDelete(index)}
            >
              <Delete />
            </IconButton>
            <img
              alt="image"
              style={{
                width: '100%',
                aspectRatio: '16/9',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              src={dataUrl}
            />
          </Grid>
        ))}
        {imagesDataUrls.length < 10 && (
          <Grid
            item
            xs={3}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {isImageDataUrlLoading ? (
              <CircularProgress size={24} />
            ) : (
              <Button
                fullWidth
                sx={{ aspectRatio: '16/9' }}
                variant="outlined"
                onClick={() => addImageInputRef.current?.click()}
              >
                <AddAPhoto />
                <input
                  ref={addImageInputRef}
                  name="add-image"
                  aria-label="add-image"
                  type="file"
                  accept="image/*"
                  style={{
                    width: 0,
                    height: 0,
                    overflow: 'hidden',
                    opacity: 0,
                  }}
                  onChange={handleImageAdd}
                />
              </Button>
            )}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default memo(PrimarySection);
