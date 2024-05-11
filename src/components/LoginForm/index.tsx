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
} from '@mui/material'
import { Navigate } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

import { useHttpService } from '@/hooks'
import { loginInitialValues, loginValidationSchema } from './constants'
import AuthContext from '@/context/AuthContext.tsx'
import { AppRoute } from '@/routing/AppRoute.ts'
import { LoginCredentials } from '@/lib/auth.ts'

const LoginForm: FC = () => {
  const { user, login } = useContext(AuthContext)

  if (user) return <Navigate to={AppRoute.HOME} />

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
      {isLoading ? (
        <Typography>Creating ...</Typography>
      ) : (
        <Grid
          container
          component="form"
          onSubmit={formik.handleSubmit}
          spacing={1}
        >
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

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="outlined" type="submit">
              Login
            </Button>
            <Button
              variant="text"
              component={RouterLink}
              to={AppRoute.REGISTER}
            >
              Create account
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default memo(LoginForm)
