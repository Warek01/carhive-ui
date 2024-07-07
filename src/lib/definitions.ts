import type { SvgIconComponent } from '@mui/icons-material'
import type { ReactNode } from 'react'

import type AppRoute from '@faf-cars/lib/routing/app-route'

export interface AppEnv {
  NODE_ENV: 'development' | 'production'
  VITE_API_BASENAME: string
}

export interface Link {
  content: ReactNode
  href?: string | AppRoute
}

export interface FileDto {
  fileName?: string
  base64Body: string
}

export interface ImageFile {
  file: File
  body: string
}

export interface IconButton<T> {
  Icon: SvgIconComponent
  text: string
  value: T
}
