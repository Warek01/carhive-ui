/// <reference types="vite/client" />

import type { AppEnv } from '@/lib/definitions.ts'

interface ImportMeta {
  readonly env: Readonly<AppEnv>
}
