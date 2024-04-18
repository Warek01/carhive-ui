import { FC, memo, useCallback } from 'react'
import { useFormik } from 'formik'
import {
  Autocomplete,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormControl,
  FormLabel,
  Button,
  Input,
} from '@mui/material'
import { useLocalStorage } from 'usehooks-ts'
import { v4 as uuid } from 'uuid'

import { createListingInitialValues } from './constants'
import LocalStorageKey from 'lib/LocalStorageKey'
import { CreateListingDTO, carBrands, carTypes, engineTypes, Listing } from 'lib/listings'
import { ListingItem } from 'components'

const NewListingForm: FC = () => {
  const [listings, setListings] = useLocalStorage<Listing[]>(LocalStorageKey.LISTINGS, [])

  const handleSubmit = useCallback((createListingDTO: CreateListingDTO) => {
    const listing: Listing = {
      ...createListingDTO,
      id: uuid(),
    }

    setListings((l) => [...l, listing])
  }, [])

  const formik = useFormik({
    initialValues: createListingInitialValues,
    onSubmit: handleSubmit,
  })

  return (
    <div className="my-12">
      <form onSubmit={formik.handleSubmit}>
        <FormControl className="flex flex-col gap-3">
          <InputLabel id="brandName-label">Brand</InputLabel>
          <Select
            label="Brand"
            labelId="brandName-label"
            value={formik.values.brandName}
            onChange={(e) => formik.setFieldValue('brandName', e.target.value)}
            required
          >
            {carBrands.map((brandName) => (
              <MenuItem
                value={brandName}
                key={brandName}
              >
                {brandName}
              </MenuItem>
            ))}
          </Select>
          <TextField
            type="text"
            label="Model"
            required
            onChange={(e) => formik.setFieldValue('model', e.target.value)}
          />
          <TextField
            type="color"
            value={formik.values.color}
            label="Color"
            onChange={(e) => formik.setFieldValue('color', e.target.value)}
          />
          <Button
            variant="outlined"
            type="submit"
          >
            Submit
          </Button>
        </FormControl>
      </form>
    </div>
  )
}

export default memo(NewListingForm)
