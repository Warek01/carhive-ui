import { FC, memo, useCallback } from 'react'
import { FormikHelpers, useFormik } from 'formik'
import {
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormControl,
  Button,
  Box,
  Grid,
} from '@mui/material'
import { useLocalStorage } from 'usehooks-ts'
import { v4 as uuid } from 'uuid'

import {
  createListingInitialValues,
  createListingValidationSchema,
} from './constants'
import LocalStorageKey from '@/lib/LocalStorageKey'
import {
  CreateListingDTO,
  carBrands,
  carTypes,
  engineTypes,
  Listing,
} from '@/lib/listings'

const NewListingForm: FC = () => {
  const [listings, setListings] = useLocalStorage<Listing[]>(
    LocalStorageKey.LISTINGS,
    [],
  )

  const handleSubmit = useCallback(
    (
      createListingDTO: CreateListingDTO,
      helpers: FormikHelpers<CreateListingDTO>,
    ) => {
      const listing: Listing = {
        ...(createListingDTO as Listing),
        id: uuid(),
      }

      setListings((l) => [...l, listing])
      helpers.resetForm()
    },
    [],
  )

  const formik = useFormik({
    initialValues: createListingInitialValues,
    onSubmit: handleSubmit,
    validationSchema: createListingValidationSchema,
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: true,
  })

  return (
    <Box>
      <Grid
        container
        component="form"
        onSubmit={formik.handleSubmit}
        spacing={1}
      >
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="brandName-label">Brand</InputLabel>
            <Select
              label="Brand"
              labelId="brandName-label"
              value={formik.values.brandName ?? ''}
              onChange={(e) =>
                formik.setFieldValue('brandName', e.target.value)
              }
            >
              {carBrands.map((brandName) => (
                <MenuItem value={brandName} key={brandName}>
                  {brandName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="carType-label">Type</InputLabel>
            <Select
              label="Type"
              labelId="carType-label"
              value={formik.values.type ?? ''}
              onChange={(e) => formik.setFieldValue('type', e.target.value)}
            >
              {carTypes.map((type, index) => (
                <MenuItem value={index} key={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="engineType-label">Engine type</InputLabel>
            <Select
              label="Engine type"
              labelId="engineType-label"
              value={formik.values.engineType ?? ''}
              onChange={(e) =>
                formik.setFieldValue('engineType', e.target.value)
              }
            >
              {engineTypes.map((type, index) => (
                <MenuItem value={index} key={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <TextField
              type="text"
              label="Model"
              value={formik.values.model ?? ''}
              onChange={(e) => formik.setFieldValue('model', e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <TextField
              type="color"
              value={formik.values.color ?? '#FFFFFF'}
              label="Color"
              onChange={(e) => formik.setFieldValue('color', e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <TextField
              type="number"
              value={formik.values.price ?? ''}
              InputProps={{ inputProps: { min: 0 } }}
              label="Price"
              onChange={(e) => formik.setFieldValue('price', e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <TextField
              type="number"
              value={formik.values.year ?? ''}
              InputProps={{ inputProps: { min: 0 } }}
              label="Year"
              onChange={(e) => formik.setFieldValue('year', e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default memo(NewListingForm)
