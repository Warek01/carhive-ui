import { FC, memo, useCallback, useContext, useState } from 'react'
import { useFormik } from 'formik'
import {
  TextField,
  FormControl,
  Button,
  Box,
  Grid,
  FormHelperText,
  Typography,
  Backdrop,
  CircularProgress,
} from '@mui/material'
import { Navigate } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

import { useAuth, useHttpService } from '@/hooks'
import { loginInitialValues, loginValidationSchema } from './constants'
import { AppRoute } from '@/routing/AppRoute.ts'
import { LoginCredentials } from '@/lib/auth.ts'

const LoginForm: FC = () => {
  const { login } = useAuth()

  const http = useHttpService()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = useCallback(
    async (values: LoginCredentials) => {
      setIsLoading(true)

      try {
        const res = await http.login({ ...values })
        login(res.token)
      } catch (err) {
        console.error(err)

        if (err instanceof AxiosError) {
          switch (err.response?.status) {
            case 401:
              toast('Invalid password.', { type: 'error' })
              break
            case 404:
              toast('User does not exist.', { type: 'error' })
              break
          }
        } else {
          toast('Error.', { type: 'error' })
        }
      }

      setIsLoading(false)
    },
    [login],
  )

  const formik = useFormik({
    initialValues: loginInitialValues,
    onSubmit: handleSubmit,
    validationSchema: loginValidationSchema,
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: true,
  })

  return (
    <Box>
      <Backdrop
        open={isLoading}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid
        container
        component="form"
        onSubmit={formik.handleSubmit}
        spacing={3}
      >
        <Grid item xs={12}>
          <Typography variant="h3" textAlign="center">
            Log in
          </Typography>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!formik.errors.username}>
              <TextField
                type="text"
                value={formik.values.username ?? ''}
                label="Username"
                onChange={(e) =>
                  formik.setFieldValue('username', e.target.value)
                }
                error={!!formik.errors.username}
              />
              {formik.errors.username && (
                <FormHelperText>{formik.errors.username}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!formik.errors.password}>
              <TextField
                type="password"
                value={formik.values.password ?? ''}
                label="Password"
                onChange={(e) =>
                  formik.setFieldValue('password', e.target.value)
                }
                error={!!formik.errors.password}
              />
              {formik.errors.password && (
                <FormHelperText>{formik.errors.password}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          display="flex"
          gap={3}
          justifyContent="center"
          mt={3}
        >
          <Button variant="outlined" type="submit">
            Login
          </Button>
          <Button variant="text" component={RouterLink} to={AppRoute.REGISTER}>
            Create account
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default memo(LoginForm)
