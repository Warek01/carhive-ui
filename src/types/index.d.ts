import type { AppEnv } from './definitions'

declare global {
  namespace NodeJS {
    interface ProcessEnv extends AppEnv {}
  }
}
