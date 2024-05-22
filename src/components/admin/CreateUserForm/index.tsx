import { Button, FormControlLabel, Stack, Switch } from '@mui/material'
import { FormikHelpers, useFormik } from 'formik'
import { FC, memo } from 'react'
import * as Yup from 'yup'

import { FormikTextField } from '@/components'
import { CreateUserDto, UserRole } from '@/lib/user'
import { toggleArrayItem } from '@/lib/utils'

interface Props {
  onSubmit(createDto: CreateUserDto, helpers: FormikHelpers<CreateUserDto>): any
}

const INITIAL_VALUES: CreateUserDto = {
  email: '',
  password: '',
  username: '',
  roles: [UserRole.ADMIN, UserRole.LISTING_CREATOR],
}

const VALIDATION_SCHEMA = Yup.object().shape({
  username: Yup.string()
    .required('Username is required.')
    .min(1, 'Username is too short.'),
  password: Yup.string()
    .required('Password is required.')
    .min(1, 'Password is too short.'),
  email: Yup.string().email('Not valid email.').min(1, 'Email is too short.'),
  roles: Yup.array(),
})

const CreateUserForm: FC<Props> = ({ onSubmit }) => {
  const formik = useFormik({
    onSubmit,
    validationSchema: VALIDATION_SCHEMA,
    initialValues: INITIAL_VALUES,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <FormikTextField
          formik={formik}
          name="username"
          placeholder="Username"
          fullWidth
        />
        <FormikTextField
          formik={formik}
          type="email"
          name="email"
          placeholder="Email"
          fullWidth
        />
        <FormikTextField
          formik={formik}
          type="password"
          name="password"
          placeholder="Password"
          fullWidth
        />

        <Stack direction="row">
          <FormControlLabel
            control={
              <Switch
                checked={formik.values.roles.includes(UserRole.LISTING_CREATOR)}
                inputProps={{ 'aria-label': 'controlled' }}
                onChange={() =>
                  formik.setFieldValue(
                    'roles',
                    toggleArrayItem(
                      formik.values.roles,
                      UserRole.LISTING_CREATOR,
                    ),
                  )
                }
              />
            }
            label="Create listing"
          />
          <FormControlLabel
            control={
              <Switch
                checked={formik.values.roles.includes(UserRole.ADMIN)}
                inputProps={{ 'aria-label': 'controlled' }}
                onChange={() =>
                  formik.setFieldValue(
                    'roles',
                    toggleArrayItem(formik.values.roles, UserRole.ADMIN),
                  )
                }
              />
            }
            label="Admin"
          />
          abel="Self delete"
        </Stack>

        <Button type="submit">Create</Button>
      </Stack>
    </form>
  )
}

export default memo(CreateUserForm)
