import type { AppEnv } from './lib/definitions'

declare global {
  namespace NodeJS {
    interface ProcessEnv extends AppEnv {}
  }
}
