import { useCallback } from 'react'
import { useSessionStorage } from 'usehooks-ts'

import {
  DEFAULT_PAGINATION_DATA,
  PaginationData,
} from '@faf-cars/lib/paginationData'
import StorageKey from '@faf-cars/lib/storage-key'

export default function usePagination(key: StorageKey | string) {
  const [paginationData, setPaginationData] = useSessionStorage<PaginationData>(
    key,
    DEFAULT_PAGINATION_DATA,
  )

  const setPage = useCallback((page: number) => {
    setPaginationData((p) => ({ ...p, page }))
  }, [])

  const setSize = useCallback((size: number | string) => {
    setPaginationData((p) => ({
      ...p,
      size: typeof size === 'string' ? parseInt(size) : size,
    }))
  }, [])

  const setItems = useCallback((items: number) => {
    setPaginationData((p) => ({
      ...p,
      items,
      count: Math.ceil(items / p.size),
    }))
  }, [])

  const reset = useCallback(() => {
    setPaginationData(DEFAULT_PAGINATION_DATA)
  }, [])

  return {
    ...paginationData,
    setPage,
    setSize,
    setItems,
    reset,
  }
}
