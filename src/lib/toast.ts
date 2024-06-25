import { useMemo } from 'react'
import { ToastContainerProps } from 'react-toastify'

import useTheme from '@/hooks/use-theme'

export enum ToastId {
  UserDelete = 'user-delete',
  UserUpdate = 'user-update',
  UserCreate = 'user-create',
  SessionExpire = 'session-expire',
  ListingNotFound = 'listing-not-found',
  ListingCreate = 'listing-create',
  Login = 'login',
  Register = 'register',
}

export function useGetToastProps() {
  const theme = useTheme()

  return useMemo<ToastContainerProps>(
    () => ({
      theme: theme.palette.mode,
      autoClose: 2000,
      limit: 3,
      position: 'top-right',
      closeOnClick: true,
      closeButton: false,
      draggable: true,
      draggablePercent: 50,
      draggableDirection: 'x',
      stacked: false,
      pauseOnHover: true,
      pauseOnFocusLoss: true,
      progressStyle: {
        backgroundColor: theme.palette.primary.main,
      },
      toastStyle: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      },
    }),
    [theme],
  )
}
