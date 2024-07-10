import { Box, Button, FormControlLabel, Stack, Switch } from '@mui/material';
import { FormikHelpers, FormikProvider, useFormik } from 'formik';
import { FC, memo } from 'react';
import * as Yup from 'yup';

import { AppTextField } from '@faf-cars/components/inputs';
import { CreateUserDto, UserRole } from '@faf-cars/lib/user';
import { toggleArrayItem } from '@faf-cars/lib/utils';

interface Props {
  onSubmit(
    createDto: CreateUserDto,
    helpers: FormikHelpers<CreateUserDto>,
  ): any;
}

const INITIAL_VALUES: CreateUserDto = {
  email: '',
  password: '',
  username: '',
  roles: [],
};

const VALIDATION_SCHEMA = Yup.object().shape({
  username: Yup.string()
    .required('Username is required.')
    .min(1, 'Username is too short.'),
  password: Yup.string()
    .required('Password is required.')
    .min(1, 'Password is too short.'),
  email: Yup.string().email('Not valid email.').min(1, 'Email is too short.'),
  roles: Yup.array(),
});

const CreateUserForm: FC<Props> = ({ onSubmit }) => {
  const formik = useFormik({
    onSubmit,
    validationSchema: VALIDATION_SCHEMA,
    initialValues: INITIAL_VALUES,
  });

  return (
    <FormikProvider value={formik}>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <AppTextField name="username" placeholder="Username" fullWidth />
          <AppTextField
            type="email"
            name="email"
            placeholder="Email"
            fullWidth
          />
          <AppTextField
            type="password"
            name="password"
            placeholder="Password"
            fullWidth
          />

          <Stack direction="row">
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.roles.includes(
                    UserRole.ListingCreator,
                  )}
                  inputProps={{ 'aria-label': 'controlled' }}
                  onChange={() =>
                    formik.setFieldValue(
                      'roles',
                      toggleArrayItem(
                        formik.values.roles,
                        UserRole.ListingCreator,
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
                  checked={formik.values.roles.includes(UserRole.Admin)}
                  inputProps={{ 'aria-label': 'controlled' }}
                  onChange={() =>
                    formik.setFieldValue(
                      'roles',
                      toggleArrayItem(formik.values.roles, UserRole.Admin),
                    )
                  }
                />
              }
              label="Admin"
            />
          </Stack>

          <Button type="submit">Create</Button>
        </Stack>
      </Box>
    </FormikProvider>
  );
};

export default memo(CreateUserForm);
