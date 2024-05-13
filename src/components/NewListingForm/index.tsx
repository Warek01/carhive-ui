import { FC, memo, useCallback, useContext } from 'react'
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
  FormHelperText,
  Typography,
} from '@mui/material'
import { toast } from 'react-toastify'
import { useMutation } from 'react-query'

import {
  createListingInitialValues,
  createListingValidationSchema,
} from './constants'
import {
  CreateListingDto,
  carBrands,
  carTypes,
  engineTypes,
} from '@/lib/listings'
import { useHttpService } from '@/hooks'
import AuthContext from '@/context/AuthContext.tsx'

const NewListingForm: FC = () => {
  const http = useHttpService()
  const createListingMutation = useMutation((createDto: CreateListingDto) =>
    http.createListing(createDto),
  )
  const { user } = useContext(AuthContext)

  const handleSubmit = useCallback(
    async (
      createDto: CreateListingDto,
      helpers: FormikHelpers<CreateListingDto>,
    ) => {
      try {
        await createListingMutation.mutateAsync({
          ...createDto,
          publisherId: user!.id,
        })
        helpers.resetForm()
        toast('Listing created successfully.')
      } catch (err) {
        console.error(err)
        toast('Error creating listing', { type: 'error' })
      }
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
      {createListingMutation.isLoading ? (
        <Typography>Creating ...</Typography>
      ) : (
        <Grid
          container
          component="form"
          onSubmit={formik.handleSubmit}
          spacing={1}
        >
          <Grid item xs={4}>
            <FormControl fullWidth error={!!formik.errors.brandName}>
              <InputLabel id="brandName-label">Brand</InputLabel>
              <Select
                label="Brand"
                labelId="brandName-label"
                value={formik.values.brandName ?? ''}
                onChange={(e) =>
                  formik.setFieldValue('brandName', e.target.value)
                }
                error={!!formik.errors?.brandName}
              >
                {carBrands.map((brandName) => (
                  <MenuItem value={brandName} key={brandName}>
                    {brandName}
                  </MenuItem>
                ))}
              </Select>
              {formik.errors.brandName && (
                <FormHelperText>{formik.errors.brandName}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth error={!!formik.errors.type}>
              <InputLabel id="carType-label">Type</InputLabel>
              <Select
                label="Type"
                labelId="carType-label"
                value={formik.values.type ?? ''}
                error={!!formik.errors.type}
                onChange={(e) => formik.setFieldValue('type', e.target.value)}
              >
                {carTypes.map((type) => (
                  <MenuItem value={type} key={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {formik.errors.type && (
                <FormHelperText>{formik.errors.type}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth error={!!formik.errors.engineType}>
              <InputLabel id="engineType-label">Engine type</InputLabel>
              <Select
                label="Engine type"
                labelId="engineType-label"
                value={formik.values.engineType ?? ''}
                onChange={(e) =>
                  formik.setFieldValue('engineType', e.target.value)
                }
                error={!!formik.errors.engineType}
              >
                {engineTypes.map((type) => (
                  <MenuItem value={type} key={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {formik.errors.engineType && (
                <FormHelperText>{formik.errors.engineType}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth error={!!formik.errors.modelName}>
              <TextField
                type="text"
                label="Model"
                value={formik.values.modelName ?? ''}
                onChange={(e) =>
                  formik.setFieldValue('modelName', e.target.value)
                }
                error={!!formik.errors.modelName}
              />
              {formik.errors.modelName && (
                <FormHelperText>{formik.errors.modelName}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth error={!!formik.errors.color}>
              <TextField
                type="color"
                value={formik.values.color}
                label="Color"
                onChange={(e) => formik.setFieldValue('color', e.target.value)}
                error={!!formik.errors.color}
              />
              {formik.errors.color && (
                <FormHelperText>{formik.errors.color}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth error={!!formik.errors.price}>
              <TextField
                type="number"
                value={formik.values.price ?? ''}
                InputProps={{ inputProps: { min: 0 } }}
                label="Price"
                onChange={(e) => formik.setFieldValue('price', e.target.value)}
                error={!!formik.errors.price}
              />
              {formik.errors.price && (
                <FormHelperText>{formik.errors.price}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth error={!!formik.errors.year}>
              <TextField
                type="number"
                value={formik.values.year ?? ''}
                InputProps={{ inputProps: { min: 0 } }}
                label="Year"
                onChange={(e) => formik.setFieldValue('year', e.target.value)}
                error={!!formik.errors.year}
              />
              {formik.errors.year && (
                <FormHelperText>{formik.errors.year}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="outlined" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default memo(NewListingForm)
