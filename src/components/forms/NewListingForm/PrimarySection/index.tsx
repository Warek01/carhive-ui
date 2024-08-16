import { AddAPhoto, Delete } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  debounce,
} from '@mui/material';
import { useFormikContext } from 'formik';
import {
  ChangeEventHandler,
  FC,
  memo,
  useCallback,
  useRef,
  useState,
} from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { IMAGE_SIZE_LIMIT } from '@carhive/components/forms/NewListingForm/constants';
import { AppSelectField, AppTextField } from '@carhive/components/inputs';
import { useHttp, useLogger } from '@carhive/hooks';
import {
  BODY_STYLES,
  BODY_STYLE_NAME_MAP,
  CreateListingDto,
  CreateListingField,
  FUEL_TYPES,
  FUEL_TYPE_NAME_MAP,
} from '@carhive/lib/listing';
import { QueryKey } from '@carhive/lib/query';
import { ToastId } from '@carhive/lib/toast';
import { fileToBase64 } from '@carhive/lib/utils';

const PrimarySection: FC = () => {
  const formik = useFormikContext<CreateListingDto>();
  const logger = useLogger();
  const http = useHttp();

  const addImageInputRef = useRef<HTMLInputElement | null>(null);

  const [imagesDataUrls, setImagesDataUrls] = useState<string[]>([]);
  const [isImageDataUrlLoading, setIsImageDataUrlLoading] = useState(false);
  const [citySearchString, setCitySearchString] = useState('');

  const brandsQuery = useQuery([QueryKey.BrandList], () => http.brand.list());

  const countriesQuery = useQuery([QueryKey.CountryList], () =>
    http.country.list(),
  );

  const citiesQuery = useQuery(
    [QueryKey.CityList, formik.values.countryCode, citySearchString],
    () =>
      http.city.list({
        countryCode: formik.values.countryCode,
        search: citySearchString,
      }),
    {
      enabled: !!formik.values.countryCode,
    },
  );

  const brandModelsQuery = useQuery(
    [QueryKey.ModelList, formik.values.brandName],
    () => http.brand.listModels(formik.values.brandName),
    { enabled: !!formik.values.brandName },
  );

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
        await formik.setFieldValue(
          'images' as CreateListingField,
          images.concat(newImage),
        );

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
        await formik.setFieldValue(
          'images' as CreateListingField,
          filteredImages,
        );
        setImagesDataUrls((v) => v.toSpliced(imageIndex, 1));
      };
    },
    [formik],
  );

  const handleCitySearchStringChange: ChangeEventHandler<HTMLInputElement> =
    useCallback(
      debounce((event) => {
        setCitySearchString(event.target.value);
      }, 500),
      [],
    );

  return (
    <Grid container spacing={1}>
      <Grid item xs={4} lg={3}>
        <AppSelectField
          required
          name={'brandName' as CreateListingField}
          label="Brand"
          disabled={!brandsQuery.data}
          values={brandsQuery.data ?? []}
        />
      </Grid>
      <Grid item xs={4} lg={3}>
        <AppSelectField
          name={'modelName' as CreateListingField}
          label="Model"
          disabled={!brandModelsQuery.data}
          required
          values={brandModelsQuery.data ?? []}
        />
      </Grid>
      <Grid item xs={4} lg={3}>
        <AppSelectField
          name={'bodyStyle' as CreateListingField}
          label="Body style"
          values={BODY_STYLES}
          getItemContent={(bodyStyle) => BODY_STYLE_NAME_MAP.get(bodyStyle)}
        />
      </Grid>
      <Grid item xs={4} lg={3}>
        <AppTextField
          fullWidth
          variant="outlined"
          name={'price' as CreateListingField}
          label="Price"
          inputProps={{ min: 0 }}
          type="number"
        />
      </Grid>

      <Grid item xs={4} lg={3}>
        <AppSelectField
          name={'fuelType' as CreateListingField}
          label="Fuel type"
          values={FUEL_TYPES}
          getItemContent={(fuelType) => FUEL_TYPE_NAME_MAP.get(fuelType)}
        />
      </Grid>
      <Grid item xs={4} lg={3}>
        <AppTextField
          variant="outlined"
          fullWidth
          name={'productionYear' as CreateListingField}
          label="Production year"
          inputProps={{ min: 0, max: new Date().getFullYear() + 1 }}
          type="number"
        />
      </Grid>
      <Grid item xs={4} lg={3}>
        <Autocomplete
          disabled={!countriesQuery.data}
          options={countriesQuery.data?.items || []}
          id="country-select"
          onChange={(event, value) =>
            formik.setFieldValue(
              'countryCode' as CreateListingField,
              value?.code,
            )
          }
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box
              {...props}
              component="li"
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              key={option.code}
            >
              <img
                loading="lazy"
                width={20}
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                alt={option.name}
              />
              {option.name} ({option.code})
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Country"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'off',
              }}
            />
          )}
        />
      </Grid>

      <Grid item xs={4} lg={3}>
        <Autocomplete
          disabled={!formik.values.countryCode}
          options={citiesQuery.data || []}
          filterOptions={(x) => x}
          id="city-select"
          onChange={(event, value) =>
            formik.setFieldValue('cityName' as CreateListingField, value)
          }
          renderOption={(props, option) => (
            <Box component="li" {...props} key={option}>
              {option}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="City"
              onChange={handleCitySearchStringChange}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'off',
              }}
            />
          )}
        />
      </Grid>
      <Grid item container xs={12} spacing={1}>
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
